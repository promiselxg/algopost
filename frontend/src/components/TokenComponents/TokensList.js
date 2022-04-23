import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTokenList } from '../../Redux/Actions/tokenActions';
import { Loading, Message } from '../error';
import TokenCard from './TokenCard';
import Pagination from '../HomeComponents/pagination';
import group from '../assets/group.svg';
import { Input } from '@mui/material';

const Tokens = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const tokensList = useSelector((state) => state.tokenList);
  const isBookmark = useSelector((state) => state.bookmarkToken);
  const isUpvote = useSelector((state) => state.upvoteToken);
  const { loading: upvoting, error: notUpvote, success: upvoted } = isUpvote;
  const {
    loading: Bookmarking,
    error: notBookmark,
    success: Bookmarked,
  } = isBookmark;

  const { loading, pages, page, error: errorMsg, tokens } = tokensList;

  const { successMsg, setSuccessMsg } = useState('');

  useEffect(() => {
    dispatch(getTokenList());
    console.log(tokensList);
  }, [dispatch, keyword, pagenumber]);

  return (
    <div className="Token-cont">
      <div className="div-10">
        <Input className="span-9">Search Token...</Input>
        <img className="img-2" src={group} alt="img" />
      </div>
      <div className="div-11">
        <span className="span-10">
          Below are the list of Active tokens on Algopotio. Active tokens are
          either Fairlaunch presale. They are possible of doing 3x. If this is
          what you need check them below.
        </span>
      </div>
      {loading ? (
        <div className="center">
          <Loading />{' '}
        </div>
      ) : errorMsg ? (
        <Message variant="alert-danger">{errorMsg}</Message>
      ) : (
        <>
          {tokens?.data?.map((token) => (
            <div>
              {(upvoted || Bookmarked) && (
                <Message variant="success">{successMsg}</Message>
              )}
              <TokenCard
                key={token.Id}
                logo={token.token_logo}
                token_name={token.token_name}
                token_description={token.token_description}
                algo_price={token.algo_price}
                usd_price={token.usd_price}
                price_direction={token.price_direction}
                total_votes={token.vote}
              />
            </div>
          ))}
          <Pagination
            pages={pages}
            page={page || pagenumber}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </div>
  );
};

export default Tokens;
