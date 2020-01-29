import eCommerceApp from "../redux/reducers/index";
import { createStore } from "redux";

export default initStore = initialState => {
  return createStore(eCommerceApp, initialState);
};
