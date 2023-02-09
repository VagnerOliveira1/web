import React from 'react';
import styles from '../../../styles/Background.module.css';

const Background: React.FC = ({children}) => {
    return (
        <div className={styles.main}>
          {children}
        </div>
    )
}

export default  Background;