import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Controller, useForm } from 'react-hook-form';

export default function Login() {
  const { login } = useAuth();

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const email = watch('email');
  const password = watch('password');

  const submitForm = async () => {
    try {
      await login(email, password);
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      <section>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <h1 className="text-center">BookApp</h1>
              <form onSubmit={handleSubmit(submitForm)}>
                <Form>
                  <Form.Group controlId="email-address">
                    <Form.Label>Email address</Form.Label>
                    <Controller
                      control={control}
                      name={'email'}
                      defaultValue=""
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="email"
                          placeholder="Email address"
                          required
                          className="mb-3"
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Controller
                      control={control}
                      name={'password'}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="password"
                          placeholder="Password"
                          required
                          className="mb-3"
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>

                  <Button className="mb-1" type="submit">
                    Login
                  </Button>
                </Form>
              </form>

              <p>
                No account yet? <NavLink to="/signup">Sign up</NavLink>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
