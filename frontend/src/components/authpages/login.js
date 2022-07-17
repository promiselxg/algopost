import { Box,Button,Checkbox,Input,InputGroup,Link,Text } from '@chakra-ui/react';
import axios from 'axios';
import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoggedinContext } from '../../contexts/loginctx';

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const setLoggedin = useContext(LoggedinContext)
  const [keepmeIn,setKeepmeIn] = useState(false);
const navigate = useNavigate()
  const loginrequest = ()=>{
    setLoading(true)
    if(email === '' || password === "") return setError('Email or password field cannot be empty!'); else setError('');
    axios({
      method: 'post',
      url: '/api/auth/login',
      headers:
      {"Authorization": `Bearer ${process.env.REACT_APP_AUTH}`},
      data: {
        
          "password": password,
          "email": email
      }
    }).then((result)=>{
        console.log(result)
        if(keepmeIn){localStorage.setItem('logintoken',result.data.token)};
        setLoading(false)
        setLoggedin.setLoggedinState(true);
        if(!keepmeIn)sessionStorage.setItem('logintoken',result.data.token)
        navigate('/profile',{replace:true})
      }).catch((e)=>{
        setError('Kindly check your email or username and password and try again!')
        setLoading(false)
          console.log(e);
      })
  }
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' bg={'#0D0E12'}>
        <Text fontSize='22px' fontFamily='Poppins' fontWeight='600px' lineHeight='33px' color='#45AC75'>LOGIN</Text>
        <InputGroup display='grid' placeItems='center' gap={5} marginTop='5' marginBottom={1}>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' placeholder='Username or Email' borderRadius='4px'/>
       
        <Input value={password} onChange={(e)=>setPassword(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' placeholder='Password' borderRadius='4px'/>
        {error != '' && <Text color="#ff0000" fontSize='14px'>{error}</Text>}
        </InputGroup>
        <Link ontWeight='500' fontFamily='Poppins' fontSize='16px' lineHeight='24px' color='#B0ADAD' width='80%' textAlign='right'>Forgot Password</Link>
        <Checkbox checked={keepmeIn} onChange={(e)=>{setKeepmeIn(e.target.checked)}} size='md' ontWeight='500' fontFamily='Poppins' fontSize='14px' lineHeight='21px' color='#B0ADAD' width='80%' textAlign='right'>Keep me signed in</Checkbox>
        <Text ontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' mt='5' mb='2' color='#B0ADAD' width='80%' textAlign='center'>Don{"'"}t have an account?</Text>
        <Button onClick={loginrequest} disabled={loading} isLoading={loading} mb='5' bg='#45AC75' textAlign='center' w='50%' h='53px' borderRadius='4px' size='18px' lineHeight='27px' color='white' _hover={{color:'#000'}}>Register</Button>
    </Box>
  )
}

export default Login;