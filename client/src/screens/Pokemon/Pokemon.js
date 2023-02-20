import React from 'react';
import { useGetPokemonByNameQuery } from '../../features/api/pokemonApi/pokemonApi';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Screen from '../../components/Screen/Screen';

// import styles from './Pokemon.module.css';

const Pokemon = () => {
    const [pokemonName, setPokemonName] = useState('1');
    // Using a query hook automatically fetches data and returns query values
    // const { data, error, isLoading } = useGetPokemonByNameQuery('charizard');
    const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    useEffect(() => {
        console.log('useEffect- pokemonName: ', pokemonName);
    });

    return (
        <Screen>
            <h1>Pokemon Daten</h1>
            <h6>https://pokeapi.co/api/v2/</h6>
            <h2>Shiny-Pokemon</h2>
            Beispiele:
            <ul>
                <li>bulbasaur</li>
                <li>charizard</li>
            </ul>
            <InputGroup className='m-6'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                    Name (englisch, klein):
                </InputGroup.Text>
                <Form.Control
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                />
                <Button
                    onClick={() => console.log('click')}
                    variant='secondary'
                >
                    Suche
                </Button>
            </InputGroup>
            {console.log('DOM-pokemonName: ', pokemonName)}
            {pokemonName === '' ? (
                <>Such dir ein Pokemon aus</>
            ) : error ? (
                <>Oh nein, es gab einen Fehler</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data && data.species && data.sprites.front_shiny ? (
                <>
                    {console.log('data: ', data)}
                    {console.log('typeof: ', typeof data)}
                    <h3>{data.species.name}</h3>
                    <img
                        src={data.sprites.front_shiny}
                        alt={data.species.name}
                    />
                    <p>weitere Daten</p>
                </>
            ) : null}
        </Screen>
    );
};

export default Pokemon;
