import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Screen from '../../components/Screen/Screen';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
// import styles from './WorldCup.module.css';
import GroupTable from './GroupTable';

import GroupMatchesList from './GroupMatchesList';
import { useGetCountryListQuery } from './flagApi';
import { addNewCountries } from './worldCupSlice';
import { api } from '../../features/api/atHomeApi/atHomeApi';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';

function WorldCup() {
    const initialCountriesIndex = [
        170, 209, 62, 191, 78, 238, 112, 81, 9, 183, 161, 197, 75, 12, 227, 58,
        118, 67, 56, 49, 141, 102, 19, 37, 30, 42, 46, 194, 188, 126, 289, 86,
    ];

    const dispatch = useDispatch();
    const [initialLoadingCountryList, setInitialLoadingCountryList] =
        useState(true);
    const [generateNewCountryList, setGenerateNewCountryList] = useState(false);
    // const countryList = useSelector((state) => state.worldCup.allCountries);
    // const countryList = countryJson.countryList;

    const reloadPage = () => {
        window.location.reload();
    };

    const saveDataToLocalStorage = () => {
        console.log('Save data: ', countryListAllGroups);
        localStorage.setItem(
            'worldCupData',
            JSON.stringify({ nations: countryListAllGroups })
        );
    };

    const loadDataFromLocalStorage = () => {
        console.log('Load data:');
        const countriesLoaded = JSON.parse(
            localStorage.getItem('worldCupData')
        ).nations;
        console.log(countriesLoaded);
        dispatch(addNewCountries(countriesLoaded));
    };

    const { data, isLoading, isSuccess, isError, error } =
        useGetCountryListQuery();

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    };

    const getArrayOfRandomNumbers = (amountOfNumbers, minNumber, maxNumber) => {
        const arrayResult = [];
        while (arrayResult.length < amountOfNumbers) {
            const newNumber = getRandomInt(minNumber, maxNumber);
            if (!arrayResult.includes(newNumber)) {
                arrayResult.push(newNumber);
            }
        }
        return arrayResult;
    };

    const getRandomCountryList = (arrRandomNumbers, countryObj) => {
        // const baseLink = `https://flagcdn.com/48x36/${code}.png`
        const countryList = [];
        let id = 1;
        const size = '48x36';
        const width = '48';
        const height = '36';
        let groupId = 0;
        let groupListId = 1;
        let quarterfinal = 0;
        let semifinal = 0;
        let final = 1;
        const gamesPlayed = 0;
        const won = 0;
        const lost = 0;
        const drawn = 0;
        const goals = 0;
        const conceeded = 0;
        const goalDiff = 0;
        const points = 0;
        const rank = 1;
        const qualified = false;

        arrRandomNumbers.forEach((num) => {
            Object.entries(countryObj).forEach(([key, value], index) => {
                if (index === num) {
                    let code = key;
                    let name = value;
                    if (id % 4 === 1) {
                        groupId++;
                        groupListId = 1;
                    }
                    if (id % 8 === 1) {
                        quarterfinal++;
                    }
                    if (id % 16 === 1) {
                        semifinal++;
                    }
                    const link = `https://flagcdn.com/48x36/${code}.png`;
                    countryList.push({
                        countryId: num,
                        id,
                        code,
                        name,
                        link,
                        size,
                        width,
                        height,
                        groupId,
                        groupListId,
                        quarterfinal,
                        semifinal,
                        final,
                        gamesPlayed,
                        won,
                        lost,
                        drawn,
                        goals,
                        conceeded,
                        goalDiff,
                        points,
                        rank,
                        qualified,
                    });
                }
            });
            id++;
            groupListId++;
        });
        return countryList;
    };

    const getNewCountryList = () => {
        setGenerateNewCountryList(true);
    };

    useEffect(() => {
        let apiAllCountries = {};
        // console.log('initialLoadingCountryList: ', initialLoadingCountryList);
        if (isSuccess) {
            apiAllCountries = data;
            if (initialLoadingCountryList) {
                // console.log('INI');
                const newCountryList = getRandomCountryList(
                    initialCountriesIndex,
                    apiAllCountries
                );
                dispatch(addNewCountries(newCountryList));
                setInitialLoadingCountryList(false);
            }
        }

        if (generateNewCountryList) {
            // console.log(
            //     'Object.keys(apiAllCountries): ',
            //     Object.keys(apiAllCountries)
            // );
            const arrayOfRandomNumbers = getArrayOfRandomNumbers(
                32,
                0,
                Object.keys(apiAllCountries).length
            );

            const newCountryList = getRandomCountryList(
                arrayOfRandomNumbers,
                apiAllCountries
            );

            dispatch(addNewCountries(newCountryList));
            setGenerateNewCountryList(false);
        }
    }, [
        isLoading,
        isSuccess,
        initialLoadingCountryList,
        generateNewCountryList,
    ]);

    // console.log('useSelectorCall for Groups');

    const countryListAllGroups = useSelector(
        (state) => state.worldCup.allCountries
    );
    const countryListGroupA = useSelector(
        (state) => state.worldCup.countriesGroupA
    );
    const countryListGroupB = useSelector(
        (state) => state.worldCup.countriesGroupB
    );
    const countryListGroupC = useSelector(
        (state) => state.worldCup.countriesGroupC
    );
    const countryListGroupD = useSelector(
        (state) => state.worldCup.countriesGroupD
    );
    const countryListGroupE = useSelector(
        (state) => state.worldCup.countriesGroupE
    );
    const countryListGroupF = useSelector(
        (state) => state.worldCup.countriesGroupF
    );
    const countryListGroupG = useSelector(
        (state) => state.worldCup.countriesGroupG
    );
    const countryListGroupH = useSelector(
        (state) => state.worldCup.countriesGroupH
    );

    let sectionWorldcupGroups;

    if (isError) {
        sectionWorldcupGroups = error;
    } else if (isLoading || countryListAllGroups.length < 32) {
        sectionWorldcupGroups = <Loader />;
    }

    // (isSuccess && countryListAllGroups.length === 32)
    else {
        sectionWorldcupGroups = (
            <Container fluid>
                <Row className='my-3'>
                    <Col>
                        <Button
                            className='me-2'
                            variant='primary'
                            onClick={reloadPage}
                        >
                            Start
                        </Button>
                        <Button
                            className='me-2'
                            variant='warning'
                            onClick={getNewCountryList}
                        >
                            Zufall
                        </Button>
                        <Button
                            className='me-2'
                            variant='success'
                            onClick={saveDataToLocalStorage}
                        >
                            Speichern
                        </Button>
                        <Button
                            className='me-2'
                            variant='danger'
                            onClick={loadDataFromLocalStorage}
                        >
                            Laden
                        </Button>
                    </Col>
                </Row>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupA}
                        groupName='Gruppe A'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupA}
                            groupName='Gruppe A'
                        />
                    </Row>
                </div>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupB}
                        groupName='Gruppe B'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupB}
                            groupName='Gruppe B'
                        />
                    </Row>
                </div>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupC}
                        groupName='Gruppe C'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupC}
                            groupName='Gruppe C'
                        />
                    </Row>
                </div>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupD}
                        groupName='Gruppe D'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupD}
                            groupName='Gruppe D'
                        />
                    </Row>
                </div>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupE}
                        groupName='Gruppe E'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupE}
                            groupName='Gruppe E'
                        />
                    </Row>
                </div>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupF}
                        groupName='Gruppe F'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupF}
                            groupName='Gruppe F'
                        />
                    </Row>
                </div>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupG}
                        groupName='Gruppe G'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupG}
                            groupName='Gruppe G'
                        />
                    </Row>
                </div>
                <div>
                    <GroupTable
                        countryListGroup={countryListGroupH}
                        groupName='Gruppe H'
                    ></GroupTable>
                    <Row>
                        <GroupMatchesList
                            countryListGroup={countryListGroupH}
                            groupName='Gruppe H'
                        />
                    </Row>
                </div>
            </Container>
        );
    }

    return <Screen>{sectionWorldcupGroups}</Screen>;
}

export default WorldCup;
