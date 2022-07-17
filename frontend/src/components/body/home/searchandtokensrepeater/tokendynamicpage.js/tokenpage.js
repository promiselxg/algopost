import { Box, Button, Grid, GridItem, Image,Link,Progress,Text, Textarea } from '@chakra-ui/react';
import { StarIcon,ArrowUpIcon,CheckCircleIcon } from '@chakra-ui/icons';
import tgimg from '../../../../../assets/telegram.png'
import pintimg from '../../../../../assets/pinterest.png'
import twtimg from '../../../../../assets/twitter.png'
import ytimg from '../../../../../assets/youtube.png'
import fbimg from '../../../../../assets/facebook.png'
import React from 'react'

function Tokenpage() {
  return (
    <Box bg='#111621' display='flex' justifyContent='center' alignItems='center' w='100vw'>
        <Box bg='#222B3E' width='95%'  display='flex' justifyContent='center' alignItems='center' borderRadius='5px'>
            <Box w='95%' display='grid'>
            <Grid width='100%' h='359px' gap={2} bg='#222B3E'  gridTemplateRows='1fr 1fr 2fr 1fr' padding={5}>
            <GridItem width='100%'>
                <Grid color='#ffff' w='100%' gridTemplateColumns={'2fr 3fr 1fr'} gridAutoRows='repeat(3,1fr)'>
                    <GridItem rowSpan='2' ><Image borderRadius={'7px'} src="https://pbs.twimg.com/profile_images/1443915582668218380/ipdsvtYK_400x400.jpg" height={'60px'} w={'60px'}/></GridItem>
                    <GridItem alignSelf='self-end' rowStart='3'  colSpan='1' rowSpan='3'>TacoCoin</GridItem>
                    <GridItem colSpan='2' placeSelf='self-end' ><StarIcon  color='#fff'/></GridItem>
                    <GridItem colSpan='2' rowStart='3'alignSelf='self-end' placeSelf='self-end'> Tacos</GridItem>
                </Grid>
            </GridItem>
            <Text color='#E5E5E5' fontSize='15px' fontWeight='500' lineHeight='22.5px' fontFamily='Poppins'>TacoCoin is a hyper-localized Web3 app built to reward community involvement.   Use the app to explore events and...</Text>
            <Box display='flex' color='#E5E5E5' flexDirection='column' fontFamily='Poppins' fontSize='18px' lineHeight='27px' fontWeight='500'>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    <Text >Algo Price:</Text>
                    <Text textAlign='right'>0.0000123</Text>
                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    <Text>USD Price:</Text>
                    <Text textAlign='right'>0.00001643</Text>
                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    <Text>24h Change:</Text>
                    <Box display='flex' color='#16C784'><ArrowUpIcon  transform='rotateZ(45deg)' alignSelf='center' boxSize='1.5em'/><Text>1.25%</Text></Box> 
                </Box>
                <Text color='#fff'>Votes: 125</Text>
            </Box>
            
                
        </Grid>
        <Box w='100%' h='200px' bg='#000' mb={5} borderRadius='5px' color='#fff' display='grid' placeContent='center'>
                MAP HERE
            </Box>
            <Box w='100%' display='flex' flexDirection='column' gap='5' alignItems='center' mb={5}>
                <Link w="80%" display='grid' placeContent='center' borderRadius='5px' bg='#4C5C75' h='40px' fontSize='1.1rem' color='#fff'>Purchase Tacocoin(TACOS)</Link>
                <Link w="80%" display='grid' placeContent='center' borderRadius='5px' bg='#4C5C75' h='40px' fontSize='1.1rem' color='#fff'>Website</Link>
                <Link w="80%" display='grid' placeContent='center' borderRadius='5px' bg='#4C5C75' h='40px' fontSize='1.1rem' color='#fff'>Token ASA</Link>
            </Box>
            <Box w='100%' bg='#4C5C75' borderRadius='1px' h='1px' mb='5'></Box>
            
            <Box display='flex' flexWrap='wrap' gap='2' fontSize='1.1rem'><Text color='#E5E5E5'>Total Supply:</Text><Text color='#A1A1A1'>10,000,000.000 Tacos</Text></Box>
            <Box display='flex' flexWrap='wrap' gap='2' fontSize='1.1rem'><Text color='#E5E5E5'>Circulating Supply:</Text><Text color='#A1A1A1'>9,999,999.029 Tacos</Text></Box>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' gap='2' fontSize='1.1rem'><Text color='#E5E5E5'>Token in circulation after</Text><Text color='#fff'>100.00%</Text></Box>
            <Progress colorScheme='green' size='md' value={100} borderRadius='5px' />
            <Text color='#45AC75' fontSize='1.5rem' w='100%' textAlign='center'>ASA DETAILS</Text>
            <Box display='flex' flexWrap='wrap' gap='2' fontSize='1.1rem'><Text color='#E5E5E5'>Token Role:</Text><Text color='#A1A1A1'>Payment/Rewards</Text></Box>
            <Box display='flex' flexWrap='wrap' gap='2' fontSize='1.1rem'><Text color='#E5E5E5'>Categories:</Text><Text color='#A1A1A1'>None</Text></Box>
            <Box display='flex' flexWrap='wrap' gap='2' fontSize='1.1rem'><Text color='#E5E5E5'>Partnership:</Text><Text color='#A1A1A1'>None</Text></Box>
            <Box display='flex' flexWrap='wrap' gap='2' fontSize='1.1rem'><Text color='#E5E5E5'>Token Type:</Text><Text color='#A1A1A1'>Algorand ASA</Text></Box>
            <Box display='flex' flexWrap='wrap'  fontSize='1.1rem'><Text color='#E5E5E5'>About:</Text><Text color='#A1A1A1'>Tacocoin is the first of its kind on Algorand… allowing users to purchase world renowned tacos with the token, and rewarding loyal customers…</Text></Box>
            <Box w='100%' bg='#4C5C75' borderRadius='1px' mt='5' h='1px' mb='5'></Box>
            <Text color='#E5E5E5' fontSize='1.2rem'>Socials:</Text>
            <Box display='flex' gap={2} mb={5} mt={2}>
                <Image src={tgimg}/>
                <Image src={twtimg}/>
                <Image src={ytimg}/>
                <Image src={fbimg}/>
                <Image src={pintimg}/>
            </Box>
            <Box display='flex' gap={2} mb={5} mt={2}>
                <StarIcon color='#DD821F'/>
                <StarIcon color='#DD821F'/>
                <StarIcon color='#DD821F'/>
                <StarIcon  color='#DD821F'/>
                <StarIcon bg='#fff'/>
            </Box>
            <Button mb={5} bg='#45AC75'  _hover={{color:"#000"}} fontSize='1.5rem' color='#fff'>Vote</Button>
            <Box>
                <Text fontSize='1.4rem' color='#fff'>Comment</Text>
                <Textarea bg='#fff' mb={5} resize={'vertical'}/>
                
            </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Tokenpage;