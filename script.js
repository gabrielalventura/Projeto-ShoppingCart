// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const theItensSection = document.querySelector('.items');
const theCart = document.querySelector('.cart__items');
const totalCart = document.querySelector('.cart');
const priceInCart = document.createElement('h5');
totalCart.appendChild(priceInCart);
priceInCart.className = 'total-price';

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const capturePrice = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  let cartPrice = 0;
  cartItems.forEach((item) => {
    const price = Number(item.innerText.split('$')[1]);
    cartPrice += price;
  });
  return cartPrice;
}; // função desenvolvida com as dicas do Tiago Quadros na mentoria

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const productList = async () => {
  const obj = await fetchProducts('computador');
  const products = obj.results;
  products.forEach((product) => {
    const section = createProductItemElement(product);
    theItensSection.appendChild(section);
    priceInCart.innerHTML = capturePrice();
  });
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (product) => {
    product.target.remove();
    priceInCart.innerHTML = capturePrice();
  });
  // const savedCart = theCart.innerHTML;
  // saveCartItems(savedCart);--> não funcionaria completamente aqui pois não salva todas as informações. Suspeito que seja porque elas precisam ser capturadas no storage assim que criadas, ou seja, logo após receberem o appendChild na criação dinamica das informações ao capturar os botões clicados. Ou seja nesse ponto a li foi criada e recebeu o clique, mas suas informações não foram completamente carregadas. 
  priceInCart.innerHTML = capturePrice();
  return li;
};

const showItem = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const itemId = event.target.parentNode.firstChild;
      const param = itemId.innerText;
      const data = await fetchItem(param);
      theCart.appendChild(createCartItemElement(data));
      priceInCart.innerHTML = capturePrice();
      const savedCart = theCart.innerHTML;
      saveCartItems(savedCart);
    });
  });
}; // desenvolvida com auxilio da mentoria do Tiago Quadros;

const clearCart = () => {
  const clearBtn = document.querySelector('.empty-cart');

  clearBtn.addEventListener('click', () => {
    theCart.innerHTML = '';
    localStorage.clear();
    priceInCart.innerHTML = capturePrice();
  });
};

const showLoading = () => {
  const message = document.createElement('h4');
  theItensSection.appendChild(message);
  message.className = 'loading';
  message.innerText = 'carregando...';
};

const removeLoading = () => {
  const message = document.querySelector('.loading');
  message.remove();
};

window.onload = async () => {
  showLoading();
  await productList();
  removeLoading();
  showItem();

  theCart.innerHTML = getSavedCartItems('cartItems');

  priceInCart.innerHTML = capturePrice();

  const itemsToRemove = document.querySelectorAll('.cart__items');
  itemsToRemove.forEach((item) => {
    item.addEventListener('click', (itemToRemove) => {
      itemToRemove.target.remove();
    });
  });

  clearCart();
};
