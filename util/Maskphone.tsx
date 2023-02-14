import React from 'react';
import { MaskedInput } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const phoneMask = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: false,
  allowDecimal: false,
  integerLimit: 11
});

function PhoneInput({ value, onChange }) {
  return (
    <MaskedInput
      mask={phoneMask}
      placeholderChar={'\u2000'}
      guide={false}
      value={value}
      onChange={onChange}
    />
  );
}

function FormExample({ phone, handlePhoneChange, index }) {
  return (
    <Form.Group>
      <Form.Label>Número de telefone</Form.Label>
      <PhoneInput
        value={phone.phone_number}
        onChange={(evt) => handlePhoneChange(index, "phone_number", evt.target.value)}
      />
    </Form.Group>
  );
}
export default PhoneInput;