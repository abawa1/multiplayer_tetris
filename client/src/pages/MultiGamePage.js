import '../GamePage.css';
import Cell from '../components/Cell.js'
import NextBlock from '../components/NextBlock.js'
import ScoreBoard from '../components/ScoreBoard.js'
import {Buttons} from '../components/ScoreBoard.js'
import Popup from '../components/Popup.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers'
import {useSelector, useDispatch} from 'react-redux'
import {pieces} from '../utils'
import {useEffect,useRef} from 'react'
import {moveDown} from '../actions'
import {Board} from './GamePage'
import Controls from '../components/Controls'
export default function MultiGamePage(){
    const gameManager=createStore(reducers);
    const store1=createStore(reducers);
    const store2=createStore(reducers);
    return(
        <Provider store={gameManager}>
            <div className="container">
                    <Board></Board>
                    <Controls></Controls>
                        <div className="side-area-multi">
                            <NextBlock></NextBlock>
                            <ScoreBoard></ScoreBoard>
                        </div>
                        <div className="buttons-container-multi">
                            <Buttons></Buttons>
                        </div>
                        <div className="side-area-multi">
                            <NextBlock></NextBlock>
                            <ScoreBoard></ScoreBoard>
                        </div>
                <Board></Board>
                <Popup></Popup>
            </div>
        </Provider>
    )
};