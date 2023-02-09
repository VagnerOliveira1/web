import React from 'react';
import { InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap';
import Background from '../shared/Background';

interface LoginProps{
  titlePhrase: String,
  buttonPhrase: String
}

const LoginForm: React.FC<LoginProps>= ({titlePhrase, buttonPhrase}) => {
    return (
          <Row>
            <Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}}>
              <Background>
                  <h4>{titlePhrase}</h4>

                  <InputGroup className="mt-3">
                      <FormControl placeholder="Meu e-mail" />
                  </InputGroup>

                  <InputGroup className="mt-3">
                      <FormControl placeholder="Senha" />
                  </InputGroup>

                  <Button className="btn btn-info mt-3 w-100">{buttonPhrase}</Button>
                  <br />
                  Esqueceu a senha?
              </Background>
                
            </Col>
          </Row>
    )
}

export default  LoginForm;