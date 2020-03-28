import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLINE_SCREAM,
  LOADING_DATA
} from '../types';
import { unlikeScream } from '../actions/dataActions';

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
    case UNLINE_SCREAM:
      const index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.scream[index] = action.payload;
      return {
        ...state
      };

    default:
      return state;
  }
};
