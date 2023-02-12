import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { saveAddress } from '../../services/address';

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ModalAddressForm: React.FC<Props> = ({ show, onHide, onSubmit }) => {
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    const fetchAddressData = async () => {
      const addressData = await saveAddress(zipcode);
      setCity(addressData.localidade);
      setState(addressData.uf);
    };

    if (zipcode) {
      fetchAddressData();
    }
  }, [zipcode]);

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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddressForm;
