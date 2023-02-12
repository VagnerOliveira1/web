const saveAddress = async (zipcode: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default saveAddress;