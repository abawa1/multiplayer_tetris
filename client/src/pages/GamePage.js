import '../GamePage.css';
import Cell from '../components/Cell.js'
import NextBlock from '../components/NextBlock.js'
import ScoreBoard from '../components/ScoreBoard.js'
import Popup from '../components/Popup.js';
import {useSelector} from 'react-redux'
import {pieces} from '../utils'
import Controls from '../components/Controls'
import {Buttons} from '../components/ScoreBoard'
import Timer from '../components/Timer'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers/index'
export function Board(){
    const game=useSelector((state)=>state.game);
    const {grid,piece,rotation,x,y}=game;
    const block=pieces[piece][rotation]
    const blockColor=piece;
    const cells=grid.map((rowArray,row)=>{
        return rowArray.map((square,col)=>{
            const blockX=col-x;
            const blockY=row-y;
            let color=square;
            if(blockX>=0&&blockX<block.length&&blockY>=0&&blockY<block.length){
                color=block[blockY][blockX]===0?color:blockColor;
            }
            const key=row*grid[0].length+col;
            return <Cell key={key} color={color}></Cell>
        })
    })
    return (
        <div className="board-container">
            {cells}
        </div>
    );
}
function GamePage(){
    const store=createStore(reducers);
    return (
        <Provider store={store}>
        <Timer></Timer>
        <Controls></Controls>
        <div className="container">
            <Popup></Popup>
            <div className="side-area">
                <NextBlock></NextBlock>
                <ScoreBoard></ScoreBoard>
                <Buttons></Buttons>
            </div>
            <Board></Board>
        </div>
        </Provider>
    );
}
export default GamePage;