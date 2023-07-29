'use strict';
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.close-shopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.list-card');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  { id: 1, name: 'Product Name 1', image: '1.PNG', price: 110000 },
  { id: 2, name: 'Product Name 2', image: '2.PNG', price: 120000 },
  { id: 3, name: 'Product Name 3', image: '3.PNG', price: 130000 },
  { id: 4, name: 'Product Name 4', image: '4.PNG', price: 140000 },
  { id: 5, name: 'Product Name 5', image: '5.PNG', price: 150000 },
  { id: 6, name: 'Product Name 6', image: '6.PNG', price: 160000 },
];

let prices = new Map();
products.forEach((product) => {
  prices.set(product.id, product.price);
});

let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
        <img src="./image/${value.image}">
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>
        `;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key], quantity: 1 };
  } else {
    listCards[key].quantity++;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + prices.get(value.id) * value.quantity;
    count = count + value.quantity;

    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
            <div><img src="./image/${value.image}"></div>
            <div>${value.name}</div>
            <div>${prices.get(value.id).toLocaleString()}</div>

            <div>
            <button onclick="quantityNegative(${key}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="quantityPositive(${key}, ${value.quantity + 1})">+</button>
            </div>
            `;

      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function quantityPositive(key, quantity) {
  listCards[key].quantity = quantity;
  listCards[key].price = prices.get(listCards[key].id) * quantity;
  reloadCard();
}

function quantityNegative(key, quantity) {
  if (quantity === 0) {
    deleteItem(key);
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = prices.get(listCards[key].id) * quantity;
  }
  reloadCard();
}

function deleteItem(key) {
  delete listCards[key];
  reloadCard();
}