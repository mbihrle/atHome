import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './Navigation.module.css';

function Navigation() {
    return (
        <>
            <Navbar
                bg='light'
                variant='light'
                fixed='top'
                className={styles.navbar}
            >
                <Container>
                    <Navbar.Brand href='/'>Home</Navbar.Brand>
                    <Nav className='me-auto'>
                    <NavDropdown
                            title='Finanzen'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/dummy'>
                                Aktien
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Haushaltsbuch
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/finances/balance-children'>
                                Bankkonto Kinder
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title='Haushalt'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/dummy'>
                                Wochenplan
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Essen
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Einkaufen
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                ToDo
                            </NavDropdown.Item>
                        </NavDropdown>
                       
                        <NavDropdown
                            title='Lernen'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/dummy'>
                                Vokabeln
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Mathe
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title='Kalorienzähler'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/dummy'>
                                Erfassung
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Berechnung
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title='LeGIDo'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/dummy'>
                                Finanzbuch
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href='#Haushaltsbuch' disabled>
                            Link
                        </Nav.Link>
                        
                        <NavDropdown title='Konto' id='collasible-nav-dropdown'>
                            <NavDropdown.Item href='/dummy'>
                                Einloggen
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Ausloggen
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Einstellungen
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Registrieren
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
