import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { 
    tokenListReducer,
    tokenDetailsReducer,
    reviewTokenReducer,
    registerTokenReducer,
    updateTokenReducer,
    bookmarkTokenReducer,
    bookmarkedTokensReducer,
    upvotedTokensReducer,
    upvoteTokenReducer
} from "./Reducer/tokenReducer";

import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer } from "./Reducer/userReducers";

const reducer = combineReducers({
    tokenList: tokenListReducer,
    tokenDetails: tokenDetailsReducer,
    reviewToken: reviewTokenReducer,
    registerToken: registerTokenReducer,
    updateToken: updateTokenReducer,
    bookmarkToken: bookmarkTokenReducer,
    bookmarkedToken: bookmarkedTokensReducer,
    upvoteToken: upvoteTokenReducer,
    upvotedToken: upvotedTokensReducer,
    userDetails: userDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    updateUserProfile: userUpdateProfileReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;