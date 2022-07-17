import { Box, Text,Grid,GridItem,Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import React from 'react'

function Watchlist() {
  return (
    <Box bg='#111621' w='100vw' display='grid' gridTemplateRows='1fr 2fr' placeItems='center' h='60vh'>
        <Text fontFamily='Poppins' color='#45AC75' fontSize='1.5rem' textAlign='center' >WATCHLIST</Text>
        <Grid alignSelf='start' color='#ffff' w='80%' gridTemplateColumns={'2fr 3fr 1fr'} padding='2' gridAutoRows='repeat(2,1fr)' borderRadius='15px' border='2px solid #45AC75'>
                    <GridItem rowSpan='2' ><Image borderRadius={'7px'} src="https://pbs.twimg.com/profile_images/1443915582668218380/ipdsvtYK_400x400.jpg" height={'60px'} w={'60px'}/></GridItem>
                    <GridItem alignSelf='self-end'  colSpan='1' rowSpan='1'>TacoCoin</GridItem>
                    <GridItem colSpan='1' placeSelf='self-end' ><StarIcon  color='#fff'/></GridItem>
                    <GridItem colSpan='2' alignSelf='self-start' placeSelf='self-start'> Tacos</GridItem>
                </Grid>
    </Box>
  )
}

export default Watchlist