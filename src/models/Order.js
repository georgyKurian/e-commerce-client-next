import Product from './Product';

export default class Order {
  /**
   * @param  {string} id
   * @param  {string} customer
   * @param  {number} timestamp
   * @param  {Array} products
   * @param  {Array} contact
   * @param  {Array} shippingAddress
   */
  constructor({
    _id,
    customer,
    timestamp,
    products,
    contact,
    shippingAddress,
  }) {
    this.id = _id;
    this.customer = customer;
    this.timestamp = timestamp;
    this.products = products.map((product) => new Product(product));
    this.contact = contact;
    this.shippingAddress = shippingAddress;
  }

  /**
   * @return {string}
   */
  getId = () => this.id;

  /**
   * @return {string}
   */
  getCustomer = () => this.customer;

  /**
   * @return {number}
   */
  getTimestamp = () => this.timestamp;

  /**
   * @return {Array.<Products>}
   */
  getProducts = () => this.products;

  /**
   * @return {string}
   */
  getContact = () => this.contact;

  /**
   * @return {string}
   */
  getShippingAddress = () => this.shippingAddress;

  /**
   * @return {number}
   */
  getTotalPrice = () => this.products.reduce((sum, product) => sum + product.getPrice(), 0);

  /**
   * @return {string}
   */
  getFormattedTotalPrice = () => `$${this.getTotalPrice() / 100}`;

  /**
   * @return  {{_id: string, customer: string, timestamp: string, products: Array<Products>}}
   */
  getData = () => ({
    _id: this.id,
    customer: this.customer,
    timestamp: this.timestamp,
    products: this.products.map((product) => product.getData()),
  });
}
