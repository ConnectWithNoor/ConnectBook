import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const index1 = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index1] = action.payload;
      return {
        ...state
      };
    case DELETE_SCREAM:
      const index2 = state.scream.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(index2, 1);
      return {
        ...state
      };

    default:
      return state;
  }
};
