const fetchProducts = async (product) => {
  const link = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  try {
    const products = await fetch(link);
    const response = await products.json();
    // console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
