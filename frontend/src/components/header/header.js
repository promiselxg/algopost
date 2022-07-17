import React from 'react'
import { Box} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react'
import { Mobileheader } from './mobileheader';
import { Desktopheader } from './desktopheader';
export function Headercomponent(){
    const [isLargerThan700] = useMediaQuery('(min-width: 700px)')
    return (
        <Box w='100vw' bg={'#0D0E12'} position="sticky" zIndex={1} top=".00000001px" height={'62px'} display='flex' justifyContent={'space-between'} alignItems={'center'} paddingLeft={'5px'} paddingRight={'5px'}>
            {!isLargerThan700 && <Mobileheader />}
            {isLargerThan700 && <Desktopheader />}
        </Box>  
    )
}