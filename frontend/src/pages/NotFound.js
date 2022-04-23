import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { Footer, AppBar } from '../components/index';
import img from '../components/assets/not-found.png';


const NotFound = () => {
    return ( 
        <>
        <AppBar />
            <Container>
                <Typography level={2}>
                    Page Not Found
                </Typography>
                <img src={img} alt="Not Found" />
                <Button><Link to={'/'}>Home Page</Link></Button>
            </Container>
        <Footer />
        </>
     );
}
 
export default NotFound;