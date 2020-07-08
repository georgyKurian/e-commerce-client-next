export default class OrderItem {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {number} price
   * @param  {number} quantity
   * @param  {Array.<string>} images
   */
  constructor({
    _id,
    name,
    price,
    images,
    quantity,
  }) {
    this.id = _id;
    this.name = name;
    this.price = price;
    this.images = images;
    this.quantity = quantity;
  }

  /**
   * @return {string}
   */
  getId = () => this.id;

  /**
   * @return {string}
   */
  getName = () => this.name;

  /**
   * @return {string}
   */
  getFormattedPrice = () => `$${(this.price / 100).toFixed(2)}`;

  /**
   * @return {string}
   */
  getFormattedSubtotal = () => `$${(this.getSubtotal() / 100).toFixed(2)}`;

  /**
   * @return {number}
   */
  getPrice = () => this.price;

  /**
   * @return {number}
   */
  getQuantity = () => this.quantity;

  /**
   * @return {number}
   */
  getSubtotal = () => this.price * this.quantity;

  /**
   * @return {string[]}
   */
  getImages = () => this.images;

  /**
   * @return {string}
   */
  getAvgRating = () => this.avgRating;

  /**
   * @return  {{
   *  _id: string,
   *  name: string,
   *  price: number,
   *  quantity: number,
   *  images: Array<string>,
   * }}
   */
  getData = () => ({
    _id: this.id,
    name: this.name,
    price: this.price,
    quantity: this.quantity,
    images: this.images,
  });
}
