//import { getProduct } from "../../data/products"
import { calculateCartQuantity,} from "../../data/cart.js"

export function renderCheckoutHeader() {
  
    const totalCartItem=calculateCartQuantity();

    return totalCartItem;
    

};