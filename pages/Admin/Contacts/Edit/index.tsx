import AdminComponent from '../../../../components/shared/AdminComponent';
import TitleAdminPanel from '../../../../components/shared/TitleAdminPanel';

import withAuthAdmin from '../../../../components/withAuthAdmin';

import { useDispatch } from 'react-redux';
import { clearContactToEdit } from '../../../../store/modules/admin/contact/reducer';

import ContactsService from '../../../../services/contacts';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import ContactForm from '../../../../components/Admin/ContactForm';
import Contact from '../../../../dtos/Contact';

const Edit: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (contact: Contact): Promise<void> => {
    try {
      await ContactsService.update(contact);

      toast.info('Contato atualizado com sucesso!');

      dispatch(clearContactToEdit());
      router.back();
    } catch (err) {
      toast.error('Ocorreu um erro ao atualizar o contato, tente novamente.');
      console.log(err);
    }
  }

  return (
    <AdminComponent>
      <TitleAdminPanel title="Editar Contato" path="Dashboard > Contatos > Detalhes da contato > Editar contato" />

      <ContactForm handleSubmit={handleSubmit} action="Atualizar"/>
    </AdminComponent>
  )
}

export default withAuthAdmin(Edit);