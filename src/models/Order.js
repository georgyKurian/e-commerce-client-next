import Product from './Product';

export default class Order {
  /**
   * @param  {string} id
   * @param  {string} customer
   * @param  {Array} products
   * @param  {Array} contact
   * @param  {Array} billingAddress
   * @param  {number} createdAt
   */
  constructor({
    _id,
    customer,
    status,
    products,
    contact,
    billingAddress,
    created_at: createdAt,
  }) {
    this.id = _id;
    this.customer = customer;
    this.status = status;
    this.createdAt = createdAt;
    this.products = products.map((product) => new Product(product));
    this.contact = contact;
    this.billingAddress = billingAddress;
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
   * @return {string}
   */
  getStatus = () => this.status;

  /**
   * @return {string}
   */
  getStatusColor = () => {
    switch (this.status) {
      case 'confirmed':
        return 'green-300';
      case 'pending':
        return 'blue-300';
      default:
        return 'gray-300';
    }
  };

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
  getBillingAddress = () => this.billingAddress;

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
