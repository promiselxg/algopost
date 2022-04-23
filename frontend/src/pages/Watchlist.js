import { AppBar, WatchListCard } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBookmarkedToken } from '../Redux/Actions/tokenActions';
import { dividerClasses } from '@mui/material';
import { Loading, Message } from '../components/error';

const Watchlist = () => {
    const dispatch = useDispatch();

    const Bookmarks = useSelector((state) => state.Bookmarked);
   
    const { loading, error, Bookmark} = Bookmarks;


    useEffect(() => {
    dispatch(getBookmarkedToken());
    console.log(Bookmark);
    },[dispatch]);

    return ( 
       <>
        <AppBar />
        { loading && <div className='center'><Loading /></div>}
        {error && <Message variant='alert-denger'>{error}</Message>}
        { Bookmark && Bookmark.map((Bookmark) => ( 
        <WatchListCard
        token_name = {Bookmark.token_name}
        token_symbol = {Bookmark.token_symbol}
        token_logo = {Bookmark.token_logo}
         />
        ))}
       </>
     );
}
 
export default Watchlist;