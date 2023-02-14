import axios from 'axios';
const Address = async (zipcode: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default Address;