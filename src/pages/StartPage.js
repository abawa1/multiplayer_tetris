import {Link} from 'react-router-dom'
export default function StartMenu(){
    return(
        <div className="start-container">
            <div className="start-menu">
                <h1 className="title">Tetris</h1>
                <Link to='/Play'>
                    <button className="play-button">Play</button>
                </Link>
            </div>
        </div>
    );
}