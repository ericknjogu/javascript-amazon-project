import {orders,deleteOrder} from '../../data/orders.js'
import { formatCurrency } from './utils/money.js';
import { getProduct,loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateCartQuantity } from '../data/cart.js';


async function renderOrdersHTML() {

  await loadProductsFetch();

  let ordersHTML='';

  orders.forEach((order) => {
    const orderTimeString=dayjs(order.orderTime).format('MMMM D');

    ordersHTML+=`
      <div class="amazon-header">
      <div class="amazon-header-left-section">
        <a href="index.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar" type="text" placeholder="Search">

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity">${calculateCartQuantity()}</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
      </div>

      <div class="order-container js-order-details-grid"
      data-order-id="${order.id}>

      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTimeString}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      <div class="order-details-grid ">
        ${productsListHTML(order)}
        <div>

        <span class="delete-quantity-link link-primary js-delete-link"
        data-order-id="${order.id}">
          Delete
        </span>
      </div>
      </div>
    </div>
    
    `; 
  });

  function productsListHTML(order) {

    let productsListHTML='';


    order.products.forEach((productDetails)=>{
      const product = getProduct(productDetails.productId);

      productsListHTML+=`
        <div class="product-image-container">
        <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
      

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
            
          </a>
        </div>
      
      `

    });

    return productsListHTML;
    
  }

  document.querySelector('.js-orders-grid').innerHTML=ordersHTML;


  document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{

        const orderId=link.dataset.orderId;

        deleteOrder(orderId);

        const container=document.querySelector(`.js-order-details-grid-${orderId}`); 

        container.remove();

        renderOrdersHTML();
      });
  });

}

renderOrdersHTML();

