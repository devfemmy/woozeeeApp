import { GET_LAWYER_DETAILS, GET_AVAILABLE_LAWYERS } from "../actions/user";

const initialState = {
  matchedTo: undefined,
  availableLawyers: [],
};

const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LAWYER_DETAILS: {
      return updateObject(state, {
        matchedTo: action.payload.lawyer,
      });
    }

    case GET_AVAILABLE_LAWYERS: {
      return updateObject(state, {
        availableLawyers: action.payload.lawyers,
      });
    }
  }
  return state;
};
