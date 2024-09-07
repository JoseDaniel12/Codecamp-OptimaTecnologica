import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '@/Components/UI/Navbar';

function Dashboard() {
    return (
        <>
            <Navbar/>
            <Container sx={{ paddingTop: 2,  paddingBottom: 4 }}>
                <Outlet />
            </Container>
        </>
    );
}

export default Dashboard;
