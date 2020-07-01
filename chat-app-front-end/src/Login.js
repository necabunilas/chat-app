import React ,{ useState } from "react";
import Header from "./Header";

export default function Login(props){

    const [creds, setCreds] = useState({username: "", password: ""});
  
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
  
    function handleClick(event){
        
      event.preventDefault();
      props.getCreds(creds);
  
    }
  
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