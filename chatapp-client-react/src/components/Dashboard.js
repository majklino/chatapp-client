import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import Header from "./Header";
import Button from "./Button";
import FriendList from "./FriendList";
import ChatContainer from './ChatContainer';
import { createWebSocketConnection } from './../scripts/web-socket-handler';
import userEvent from '@testing-library/user-event';

const Dashboard = ({ activeUserId, activeUsername, online_uuid, callbackWhenLogout }) => {
  console.log(activeUserId);
  const [stateOfPage, setStateOfPage] = useState(false);
  const [friends, setFriends] = useState([]);

  let calls_happened = false;

  localStorage.setItem('activeUserId', activeUserId);

  useEffect(() => {
    console.log('main useEffect in Dashboard.js called.');
    const socket = createWebSocketConnection(onNewUserRegistered);

    const getFriends = (callback) => {
      $.ajax({
        url: `http://localhost:5001/user/friends?id=${activeUserId}&online_uuid=${online_uuid}`,
        method: 'GET',
        success: function (res) {
          callback(res);
        },
        error: function (error) {
          console.error('Error:', error);
        }
      });
    }

    console.log('calls_happened', calls_happened);
    if (!calls_happened) {
      calls_happened = true;
      console.log('here before calls');
      getFriends((res) => {
        console.log('result', res);
        if (res.success != null) {
          setFriends(res.success.friends);
          console.log('friend list:', res.success.friends);
          setStateOfPage(-1);
        }
        else {
          //TODO handle res.error
        }

      });
    }

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    console.log('state useEffect in Dashboard.js called.');
    return () => {

    };
  }, [stateOfPage]);

  const onFriendContextChanged = (friendId) => {
    friends.forEach(friend => {
      if (friend.id == friendId) {
        setStateOfPage(friend);
        console.log('yo wtf');
        localStorage.setItem('userToId', friend.id);
        localStorage.setItem('userToUsername', friend.username);
      }
    });
  };

  const onLogout = () => {
    $.post('http://localhost:5001/login/logout',
      {
        username: activeUsername,
        online_uuid: online_uuid
      }, (data, status) => {
        callbackWhenLogout();
      });
  };

  const onNewUserRegistered = (newUsers) => {
    console.log('new registration!', newUsers);
    // newFriends.push(newUser);
    let meId = -1
    let i = 0
    newUsers.forEach(user => {
      if(user.id == activeUserId){
        meId = i;
      }
      i++;
    });
    newUsers.splice(meId, 1);
    setFriends(newUsers);
  };

  return (
    <div className="container">
      {stateOfPage ? (
        <div className='chatContainer'>
          <div>
            <Header title='Chat!' />
            <Button color='green' text='logout' callbackWhenClicked={onLogout} />
            <FriendList users={friends} callbackWhenFriendContextChanged={onFriendContextChanged} />
          </div>
          <ChatContainer userFromId={activeUserId} userTo={stateOfPage == -1 ? null : stateOfPage} online_uuid={online_uuid} />
        </div>

      ) : (
        <p>Loading data...</p>
      )}


    </div>
  );
}

export default Dashboard;

/*
possible stages of page:
  false -> not yet loaded
  -1 -> loaded but no friend chosen
  {friend} -> chosen friend
*/