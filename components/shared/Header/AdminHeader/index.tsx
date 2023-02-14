import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from '../../../../styles/AdminHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faUser, faTableList, faCheckSquare, faLaptop, faTicketAlt, faDollarSign, faUserCircle, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import User from '@/dtos/User';
import SignOutService from '@/util/SignOutService';

const AdminHeader: React.FC = () => {
  const router = useRouter();
  const {name}: User = useSelector(state => state.auth.loggedUser);
    return(
      <Row className={styles.background}>
        <Col lg={6} xs={9}>
          <Link href="/Admin"><FontAwesomeIcon icon={faSignal} color="var(--color-gray-light)" className="ml-3" /></Link>
          <Link href="/Admin/Contacts/List"><FontAwesomeIcon icon={faTableList} color="var(--color-gray-light)" className="ml-3" /></Link>
          <Link legacyBehavior href="/Auth/Login">
            <a
              onClick={SignOutService.execute}
            >
              <FontAwesomeIcon
              icon={faSignOutAlt} 
              color="var(--color-gray-light)" 
              className="ml-3" />
            </a>
          </Link> 
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