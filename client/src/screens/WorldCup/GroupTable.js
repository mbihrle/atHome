import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

function GroupTable(props) {
    const { countryListGroup, groupName} = props;
    const groupDiv = countryListGroup.map((country) => {
            return (
                <tr key={country.id.toString()}>
                    <td style={{ width: '1em' }}>{country.rank}</td>
                    <td className='d-flex align-items-center'>
                        <img
                            className='mx-2'
                            src={country.link}
                            width={country.width}
                            height={country.height}
                            alt={country.name}
                        />
                        <p className='m-0 p-0'>{country.name}</p>
                    </td>
                    <td>{country.gamesPlayed}</td>
                    <td>{country.won}</td>
                    <td>{country.drawn}</td>
                    <td>{country.lost}</td>
                    <td>{country.goals}</td>
                    <td>{country.conceeded}</td>
                    <td>{country.goalDiff}</td>
                    <td>{country.points}</td>
                </tr>
            );
    });

    return (
        <Row className='m-0 p-0'>
            <Col className='m-0 p-0'>
                <h5>{groupName}</h5>
                <Table>
                    <thead>
                        <tr>
                            <th>Platzierung</th>
                            <th>Mannschaft</th>
                            <th>Sp</th>
                            <th>S</th>
                            <th>U</th>
                            <th>N</th>
                            <th>T</th>
                            <th>GT</th>
                            <th>TD</th>
                            <th>Pkte</th>
                        </tr>
                    </thead>
                    <tbody>{groupDiv}</tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default GroupTable;
