import Product from './Product';

export default class Cart {
  /**
   * @param  {Array} cartItems
   */
  constructor(cartItems) {
    this.items = cartItems;
    const totalObject = cartItems.reduce((total, item) => {
      if (item.productId) {
        const product = new Product(item.productId);
        const amount = total.amount + (item.quantity * product.getPrice());
        const quantity = total.quantity + item.quantity;
        return { amount, quantity };
      }
      return total;
    }, {
      amount: 0,
      quantity: 0,
    });
    this.totalAmount = totalObject.amount;
    this.totalQuantity = totalObject.quantity;
  }

  getItems = () => this.items;

  /**
   * @return {string}
   */
  getTotalQuantity = () => this.totalQuantity;

  /**
   * @return {number}
   */
  getTotalAmount = () => this.totalAmount;

  /**
   * @return {string}
   */
  getFormattedTotalAmount = () => `$${(this.getTotalAmount() / 100).toFixed(2)}`;
}
