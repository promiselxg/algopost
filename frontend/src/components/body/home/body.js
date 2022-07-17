import React, { useEffect, useState } from "react";
import { Box, Button, Grid, GridItem, Image, Text} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react'
import blockchainImg from '../../../assets/desktopbodypic1.PNG'
import RendersearchandReapeter from "./searchandtokensrepeater/renderer";
import axios from "axios";
export default function Homebody(){
    const [tokens,setTokens] = useState([])
    useEffect(()=>{
        axios.get('/api/coins/status?active=true',{headers:{"Authorization": `Bearer ${process.env.REACT_APP_AUTH}`}})
        .then((re)=>{console.log(re);}).catch(e=>console.log(e));
        // axios({
        //     method:'get',
        //     url:'/api/coins/status?active=true',
        //     headers: {"Authorization": `Bearer ${process.env.REACT_APP_AUTH}`}
        // }).then((re)=>{console.log(re);}).catch(e=>console.log(e))
    },[])
    const [isLargerThan700] = useMediaQuery('(min-width: 700px)')
    return (<>
     <Box display='flex' flexDirection={'column'} alignItems={'center'} width='100vw' height={'max-content'} padding='5px' bg={'#111621'}>
        <Grid   width={'100%'} templateColumns={isLargerThan700 ?'repeat(2,1fr)' : 'repeat(1,1fr)' } templateRows={ isLargerThan700 ?'1fr 1fr':'2fr 1fr 1fr 2fr '}>
            <GridItem gridColumn={isLargerThan700 ?'2/2' : '1/1'} gridRow={isLargerThan700 ?'1/2' : '1/1'} placeSelf={'center'}>   
             <Image src={blockchainImg} height='164.43px' width={'164.43px'}/>
            </GridItem>
            <GridItem gridColumn={isLargerThan700 ?'1/2' : '1/1'} gridRow={isLargerThan700 ?'1/2' : '2/2'} placeSelf={'center'} >
             <Text fontFamily={'Poppins'} textAlign={isLargerThan700 ?"Left":"center"} ml={isLargerThan700?'33%':'0'} fontWeight={600} fontSize={isLargerThan700 ? '3rem': '1.9rem'} letterSpacing={isLargerThan700 ? '3':'1'} lineHeight={'36px'} color="#45AC75">Creating An Efficient Algorand Listing System</Text>
            </GridItem>
            <GridItem placeSelf={'center'} alignSelf='self-center'> 
             <Button  bg='#45AC75' borderRadius={'7px'} color='#ffffff' _hover={{color:'#000000'}}>Click here to Submit Token</Button>
            </GridItem>
            <GridItem placeSelf={'center'} alignSelf='self-start' padding='0px' margin='0px'>
             <Grid  color={'#ffffff'} templateRows='repeat(2,1fr)' templateColumns={'repeat(2,1fr)'} alignSelf='self-start'>
                 <GridItem alignSelf='self-start' marginRight='15px' width={'90px'}  height={'60px'} bg={'rgba(34, 43, 62, 0.41)'} borderRadius={'10px'} 
                 fontFamily={'roboto'} fontSize={'25px'} fontWeight={'500'} lineHeight={'42px'} textAlign={'center'} display='flex' alignItems={'center'} justifyContent={'center'}>150</GridItem>
                  <GridItem alignSelf='self-start' marginLeft='15px' width={'90px'} height={'60px'} bg={'rgba(34, 43, 62, 0.41)'} borderRadius={'10px'} 
                 fontFamily={'roboto'} fontSize={'25px'} fontWeight={'500'} lineHeight={'42px'} textAlign={'center'} display='flex' alignItems={'center'} justifyContent={'center'}>2</GridItem>
                 <GridItem marginRight='15px' width={'90px'} textAlign='center' fontFamily='Poppins' fontSize='18.36px' lineHeight='27.53px'>Active tokens</GridItem>
                 <GridItem marginLeft='15px' width={'90px'} textAlign='center' fontFamily='Poppins' fontSize='18.36px' lineHeight='27.53px'>Upcoming Tokens</GridItem>
             </Grid>
            </GridItem>
            </Grid>
            <RendersearchandReapeter />
        </Box>
    </>)
}