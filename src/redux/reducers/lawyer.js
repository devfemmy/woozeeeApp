import {
  SET_ONLINE_STATUS,
  GET_AVAILABLE_CLIENTS,
  SET_MATCHED_CLIENT,
} from "../actions/lawyer";

const initialState = {
  availableClients: [],
  matchedTo: undefined,
};

const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ONLINE_STATUS: {
      return updateObject(state, {
        online: action.payload.status,
      });
    }

    case GET_AVAILABLE_CLIENTS: {
      return updateObject(state, {
        availableClients: action.payload.clients,
      });
    }

    case SET_MATCHED_CLIENT: {
      return updateObject(state, {
        matchedTo: action.payload.client,
      });
    }
  }
  return state;
};
