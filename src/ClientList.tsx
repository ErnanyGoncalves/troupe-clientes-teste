import { useState } from 'react';
import { Container, Table, Button, Icon } from 'semantic-ui-react'
import styled from "styled-components";

function ClientList() {
    const [data, setData] = useState([{ name: "Ernany", email: "ernany@email.com", cpf: "08814692629", endereco: "Rua severiano ribeiro cardoso, 64 Itajubá 37502-080" }]);
    return (
        <Container>
            {data.length > 0 ? (
                < Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nome</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>CPF</Table.HeaderCell>
                            <Table.HeaderCell>Endereço</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((v, i) => {
                            return (<Table.Row key={i}>
                                <Table.Cell>{v.name}</Table.Cell>
                                <Table.Cell>{v.email}</Table.Cell>
                                <Table.Cell>{v.cpf}</Table.Cell>
                                <Table.Cell>{v.endereco}</Table.Cell>
                                <Table.Cell><Button icon><Icon name="edit outline" /></Button><Button icon><Icon name="trash alternate outline" /></Button></Table.Cell>
                            </Table.Row>);
                        })}

                    </Table.Body>
                </Table>
            ) : <h1>Empty list</h1>}
        </Container >
    );
}

export default ClientList;
