import React,{useContext,useState,useEffect} from 'react'
import { Menu, MenuButton, MenuList,Box, Text,IconButton,Grid,GridItem,Link, MenuItem, Image} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react'
import { HamburgerIcon,CloseIcon } from '@chakra-ui/icons'
import { Outlet, Link as Routerlink} from "react-router-dom";
import alogopotlogo from '../../assets/ALGOPOT.svg'
import { LoggedinContext } from '../../contexts/loginctx';
export function Mobileheader(){
    const [signedin,setSignedin] = useState(false)
    const loggedin = useContext(LoggedinContext)
    const [isLargerThan1280] = useMediaQuery('(min-width: 700px)')
    useEffect(()=>{
        if(sessionStorage.getItem('logintoken') || localStorage.getItem('logintoken')){
            setSignedin(true)
        }
    },[])
    const logoutUSer =()=>{
        loggedin.logout()
    }
    return (
        <>
                <Link as={Routerlink}  to='/'><Image src={alogopotlogo}/></Link>
                <Menu>
                {({ isOpen }) => (
                   <> <MenuButton 
                     as={IconButton}
                     aria-label='navigations'
                     icon={isOpen?<CloseIcon color='#fff' boxSize='100%' background={"#0A0B0E"}/> :<HamburgerIcon boxSize='100%' color={'#FFFFFF'}  borderColor={'#45AC75'}/>}
                     variant='outline'
                     border={'0px'}
                     backgroundColor="#0A0B0E"
                     _focus={{bg:'#111621'}}
                     _hover={{bg:"#0A0B0E"}}
                    />
                    <MenuList width={'100vw'} bg={"#0A0B0E"} border={'0px'}>
                    <Grid
                     h='200px'
                    //  width={'90%'}
                    templateRows='repeat(4, 1fr)'
                     templateColumns='repeat(2, 1fr)'
                     gap={4}
                     padding={2}
                    >
                         <MenuItem _focus={{cursor:'pointer',bg:'#111621'}}  as={GridItem} borderRadius={4} colSpan={2} w='100%' color={'#ffffff'} background='#111621'  placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}}><Link as={Routerlink}  to='/listnewtoken'>List Your Token</Link></MenuItem>
                         <MenuItem as={GridItem} borderRadius={4} colSpan={2} w='100%' color={'#ffffff'} bg='#111621' placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}}><Link as={Routerlink}  to='/watchlist'>Watchlist</Link></MenuItem>
                        {(loggedin.loggedin || signedin) && <MenuItem as={GridItem} borderRadius={4} colSpan={2} w='100%' color={'#ffffff'} bg='#111621' placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}}><Link as={Routerlink}  to='/profile'>Profile</Link></MenuItem>}
                        {(loggedin.loggedin || signedin) && <MenuItem onClick={logoutUSer} as={GridItem} borderRadius={4} colSpan={2} w='100%' color='#ffffff' bg='#111621' placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}}>Sign-Out</MenuItem>}
                        {(!loggedin.loggedin && !signedin) && <MenuItem as={GridItem} borderRadius={4} colSpan={1} w='100%' color={'#ffffff'} bg='#111621' placeContent='center'_hover={{cursor:'pointer',bg:'#111621'}}><Link as={Routerlink}  to='/login'>Login</Link></MenuItem>}
                       {(!loggedin.loggedin && !signedin) && <MenuItem as={GridItem} borderRadius={4} colSpan={1} w='100%' color={'#ffffff'} bg='#111621' placeContent='center' _hover={{cursor:'pointer',bg:'#111621'}}><Link as={Routerlink}  to='/signup'>Sign-Up</Link></MenuItem>}
                    </Grid>
                    </MenuList>
                    <Outlet />
                    </>
                    )}
                </Menu>
                </>  
    )
}