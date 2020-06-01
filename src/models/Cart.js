import Product from './Product';

export default class Cart {
  /**
   * @param  {Array} cartItems
   */
  constructor(cartItems,productsById) {
    this.items = cartItems;
    const totalAmount = 0;
    const totalQuantity = 0;
    cartItems.forEach((item) => {
      if (item.productId && productsById[item.productId]) {
        const product = new Product(productsById[item.productId]);
        item.total = item.quantity * product.getPrice();
        this.totalAmount = this.totalAmount + item.total ;
      }
      this.totalQuantity = this.totalQuantity + item.quantity;
    });
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
