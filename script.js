function ready() {
  var removeBtn = document.getElementsByClassName("btn-remove");
  console.log(removeBtn);
  for (i = 0; i < removeBtn.length; i++) {
    let button = removeBtn[i];
    console.log(button.innerText);
    button.addEventListener("click", removeCartItem);
  }

  var quantityInput = document.getElementsByClassName("cart-quantity-input");
  for (i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", quantityChange);
  }

  let addToCartBtn = document.getElementsByClassName("shop-cart-btn");
  for (i = 0; i < addToCartBtn.length; i++) {
    let button = addToCartBtn[i];
    button.addEventListener("click", addToCart);
  }

  document
    .getElementsByClassName("pay-btn")[0]
    .addEventListener("click", payment);
}

function payment() {
  alert("Thank you for purchasing");
  let cartItems = document.getElementsByClassName("cart-column")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
    updateTotal();
  }
}

function removeCartItem(event) {
  let clickedBtn = event.target;
  clickedBtn.parentElement.parentElement.remove();
  console.log("removed");
  updateTotal();
}

function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function addToCart(event) {
  let button = event.target;
  let cartItem = button.parentElement;
  let title = cartItem.getElementsByClassName("product-title")[0].innerText;
  let price = cartItem.getElementsByClassName("product-price")[0].innerText;
  let imageSrc = cartItem.getElementsByClassName("product-img")[0].src;
  addItemsToCart(title, price, imageSrc);

  updateTotal();
}

function addItemsToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItemName = document.getElementsByClassName("cart-product-name");
  for (let i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert("Item already add to cart!");
      return;
    }
  }
  let cartItems = document.getElementsByClassName("cart-column")[0];
  let cartContent = `
  
  <div class="cart-img-col">
    <div><img class="cart-img" src="${imageSrc}" alt=""></div>
    </div>
<div class="cart-name-price-col">
  <p class="cart-product-name">${title}</p> <span class="cart-price">${price}</span> <div class="cart-quantity"><span>Qrt: </span> <input class="cart-quantity-input" type="number" value="1"></div>
</div>
<div class="cart-control-col">
            <button><button class="btn btn-remove">Remove <i class="fa-solid fa-trash-can"></i></button></button>
          </div>
        </div>
        
  `;
  cartRow.innerHTML = cartContent;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChange);
}

const updateTotal = () => {
  let cartContainer = document.getElementsByClassName("cart-container")[0];
  let cartRows = cartContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("E", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total")[0].innerText = "E" + total;
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
