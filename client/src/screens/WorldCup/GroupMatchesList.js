import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import Match from './Match';

function GroupMatchesList(props) {
    const { countryListGroup, groupName } = props;

    const [firstNation] = countryListGroup.filter(
        (country) => country.groupListId === 1
    );
    const [secondNation] = countryListGroup.filter(
        (country) => country.groupListId === 2
    );
    const [thirdNation] = countryListGroup.filter(
        (country) => country.groupListId === 3
    );
    const [fourthNation] = countryListGroup.filter(
        (country) => country.groupListId === 4
    );

    return (
        <Card className='mt-1 mb-4 border-0'>
            <div>
                <h6>Spielplan {groupName}</h6>
                <Row>
                    <Match
                        countryHome={firstNation}
                        countryAway={secondNation}
                    ></Match>
                    <Match
                        countryHome={thirdNation}
                        countryAway={fourthNation}
                    ></Match>
                    <Match
                        countryHome={fourthNation}
                        countryAway={firstNation}
                    ></Match>
                    <Match
                        countryHome={secondNation}
                        countryAway={thirdNation}
                    ></Match>
                    <Match
                        countryHome={firstNation}
                        countryAway={thirdNation}
                    ></Match>
                    <Match
                        countryHome={secondNation}
                        countryAway={fourthNation}
                    ></Match>
                </Row>
            </div>
        </Card>
    );
}

export default GroupMatchesList;
