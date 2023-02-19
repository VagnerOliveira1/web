interface Contact {
  id: number;
  full_name: string;
  email: string;
  cpf: string;
  birth_date: Date;
  phone:{ 
    phone_number: string;
    kind: number;
  }
}
interface RootState {
  contact: Contact;
}

export default RootState;
