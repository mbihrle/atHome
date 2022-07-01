import styles from './BankAccountsChildren.module.css';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useGetAllLastTransactionsForEachAccountQuery } from '../../features/api/atHomeApi';

import Screen from '../../components/Screen/Screen';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

function BankAccountsChildren() {
    // const [accounts, setAccounts] = useState([]);

    const navigate = useNavigate();

    const {
        data: lastTransaction,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAllLastTransactionsForEachAccountQuery();

    let sectionAccounts;
    if (isLoading) {
        sectionAccounts = <Loader />;
    } else if (isError) {
        sectionAccounts = error;
    } else if (isSuccess) {
        sectionAccounts = lastTransaction.map((tran) => {
            return (
                <section
                    key={tran.account_id}
                    id={styles.account}
                    onClick={() =>
                        navigate(
                            `/finanzen/bankkonto-kinder/${tran.account_id}`
                        )
                    }
                >
                    <Row>
                        <Col>
                            <Card id={styles.card}>
                                <Card.Body>
                                    <Card.Title>
                                        {`${tran.account_name}`}
                                    </Card.Title>
                                    <h3>{tran.account_value} Euro</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </section>
            );
        });
    }

    // useEffect(() => {

    // }, []);

    return (
        <Screen>
            <h1 className='text-center'>Kontostände Kinder</h1>
            <Container id={styles.accountContainer}>
                <div id={styles.accounts}>{sectionAccounts}</div>
            </Container>
        </Screen>
    );
}

export default BankAccountsChildren;
