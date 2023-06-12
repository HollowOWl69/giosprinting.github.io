let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    id: 1,
    name: 'PRINTING',
    image: 'STICKER.jpg',
    price: 3.00,
  },
  {
    id: 2,
    name: 'PHOTOCOPY',
    image: 'sample10.jpg',
    price: 2.00 ,
  },
  {
    id: 3,
    name: 'TARPAULIN',
    image: 'sample16.jpg',
    price: 15.00,
  },
  {
    id: 4,
    name: 'ID PICTURE 6pcs',
    image: 'sample3.jpg',
    price: 40.00, 
  },
  {
    id: 5,
    name: 'STICKER',
    image: 'sample17.jpg',
    price:  40.00, 
  },
  {
    id: 6,
    name: 'LAMINATION',
    image: 'LAMINATE.jpg',
    price: 40.00,
  },
];

let listCards = []; // Array to store selected items
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');

    let imageSize = ''; // Define the size for each image

    // Set different sizes based on the product ID
    switch (value.id) {
      case 1:
        imageSize = 'width: 200px; height: 200px;';
        break;
      case 2:
        imageSize = 'width: 200px; height: 200px;';
        break;
      case 3:
        imageSize = 'width: 200px; height: 200px;';
        break;
      case 4:
        imageSize = 'width: 200px; height: 200px;';
        break;
      case 5:
        imageSize = 'width: 200px; height: 200px;';
        break;
      case 6:
        imageSize = 'width: 200px; height: 200px;';
        break;
      default:
        imageSize = 'width: 200px; height: 200px;'; // Default size
    }

    newDiv.innerHTML = `
          <img src="image/${value.image}" style="${imageSize}">
          <div class="title">${value.name}</div>
          <div class="price">${value.price.toLocaleString()}</div>
          <div>
            <input type="file" onchange="handleFileUpload(event, ${key})" style="margin-bottom: 10px;">
            <br>
            <button onclick="addToCart(${key})">Add To Cart</button>
          </div>`;
    list.appendChild(newDiv);
  });
}

initApp();

function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity++;
  }
  reloadCard();
}
function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity++;
  }
  reloadCard(key);
}
function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice += value.price * value.quantity;
    count += value.quantity;
    if (value != null) {
      let priceText = `(₱${value.price.toLocaleString('en-PH')})`;
      if (value.id === 3) {
        priceText = `₱${value.price.toLocaleString('en-PH')} / per feet`;
      }
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
          <div>
            <img src="image/${value.image}" style="width: 100px; height: 100px;">
          </div>
          <div>${value.name}</div>
          <div>${priceText}</div>
          <div>
            <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
          </div>`;
      listCard.appendChild(newDiv);
    }
  });

  // Calculate the total price including delivery charge
  const deliveryCharge = 50; // Fixed delivery charge
  totalPrice += deliveryCharge;

  const totalText = `CheckOut (Plus delivery fee:₱${deliveryCharge.toLocaleString('en-PH')})`;
  total.innerHTML = `<div>${totalText} - ₱${totalPrice.toLocaleString('en-PH')}</div>`;
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
      delete listCards[key];
    } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
  }

total.addEventListener('click', () => {
    const confirmationPopup = document.createElement('div');
    confirmationPopup.classList.add('confirmation-popup');
    const confirmationText = document.createElement('div');
    confirmationText.innerText = 'Are you sure you want to place your order?';
    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'Confirm';
    confirmButton.classList.add('confirm-button');
    confirmButton.addEventListener('click', () => {
      // Place order logic goes here
      const alertPopup = document.createElement('div');
      alertPopup.classList.add('alert-popup');
      const alertText = document.createElement('div');
      alertText.innerText = 'order has been placed! Thank you.';
      const okButton = document.createElement('button');
      okButton.innerText = 'OK';
      okButton.classList.add('ok-button');
      okButton.addEventListener('click', () => {
        body.removeChild(alertPopup);
      });
      alertPopup.appendChild(alertText);
      alertPopup.appendChild(okButton);
      body.appendChild(alertPopup);
      // Reset the cart
      listCards = [];
      reloadCard();
      body.removeChild(confirmationPopup);
    });
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.classList.add('cancel-button');
    cancelButton.addEventListener('click', () => {
      body.removeChild(confirmationPopup);
    });
  
    confirmationPopup.appendChild(confirmationText);
    confirmationPopup.appendChild(confirmButton);
    confirmationPopup.appendChild(cancelButton);
    body.appendChild(confirmationPopup);
  });
  
function handleFileUpload(event, index) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      listCards[index].image = e.target.result;
      reloadCard();
    };
    reader.readAsDataURL(file);
  }
}
