import React ,{ useState } from "react";
import Header from "./Header";

export default function Chat(props){

    const [chat, setChat] = useState("");
  
    function handleChange(event){
        const {value} = event.target;
        setChat(value);
    }
  
    function handleClick(event){
        
        event.preventDefault();
        props.sendData(chat);
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
          <Header username={props.username}
                  disconnect={props.disconnect}
          />
          <form>
          <div className="output">
            {props.messages.map(showOutput)}
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