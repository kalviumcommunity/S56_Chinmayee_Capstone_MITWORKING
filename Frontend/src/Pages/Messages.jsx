import React, { useState, useEffect, useRef } from 'react'
import './Messages.css'
import home from '../assets/home.png'
import chat from '../assets/chat.png'
import edit from '../assets/edit.png'
import theme from '../assets/theme.png'
import profile from '../assets/profile-user.png'
import logo from '../assets/logo.png'
import profile1 from  '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile3 from '../assets/profile4.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { io } from 'socket.io-client';


export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    socket.current = io('https://s56-chinmayee-capstone-mitworking.onrender.com'); 
    socket.current.on('getMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.current.emit('addUser', userId);
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/${userId}`);
        const followingIds = res.data.following;

        if (followingIds.length > 0) {
          const usersRes = await axios.post('https://s56-chinmayee-capstone-mitworking.onrender.com/getByIds', {
            ids: followingIds,
          });
          setContacts(usersRes.data);
        }
      } catch (error) {
        console.log('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/message/${currentChat._id}`);
          setMessages(res.data);
        } catch (error) {
          console.log('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [currentChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      chatId: currentChat._id,
      senderId: userId,
      text: newMessage,
    };

    try {
      const res = await axios.post('https://s56-chinmayee-capstone-mitworking.onrender.com/message', message);
      setMessages([...messages, res.data]);
      socket.current.emit('sendMessage', {
        chatId: currentChat._id,
        senderId: userId,
        text: newMessage,
      });
      setNewMessage('');
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const isUserOnline = (contactId) => {
    return onlineUsers.some((user) => user.userId === contactId);
  };

  return (
    <div className='msg-page'>
      {/* navbar */}
      <nav>
        <img className='msg-logo' src={logo} alt="logo of website" />

        <div className='msg-icons'>
            <Link to={'/home'}><img src={home} alt="home icon" /></Link>
            <Link to={'/messages'}><img src={chat} alt="chat icon" /></Link>
            <Link to={'/upload'}><img src={edit} alt="edit icon" /></Link>
            <Link to={'/theme'}><img src={theme} alt="theme icon" /></Link>
            <Link to={'/profile'}><img src={profile} alt="profile icon" /></Link>
        </div>
      </nav>

      <div className='msg-container'>
        {/* left side */}
        <div className='contacts'>
            <h2>Messages</h2>
            {contacts.map((contact) => (
            <div key={contact._id} className={`prev-contact ${currentChat && currentChat._id === contact._id ? 'active' : ''}`} onClick={() => setCurrentChat(contact)}>
              <img src={contact.profilePicture || profile1} alt="profile of contact" />
              <div>
                <h3>{contact.username}</h3>
                <h4>{isUserOnline(contact._id) ? 'Online' : 'Offline'}</h4>
              </div>
            </div>
            ))}

        </div>
        
        {/* right side */} 

        <div className='chat-section'>
          {currentChat ? (
            <>
              <div className='chat-info'>
                <img src={currentChat.profilePicture || profile1} alt="profile of current contact" />
                <div className='curr-contact'>
                  <h3>{currentChat.username}</h3>
                  <h4>{isUserOnline(currentChat._id) ? 'Online' : 'Offline'}</h4>
                </div>
              </div>

              <div className='msg-div'>
                {messages.map((msg, index) => (
                  <div key={index} className={msg.senderId === userId ? 'msg1' : 'msg2'}>
                    <div className={msg.senderId === userId ? 'sent-msg' : 'received-msg'}>
                      <p>{msg.text}</p>
                      <span className='msg-time'>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}

                <form onSubmit={handleSendMessage}>
                  <input type="text" placeholder='Type your message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                </form>
              </div>
            </>
          ) : (
            <span className='no-conversation-text'>Open a conversation to start a chat.</span>
          )}
        </div>

      </div>

    </div>
  )
}
