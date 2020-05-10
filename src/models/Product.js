export default class Product {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {number} price
   * @param  {boolean} isFeatured
   * @param  {Array.<string>} images
   * @param  {Array.<string>} categories
   * @param  {string} avgRating
   * @param  {string} reviewCount
   */
  constructor({
    _id,
    name,
    price,
    isFeatured,
    images,
    categories,
    avgRating,
    reviewCount,
  }) {
    this.id = _id;
    this.name = name;
    this.price = price;
    this.isFeatured = isFeatured;
    this.images = images;
    this.categories = categories;
    this.avgRating = avgRating;
    this.reviewCount = reviewCount;
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
  getFormattedSubtotal = (quantity) => `$${(this.getSubtotal(quantity) / 100).toFixed(2)}`;

  /**
   * @return {number}
   */
  getPrice = () => this.price;

  /**
   * @return {number}
   */
  getSubtotal = (quantity) => this.price * quantity;


  /**
   * @return {boolean}
   */
  getIsFeatured = () => this.isFeatured;

  /**
   * @return {string[]}
   */
  getImages = () => this.images;

  /**
   * @return {string[]}
   */
  getCategories = () => this.categories;

  /**
   * @return {string}
   */
  getAvgRating = () => this.avgRating;

  /**
   * @return {string}
   */
  getReviewCount = () => this.reviewCount;

  /**
   * @return  {{
   *  _id: string,
   *  name: string,
   *  price: number,
   *  images: Array<string>,
   *  categories: Array<string>,
   *  avgRating: string,
   *  reviewCount: string
   * }}
   */
  getData = () => ({
    _id: this.id,
    name: this.name,
    price: this.price,
    isFeatured: this.isFeatured,
    formattedPrice: this.getFormattedPrice(),
    images: this.images,
    categories: this.categories,
    avgRating: this.avgRating,
    reviewCount: this.reviewCount,
  });
}
