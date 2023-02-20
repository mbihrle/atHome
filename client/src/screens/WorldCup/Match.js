import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMatchInfos } from './worldCupSlice';
import { useState, useEffect } from 'react';
// import { addPoints } from './worldCupSlice';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';

function Match(props) {
    const { countryHome, countryAway } = props;

    const dispatch = useDispatch();

    const [goalsHome, setGoalsHome] = useState(0);
    const [goalsAway, setGoalsAway] = useState(0);
    const [gameOpen, setGameOpen] = useState(true);
    // const [saveModus, setSaveModus] = false

    const getMatchWinner = () => {
        setGameOpen(false);
        const goalDiff = goalsHome - goalsAway;

        if (goalDiff > 0) {
            const teamHome = {
                id: countryHome.id,
                won: 1,
                lost: 0,
                drawn: 0,
                goals: goalsHome,
                conceeded: goalsAway,
                goalDiff: goalDiff,
                points: 3,
            };

            const teamAway = {
                id: countryAway.id,
                won: 0,
                lost: 1,
                drawn: 0,
                goals: goalsAway,
                conceeded: goalsHome,
                goalDiff: -goalDiff,
                points: 0,
            };

            const matchInfos = [teamHome, teamAway];
            dispatch(addMatchInfos({ matchInfos }));
        } else if (goalDiff < 0) {
            const teamHome = {
                id: countryHome.id,
                won: 0,
                lost: 1,
                drawn: 0,
                goals: goalsHome,
                conceeded: goalsAway,
                goalDiff: goalDiff,
                points: 0,
            };

            const teamAway = {
                id: countryAway.id,
                won: 1,
                lost: 0,
                drawn: 0,
                goals: goalsAway,
                conceeded: goalsHome,
                goalDiff: -goalDiff,
                points: 3,
            };

            const matchInfos = [teamHome, teamAway];
            dispatch(addMatchInfos({ matchInfos }));
        } else {
            const teamHome = {
                id: countryHome.id,
                won: 0,
                lost: 0,
                drawn: 1,
                goals: goalsHome,
                conceeded: goalsAway,
                goalDiff: goalDiff,
                points: 1,
            };

            const teamAway = {
                id: countryAway.id,
                won: 0,
                lost: 0,
                drawn: 1,
                goals: goalsAway,
                conceeded: goalsHome,
                goalDiff: -goalDiff,
                points: 1,
            };

            const matchInfos = [teamHome, teamAway];

            dispatch(addMatchInfos({ matchInfos }));
        }
    };

    const buttonSave = gameOpen ? (
        <Button variant='secondary' onClick={getMatchWinner}>
            Speichern
        </Button>
    ) : null;

    const resultArea = gameOpen ? (
        <Col xs='auto' sm='auto' className='m-1 p-1 d-flex'>
            <div className='d-flex align-items-center pt-4 '>
                <input
                    style={{
                        height: '2em',
                        width: '3em',
                        textAlign: 'center',
                    }}
                    type='number'
                    value={goalsHome}
                    onChange={(e) => setGoalsHome(parseInt(e.target.value))}
                ></input>
                <p className='m-1'>:</p>
                <input
                    style={{
                        height: '2em',
                        width: '3em',
                        textAlign: 'center',
                    }}
                    type='number'
                    value={goalsAway}
                    onChange={(e) => setGoalsAway(parseInt(e.target.value))}
                ></input>
            </div>
        </Col>
    ) : (
        <Col xs='auto' sm='auto' className='m-1 p-1 d-flex'>
            <div className='d-flex align-items-center pt-4 '>
                <div
                    style={{
                        height: '2em',
                        width: '3em',
                        textAlign: 'center',
                    }}
                >
                    {goalsHome}
                </div>
                <p className='m-1'>:</p>
                <div
                    style={{
                        height: '2em',
                        width: '3em',
                        textAlign: 'center',
                    }}
                >
                    {goalsAway}
                </div>
            </div>
        </Col>
    );

    useEffect(() => {
        // console.log('UseEff-incrementAmount: ', incrementAmount);
        // console.log('goalsHome: ', goalsHome);
        // console.log('goalsAway: ', goalsAway);
    });

    return (
        <Row className=''>
            <Col xs sm='2' className='m-1 p-1 d-flex-inline text-end'>
                <p className='my-0'> {countryHome.name} </p>
                <img
                    className='mx-1'
                    src={countryHome.link}
                    width={countryHome.width}
                    height={countryHome.height}
                    alt={countryHome.name}
                />
            </Col>
            {resultArea}

            <Col xs sm='2' className='m-1 p-1 d-flex-inline align-items-center'>
                <p className='my-0'> {countryAway.name} </p>
                <img
                    className='mx-1'
                    src={countryAway.link}
                    width={countryAway.width}
                    height={countryAway.height}
                    alt={countryAway.name}
                />
            </Col>
            <Col xs sm='1' className='m-1 p-1 pt-4 d-flex align-items-center'>
                {buttonSave}
            </Col>
        </Row>
    );
}

export default Match;
