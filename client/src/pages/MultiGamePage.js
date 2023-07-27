import '../GamePage.css';
import MultiNextBlock from '../components/MultiNextBlock.js'
import MultiScoreBoard from '../components/MultiScoreBoard.js'
import {MultiButtons} from '../components/MultiScoreBoard.js'
import MultiPopup from '../components/MultiPopup.js';
import {MultiBoard} from '../components/MultiBoard'
import MultiControls from '../components/MultiControls'
import WaitScreen from '../components/WaitScreen';
import {reducer} from '../socket'
import {Provider} from 'react-redux'
export default function MultiGamePage({roomId}){
    return(
        <Provider store={reducer}>
            <MultiControls></MultiControls>
        <div className="container">
            
            <MultiPopup></MultiPopup>
            <MultiBoard player={"player1"}></MultiBoard>
            <div className="side-area-multi">
                <MultiNextBlock player={"player1"}></MultiNextBlock>
                <MultiScoreBoard player={"player1"}></MultiScoreBoard>
            </div>
            <div className="buttons-container-multi">
                <MultiButtons player={"player1"}></MultiButtons>
            </div>
            <div className="side-area-multi">
                <MultiNextBlock player={"player2"}></MultiNextBlock>
                <MultiScoreBoard player={"player2"}></MultiScoreBoard>
            </div>
            <MultiBoard player={"player2"}></MultiBoard>
            <WaitScreen roomId={roomId}></WaitScreen>
        </div>
        </Provider>
    )
};