import '../GamePage.css';
import NextBlock from '../components/NextBlock.js'
import ScoreBoard from '../components/ScoreBoard.js'
import {Buttons} from '../components/ScoreBoard.js'
import Popup from '../components/Popup.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers'
import {Board} from './GamePage'
import Controls from '../components/Controls'
import Timer from '../components/Timer'
export default function MultiGamePage({cleanup}){
    const gameManager=createStore(reducers);
    return(
        <Provider store={gameManager}>
            <div className="container">
                <Popup></Popup>
                <Timer></Timer>
                <Board></Board>
                <Controls></Controls>
                    <div className="side-area-multi">
                        <NextBlock></NextBlock>
                        <ScoreBoard></ScoreBoard>
                    </div>
                    <div className="side-area-multi">
                        <div className="buttons-container-multi">
                            <Buttons></Buttons>
                        </div>
                        <ScoreBoard></ScoreBoard>
                    </div>
                <Board></Board>
            </div>
        </Provider>
    )
};