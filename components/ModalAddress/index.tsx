import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ModalAddressForm: React.FC<Props> = ({ show, onHide, onSubmit }) => {
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    const fetchAddressData = async () => {
      const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
      const addressData = response.data;
      setCity(addressData.localidade);
      setState(addressData.uf);
      setDistrict(addressData.bairro);
    };

    if (zipcode) {
      fetchAddressData();
    }
  }, [zipcode]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post(`https://pure-retreat-95713.herokuapp.com/admin/v1/contacts/${10}/address`, {
      zipcode,
      city,
      state,
      district,
      street,
      number
    })
      .then(response => {
        clearInputs();
        onHide();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const clearInputs = () => {
    setZipcode('');
    setCity('');
    setState('');
    setDistrict('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Endereço</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o CEP"
              value={zipcode}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setZipcode(evt.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cidade</Form.Label>
            <Form.Control type="text" placeholder="Digite a cidade" value={city} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Control type="text" placeholder="Digite o estado" value={state} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bairro</Form.Label>
            <Form.Control type="text" placeholder="Digite o bairro" value={district} />
          </Form.Group>
          <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Modal.Footer>
        </Form>
      </Modal.Body>
      
    </Modal>
  );
};

export default ModalAddressForm;
