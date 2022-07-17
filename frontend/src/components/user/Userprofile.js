import React, { useEffect,useState } from 'react'
import {Box, Heading,Grid,GridItem,Link, MenuItem, Image, Text} from '@chakra-ui/react';
import profiledemo from '../../assets/profiledemo.PNG'
import axios from 'axios';
import { Outlet, Link as Routerlink} from "react-router-dom";
function Userprofile() {
    const [username,setUsername] = useState('')
    const [userId,setUserId] = useState('')
    const token = localStorage.getItem('logintoken') ?localStorage.getItem('logintoken') : sessionStorage.getItem('logintoken')
    useEffect(()=>{
        axios({
            url:`/api/auth/profile`,
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
            }

        }).then((resp)=>{
            console.log(resp.data);
            setUsername(resp.data.username);
            setUserId(resp.data.id)
        })
        .catch((e)=>{
            console.log(e);
        })
    },[])
  return (
    <Box bg="#0D0E12" color='#fff' w={'100vw'} overflowY='hidden'>
        <Grid placeItems='center' overflowY='hidden' w={'100vw'} gap='5' templateColumns='repeat(2,1fr)'>
            <GridItem colSpan='2' >
                <Grid w='80%'  templateColumns='repeat(3,1fr)' templateRows='repeat(2,1fr)'>
                    <GridItem rowSpan='2' w='max-content' colSpan='1'><Image h='74px' w='74px' borderRadius='50%' src={profiledemo}/></GridItem>
                    <GridItem rowSpan='1' w='max-content' colSpan='2' alignSelf='self-end'>{username}</GridItem>
                    <GridItem rowSpan='1' w='max-content' colSpan='2' color='#848484'>UNIQUE ID: {userId}</GridItem>
                </Grid>
                
            </GridItem>
            <GridItem w='80%' colSpan='2'  >
                <Box  display='flex' gap={5} >
                        <Text fontSize='1.2rem'>Token Submitted:</Text>
                        <Box bg='#111621' display='grid' border='1px solid #45AC75' h='30px' w='30px' borderRadius='1px' placeContent='center'><Text fontSize='1.1rem' >3</Text> </Box>
                 </Box>
             </GridItem>
             <GridItem colSpan='2' placeItems='center' display='grid' h='53px' w='80%'  fontSize='1rem' fontWeight='500' lineHeight='27px' bg='#111621' borderRadius='4px'>View Submitted Token</GridItem>
             <GridItem colSpan='2' placeItems='center' display='grid' h='53px' w='80%'  fontSize='1rem' fontWeight='500' lineHeight='27px' bg='#111621' borderRadius='4px' _hover={{color:'#000',bg:'#fff',cursor:'pointer'}}><Link to='/listnewtoken' as={Routerlink} >Submit Token</Link></GridItem>
             <GridItem colSpan='2' placeItems='center' display='grid' h='53px' w='80%'  fontSize='1rem' fontWeight='500' lineHeight='27px' bg='#111621' borderRadius='4px'>My watchlist</GridItem>
             <GridItem colSpan='2' placeItems='center' display='grid' h='53px' w='80%'  fontSize='1rem' fontWeight='500' lineHeight='27px' bg='#111621' borderRadius='4px'>Account Subsciption</GridItem>
             <GridItem colSpan='2' placeItems='center' display='grid' h='53px' w='80%'  fontSize='1rem' fontWeight='500' lineHeight='27px' bg='#111621' borderRadius='4px'>KYC</GridItem>
             <GridItem colSpan='2' w='80%'>
                 <Grid templateColumns='repeat(2,1fr)' w='100%' gap={5}>
                 <GridItem  colSpan='1' mb='5'  placeItems='center' display='grid' h='53px'    fontSize='1rem' fontWeight='500' lineHeight='27px' bg='#111621' borderRadius='4px'>Change Username</GridItem>
                <GridItem colSpan='1' mb='5' placeItems='center' display='grid' h='53px'   fontSize='1rem' fontWeight='500' lineHeight='27px' bg='#111621' borderRadius='4px'>Change Password</GridItem>
                 </Grid>
             </GridItem>
            
        </Grid>
        {/* <Box w='100vw' h='100vh' bg='rgba(0,0,0,0.5)' display='flex' position='fixed' inset='0' flexDirection='column' justifyContent='center' alignItems='center'>
            <Box width='40em' height='40em' bg='#fff'></Box>

        </Box> */}

    </Box>
  )
}

export default Userprofile