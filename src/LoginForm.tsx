import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react'
import styled from "styled-components";

function LoginForm() {
  return (
    <Container>
      <Form>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Senha</label>
          <input placeholder='Senha' />
        </Form.Field>        
        <Button type='submit'>Submit</Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
