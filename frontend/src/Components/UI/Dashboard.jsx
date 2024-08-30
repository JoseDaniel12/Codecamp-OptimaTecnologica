import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './Navbar';

function Dashboard() {
    return (
        <div>
            <Navbar/>
            <Container sx={{backgroundColor: "green"}}>
                <Outlet />
            </Container>
        </div>
    );
}

export default Dashboard;
