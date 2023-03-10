import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

import AuthState from '../../dtos/AuthState';
import User from '../../dtos/User';
import ApiData from '../../dtos/ApiData';

const withAuthAdmin = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser);
    
    const apiDataCookie = Cookie.get('@api-data');


    let apiData: ApiData | null = null;
    
    try {
      apiData = apiDataCookie ? JSON.parse(apiDataCookie) : null;
    } catch (error) {
      console.error(`Error parsing cookie data: ${error}`);
    }

    // checando se o usuário existe no redux e se o mesmo é admin
    // checando se os dados da api existem no cookie e ainda se existe
    // o access-token salvo.
    if (!loggedUser || 
        loggedUser.profile !== 'admin'         
    ) {
      router.push({
        pathname: '/Auth/Login',
        query: {
          callback: router.pathname
        }
      })
    }

    return <Component {...props} />;
  }

  // se o component tiver o método getServerSideProps (responsável por 
  // fazer o fetch das props e realizar o pre-render da página no server side) 
  // ele irá repassar para o component auth, para que assim as props sejam 
  // acessiveis pelo Auth e caso o usuário tenha acesso a página, essas props 
  // serão repassadas ao component (linha 19)
  if(Component.getServerSideProps) {
    Auth.getServerSideProps = Component.getServerSideProps;
  }

  return Auth;
}

export default withAuthAdmin;