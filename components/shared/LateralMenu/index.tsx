import React from 'react';
import Logo from '../Logo';
import styles from '../../../styles/MenuLateral.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faUser, faGamepad, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const LateralMenu: React.FC = () => {
    return(
      <div className={styles.background}>
        <Logo />
    
        <div className={styles.list}>
          <Link href="/Admin">
            <a>
              <FontAwesomeIcon icon={faSignal} color="var(--color-gray-light)" className="mr-3" />
              Painel Inicial
              <hr />
            </a>
          </Link>

          <Link href="/Admin/Users/List">
            <a>
              <FontAwesomeIcon icon={faUser} color="var(--color-gray-light)" className="mr-3" />
              Usuários
              <hr />
            </a>
          </Link>
          <Link href="/Admin/Contacts/List">
            <a>
              <FontAwesomeIcon icon={faGamepad} color="var(--color-gray-light)" className="mr-3" />
              Contatos
              <hr />
            </a>
          </Link>
          <Link href="/Admin/#">
          <a>
            <FontAwesomeIcon icon={faSignOutAlt} color="var(--color-gray-light)" className="mr-3" />
            Sair
            <hr />
          </a>
        </Link>
        </div>
      </div>
    )
}

export default LateralMenu;