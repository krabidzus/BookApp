import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useForm, Controller } from 'react-hook-form';

export default function Signup() {
  const { signup } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const navigate = useNavigate();

  const email = watch('email');
  const password = watch('password');

  const comparePasswords = (value: string) => {
    return value === getValues('password');
  };

  const submitForm = async () => {
    try {
      await signup(email, password);
      navigate('/login');
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
                <Form.Group controlId="email-address">
                  <Form.Label>Email address</Form.Label>
                  <Controller
                    control={control}
                    name="email"
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
                    name="password"
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters.',
                      },
                    }}
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
                  <p className="text-danger">{errors?.password?.message}</p>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="passwordConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Controller
                    control={control}
                    name={'passwordConfirm'}
                    rules={{ validate: comparePasswords }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        required
                        className="mb-3"
                      />
                    )}
                  />
                  {errors.passwordConfirm?.type === 'validate' && (
                    <p className="text-danger">Password must be same</p>
                  )}
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>

                <Button className="mb-1" type="submit">
                  Sign up
                </Button>
              </form>

              <p>
                Already have an account? <NavLink to="/login">Sign in</NavLink>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
