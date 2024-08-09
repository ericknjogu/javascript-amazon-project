import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {  loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import { updateCartQuantity } from "./checkout/updateCartQuantity.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js'

async function loadPage(){

  try {
    await loadProductsFetch();

    await new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      });
    });
  } catch (error) {
    console.log('unexpected error. Please try again later.');
  }
  
  updateCartQuantity(); 
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
  
}

loadPage();

/*
Promise.all([
 loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{
  console.log(values);
  updateCartQuantity();
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{ 
  loadProducts(()=>{ 
    resolve('value 1');
  });

}).then((value)=>{
console.log(value);

  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{


  updateCartQuantity();
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});
*/


/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();

    renderPaymentSummary();

    renderCheckoutHeader();
  })
  
});
*/


