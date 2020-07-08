import dayjs from 'dayjs';
import OrderItem from './OrderItem';

export default class Order {
  /**
   * @param  {string} id
   * @param  {string} customer
   * @param  {string} status
   * @param  {number} totalAmount
   * @param  {Array} products
   * @param  {Array} contact
   * @param  {Array} billingAddress
   * @param  {number} createdAt
   */
  constructor({
    _id,
    customer,
    status,
    totalAmount,
    products,
    contact,
    billingAddress,
    created_at: createdAt,
  }) {
    this.id = _id;
    this.customer = customer;
    this.status = status;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
    this.products = products.map((product) => {
      const productObject = new OrderItem(product);
      return productObject;
    });
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
      case 'completed':
        return 'green-400';
      case 'pending':
        return 'blue-400';
      case 'cancelled':
        return 'red-400';
      default:
        return 'gray-400';
    }
  };

  /**
   * @return {number}
   */
  getTimestamp = () => this.createdAt;

  getDate = (format = 'MMMM D, YYYY') => {
    const date = dayjs(parseInt(this.createdAt, 10));
    return date.format(format);
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
  getTotalPrice = () => this.totalAmount;

  /**
   * @return {string}
   */
  getFormattedTotalPrice = () => `$${(this.totalAmount / 100).toFixed(2)}`;

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
