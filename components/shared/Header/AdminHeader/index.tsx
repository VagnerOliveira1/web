import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from '../../../../styles/AdminHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faUser, faGamepad, faCheckSquare, faLaptop, faTicketAlt, faDollarSign, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface AdminHeaderProps {
  name: string
}

const AdminHeader: React.FC<AdminHeaderProps> = ({name}) => {
    return(
      <Row className={styles.background}>
        <Col lg={6} xs={9}>
          <Link href="/Admin"><FontAwesomeIcon icon={faSignal} color="var(--color-gray-light)" className="ml-3" /></Link>
          <Link href="/Admin/Contacts/List"><FontAwesomeIcon icon={faCheckSquare} color="var(--color-gray-light)" className="ml-3" /></Link>
          <Link href="#"><FontAwesomeIcon icon={faDollarSign} color="var(--color-gray-light)" className="ml-3" /></Link>
        </Col>
    
        <Col lg={6} xs={3} className="d-none d-md-block">
          <div className="float-right">
            <span className={styles.name}>{name}</span>
            <FontAwesomeIcon icon={faUserCircle} color="var(--color-gray-light)" />
          </div>
        </Col>
      </Row>
    )
}

export default AdminHeader;