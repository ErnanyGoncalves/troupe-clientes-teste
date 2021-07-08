import React, { useState } from 'react';
import { Container, Form, Button } from 'semantic-ui-react'
import styled from "styled-components";

function NewEditClientForm() {
    const [formData, setFormData] = useState({
        nome: "", email: "", cpf: "",
        cep: "",
        rua: "",
        bairro: "",
        numero: "",
        cidade: ""
    });

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
        console.log(reqBlocked)
    }

    return (
        <Container>
            <h1>New</h1>
            <Form>
                <Form.Field>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" onChange={handleChange} value={formData.nome} placeholder='Nome' />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange} value={formData.email} placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" onChange={handleChange} value={formData.cpf} placeholder='CPF' />
                </Form.Field>
                <Form.Field>
                    <label>Endereço</label>
                    <label htmlFor="cep">CEP</label>
                    <input type="number" id="cep" onChange={handleChange} value={formData.cep} placeholder='CEP' />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="rua">Rua</label>
                    <input type="text" id="rua" onChange={handleChange} value={formData.rua} placeholder='Rua' />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="numero">Número</label>
                    <input type="number" id="numero" onChange={handleChange} value={formData.numero} placeholder='Número' />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" id="bairro" onChange={handleChange} value={formData.bairro} placeholder='Bairro' />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" id="cidade" onChange={handleChange} value={formData.cidade} placeholder='Cidade' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    );
}

export default NewEditClientForm;
