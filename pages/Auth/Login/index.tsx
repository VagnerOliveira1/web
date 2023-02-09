import React from 'react';
import MainComponent from '@/components/shared/MainComponent';
import LoginForm from '@/components/LoginForm';

const Login: React.FC = () => {
  return (
    <MainComponent>
       <LoginForm titlePhrase="Acessar minha conta" buttonPhrase="Acessar"/>
    </MainComponent>
  )
}

export default Login;