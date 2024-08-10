export let orders=JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function deleteOrder(orderId) {
  const newOrders=[];

  orders.forEach((orderItem)=>{
    if (orderItem.orderId !== orderId) {
      newOrders.push(orderItem)
    }
  });

  orders=newOrders;

  saveToStorage();
}

