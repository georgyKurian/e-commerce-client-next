import Product from './Product';

export default class Cart {
  /**
   * @param  {Array} cartItems
   */
  constructor(cartItems, productsById, productIdList) {
    this.totalAmount = 0;
    this.totalQuantity = 0;
    this.items = cartItems.map((item) => {
      const newItem = { ...item };
      if (newItem?.productId
        && productIdList.includes(newItem.productId)
        && productsById[newItem.productId]
      ) {
        const product = new Product(productsById[newItem.productId]);
        newItem.total = newItem.quantity * product.getPrice();
        this.totalAmount += newItem.total;
      }
      this.totalQuantity += newItem.quantity;
      return newItem;
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
