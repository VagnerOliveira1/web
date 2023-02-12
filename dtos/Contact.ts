export default interface Contact {
  id: number;
  full_name: string;
  email: string;
  cpf: string;
  birth_date: Date;
  phone:{ 
    phone_number: string;
    kind: number;
  },
  address:{ 
    zip_code: string;
    street: string;
    number: number;
    district: string;
    city: string;
  }

}
