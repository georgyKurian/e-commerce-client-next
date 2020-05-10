import Product from './Product';

export default class Order {
  /**
   * @param  {string} id
   * @param  {string} customer
   * @param  {Array} products
   * @param  {Array} contact
   * @param  {Array} shippingAddress
   * @param  {number} createdAt
   */
  constructor({
    _id,
    customer,
    products,
    contact,
    shippingAddress,
    created_at: createdAt,
  }) {
    this.id = _id;
    this.customer = customer;
    this.createdAt = createdAt;
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
  getTimestamp = () => this.createdAt;

  getDate = () => {
    const date = new Date(parseInt(this.createdAt, 10));
    return date.toDateString();
  };

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
  getFormattedTotalPrice = () => `$${(this.getTotalPrice() / 100).toFixed(2)}`;

  /**
   * @return  {{_id: string, customer: string, timestamp: string, products: Array<Products>}}
   */
  getData = () => ({
    _id: this.id,
    customer: this.customer,
    created_at: this.createdAt,
    products: this.products.map((product) => product.getData()),
  });
}
