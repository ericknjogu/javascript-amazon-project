import { calculateCartQuantity } from "../../data/cart.js";
export function updateCartQuantity() {

  const cartQuantity=calculateCartQuantity();

  document.querySelector('.js-cart-quantity-link')
    .innerHTML=`${cartQuantity} items`;
  }