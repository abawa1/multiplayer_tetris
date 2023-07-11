import {Link} from 'react-router-dom'
import '../GamePage.css';
export default function StartMenu(){
    return(
        <div className="start-container">
            <div className="start-menu">
                <h1 className="title">Tetris</h1>
                <Link className="buttons" to='/Play'>
                    <button className="play-button">Singleplayer</button>
                </Link>
                <Link className="buttons" to='/Setup'>
                    <button className="play-button">Multiplayer</button>
                </Link>
            </div>
        </div>
    );
}