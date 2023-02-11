import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import { faGhost, faTimes } from '@fortawesome/free-solid-svg-icons';
import StyledButton from '../../shared/StyledButton';

import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../../../styles/AdminPanel.module.css';
import Contact from '../../../dtos/Contact';

import { clearContactToEdit } from '../../../store/modules/admin/contact/reducer';

import { IMaskInput } from 'react-imask';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import { AppState } from '../../../store';

// para que possamos reutilizar o form, necessitaremos de receber o método que será executado quando form for submetido (um para a criação e outro para a atualização da contato) e também o texto do botão de confirmação (action) que é opcional
interface ContactFormProps {
  handleSubmit: (contact: Contact) => Promise<void>;
  action?: string;
}


const ContactForm: React.FC<ContactFormProps> = ({ handleSubmit, action = 'Adicionar' }) => {
  const [full_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [birth_date, setBirthDate] = useState('');

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - 18);
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 100);

  // aqui obetmos a contato que estiver armazenada na store do redux para podermos pegar os dados para edição
  const contact = useSelector(state => state.contact);
  //const contact = useSelector((state: AppState) => state.contact);

  const dispatch = useDispatch();

  // checando se a contato não é vazia e se o a url contem a palavra Edit para setar o valor do nome para a edição.
  useEffect(() => {
    if(contact && router.pathname.includes('Edit')) {
      setName(contact.full_name);
      setEmail(contact.email);
      setBirthDate(contact.birth_date);
      setCPF(contact.cpf);
    }
  }, [contact]);

  const router = useRouter();

  // quando o form for submetido, prevenimos a operação normal do form que seria dar um refresh na página e chamamos o método que foi recebido por parâmetro enviando um objeto do tipo Contact
  const handleFormSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();


    // como o id não é um campo visível, pegamos o mesmo da contato que foi armazenada na store do redux, se a mesma for nula, nulo / undefined é retornado (?., evita termos que faze um if para realizar uma checagem)
    await handleSubmit({ id: contact?.id, full_name, email, cpf, birth_date});


  }
  
  return (
    <div className={styles.admin_panel}>
      
      <Form className={styles.new_form} onSubmit={handleFormSubmit}>
        <Form.Label>Nome</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Digite o nome da contato" 
            className={styles.secundary_input} 
            value={full_name}
            onChange={
                (evt: React.ChangeEvent<HTMLInputElement>) => 
                    setName(evt.target.value)
            }
            required
            />

        <Form.Label>Email</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Digite o email da contato" 
            className={styles.secundary_input} 
            value={email}
            onChange={
                (evt: React.ChangeEvent<HTMLInputElement>) => 
                    setEmail(evt.target.value)
            }
            required
            />
        <Form.Label>CPF</Form.Label>
          <Form.Control 
              as={IMaskInput}
              mask="000.000.000-00"
              type="text" 
              className={styles.secundary_input} 
              value={cpf}
              onChange={
                  (evt: React.ChangeEvent<HTMLInputElement>) => 
                      setCPF(evt.target.value)
              }
              required
              />

        <Form.Label>DataNasc</Form.Label>
          <DatePicker 
            selected={birth_date} 
            value={birth_date}
            onChange={date => setBirthDate(date)} 
            maxDate={maxDate} 
            minDate={minDate}
          required 
          />
        <div className={styles.details_button}>
            <StyledButton 
                icon={faGhost} 
                action={action} 
                type_button="blue" 
                type="submit"
            />

            <StyledButton 
                icon={faTimes} 
                action={"Cancelar"} 
                type_button="red" 
                onClick={() => {
                  // limpando a contato para edição quando a edição é cancelada para não enviar o id caso seja um cadastro para não dar erro de chave primária
                  dispatch(clearContactToEdit());
                  router.back();
                }}
            />
        </div>
      </Form>
    </div>
  )
}

export default ContactForm;