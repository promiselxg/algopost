import React from "react";
import { Box,Image,Text} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import telegramlogo from '../../assets/telegram.png'
import twitterlogo from '../../assets/twitter.png'

export default function Footer(){
    return <>
    <Box height='max-content' width='100vw' padding={5} bg='#111621'>
        <Box display='flex' flexDir='row' flexWrap='wrap' gap={10} alignItems='center' justifyContent='space-around'>
            <Box display='grid' gridTemplateRows='repeat(5,1fr)'>
                <Text as='p' color="#45AC75" fontWeight='600' fontSize='21.98px' lineHeight='32.97px' fontFamily='Poppins'>Useful links</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Delisting Policy</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>About Us</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Privacy Policy</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Whitepaper</Text>
            </Box>
           <Box display='grid' gridTemplateRows='repeat(5,1fr)'>
                <Text as='p' color="#45AC75" fontWeight='600' fontSize='21.98px' lineHeight='32.97px' fontFamily='Poppins'>Token Lists</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Active Tokens</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Upcoming Tokens</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Trending Tokens</Text>
            </Box>
            <Box display='grid' gridTemplateRows='repeat(5,1fr)'>
                <Text as='p' color="#45AC75" fontWeight='600' fontSize='21.98px' lineHeight='32.97px' fontFamily='Poppins'>Resources</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Help {'&'} Support</Text>
                <Text as='a' color="#E5E5E5" fontWeight='400' fontSize='16.49px' lineHeight='24.73px' fontFamily='Poppins'>Submit Token</Text>
            </Box>
            <Box display='grid' gridTemplateRows='repeat(5,1fr)'>
            <Text as='p' color="#45AC75" fontWeight='600' fontSize='21.98px' lineHeight='32.97px' fontFamily='Poppins'>Socials</Text>
                <Box display='flex' gap={2}>
                    <Image src={telegramlogo} />
                    <Image src={twitterlogo}  />
                </Box>
                </Box>
        </Box>
    </Box>
    </>
}