import React from "react";
import { Box, Button, Text, Input, InputGroup, InputRightElement, Grid, GridItem, Image, Flex} from '@chakra-ui/react';
import { StarIcon,ArrowUpIcon,CheckCircleIcon } from '@chakra-ui/icons';
import { useMediaQuery } from '@chakra-ui/react'

export default function Tokensaboutrepeater(){
    const [isLargerThan700] = useMediaQuery('(min-width: 700px)')
    return  <>
    <Box w='100vw' h='max-content' display='flex' justifyContent='center' marginTop={10}>
        <Grid width='80%' h='359px' gap={2} bg='#222B3E' border='2px solid #45AC75' borderRadius='11px' gridTemplateRows='1fr 1fr 2fr 1fr' padding={5}>
            {isLargerThan700 && <Box display='flex' justifyContent='space-between'>
                <Grid color='#fff' fontSize='1.2rem' display='grid' w='max-content' gridTemplateRows='1fr 1fr' gridTemplateColumns='1fr 1fr'>
                    <GridItem as={Image} columnSpan={1} rowSpan={2} borderRadius={'7px'} src="https://pbs.twimg.com/profile_images/1443915582668218380/ipdsvtYK_400x400.jpg" height={'60px'} w={'60px'}/>
                    <GridItem >TacoCoin</GridItem>
                    <GridItem >Taco</GridItem>
                    </Grid>
                    <StarIcon  color='#fff' placeSelf='self-start'/>
                </Box>}
            {!isLargerThan700 && <GridItem width='100%'>
                <Grid color='#ffff' w='100%' gridTemplateColumns={'2fr 3fr 1fr'} gridAutoRows='repeat(2,1fr)'>
                    <GridItem rowSpan='2' ><Image borderRadius={'7px'} src="https://pbs.twimg.com/profile_images/1443915582668218380/ipdsvtYK_400x400.jpg" height={'60px'} w={'60px'}/></GridItem>
                    <GridItem alignSelf='self-end'  colSpan={1} rowSpan={2}>TacoCoin</GridItem>
                    <GridItem placeSelf='self-end'><StarIcon  color='#fff' placeSelf='self-end'/></GridItem>
                    <GridItem colSpan={1} alignSelf='self-end' placeSelf='self-end'> Taco</GridItem>
                </Grid>
            </GridItem>}
            <Text color='#E5E5E5' fontSize='15px' fontWeight='500' lineHeight='22.5px' fontFamily='Poppins'>TacoCoin is a hyper-localized Web3 app built to reward community involvement.   Use the app to explore events and...</Text>
            <Box display='flex' color='#E5E5E5' justifyContent='space-between'flexWrap='wrap'   fontFamily='Poppins' fontSize='18px' lineHeight='27px' fontWeight='500'>
                <Box display='flex' flexWrap='wrap' >
                    <Text >Algo Price:</Text>
                    <Text textAlign='right'>0.0000123</Text>
                </Box>
                <Box display='flex' flexWrap='wrap' >
                    <Text>USD Price:</Text>
                    <Text textAlign='right'>0.00001643</Text>
                </Box>
                <Box display='flex' flexWrap='wrap' >
                    <Text>24h Change:</Text>
                    <Box display='flex' color='#16C784'><ArrowUpIcon  transform='rotateZ(45deg)'  boxSize='1.5em'/><Text>1.25%</Text></Box> 
                </Box>
            </Box>
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Box borderRadius='5px' fontSize='17.33px' fontWeight='500' fontFamily='Poppins' lineHeight='26px' color='#fff' bg='#4C5C75' justifyContent='center' h='35px' w='102px'alignItems='center' display='flex' flexDirection='row' gap={1}><CheckCircleIcon color='#45AC75'/>Active</Box>
                <Box gap={2} display='flex' flexDirection='row' fontFamily='Poppins' fontWeight='500' color='#fff' fontSize='19.36px' lineHeight='29.03px' w='120px' h='max-content' borderRadius='5.58px' bg='#222B3E' border='2.23px solid #45AC75'>
                    <Box w='60%' h='100%' bg='#45AC75' textAlign='center'>Vote</Box>
                    <Text textAlign='center'>125</Text>
                </Box>
            </Box>
        </Grid>
    </Box>
    </> 
} 