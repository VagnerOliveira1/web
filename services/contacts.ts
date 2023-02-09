import api from './api';
import Contact from '../dtos/Contact';
import Meta from '../dtos/Meta';
// criação da interface que será retornada pela listagem de categorias da api.
// por padrão sempre será um array do recurso mas um objeto meta, contendo os dados para a páginação
interface ContactIndexData {
  contacts: Contact[];
  meta: Meta;
}
const ContactsService = {
  // função que irá realizar o fetch das categorias
  // recebemos a url do SWR e apenas retornamos os dados da reposta para ficar mais fácil a tratativa pelo componente de listagem
  index: (url: string) => {
    return api.get<ContactIndexData>(url).then(response => response.data);
  },
  // função para a crição de de um contact
  create: (full_name: string) => {
    return api.post<void>('/admin/v1/contacts', { full_name });
  },
  // função para a atualização de um contact
  update: ({id, full_name}: Contact) => {
    return api.put<void>(`/admin/v1/contacts/${id}`, { full_name });
  },
  // função para remoção de um contact
  delete: (id: number) => {
    return api.delete<void>(`/admin/v1/contacts/${id}`);
  }
}
export default ContactsService;