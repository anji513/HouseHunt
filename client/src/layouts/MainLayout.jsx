import { Container } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container sx={{ minHeight: '80vh', pb: 4 }}>{children}</Container>
      <Footer />
    </>
  );
}

export default MainLayout;
