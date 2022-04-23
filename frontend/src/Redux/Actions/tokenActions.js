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
  UPVOTED_TOKEN_REQUEST,
  UPVOTED_TOKEN_SUCCESS,
  UPVOTED_TOKEN_FAIL,
  BOOKMARKED_TOKEN_REQUEST,
  BOOKMARKED_TOKEN_SUCCESS,
  BOOKMARKED_TOKEN_FAIL,
} from '../Constants/tokensConstants';
import { logout } from './userActions';
import axios from 'axios';

const API_URL = '/api/coins';
// REGISTER New Token
export const registerNewToken =
  (tokenRegDetails) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOKEN_REGISTER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/coins/new`, { tokenRegDetails }, config);
      dispatch({ type: TOKEN_REGISTER_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: TOKEN_REGISTER_FAIL,
        payload: message,
      });
    }
  };

// UPDATE Token details
export const updateTokenDetails =
  (updateTokenDetails) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOKEN_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `/api/coins/62404ccc45ec57142dfc33ab`,
        { updateTokenDetails },
        config
      );
      dispatch({ type: TOKEN_UPDATE_SUCCESS });
      dispatch({ type: TOKEN_UPDATE_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: TOKEN_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Token LIST
export const getTokenList = () => async (dispatch) => {
  try {
    dispatch({ type: TOKEN_LIST_REQUEST });

    // const config =
    // { headers: {
    //   Authorization: 'FM_52zZp064wp19WgSPm1gz42W3r5r39s53'
    // } }

    // const { data } = await axios.get(
    //   'https://dev-api.fairmeme.org/?get_asset=true',  {
    //   Authorization: 'FM_52zZp064wp19WgSPm1gz42W3r5r39s53'
    // }
    // );

    //    const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // };
    const { data } = await axios.get(`${API_URL}?page=1`);
    console.log(data);
    dispatch({ type: TOKEN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOKEN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get Individual Token details
export const getTokenDetails = (tokenId) => async (dispatch) => {
  try {
    dispatch({ type: TOKEN_DETAILS_REQUEST });

    const Config = {
      headers: {
        Authorization: 'FM_52zZp064wp19WgSPm1gz42W3r5r39s53',
      },
    };
    const { data } = await axios.get(
      `https://dev-api.fairmeme.org/?get_asset=${tokenId}`,
      Config
    );
    dispatch({ type: TOKEN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOKEN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create Token Review
export const createTokenReview =
  (tokenId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOKEN_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://localhost:5000/api/coins/6241c08e7b392414b1cbe5e5/review`,
        review,
        config
      );
      dispatch({ type: TOKEN_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: TOKEN_REVIEW_FAIL,
        payload: message,
      });
    }
  };

// BOOKMARK Token
export const putBookmarkToken =
  (tokenId, bookmark) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOKEN_BOOKMARK_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/coins?active=${bookmark}`,
        tokenId,
        config
      );

      dispatch({ type: TOKEN_BOOKMARK_SUCCESS, data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: TOKEN_BOOKMARK_FAIL,
        payload: message,
      });
    }
  };

// UPVOTE Token
export const putUpvoteToken = (tokenId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOKEN_UPVOTE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      `http://localhost:5000/api/coins/6241c0617b392414b1cbe5dd/vote`,
      tokenId,
      config
    );

    dispatch({ type: TOKEN_UPVOTE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: TOKEN_UPVOTE_FAIL,
      payload: message,
    });
  }
};

// GET BOOKMARK Token
export const getBookmarkedToken = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARKED_TOKEN_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/coins/6244981bd0e92678d30bd747?bookmarked=true`,
      config
    );

    dispatch({ type: BOOKMARKED_TOKEN_SUCCESS, data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: BOOKMARKED_TOKEN_FAIL,
      payload: message,
    });
  }
};

// GET UPVOTED Token
export const getUpvotedToken = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UPVOTED_TOKEN_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/coins/623c8079bc45ec4b6c03b682/vote`,
      config
    );

    dispatch({ type: UPVOTED_TOKEN_SUCCESS, data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: UPVOTED_TOKEN_FAIL,
      payload: message,
    });
  }
};
