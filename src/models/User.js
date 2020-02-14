/**
 *
 *
 * @export
 * @class User
 */
export default class User {
  /**
   * @param  {string} id
   * @param  {string} username
   * @param  {string} email
   * @param  {string} role
   */
  constructor({
    _id, username, email, role,
  }) {
    this.id = _id;
    this.username = username;
    this.email = email;
    this.role = role;
  }

  /**
   * @return {string}
   */
  getId = () => this.id;

  /**
   * @return {string}
   */
  getUsername = () => this.username;

  /**
   * @return {string}
   */
  getEmail = () => this.email;

  /**
   * @return {string}
   */
  getRole = () => this.role;

  /**
   * @return {string}
   */
  getData = () => ({
    _id: this.id,
    username: this.username,
    email: this.email,
    role: this.role,
  });
}
