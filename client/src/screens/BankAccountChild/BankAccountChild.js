import styles from './BankAccountChild.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Table } from 'react-bootstrap';
import {
    useGetLastTransactionByAccountQuery,
    useAddTransactionMutation,
} from '../../features/api/atHomeApi';

// import axios from 'axios';
import Screen from '../../components/Screen/Screen';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';

function BankAccountChild() {
    const params = useParams();
    const accountId = Number(params.id);

    const [isSending, setIsSending] = useState(false);
    const [transactionType, setTransactionType] = useState('Einzahlung');
    const [showSectionNewTransaction, setShowSectionNewTransaction] =
        useState(false);
    const [transactionValue, setTransactionValue] = useState(0);
    const [transactionText, setTransactionText] = useState('');
    const [msgTranSaveSuccess, setMsgTranSaveSuccess] = useState('');
    const [msgInputError, setMsgInputError] = useState('');

    const {
        data: lastTransaction,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetLastTransactionByAccountQuery(accountId);

    const [addTransaction] = useAddTransactionMutation();

    const resetNewTransaction = () => {
        setTransactionValue(0);
        setTransactionText('');
        setMsgTranSaveSuccess('');
        setMsgInputError('');
    };

    const cancelNewTransaction = () => {
        setShowSectionNewTransaction(false);
        resetNewTransaction();
    };

    useEffect(() => {
        const msgTimerTranSaveSuccess = setTimeout(
            () => setMsgTranSaveSuccess(''),
            5000
        );
        if (isSending) {
            addTransaction({
                account_id: accountId,
                transaction_text: transactionText,
                transaction_value: transactionValue,
                type: transactionType,
            });
            setMsgTranSaveSuccess('Transaktion erfolgreich gespeichert');
            setIsSending(false);
        }
        return () => clearTimeout(msgTimerTranSaveSuccess);
    }, [
        addTransaction,
        transactionValue,
        transactionText,
        isSending,
        accountId,
        transactionType,
    ]);

    const validateInput = () => {
        if (transactionValue.trim() === '') {
            setMsgInputError(
                'Bitte geben Sie eine Zahl im Format 0.00 ohne Währung ein'
            );
            return false;
        }
        if (!isNaN(transactionValue)) {
            return true;
        } else {
            setMsgInputError(
                'Bitte geben Sie eine Zahl im Format 0.00 ohne Währung ein'
            );
            return false;
        }
    };

    const handleCreateNewTransaction = (payIn) => {
        setMsgInputError('');
        const inputValueValid = validateInput();
        console.log(inputValueValid);
        if (inputValueValid) {
            setIsSending(true);
            if (payIn) {
                setTransactionType('Einzahlung');
                if (transactionValue < 0) {
                    setTransactionValue(-transactionValue);
                }
            } else {
                setTransactionType('Auszahlung');
                if (transactionValue > 0) {
                    setTransactionValue(-transactionValue);
                }
            }
        }
    };

    let sectionAccount;
    if (isLoading) {
        sectionAccount = <Loader />;
    } else if (isError) {
        sectionAccount = error;
    } else if (isSuccess) {
        sectionAccount = lastTransaction.map((tran) => {
            return (
                <section key={tran.account_id} id={styles.sectionAccount}>
                    <Container>
                        <Row>
                            <Col>
                                <Card id={styles.card}>
                                    <Card.Body>
                                        <Card.Title>
                                        Kontostand <br />
                                            {`${tran.account_name}`}
                                        </Card.Title>
                                        <h3>{tran.account_value} Euro</h3>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5 className='text-center my-4'>
                                    Letzte Transaktion
                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <div id={styles.table}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>KontoNr / Name</th>
                                            <th>Typ</th>
                                            <th>Betrag</th>
                                            <th>Text</th>
                                            <th>Kontostand</th>
                                            <th>Datum Anlage</th>
                                            {/* <th>User Anlage</th> */}
                                            {/* <th>Datum Änderung</th> */}
                                            {/* <th>User Änderung</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{tran.transaction_id}</td>
                                            <td>
                                                {tran.account_id}{' '}
                                                {tran.account_name}
                                            </td>
                                            <td>{tran.type}</td>
                                            <td>{tran.transaction_value}</td>
                                            <td>{tran.transaction_text}</td>
                                            <td>{tran.account_value}</td>
                                            <td>{tran.date_create}</td>
                                            {/* <td>{tran.user_create}</td> */}
                                            {/* <td>{tran.date_change}</td> */}
                                            {/* <td>{tran.user_change}</td> */}
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                    </Container>
                </section>
            );
        });
    }

    const sectionNewTransaction = (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <Card className={'text-center'}>
                        <Card.Header>
                            <h5>Neue Buchung</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={3}>
                                    <label htmlFor='transactionValue'>
                                        Betrag (Format: 10.45)
                                    </label>
                                    <input
                                        id='transactionValue'
                                        type='text'
                                        className='form-control'
                                        placeholder='Betrag'
                                        aria-label='transaction value'
                                        required
                                        value={transactionValue}
                                        onChange={(e) =>
                                            setTransactionValue(e.target.value)
                                        }
                                    />
                                </Col>
                                <Col md={9}>
                                    <label htmlFor='transactionText'>
                                        Buchungstext
                                    </label>
                                    <input
                                        id='transactionText'
                                        type='text'
                                        className='form-control'
                                        placeholder='Text'
                                        aria-label='transaction text'
                                        value={transactionText}
                                        onChange={(e) =>
                                            setTransactionText(e.target.value)
                                        }
                                    />
                                </Col>
                                {/* </InputGroup> */}
                            </Row>
                            <div className='mt-4'>
                                <Button
                                    className='m-1'
                                    variant='success'
                                    onClick={() =>
                                        handleCreateNewTransaction(true)
                                    }
                                >
                                    Einzahlung
                                </Button>
                                <Button
                                    className='m-1'
                                    variant='danger'
                                    onClick={() =>
                                        handleCreateNewTransaction(false)
                                    }
                                >
                                    Auszahlung
                                </Button>
                                <Button
                                    className='m-1'
                                    variant='info'
                                    onClick={() => resetNewTransaction()}
                                >
                                    Zurücksetzen
                                </Button>
                                <Button
                                    className='m-1'
                                    variant='warning'
                                    onClick={() => cancelNewTransaction()}
                                >
                                    Abbruch
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

    let sectionMessage;
    if (msgTranSaveSuccess.length > 0) {
        sectionMessage = (
            <div id={styles.saveTransactionMessage}>
                <Message variant='success'>{msgTranSaveSuccess}</Message>
            </div>
        );
    }
    if (isError) {
        sectionMessage = (
            <div id={styles.saveTransactionMessage}>
                <Message variant='danter'>{error}</Message>
            </div>
        );
    }
    if (msgInputError.length > 0) {
        sectionMessage = (
            <div id={styles.saveTransactionMessage}>
                <Message variant='danger'>{msgInputError}</Message>
            </div>
        );
    }

    return (
        <Screen>
            {/* <h1 className='text-center mt-1 mb-5'>{`Kontostand`}</h1> */}
            {sectionAccount}

            {showSectionNewTransaction ? sectionNewTransaction : null}
            {showSectionNewTransaction ? null : (
                <div className='d-flex justify-content-center m-4'>
                    <Button onClick={() => setShowSectionNewTransaction(true)}>
                        Transaktion erfassen
                    </Button>
                </div>
            )}
            <div>{sectionMessage}</div>
        </Screen>
    );
}

export default BankAccountChild;
