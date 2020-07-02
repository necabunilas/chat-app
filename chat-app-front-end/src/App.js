import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./Login";
import Chat from "./Chat";

//main socket connection
const socket = io.connect('http://localhost:5000')

export default function App() {

  const [loggedState, setState] = useState(false);
  const [user, setUser] = useState("");
  const [messages, setTextBox] = useState([]);

  function getState(creds){
    setUser(creds.username);
    socket.emit('login', creds);
  }

  function sendData(message){
    socket.emit('message', { 
      username: user, 
      message: message
    });
  }

  function disconnect(){
    socket.emit('forceDisconnect');
  }

  //Listener
  useEffect(function(){
      //reply for logging in
      socket.on('login', (data) => {
          if(data === "ok"){
              setState(true);
          }else if(data === "wp"){
              alert("Wrong Password!");
              window.location.reload(true);
          }else{
              alert("Error logging in!");
              window.location.reload(true);  
          }
      })

      socket.on('message', (data) => {
        //message received
        const {username, message} = data;
        setTextBox((prev) => {
          return [...prev, {username, message}]
        })
      })
      
  },[])

  if(loggedState){
    return <Chat username={user}
                 sendData={sendData}
                 messages={messages}
                 disconnect={disconnect}
    />
  }else{
    return <Login getCreds={getState}/>
  }
}
