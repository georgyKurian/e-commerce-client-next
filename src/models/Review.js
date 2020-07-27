import dayjs from 'dayjs';

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
    _id, title, comment, user, rating, created_at,
  }) {
    this.id = _id;
    this.title = title;
    this.comment = comment;
    this.username = user?.username;
    this.rating = rating;
    this.updatedAt = created_at;
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
   * @return {string}
   */
  getFormattedUpdatedAt = (format = 'MMMM D, YYYY') => {
    const date = dayjs(parseInt(this.updatedAt, 10));
    return date.format(format);
  };

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
