import {
  SET_USER_COORDINATES,
  SET_USER_ADDRESS,
  FETCH_USER_LOCATION,
} from "../actions/address";

const initialState = {
  address: "",
  coordinates: undefined,
  currentAddress: "",
  currentCoordinates: undefined,
};

const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LOCATION: {
      return updateObject(state, {
        address: action.payload.address,
        currentAddress: action.payload.address,
        currentCoordinates: action.payload.currentCoordinates,
      });
    }

    case SET_USER_ADDRESS: {
      return updateObject(state, {
        address: action.payload.address,
      });
    }

    case SET_USER_COORDINATES: {
      return updateObject(state, {
        coordinates: action.payload.coordinates,
      });
    }
  }
  return state;
};
