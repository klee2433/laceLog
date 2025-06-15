import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

export default function Header () {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand> Lace Log </Navbar.Brand>
                    <Image src="/src/assets/logo.JPG" width="40" rounded />
                </Container>
            </Navbar>
        </>
    )
}