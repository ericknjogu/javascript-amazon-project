import { cart } from "../data/cart.js";
import {products} from "../data/products.js";

let ProductsHTML='';

products.forEach((product) => {
  ProductsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div> 
  `;

  
});

document.querySelector('.js-products-grid').innerHTML=ProductsHTML;

let addedMessageTimeoutId;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId=button.dataset.productId;

      let matchingItem;

      cart.forEach((item)=>{
        if (productId===item.productId) {
          matchingItem=item;
        } 
      });

      if (matchingItem) {
        matchingItem.quantity+=1;
      }else{
        cart.push({
          productId: productId,
          quantity: 1
        });
        
      }

      

      let cartQuantity=0;

      cart.forEach((item)=>{
        cartQuantity+=item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML=cartQuantity;

      
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  
      addedMessage.classList.add('added-to-cart-visible');

      if(addedMessageTimeoutId){
        clearTimeout(addedMessageTimeoutId)
      }
      

      const timeoutId=setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
   
      }, 2000);
    
      addedMessageTimeoutId=timeoutId;
      
    });
  });






  