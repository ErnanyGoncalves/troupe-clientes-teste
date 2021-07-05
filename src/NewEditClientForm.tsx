import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react'
import styled from "styled-components";

function NewEditClientForm() {
    return (
        <Container>
            <h1>New</h1>
            <Form>
                <Form.Field>
                    <label>Nome</label>
                    <input placeholder='Nome' />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>CPF</label>
                    <input placeholder='CPF' />
                </Form.Field>
                <Form.Field>
                    <label>Endereço</label>
                    <label>CEP</label>
                    <input placeholder='CEP' />
                </Form.Field>
                <Form.Field>
                    <label>CEP</label>
                    <input placeholder='CEP' />
                </Form.Field>
                <Form.Field>
                    <label>Número</label>
                    <input placeholder='Número' />
                </Form.Field>
                <Form.Field>
                    <label>Bairro</label>
                    <input placeholder='Bairro' />
                </Form.Field>
                <Form.Field>
                    <label>Cidade</label>
                    <input placeholder='Cidade' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    );
}

export default NewEditClientForm;
