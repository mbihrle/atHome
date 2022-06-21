import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
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
                            <NavDropdown.Item href='/finanzen/bankkonto-kinder'>
                                Bankkonto Kinder
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/finanzen/bankkonto-kinder/1'>
                                Bankkonto Sebastian
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/finanzen/bankkonto-kinder/2'>
                                Bankkonto Benjamin
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
                            <NavDropdown.Item href='/haushalt/todoliste'>
                                Todo-Liste
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
                            title='Spielen'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/spiele/pokemon'>
                                Pokemon - Test
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dummy'>
                                Sonstiges
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href='#'>|</Nav.Link>

                        <NavDropdown
                            title='LeGIDo'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/dummy'>
                                Finanzbuch
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title='Entwicklung'
                            id='collasible-nav-dropdown'
                        >
                            <NavDropdown.Item href='/dev/bankkonto-kinder/1'>
                                Kontostand Kind Test
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/dev/test/json-server'>
                                Todo-Liste Json Server
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
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
        </header>
    );
}

export default Header;
