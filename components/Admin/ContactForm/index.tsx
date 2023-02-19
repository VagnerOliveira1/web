import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import { faPlus, faTrash, faClose, faHouse } from '@fortawesome/free-solid-svg-icons';
import StyledButton from '../../shared/StyledButton';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import styles from '../../../styles/AdminPanel.module.css';
import  Contact from '../../../dtos/Contact';

import { clearContactToEdit } from '../../../store/modules/admin/contact/reducer';

import { IMaskInput } from 'react-imask';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Button from 'react-bootstrap/Button';

import getAddressData from '@/services/address';

import { Modal } from 'react-bootstrap';
import ModalAddressForm from '@/components/ModalAddress';

// para que possamos reutilizar o form, necessitaremos de receber o método que será executado quando form for submetido (um para a criação e outro para a atualização da contato) e também o texto do botão de confirmação (action) que é opcional
interface ContactFormProps {
  handleSubmit: (contact: Contact) => Promise<void>;
  action?: string;
}


const ContactForm: React.FC<ContactFormProps> = ({ handleSubmit, action = 'Adicionar' }) => {
  const handleCEPChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
  const zipcode = evt.target.value;
  // const addressData = await saveAddress(zipcode);

  // setZipcode(zipcode);
  // setNumber(addressData.number);
  // setStreet(addressData.street);
  // setDistrict(addressData.district);
  // setCity(addressData.city);


  };
  const PhoneKinds = {
    home: 0,
    office: 1,
    mobile: 2,
    whatsapp: 3,
  };
  const dispatch = useDispatch();

  const [full_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [phones, setPhones] = useState([{ phone_number: '', kind: PhoneKinds.home }]);
  const [showModal, setShowModal] = useState(false);

  const handleAddPhone = () => {
    setPhones([...phones, { phone_number: '', kind: PhoneKinds.home }]);
  };


  const handleRemovePhone = (index) => {
    setPhones(phones.filter((_, i) => i !== index));
  };

  const handlePhoneChange = (index, key, value) => {
    const newPhones = [...phones];
    newPhones[index][key] = value;
    setPhones(newPhones);
  };

  const handlePhoneKindChange = (index: number, value: number) => {
    const newPhones = [...phones];
    newPhones[index].kind = value;
    setPhones(newPhones);
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - 18);
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 100);

  // aqui obetemos a contato que estiver armazenada na store do redux para podermos pegar os dados para edição

  const contact = useSelector((state: Contact) => state.contact);

  // checando se a contato não é vazia e se o a url contem a palavra Edit para setar o valor do nome para a edição.
  useEffect(() => {
    if(contact && router.pathname.includes('Edit')) {
      setName(contact.full_name);
      setEmail(contact.email);
      setBirthDate(contact.birth_date);
      setCPF(contact.cpf);
      setPhones(contact.phone);
    }
  }, [contact]);

  const router = useRouter();

  // quando o form for submetido, prevenimos a operação normal do form que seria dar um refresh na página e chamamos o método que foi recebido por parâmetro enviando um objeto do tipo Contact
  const handleFormSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();


    // como o id não é um campo visível, pegamos o mesmo da contato que foi armazenada na store do redux, se a mesma for nula, nulo / undefined é retornado (?., evita termos que faze um if para realizar uma checagem)
    await handleSubmit({ id: contact?.id, full_name, email, cpf, birth_date, phones});


  }
      
  
  return (
    
    <div className={styles.admin_panel}>
      <ModalAddressForm
      show={showModal}
      onHide={() => setShowModal(false)}
      onSubmit={handleFormSubmit}
      
    />
      
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
              placeholder="Digite CPF somente números"
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
            className={styles.secundary_input} 
            onChange={date => setBirthDate(date)} 
            maxDate={maxDate} 
            minDate={minDate}
          required 
          />
          
      {phones && Array.isArray(phones) && phones.map((phone, index) => (
        <div key={index}>
          <Form.Group>
            <Form.Label>Número de telefone</Form.Label>
            <Form.Control
              type="text"
              className={styles.secundary_input} 
              as={IMaskInput}
              mask="(00)00000-0000"
              placeholder="Digite o número de telefone"
              value={phone.phone_number}
              onChange={(evt) => handlePhoneChange(index, "phone_number", evt.target.value)}
              maxLength={14}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de telefone</Form.Label>
            <Form.Control
              className={styles.secundary_input} 
              as="select"
              value={phone.kind}
              onChange={(evt) => handlePhoneChange(index, "kind", evt.target.value)}
            >
              <option value="">Selecione o tipo de telefone</option>
              <option value="0">Casa</option>
              <option value="1">Escritório</option>
              <option value="2">Celular</option>
              <option value="3">WhatsApp</option>
              
            </Form.Control>
          </Form.Group>
            <div>
            

            <StyledButton 
                icon={faPlus} 
                action={"Adicionar telefone"} 
                type_button="red" 
                onClick={handleAddPhone}
            />
            <StyledButton 
                  icon={faTrash} 
                  action={"Remover Telefone"} 
                  type_button="red" 
                  onClick={() => handleRemovePhone(index)}
              />
            </div>
          
        </div>
      ))}
      
        <div className={styles.details_button}>
            <StyledButton 
                icon={faPlus} 
                action={action} 
                type_button="blue" 
                type="submit"
            />

            <StyledButton 
                icon={faClose} 
                action={"Cancelar"} 
                type_button="red" 
                onClick={() => {
                  // limpando a contato para edição quando a edição é cancelada para não enviar o id caso seja um cadastro para não dar erro de chave primária
                  dispatch(clearContactToEdit());
                  router.back();
                }}
            />
           
        </div>
            {
            router.asPath.includes('Edit') ?
            <StyledButton 
            icon={faHouse} 
            action={"Adicionar Endereço"} 
            type_button="red" 
            onClick={() => setShowModal(true)}
        /> : ''
          }
      </Form>
      
      
    </div>
  )
}

export default ContactForm;