const fetchItem = async (itemID) => {
  const urlSelected = `https://api.mercadolibre.com/items/${itemID}`;

  try {
    const items = await fetch(urlSelected);
    const response = await items.json();
    // console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
