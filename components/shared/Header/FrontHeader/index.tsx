import React from 'react';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../Logo';
import style from '../../../../styles/Header.module.css';
const FrontHeader: React.FC = () => {
    return (
      <Row className={style.background}>
        <Col md={8} className="mt-2">
            <Logo/>
        </Col>

        <Col md={4} className="mt-2 text-center">
        <Row>
            <Col md={6} className="mb-4 mb-md-0">
                <InputGroup>
                    <FormControl placeholder="Pesquisar Contato" className={style.input} />
                </InputGroup>
            </Col>

            <Col md={6}>
                <Row>
                    <Col md={4} xs={4}>
                        <FontAwesomeIcon icon={faSearch} color="var(--color-gray-light)" />
                    </Col>

                    <Col md={8} xs={8}>
                        <FontAwesomeIcon icon={faUserCircle} color="var(--color-gray-light)" />
                    </Col>
                    
                </Row>
            </Col>
        </Row>
        </Col>
      </Row>
    )
}

export default FrontHeader;