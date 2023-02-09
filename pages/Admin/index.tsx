import React from 'react';
import withAuthAdmin from '../../components/withAuthAdmin';
const Home: React.FC = () => {
    return (<h1>Parabéns </h1>);
}

export default withAuthAdmin(Home);