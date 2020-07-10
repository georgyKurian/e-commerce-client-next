export default class Review {
  /**
   * @param  {string} _id
   * @param  {string} name
   * @param  {string} comment
   * @param  {object} user
   * @param  {number} rating
   * @param  {string} updatedAt
   */
  constructor({
    _id, title, comment, user, rating, updatedAt,
  }) {
    this.id = _id;
    this.title = title;
    this.comment = comment;
    this.username = user?.username;
    this.rating = rating;
    this.updatedAt = updatedAt;
  }

  /**
   * @return {string}
   */
  getId = () => this.id;

  /**
   * @return {string}
   */
  getTitle = () => this.title;

  /**
   * @return {string}
   */
  getComment = () => this.comment;

  /**
   * @return {string}
   */
  getcustomerName = () => this.username;

  /**
   * @return {number}
   */
  getRating = () => this.rating;

  /**
   * @return {string}
   */
  getUpdatedAt = () => this.updatedAt;

  /**
   * @return  {{_id: string, name: string, prie: number, images: Array<string>}}
   */
  getData = () => ({
    _id: this.id,
    name: this.title,
    price: this.comment,
    isFeatured: this.customerName,
    formattedPrice: this.rating,
    updatedAt: this.updatedAt,
  });
}
