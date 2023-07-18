import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RegistroContainer = styled.div`
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
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const PlaceholderLabel = styled(Label)`
  font-weight: normal;
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

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    usuario: '',
    contrasena: '',
    idInvitacion: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://giftsofsky.somee.com/Api/User/Registrar', formData);
      console.log(response.data);
      // Mostrar una notificación o redirigir a una página de éxito
    } catch (error) {
      setError('Ocurrió un error al registrar el usuario');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <RegistroContainer>
      <FormContainer>
        <Title>Registro</Title>
        <Form onSubmit={handleRegistro}>
          <FormGroup>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
            />
            <PlaceholderLabel>Nombre</PlaceholderLabel>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              placeholder="Apellido"
            />
            <PlaceholderLabel>Apellido</PlaceholderLabel>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono"
            />
            <PlaceholderLabel>Teléfono</PlaceholderLabel>
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <PlaceholderLabel>Email</PlaceholderLabel>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              placeholder="Usuario"
            />
            <PlaceholderLabel>Usuario</PlaceholderLabel>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              placeholder="Contraseña"
            />
            <PlaceholderLabel>Contraseña</PlaceholderLabel>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="idInvitacion"
              value={formData.idInvitacion}
              onChange={handleInputChange}
              placeholder="ID de Invitación"
            />
            <PlaceholderLabel>ID de Invitación</PlaceholderLabel>
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </RegistroContainer>
  );
};

export default Registro;
