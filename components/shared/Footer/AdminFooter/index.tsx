import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Logo from '../../Logo';
import styles from '../../../../styles/Footer.module.css';
const AdminFooter: React.FC = () => {
    return (
        <div>
            <Container className="p-4">
              <Row>
                  <Col>
                    <Logo />
                  </Col>

                  <Col>
                      <span className="float-right">github.com • ti.vagner@gmail.com</span>
                  </Col>
              </Row>
            </Container>
        </div>
    )
}

export default AdminFooter;