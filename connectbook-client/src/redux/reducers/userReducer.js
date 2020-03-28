import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  userData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        loading: false
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_SCREAM:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: [
            ...state.userData.likes,
            {
              userHandle: action.payload.userHandle,
              screamId: action.payload.screamId
            }
          ]
        }
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: state.userData.likes.filter(
            like => like.screamId !== action.payload.screamId
          )
        }
      };
    default:
      return state;
  }
};
