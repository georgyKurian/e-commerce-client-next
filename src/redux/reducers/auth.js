const token = (state = null, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return Object.assign({}, state, { user: action.userData });
    default:
      return state;
  }
};

export default token;

const user = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
};

export default user;
