import AdminComponent from '../../../../components/shared/AdminComponent';
import TitleAdminPanel from '../../../../components/shared/TitleAdminPanel';

import ContactForm from '../../../../components/Admin/ContactForm';

import withAuthAdmin from '../../../../components/withAuthAdmin';

import ContactsService from '../../../../services/contacts';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Contact from '../../../../dtos/Contact';

const New: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async ( name: Contact): Promise<void> => {
    try {
      await ContactsService.create(name);
      toast.info('Contato cadastrado com sucesso!');

      router.back();
    } catch (err) {
      toast.error('Ocorreu algum erro, tente novamente!');
      console.log(err);
    }
  }

  return (
    <AdminComponent>
      <TitleAdminPanel title="Adicionar Contato" path="Dashboard > Contacts > Adicionar Contato" />

      <ContactForm handleSubmit={handleSubmit} action="Adicionar" />
    </AdminComponent>
  )
}

export default withAuthAdmin(New);