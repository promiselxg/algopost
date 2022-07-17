import React, { useState } from 'react'
import { Box,Button,Checkbox,Input,InputGroup,Link,Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
const [userName,setUsername] = useState('');
const [firstname,setFirstname]=useState('')
const [lastName,setLastName]=useState('')
const [email,setEmail]=useState('')
const [password,setPass]=useState('')
const [confirmPass,setConfirmPass]=useState('')
const [error,setError]=useState('');
const [userNameErr,setUSernameErr]=useState('');
const [firstNameErr,setFIrstNameErr]=useState('');
const [lastNameErr,setLastNameErr]=useState('');
const [emailErr,setEmailErr]=useState('');
const [requestLoad,setRequestload] = useState(false)
  const auth = process.env.REACT_APP_AUTH
const navigate = useNavigate()
  const registerUser = ()=>{
    if(userName === '') return setUSernameErr('Username Cannot be empty'); else  setUSernameErr('');
    if(firstname === '') return setFIrstNameErr('Username Cannot be empty'); else setFIrstNameErr('');
    if(lastName === '') return setLastNameErr('Username Cannot be empty'); else setLastNameErr('');
    if(email === '') return setEmailErr('Username Cannot be empty'); else setEmailErr('');
    if(password === '' || confirmPass==='' ) return setError('Password or Confirm password cannot be empty'); else setError('');
    if(password != confirmPass ) return setError('Password not equal to confirm password'); else setError('');
    setRequestload(true)
    //  axios(`/api/auth/register`,{
    //   headers:{'Content-Type': 'application/json'},
    //  data:{ "firstname": firstname,
    //   "username": userName, 
    //   "password": password,
    //   "confirm_password": confirmPass,
    //   "email": email}
    // }).then((result)=>{
    //   console.log(result)
    //   setRequestload(false)
    // }).catch((e)=>{
    //   setRequestload(false)
    //     console.log(e);
    // })
    axios({
      method: 'post',
      url: '/api/auth/register',
      data: {
        "firstname": firstname.toLowerCase(),
          "username": userName.toLowerCase(), 
          "password": password,
          "confirm_password": confirmPass,
          "email": email.toLowerCase()
      }
    }).then((result)=>{
        console.log(result)
        setRequestload(false)
        navigate('/login',{replace:true})
      }).catch((e)=>{
        setRequestload(false)
          console.log(e);
      })
  }
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' bg={'#0D0E12'}>
    <Text fontSize='22px' fontFamily='Poppins' fontWeight='600px' lineHeight='33px' color='#45AC75'>REGISTER</Text>
    <InputGroup display='grid' placeItems='center' gap={5} marginTop='5' marginBottom={1}>
    <Input value={userName} onChange={(e)=>setUsername(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' placeholder='Username' borderRadius='4px'/>
    {userNameErr != '' && <Text color="#ff0000" fontSize='14px'>{userNameErr}</Text>}
   
    <Input value={firstname} onChange={(e)=>setFirstname(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' placeholder='First Name' borderRadius='4px'/>
    {firstNameErr != '' && <Text color="#ff0000" fontSize='14px'>{firstNameErr}</Text>}
    
    <Input value={lastName} onChange={(e)=>setLastName(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' placeholder='Last Name' borderRadius='4px'/>
    {lastNameErr != '' && <Text color="#ff0000" fontSize='14px'>{lastNameErr}</Text>}
    
    <Input value={email} onChange={(e)=>setEmail(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' type='email' placeholder='Email Address' borderRadius='4px'/>
    {emailErr != '' && <Text color="#ff0000" fontSize='14px'>{emailErr}</Text>}
    
    <Input borderColor={error !='' && '#ff0000'}  value={password} onChange={(e)=>setPass(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' type='password' placeholder='Password' borderRadius='4px'/>
    <Input borderColor={error !='' && '#ff0000'} value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} bg='#fff' w='80%' h='50px' fontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' color='#B0ADAD' type='password' placeholder='Confirm Password' borderRadius='4px'/>
    </InputGroup>
    {error != '' && <Text color="#ff0000" fontSize='14px'>{error}</Text>}
    {/* <Link ontWeight='500' fontFamily='Poppins' fontSize='16px' lineHeight='24px' color='#B0ADAD' width='80%' textAlign='right'>Forgot Password</Link> */}
    {/* <Checkbox size='md' ontWeight='500' fontFamily='Poppins' fontSize='14px' lineHeight='21px' color='#B0ADAD' width='80%' textAlign='right'>Keep me signed in</Checkbox> */}
    {/* <Text ontWeight='500' fontFamily='Poppins' fontSize='18px' lineHeight='27px' mt='5' mb='2' color='#B0ADAD' width='80%' textAlign='center'>Don{"'"}t have an account?</Text> */}
    <Button isLoading={requestLoad} disabled={requestLoad} onClick={registerUser} mt='5' mb='5' bg='#45AC75' textAlign='center' w='50%' h='53px' borderRadius='4px' size='18px' lineHeight='27px' color='white' _hover={{color:'#000'}}>Register</Button>
</Box>
  )
}

export default Signup