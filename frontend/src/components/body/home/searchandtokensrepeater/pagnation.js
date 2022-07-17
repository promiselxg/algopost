import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Pagnation({startPostIndex,numberofPostPerpages,currentPage,pagnate}) {
    let stpi = startPostIndex
    
    const [pages,setPages ]= useState([]);
    useEffect(()=>{
    for (let i = 0; i < numberofPostPerpages.length; i++) {
        setPages(v=>[...v,stpi])
        stpi++
        console.log(stpi);
    }
},[numberofPostPerpages])
  return (
    <Box display='flex' w='100vw' >
        {pages.map(v=>
        <Button onClick={()=>pagnate(v)} h='100px' w='100px' border={currentPage === v?"#45AC75":'#fff'} color={currentPage === v?"#fff":'#45AC75'} bg={currentPage === v?"#45AC75":'transparent'} display='flex' justifyContent='center' alignItems='center'>{v}</Button>)}
    </Box>
  )
}

export default Pagnation