import React, { useContext, useState, useEffect } from 'react';
import { Container, Form, Button, Icon } from 'semantic-ui-react'
import { Link, useHistory, useParams } from 'react-router-dom';
import DataContext from './DataContext';
import {SpecialHeading} from './StyledComponents';
import { toast } from 'react-toastify';

function NewEditClientForm() {
    const { editId }: any = useParams();
    const [formData, setFormData] = useState({ nome: "", email: "", cpf: "", cep: "", rua: "", bairro: "", numero: "", cidade: "" });
    let history = useHistory();

    const getClient = (editId: number) => {
        fetch(`http://localhost:5000/clientes/${editId}`)
            .then((res) => res.json())
            .then((json) => {
                const { nome, email, cpf, endereco } = json;
                setFormData({
                    nome, email, cpf, cep: endereco.cep, rua: endereco.rua, bairro: endereco.bairro, numero: endereco.numero, cidade: endereco.cidade
                });
            });
    }

    useEffect(() => {
        if (editId) getClient(editId);
    }, []);

    const mCPF = (cpf:string)=> {
        cpf=cpf.replace(/\D/g,"")
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        return cpf
    }

    const handleChange = ({ target }: any) => {
        const { id, value } = target;
        let reqBlocked = false;
        setFormData({ ...formData, [id]: value });
        if(id==="cpf"){
            const maskedValue = mCPF(value);
            setFormData({...formData,[id]:maskedValue});
        }

        if (!reqBlocked && id === "cep" && value.length === 8) {
            fetch(`https://viacep.com.br/ws/${value}/json/`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        ...formData,
                        [id]:value,
                        ["bairro"]: data.bairro,
                        ["rua"]: data.logradouro,
                        ["cidade"]: data.localidade,
                    });
                });
            reqBlocked = !reqBlocked;
        }
    }

    const updateClient = (formId: number) => {
        const { nome, email, cpf, rua, cep, bairro, numero, cidade } = formData;
        const formatedData = {
            nome, email, cpf,
            endereco: {
                rua, cep, bairro, numero, cidade
            }
        }
        fetch(`http://localhost:5000/clientes/${formId}`, {
            method: "PUT", body: JSON.stringify(formatedData), headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                res.json();
            })
            .then((json) => {
                history.push("/list");
                toast.success('✍ Cliente atualizado com sucesso!');
            });
    }

    const createClient = () => {
        const { nome, email, cpf, rua, cep, bairro, numero, cidade } = formData;
        const formatedData = {
            nome, email, cpf,
            endereco: {
                rua, cep, bairro, numero, cidade
            }
        }

        fetch(`http://localhost:5000/clientes`, {
            method: "POST", body: JSON.stringify(formatedData), headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                res.json();
            })
            .then((json) => {
                setFormData({ nome: "", email: "", cpf: "", cep: "", rua: "", bairro: "", numero: "", cidade: "" });
                toast.success('✔ Cliente cadastrado! Gostaria de cadastrar outro?');
            });
    }

    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        if (editId) {
            updateClient(editId)
        } else {
            createClient();
        }
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
                    <input type="text" id="cpf" pattern="[0-9]+" maxLength={14} onChange={handleChange} value={formData.cpf} placeholder='CPF' required />
                </Form.Field>
                <Form.Field>
                    <label>Endereço</label>
                    <label htmlFor="cep">CEP</label>
                    <input type="number" id="cep" onWheel={(ev)=>ev.currentTarget.blur()} min="0" max="99999999" onChange={handleChange} value={formData.cep} placeholder='CEP' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="rua">Rua</label>
                    <input type="text" id="rua" onChange={handleChange} value={formData.rua} placeholder='Rua' required />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="numero">Número</label>
                    <input type="number" id="numero" onWheel={(ev)=>ev.currentTarget.blur()} min="1" onChange={handleChange} value={formData.numero} placeholder='Número' required />
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
