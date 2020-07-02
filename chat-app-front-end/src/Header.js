import React from "react";
import Button from "./Button";

export default function Header(props){
    return (
        <div>
            <div>
                <h1>Chat App</h1>
                {props.username && <Button disconnect={props.disconnect}/>}
            </div>
            <hr />
        </div>
    );
  }
