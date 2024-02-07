import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import Dashboard from "./components/Dashboard";
import Login from './components/Login';
import Register from './components/Register';
import { createWebSocketConnection } from './scripts/web-socket-handler';
import Popup from './components/Popup';

function App() {
  const [activeUserId, setActiveUserId] = useState(null);
  const [activeUsername, setActiveUsername] = useState(null);
  const [onlineUuid, setOnlineUuid] = useState(null);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [popupRegisterSuccess, setPopupRegisterSuccess] = useState(false);
  const [popupRegisterError, setPopupRegisterError] = useState(false);
  const [popupLoginError, setPopupLoginError] = useState(false);

  const onLoginClick = (e) => {
    e.preventDefault();
    setRegister(false);
    setLogin(true);
  };
  const onRegisterClick = (e) => {
    e.preventDefault();
    setLogin(false);
    setRegister(true);
  }

  const onSuccessfulLogin = (data) => {
    console.log('data', data)
    let user = data.success.data;
    setOnlineUuid(user.online_uuid);
    setActiveUsername(user.username);
    setActiveUserId(user.id);
    console.log('user', user);
    console.log('user id', user.id);
    console.log(activeUserId);
  }

  const onSuccessfulRegister = (data) => {
    setOnlineUuid(false);
    setActiveUsername(false);
    setActiveUserId(false);
    setRegister(false);
    setLogin(false);
    setPopupRegisterSuccess(true);
    setPopupLoginError(false);
    setPopupRegisterError(false);
  }

  const onLoginError = () => {
    setOnlineUuid(false);
    setActiveUsername(false);
    setActiveUserId(false);
    setRegister(false);
    setLogin(true);
    setPopupLoginError(true);
    setPopupRegisterError(false);
    setPopupRegisterSuccess(false);
  }

  const onRegisterError = () => {
    setOnlineUuid(false);
    setActiveUsername(false);
    setActiveUserId(false);
    setRegister(true);
    setLogin(false);
    setPopupLoginError(false);
    setPopupRegisterError(true);
    setPopupRegisterSuccess(false);
  }

  const onLogout = () => {
    setOnlineUuid(false);
    setActiveUsername(false);
    setActiveUserId(false);
    setRegister(false);
    setLogin(false);
    setPopupRegisterSuccess(false);
  }

  useEffect(() => {
    return () => {

    };
  }, [activeUserId]);

  return (
    <div className="main">
      {activeUserId ? (
        <Dashboard activeUserId={activeUserId} activeUsername={activeUsername} online_uuid={onlineUuid} callbackWhenLogout={onLogout} />
      ) : (
        register ? (
          popupRegisterError ? (
            <>
              <Popup text='Username already taken!' color='red' />
              <Register callbackWhenRegister={onSuccessfulRegister} callbackWhenError={onRegisterError} />
            </>
          ) : (
            <Register callbackWhenRegister={onSuccessfulRegister} callbackWhenError={onRegisterError} />
          )
        ) : (
          login ? (
            popupLoginError ? (
              <>
                <Popup text='Wrong credentials!' color='red' />
                <Login callbackWhenLogin={onSuccessfulLogin} callbackWhenError={onLoginError} />
              </>
            ) : (
              <Login callbackWhenLogin={onSuccessfulLogin} callbackWhenError={onLoginError} />
            )
          ) : (
            popupRegisterSuccess ? (
              <>
                <Popup text='Registration successful' color='green' />
                <h1>Chat App!</h1>
                <button id='loginBtn' onClick={onLoginClick}>Login</button>
                <button id='registerBtn' onClick={onRegisterClick}>Register</button>
              </>
            ) : (
              <>
                <h1 className='display-1'>Chat App!</h1>
                <button className='btn btn-primary' id='loginBtn' onClick={onLoginClick}>Login</button>
                <button className='btn btn-primary' id='registerBtn' onClick={onRegisterClick}>Register</button>
              </>
            )
          )
        )
      )}



    </div>
  );
}

export default App;
