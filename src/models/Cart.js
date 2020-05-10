import Product from './Product';

export default class Cart {
  /**
   * @param  {Array} cartItems
   */
  constructor({
    cartItems,
  }) {
    this.cartItems = cartItems;
    const totalObject = cartItems.reduce((total, item) => {
      let product = null;
      if (item.product) {
        product = new Product(item.product);
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

  getCartItems = () => this.cartItems;

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
