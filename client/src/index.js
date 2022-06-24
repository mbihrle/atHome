import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';



import Home from './screens/HomeScreen/Home';
import BankAccountsChildren from './screens/BankAccountsChildren/BankAccountsChildren';
import BankAccountChild from './screens/BankAccountChild/BankAccountChild';
import DummyPage from './screens/DummyPage/DummyPage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Pokemon from './screens/Pokemon/Pokemon';
import TodoList from './screens/TodoList/TodoList';
import BankAccountChildDev from './screens/BankAccountChild/BankAccountChildDev';
import JsonServerTest from './screens/JsonServerTest/JsonServerTest';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dummy' element={<DummyPage />} />
                <Route
                    path='/finanzen/bankkonto-kinder'
                    element={<BankAccountsChildren />}
                />

                <Route
                    path='/finanzen/bankkonto-kinder/:id'
                    element={<BankAccountChild />}
                />
                <Route path='/spiele/pokemon/' element={<Pokemon />} />
                <Route path='/haushalt/todoliste/' element={<TodoList />} />
                <Route path='/dev/test/json-server' element={<JsonServerTest />} />
                <Route path='/dev/bankkonto-kinder/:id' element={<BankAccountChildDev />} />
            </Routes>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
