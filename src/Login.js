import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 400px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease-in-out;
  border-color: ${(props) => (props.isInputFocused ? '#0070f3' : '#ddd')};

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  transition: all 0.3s;
  transform-origin: top left;
  transform: ${(props) =>
    props.isInputFocused || props.hasValue ? 'translateY(-100%) scale(0.8)' : 'translateY(0) scale(1)'};
  color: ${(props) => (props.isInputFocused || props.hasValue ? '#0070f3' : '#666')};
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    contrasena: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://giftsofsky.somee.com/Api/User/Login', formData);
      console.log(response.data);
      // Realizar acciones adicionales después de iniciar sesión, como guardar el token de acceso en el estado global o redirigir a otra página
    } catch (error) {
      setError('Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Title>Iniciar sesión</Title>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              autoComplete="off"
              isInputFocused={!!formData.userName}
            />
            <Label isInputFocused={!!formData.userName} hasValue={!!formData.userName}>
              Nombre de usuario
            </Label>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <Label>Contraseña</Label>
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
