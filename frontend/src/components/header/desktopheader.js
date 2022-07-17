import React, { useContext, useEffect, useState } from 'react'
import { Menu, MenuButton, MenuList,Box, Heading,IconButton,Grid,GridItem,Link, MenuItem, Image, Button} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react'
import { HamburgerIcon,CloseIcon } from '@chakra-ui/icons'
import { Outlet, Link as Routerlink} from "react-router-dom";
import alogopotlogo from '../../assets/ALGOPOT.svg';
import { LoggedinContext } from '../../contexts/loginctx';
export function Desktopheader(){
    // const [signedin,setSignedin] = useState(false)
    const loggedin = useContext(LoggedinContext)
    // useEffect(()=>{
    //     if(sessionStorage.getItem('logintoken') || localStorage.getItem('logintoken')){
    //         setSignedin(true)
    //     }
    // },[])
    const logoutUSer =()=>{
        loggedin.logout()
    }
    return (
        <Box mr={10} ml={10} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' w='100vw'> 
             <Link as={Routerlink}  to='/'><Image src={alogopotlogo}/></Link>
                  <Box display='flex' flexDirection='row' gap={5} alignItems='center'> 
                         <Link fontSize='1.2rem' colSpan={2}  color={'#ffffff'} to='/listnewtoken' as={Routerlink} placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}}>List Your Token</Link>
                         <Link  fontSize='1.2rem' colSpan={2}  color={'#ffffff'}  placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}} as={Routerlink}  to='/watchlist'>Watchlist</Link>
                         {(loggedin.loggedin ) && <Link  fontSize='1.2rem' colSpan={2}  color={'#ffffff'}  placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}} as={Routerlink}  to='/profile'>Profile</Link>}
                         {(loggedin.loggedin ) && <Button onClick={logoutUSer}  fontSize='1.2rem' colSpan={2}  color={'#ffffff'}  placeContent='center' bg='#111621' _hover={{cursor:'pointer',bg:'#111621'}}  >Sign-Out</Button>}
                       {(!loggedin.loggedin ) && <Link fontSize='1.2rem' colSpan={1}  color={'#45AC75'}  placeContent='center'_hover={{cursor:'pointer',bg:'#111621'}} as={Routerlink}  to='/login'>login</Link>}
                        {(!loggedin.loggedin ) && <Link fontSize='1.2rem' colSpan={1}  color={'#45AC75'}  placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}}  as={Routerlink}  to='/signup'>Sign-Up</Link>}
                    <Outlet />
                    </Box>   
                </Box>  
    )
}