import '../GamePage.css';
import {useState} from "react";
import socket from '../socket'
import {Link} from 'react-router-dom'
function Dialogue(){
    const [username, setUsername] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };
    
      const handleSubmit = () => {
        if (!username) {
          return;
        }
        socket.emit("username", username);
      };
    return (
        <div className="dialogue-container">
            <h2>Enter Username</h2>
            <p>Please enter a username</p>
            <br></br>
            <form className="username-form">
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="username-input"
                    onChange={handleUsernameChange}
                    required
                />
                <br />
                <Link to={username ? "/Play" : ""}>
                    <input
                    type="button"
                    value="Submit"
                    className="username-button"
                    onClick={handleSubmit}
                    />
                </Link>
            </form>
        </div>
    );
}
export default function MultiSetupPage(){
    return (
        <div className="container">
            <Dialogue></Dialogue>
        </div>
    );
}