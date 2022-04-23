import {
  TOKEN_REGISTER_REQUEST,
  TOKEN_REGISTER_SUCCESS,
  TOKEN_REGISTER_FAIL,
  TOKEN_DETAILS_REQUEST,
  TOKEN_DETAILS_SUCCESS,
  TOKEN_DETAILS_FAIL,
  TOKEN_UPDATE_REQUEST,
  TOKEN_UPDATE_SUCCESS,
  TOKEN_UPDATE_FAIL,
  TOKEN_UPDATE_RESET,
  TOKEN_LIST_REQUEST,
  TOKEN_LIST_SUCCESS,
  TOKEN_LIST_FAIL,
  TOKEN_BOOKMARK_REQUEST,
  TOKEN_BOOKMARK_SUCCESS,
  TOKEN_BOOKMARK_FAIL,
  TOKEN_UPVOTE_REQUEST,
  TOKEN_UPVOTE_SUCCESS,
  TOKEN_UPVOTE_FAIL,
  TOKEN_REVIEW_REQUEST,
  TOKEN_REVIEW_SUCCESS,
  TOKEN_REVIEW_FAIL,
  TOKEN_REVIEW_RESET,
  UPVOTED_TOKEN_REQUEST,
  UPVOTED_TOKEN_SUCCESS,
  UPVOTED_TOKEN_FAIL,
  BOOKMARKED_TOKEN_REQUEST,
  BOOKMARKED_TOKEN_SUCCESS,
  BOOKMARKED_TOKEN_FAIL,
} from '../Constants/tokensConstants';

//TOKEN LIST
export const tokenListReducer = (state = { tokens: [] }, action) => {
  switch (action.type) {
    case TOKEN_LIST_REQUEST:
      return { loading: true, tokens: [] };
    case TOKEN_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        tokens: action.payload,
      };
    case TOKEN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// token Details request
export const tokenDetailsReducer = (
  state = { token: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case TOKEN_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TOKEN_DETAILS_SUCCESS:
      return { loading: false, token: action.payload };
    case TOKEN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// TOKEN REVIEW CREATE
export const reviewTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_REVIEW_REQUEST:
      return { loading: true };
    case TOKEN_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case TOKEN_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case TOKEN_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// TOKEN REGISTER
export const registerTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_REGISTER_REQUEST:
      return { loading: true };
    case TOKEN_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case TOKEN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// TOKEN UPDATE
export const updateTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_UPDATE_REQUEST:
      return { loading: true };
    case TOKEN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TOKEN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TOKEN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// TOKEN BOOKMARK
export const bookmarkTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_BOOKMARK_REQUEST:
      return { loading: true };
    case TOKEN_BOOKMARK_SUCCESS:
      return { loading: false, success: true };
    case TOKEN_BOOKMARK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// TOKEN UPVOTE
export const upvoteTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_UPVOTE_REQUEST:
      return { loading: true };
    case TOKEN_UPVOTE_SUCCESS:
      return { loading: false, success: true };
    case TOKEN_UPVOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//UPVOTED TOKEN
export const upvotedTokensReducer = (state = { tokens: [] }, action) => {
  switch (action.type) {
    case UPVOTED_TOKEN_REQUEST:
      return { loading: true, tokens: [] };
    case UPVOTED_TOKEN_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        tokens: action.payload.tokens,
      };
    case UPVOTED_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//BOOOKMARKED TOKEN
export const bookmarkedTokensReducer = (state = { tokens: [] }, action) => {
  switch (action.type) {
    case BOOKMARKED_TOKEN_REQUEST:
      return { loading: true, tokens: [] };
    case BOOKMARKED_TOKEN_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        tokens: action.payload.tokens,
      };
    case BOOKMARKED_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
