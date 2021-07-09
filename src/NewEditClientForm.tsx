import React, { useContext, useState, useEffect } from 'react';
import { Container, Form, Button, Icon } from 'semantic-ui-react'
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import DataContext from './DataContext';
import SpecialHeading from './StyledComponents';
import {  toast } from 'react-toastify';

function NewEditClientForm() {
    const { editId }: any = useParams();
    const { data, setData }: any = useContext(DataContext);
    const [formData, setFormData] = useState({ nome: "", email: "", cpf: "", cep: "", rua: "", bairro: "", numero: "", cidade: "" });
    let history = useHistory();
    useEffect(() => {

        if (data && editId) {

            const { nome, email, cpf, endereco } = data[editId];
            if (endereco)
                setFormData({
                    nome: nome, email, cpf, cep: endereco.cep, rua: endereco.rua, bairro: endereco.bairro, numero: endereco.numero, cidade: endereco.cidade
                });
        }
    }, [])

    const handleChange = ({ target }: any) => {
        const { id, value } = target;
        let reqBlocked = false;
        setFormData({ ...formData, [id]: value });
        if (!reqBlocked && id === "cep" && value.length === 8) {
            fetch(`https://viacep.com.br/ws/${value}/json/`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        ...formData,
                        ["bairro"]: data.bairro,
                        ["rua"]: data.logradouro,
                        ["cidade"]: data.localidade,
                    });
                });
            reqBlocked = !reqBlocked;
        }
    }

    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        const { nome, email, cpf, cep, rua, numero, bairro, cidade } = formData;
        if (editId) {
            setData([
                ...data.slice(0, editId),
                {
                    ...data[editId],
                    nome, email, cpf, endereco: { cep, rua, numero, bairro, cidade }
                },
                ...data.slice(editId + 1)
            ]);
            history.push("/list");
            toast.success('✍ Cliente atualizado com sucesso!');
        } else {
            setData([...data, { nome, email, cpf, endereco: { cep, rua, numero, bairro, cidade } }]);
            toast.success('✔ Cliente cadastrado! Gostaria de cadastrar outro?');
        }
        setFormData({ nome: "", email: "", cpf: "", cep: "", rua: "", bairro: "", numero: "", cidade: "" });
    }

    return (
        <Container>
            <SpecialHeading>
                <h1>{editId ? "Editar cliente" : "Novo cliente"}</h1>
                <Link to="/list"><Button icon><Icon name="list" /></Button></Link>
            </SpecialHeading>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" onChange={handleChange} value={formData.nome} placeholder='Nome' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange} value={formData.email} placeholder='Email' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" onChange={handleChange} value={formData.cpf} placeholder='CPF' required />
                </Form.Field>
                <Form.Field>
                    <label>Endereço</label>
                    <label htmlFor="cep">CEP</label>
                    <input type="number" id="cep" onChange={handleChange} value={formData.cep} placeholder='CEP' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="rua">Rua</label>
                    <input type="text" id="rua" onChange={handleChange} value={formData.rua} placeholder='Rua' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="numero">Número</label>
                    <input type="number" id="numero" onChange={handleChange} value={formData.numero} placeholder='Número' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" id="bairro" onChange={handleChange} value={formData.bairro} placeholder='Bairro' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" id="cidade" onChange={handleChange} value={formData.cidade} placeholder='Cidade' required />
                </Form.Field>
                <Button type='submit'>{editId ? "Editar" : "Cadastrar"}</Button>
            </Form>
        </Container>
    );
}

export default NewEditClientForm;
