export default class Product {
  /**
   * @param  {string} id
   * @param  {string} adidasId
   * @param  {string} name
   * @param  {string} modelNumber
   * @param  {object} productDescription
   * @param  {number} price
   * @param  {string} category
   * @param  {string} color
   * @param  {string} gender
   * @param  {Array.<string>} sport
   * @param  {Array.<string>} productType
   * @param  {Array.<string>} images
   * @param  {string} avgRating
   * @param  {string} reviewCount
   */
  constructor({
    _id,
    adidasId,
    name,
    modelNumber,
    productDescription,
    price,
    category,
    color,
    gender,
    sport,
    productType,
    images,
    avgRating,
    reviewCount,

  }) {
    this.id = _id;
    this.adidasId = adidasId;
    this.name = name;
    this.modelNumber = modelNumber;
    this.productDescription = productDescription;
    this.price = price;
    this.category = category;
    this.color = color;
    this.gender = gender;
    this.sport = sport;
    this.productType = productType;
    this.images = images;
    this.avgRating = avgRating;
    this.reviewCount = reviewCount;
  }

  static async fetch(productId) {
    return new this({});
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
    adidasId: this.adidasId,
    name: this.name,
    modelNumber: this.modelNumber,
    productDescription: this.productDescription,
    price: this.price,
    category: this.category,
    color: this.color,
    gender: this.gender,
    sport: this.sport,
    productType: this.productType,
    images: this.images,
    avgRating: this.avgRating,
    reviewCount: this.reviewCount,
  });
}
