import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Form, Button } from 'semantic-ui-react'
import styled from "styled-components";
import DataContext from './DataContext';

function LoginForm() {

  const [formData, setFormData] = useState({ email: "", senha: "" });
  const { online, setOnline }: any = useContext(DataContext);
  let history = useHistory();

  const getUsers = () => {
    return fetch("http://localhost:5000/usuarios")
      .then((res) => res.json());
  }

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    if (ev.target.type === "submit") {
      const { email, senha } = formData;
      getUsers()
        .then((users) => {
          const found = !!users.find((u: any) => u.email === email && u.senha === senha);
          if(found) {
            setOnline(found);
            history.push("/list");
          }else{
            toast.error('😭 Email ou senha incorretos!');
          }
        });
    }
  }

  const handleChange = ({ target }: any) => {
    const { id, value } = target;
    setFormData({
      ...formData,
      [id]: value
    });
  }

  return (
    <Container>
      <Form onClick={handleSubmit}>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
        </Form.Field>
        <Form.Field>
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" placeholder='Senha' value={formData.senha} onChange={handleChange} required />
        </Form.Field>
        <Button type='submit' >Entrar</Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
