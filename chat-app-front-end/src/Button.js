import React from "react";

export default function Button(props){
  
    function handleClick(event){
      props.disconnect();
      window.location.reload(true);
    }
    
    return (
      <button onClick={handleClick} className="logout-btn">Logout</button>
    );
}