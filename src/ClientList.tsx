import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Icon } from 'semantic-ui-react'
import styled from "styled-components";
import DataContext from './DataContext';
import {SpecialHeading} from "./StyledComponents";
import { toast } from 'react-toastify';

function ClientList() {

    const { data, setData }: any = useContext(DataContext);

    const getClients = () =>{
        fetch("http://localhost:5000/clientes")
        .then((res) => res.json())
        .then((json) => {
            setData(json)
        });
    }

    const handleExclusion = (i: number) => {
        if (window.confirm("Você tem certeza que quer excluir esse cliente?")) {           
            fetch(`http://localhost:5000/clientes/${i}`,{method:"DELETE"})
                .then((res) => {
                    res.json();
                })
                .then((json) => {
                    toast.success('🗑 Cliente excluido com sucesso!');
                    getClients();
                });
        }
    }

    useEffect(() => {
        getClients()
    }, []);

    return (
        <Container>
            <SpecialHeading>
                <h1>Clientes cadastrados</h1>
                <Link to="/new"><Button icon><Icon name="add" /></Button></Link>
            </SpecialHeading>
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
                        {data.map((v: any) => {
                            return (<Table.Row key={v.id}>
                                <Table.Cell>{v.nome}</Table.Cell>
                                <Table.Cell>{v.email}</Table.Cell>
                                <Table.Cell>{v.cpf}</Table.Cell>
                                <Table.Cell>{`${v.endereco.rua}, ${v.endereco.numero} - ${v.endereco.bairro} - ${v.endereco.cidade} (${v.endereco.cep})`}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/edit/${v.id}`}><Button icon><Icon name="edit outline" /></Button></Link>
                                    <Button onClick={() => handleExclusion(v.id)} icon><Icon name="trash alternate outline" /></Button>
                                </Table.Cell>
                            </Table.Row>);
                        })}

                    </Table.Body>
                </Table>
            ) : <p>Você não possui clientes cadastrados.</p>}
        </Container >
    );
}

export default ClientList;
