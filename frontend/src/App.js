import logo from './logo.svg';
import './App.css';
import { Headercomponent } from './components/header/header';
import Homebody from './components/body/home/body'
import Footer from './components/footer/footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/authpages/login';
import Signup from './components/authpages/signup';
import Userprofile from './components/user/Userprofile';
import Tokenpage from './components/body/home/searchandtokensrepeater/tokendynamicpage.js/tokenpage';
import Watchlist from './components/user/watchlist';
import { useContext } from 'react';
import { LoggedinContext } from './contexts/loginctx';
import Listtokens from './components/user/listtoken';
function App() {
  const authCtx = useContext(LoggedinContext)
  return (<>
  
    <BrowserRouter>
    <Headercomponent />
      <Routes>
        <Route exact path="/" element={<Homebody />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/signup" element={<Signup />}/>
        {authCtx.loggedin && <Route exact path="/profile" element={<Userprofile />}/>}
        <Route exact path="/token" element={<Tokenpage />}/>
       {authCtx.loggedin && <Route exact path="/watchlist" element={<Watchlist />}/>}
       {authCtx.loggedin && <Route exact path="/listnewtoken" element={<Listtokens />}/>}

       <Route path='/*' element={<Homebody />}/>
      </Routes>
    </BrowserRouter>
    <Footer />
</>
  );
}

export default App;
