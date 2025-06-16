import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

export default function Header () {
    return (
        <>
            <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand> 
                        <Image src="/favicon.ico" width="60" rounded />
                        {' '} Lace Log
                    </Navbar.Brand>
                    
                </Container>
            </Navbar>
        </>
    )
}