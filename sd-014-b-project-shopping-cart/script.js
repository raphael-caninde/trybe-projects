const sectionCartItems = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

/* const dataProduct = () => {
  const selectCartItem = document.querySelector('#cart-item');
  localStorage.setItem('list', selectCartItem.innerHTML);
}; */

/* const dataProduct = (object) => {
  localStorage.setItem('cartData', JSON.stringify(object));
}; */

// Requisito 3 - removendo um item do carrinho
function cartItemClickListener({ target }) {
  const removeItems = document.querySelector(sectionCartItems);
  removeItems.removeChild(target);
  /* dataProduct(removeItems); */
  localStorage.setItem('dataProduct', removeItems.innerHTML);
}
// usei o metodo 'from' do objeto global do array para transforma os elementos filhos em um array, para poder usar o forEach.
const getItemsFromLocalStorage = () => {
  const cartItem = document.querySelector(sectionCartItems);
  cartItem.innerHTML = localStorage.getItem('dataProduct');
  Array.from(cartItem.children).forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 2 - adicionando itens no carrinho de compras
const addCart = async (id) => {
  const removeItems = document.querySelector(sectionCartItems);
  const getIdItem = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await getIdItem.json();
  const liItem = document.querySelector(sectionCartItems);
  liItem.appendChild(createCartItemElement(response));
  /* dataProduct(response); */
  localStorage.setItem('dataProduct', removeItems.innerHTML);
};

document.addEventListener('click', ({ target }) => {
  if (target.classList.contains('item__add')) {
    return addCart(getSkuFromProductItem(target.parentElement));
  }
  if (target.classList.contains('empty-cart')) { // Requisito 6 - Removendo itens do carrinho de compra
    document.querySelector('section .cart__items').innerHTML = '';
    localStorage.removeItem('dataProduct');
  }
});

// Requisito 7 - criando 'loading' na pagina
const pageLoading = () => {
  const sectionItens = document.querySelector('.items');
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'loading...';
  sectionItens.appendChild(p);
};

// Requisito 1 - fazer o fach da api, criando os itens
const getApi = async () => {
  pageLoading();
  const urlApi = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  document.querySelector('.loading').remove();
  const response = await urlApi.json();
  response.results.forEach((product) => {
    document.querySelector('.items')
    .appendChild(createProductItemElement(product));
  });
};

window.onload = () => {
  getApi();
  getItemsFromLocalStorage();
};
