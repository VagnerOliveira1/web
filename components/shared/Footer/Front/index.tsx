import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faInstagram, faYoutube, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Logo from '../../Logo';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../../styles/Footer.module.css';

const FrontFooter: React.FC = () => {
    return (
        <footer className={styles.background}>
          <Col md={{ span: 8, offset: 2 }}>
            <Row>
              <Col lg={7} md={12}>
                  <Row>
                      <Col lg={3} md={12} className="mb-4 mb-lg-0">
                          Acompanhe-nos
                      </Col>
                      <Col lg={7} md={12} className="mb-4 mb-lg-0">
                        <Row>
                            <Col lg={1} xs={2}>
                                <FontAwesomeIcon icon={faFacebookF}  />
                            </Col>

                            <Col lg={1} xs={2}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Col>

                            <Col lg={1} xs={2}>
                                <FontAwesomeIcon icon={faYoutube}  />
                            </Col>

                            <Col lg={1} xs={2}>
                                <FontAwesomeIcon icon={faTwitter}  />
                            </Col>

                            <Col lg={1} xs={2}>
                                <FontAwesomeIcon icon={faLinkedin}  />
                            </Col>
                        </Row>
                      </Col>

                  </Row>
              </Col>
              <Col lg={{span: 4, offset: 0}} xs={{span: 8, offset: 2}}>
                <Row>
                  <Col>
                      Contato
                  </Col>

                  <Col>
                      Sobre
                  </Col>

                  <Col>
                      Blog
                  </Col>

                  <Col>
                      FAQ
                  </Col>
                </Row>

              </Col>
            </Row>

            <hr className={styles.line}></hr>
            <Row>
              <Col lg={{span: 2, offset: 0}} xs={{span: 8, offset: 2}}>
                <Logo />
              </Col>

              <Col lg={{span: 6, offset: 1}} xs={12}>
              <Link href="https://github.com/VagnerOliveira1">github.com • ti.vagner@gmail.com</Link>
                <p style={{'color': 'var(--color-gray-light)'}}></p>
              </Col>

              <Col lg={{span: 2, offset: 1}} xs={{span: 6, offset: 3}}>
                <Image src="/assets/logo-agenda.png" alt="Logo Agenda" width={40} height={40} />
              </Col>
            </Row>
          </Col>
        </footer>
    )
}

export default FrontFooter;