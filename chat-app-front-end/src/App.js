import React, { useState, useEffect } from "react";
import io from "socket.io-client";

//main socket connection
const socket = io.connect('http://localhost:5000')

function Button(){
  
  function handleClick(event){
    socket.emit('forceDisconnect');
    window.location.reload(true);
  }
  
  return (
    <button onClick={handleClick} className="logout-btn">Logout</button>
  );
}

function Header(props){
  return (
      <div>
          <div>
              <h1>Chat App</h1>
              {props.username === "" ? null : <Button />}
          </div>
          <hr />
      </div>
  );
}

function Chat(props){

  const [chat, setChat] = useState("");
  const [messages, setTextBox] = useState([]);

  function handleChange(event){
      const {value} = event.target;
      setChat(value);
  }

  //Listener
  useEffect(function(){
      //reply for logging in
      socket.on('message', (data) => {
        //message received
        const {username, message} = data;
        setTextBox((prev) => {
          return [...prev, {username, message}]
        })
      })
      
  },[])

  function handleClick(event){
      
    event.preventDefault();
      if(chat === ""){
        
      }else{
        socket.emit('message', { 
          username: props.username, 
          message: chat
        });
      }

      setChat("");
  }


  function showOutput(message, index){
    const alt = "You";
    return (
      <div key={index} style={message.username === props.username ? {textAlign: "right"}: {textAlign: "left"}} className={`message`}>
        <div className='message-body'>
          { message.message }
        </div>
        <div className='username'>
          { message.username === props.username ? alt : message.username}
        </div>
      </div>
    )
  }
  
  return (
    <div className="container">
        <Header username={props.username}/>
        <form>
        <div className="output">
          {messages.map(showOutput)}
        </div>
        <hr />
        <div className="input">
          <input
            className="text-field"
            name="message"
            type="text"
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            value={chat}
            placeholder="Start a new message"
            onChange={handleChange}
          />
        <button className="send-btn" onClick={handleClick}>Send</button>
        </div>
      </form>
    </div>
  );
}

export default function App() {

  const [creds, setCreds] = useState({username: "", password: ""});
  const [loggedState, setState] = useState(false);

  function handleChange(event){
      const {name, value} = event.target;
      setCreds(prev => {
          if(name === "username"){
              return {
                  username: value,
                  password: prev.password
              }
          }else{
              return {
                  username: prev.username,
                  password: value
              }
          }
      })
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
      
  },[])

  function handleClick(event){
      
      socket.emit('login', { 
          username: creds.username, 
          password: creds.password 
      });
      
      event.preventDefault();

  }

  if(loggedState === true){
    return <Chat username={creds.username}/>
  }else{
    return (
      <div className="container">
      <div className="login">
          <Header username=""/>
          <form>
              <div>
                <input
                    className="username-in"
                    onChange={handleChange}
                    id="outlined-multiline-static"
                    variant="outlined"
                    name="username"
                    type="text"
                    value={creds.username}
                    placeholder="Username"
                />
              </div>
              <div>
                <input
                   className="password-in"
                   onChange={handleChange}
                   id="outlined-multiline-static"
                   variant="outlined"
                   name="password"
                   type="password"
                   value={creds.password}
                   placeholder="password"
                />
              </div>    
              <button className="login-btn" onClick={handleClick}>Sign up/Log in</button>
            </form>
            <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will be able to find you by searching for you email address or phone number when provided.</p>
    </div>
    </div>
    );
  }
}
