import { GET_USER_DETAILS, LOGOUT } from "../actions/auth";

const initialState = {
  user: undefined,
};

const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS: {
      return updateObject(state, {
        user: action.payload.user,
      });
    }

    case LOGOUT: {
      return updateObject(state, {
        user: undefined,
      });
    }
  }
  return state;
};
