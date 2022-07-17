import React from "react";
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Text, Input, InputGroup, InputRightElement, ButtonGroup} from '@chakra-ui/react';
import Tokensaboutrepeater from "./tokensaboutrepeater";
import { useMediaQuery } from '@chakra-ui/react';
import Pagnation from "./pagnation";

export default function RendersearchandReapeter(){
    const [isLargerThan700] = useMediaQuery('(min-width: 700px)')
    const pagnate = ()=>{

    }
    return <>
    {isLargerThan700 && <Box gap={4} width='80%' bg='#E7E7E7' display='flex' borderRadius='5px' alignItems='center' justifyContent='center' mb={5}>
                    <Text fontSize='3rem' color='#45AC75' fontWeight={600}>TOKEN LIST</Text>
                    <Input w='40%' h='50px' bg='#fff' borderWidth='1px' borderColor='#000' borderRadius='5px' placeholder="Search Token..." color='rgba(242, 242, 242, 0.46)'/>
                    <Button _hover={{color:"#000",bg:'#fff'}} rightIcon={<SearchIcon />} bg="#111621" color='#fff'>Search</Button>
                    </Box>}
    {!isLargerThan700 && <InputGroup  borderRadius='28px' height='49px' width='80%'>
        <InputRightElement  children={<SearchIcon color='#ffffff'/>}/>
        <Input border='0' background='#222B3E' borderRadius='28px' placeholder="Search Token..." color='rgba(242, 242, 242, 0.46)'/>
        </InputGroup>}
        <Box as='p' background='#222B3E' width='80%' height='max-content' fontSize='17px' lineHeight='25.5px' fontFamily='Poppins' padding='5px 5px 5px 15px' color='#E5E5E5' borderRadius='11px'> 
        Below are the list of Active tokens on Algopotio. Active tokens are either Fairlaunch presale. They are possible of doing 3x. If this is what you need check them below.
        </Box>
        <Tokensaboutrepeater />
        <Pagnation startPostIndex={1} numberofPostPerpages={6} currentPage={1} pagnate={pagnate}/>
        <Box marginTop={10} display='flex' flexDirection='column' alignItems='center' justifyContent='space-evenly' width='80%' height='219px' background='#222B3E' borderRadius='11px'>
        <Text color='#45AC75' fontFamily='Poppins' weight='600' fontSize='22px' lineHeight='33px'>Can't find your Token?</Text>
        <Text textAlign='center' fontSize='17px' lineHeight='26px' color='#E5E5E5'> List your token now! Get your community to vote for your coin and gain exposure.</Text>
        <Button color='#fff' fontFamily='Poppins' fontWeight='600' textAlign='center' fontSize='19.5px' borderRadius='7px' background='#45AC75' _hover={{color:"#000"}} > Submit Token</Button>
        </Box>
        <Box marginTop={10} display='flex' flexDirection='column' justifyContent='space-evenly' alignItems='center' bg='#45AC75' height='459px' width='100vw'>
            <Box height={130} width={'50%'} bg='#111621'></Box>
            <Text width={'80%'} as='p' fontFamily='Poppins' fontSize='22px' lineHeight='33px' textAlign='center' color='#111621'>Find your next investment in Algorand Tokens</Text>
            <Text width={'80%'} as='p' fontFamily='Poppins' fontSize='17px' lineHeight='25.5px' fontWeight='500' textAlign='center' color='#fff'>Create an Account and Sign up to our industry news and Token launch list
and get your next investment opportunity direct to your inbox on a weekly basis.</Text>
        <Button _hover={{color:'#000000'}} bg='#111621' fontFamily='Poppins' fontSize='19.5px' lineHeight='29.24px' fontWeight='600' textAlign='center' color='#E5E5E5'>Register Now</Button>
        </Box>
        
    </>
}