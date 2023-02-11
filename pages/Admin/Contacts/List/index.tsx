import { useState, useEffect } from 'react';
import AdminComponent from '../../../../components/shared/AdminComponent';
import TitleAdminPanel from '../../../../components/shared/TitleAdminPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faGhost } from '@fortawesome/free-solid-svg-icons';
import AdminListTable from '../../../../components/shared/AdminListTable';
import AdminDeleteModal from '../../../../components/shared/AdminDeleteModal';
import styles from '../../../../styles/AdminPanel.module.css';
import NoData from '../../../../components/shared/NoData';

import withAuthAdmin from '../../../../components/withAuthAdmin';

import useSWR from  'swr';
import ContactsService from '../../../../services/contacts';
import Contact from '../../../../dtos/Contact';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setContactToEdit } from '../../../../store/modules/admin/contact/reducer';
import { useRouter } from 'next/router';

const defaultUrl = '/admin/v1/contacts';

import UrlService from '../../../../util/UrlServices';

const List: React.FC = () => {
  // estado para controlar a exibição do modal de exclusão
  const [show, setShow] = useState(false);
  // estado para armazena o id do contato para remoção, ao clicar no ícone para remover um contato, esse estado é atualizado
  const [contactToRemove, setContactToRemove] = useState(0);
  // estado utilizado para forçar a revalidaçãod e cache do SWR, toda vez que o mesmo mudar o SWR irá realizar uma revalidação de cache
  const [url, setUrl] = useState(defaultUrl);

  const { data, error, mutate } = useSWR(url, ContactsService.index);

  // obento o estado de pesquisa do redux para observá-lo e a cada mudanção mudar o estado local url
  const search = useSelector(state => state.search);

  const dispatch = useDispatch();
  const router = useRouter();

  // se o search mudar (usuário deve alterar o valor do campo e teclar enter)
  // a pesquisa será feita ao alterar o url do SWR
  useEffect(() => {
    setUrl(
      defaultUrl +
      UrlService.execute({ page: router.query.page, search })
    )
  }, [search, router.query.page]);

  // mostrando o motal de remoção e setando o id para remoção do contato
  const handleShow = (id: number): void => {
    setShow(true);
    setContactToRemove(id);
  }

  // fechando o modal e caso o usuário clique em ok (success true) a contato será removido, case o usuário clique em cancelar (success false), o contato não será removida
  const handleClose = async (success: boolean): Promise<void> => { 
    setShow(false);

    if (!success) return;

    try {
      // realizando a request para remoção do contato utilizando o id salvo anteriormente
      await ContactsService.delete(contactToRemove);
      toast.info('Contato removido com sucesso!');
      // função do SWR para forçar a revalidação do cache
      mutate();
    } catch (err){
      toast.error('Ocorreu um erro ao remover uma contato, tente novamente.');
      console.log(err);
    }
  }

  // ao clicar no item de edição do contato selecionado para edição é armazenado no redux e o usuário é redirecionado para a edição
  const handleEdit = (contatc: Contact): void => {
    dispatch(setContactToEdit(contatc));
    router.push('/Admin/Contacts/Edit');
  }

  if (error) {
    toast.error('Erro ao listar contatos');
    console.log(error);
  }

  return (
    <AdminComponent>
      <TitleAdminPanel 
        title="Contatos" 
        path="Dashboard > Contatos" 
        icon={faGhost} 
        newPath="/Admin/Contacts/New"/>

      <AdminDeleteModal handleClose={handleClose} show={show} target="contato" />

      {
        // caso não existam dados cadastrados ou a pesquisa não tenha resultado o componente NoData é renderizado.
        data && data.contacts && data.contacts.length > 0 ? (
          <AdminListTable first_title="Nome da contato" meta={data.meta}>
            {
              data.contacts.map(contact => (
                <tr className={styles.table_line} key={contact.id}>
                  <td>{contact.full_name}</td>
                  <td>
                    <div className={styles.hover}>
                      <FontAwesomeIcon 
                        icon={faEdit} 
                        onClick={() => handleEdit(contact)}
                      />
                    </div>
                  </td>

                  <td>
                    <div className={styles.hover}>
                      <FontAwesomeIcon 
                        icon={faTrash} 
                        onClick={() => handleShow(contact.id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </AdminListTable>
        ) : (
          <NoData />
        )
      }
    </AdminComponent>
  )
}

export default withAuthAdmin(List);