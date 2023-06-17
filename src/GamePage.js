import './GamePage.css';
import Cell from './Cell.js'
import NextBlock from './NextBlock.js'
import ScoreBoard from './ScoreBoard.js'
import Popup from './Popup.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers'
import {useSelector, useDispatch} from 'react-redux'
import {pieces} from './utils'
import {useEffect,useRef} from 'react'
import {moveDown} from './actions'
function Board(){
    const game=useSelector((state)=>state.game);
    const {grid,piece,rotation,x,y,isRunning,score,lines,level,speed}=game;
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
    const requestRef=useRef();
    const lastUpdateTimeRef=useRef(0);
    const progressTimeRef=useRef(0);
    const dispatch=useDispatch();
    const update=(time)=>{
        requestRef.current=requestAnimationFrame(update);
        if(!isRunning){
            return;
        }
        if(!lastUpdateTimeRef.current){
            lastUpdateTimeRef.current=time;
        }
        const deltaTime=time-lastUpdateTimeRef.current;
        progressTimeRef.current+=deltaTime;
        if(progressTimeRef.current>speed){
            dispatch(moveDown());
            progressTimeRef.current=0;
        }
        lastUpdateTimeRef.current=time;
    }
    useEffect(()=>{
        requestRef.current=requestAnimationFrame(update);
        return ()=>cancelAnimationFrame(requestRef.current)
    },[isRunning]);
    return (
        <div class="board-container">
            {cells}
        </div>
    );
}
function Page(){
    const store=createStore(reducers);
    return (
        <Provider store={store}>
            <div className="container">
                <div className="side-area">
                    <NextBlock></NextBlock>
                    <ScoreBoard></ScoreBoard>
                </div>
                <Board></Board>
            </div>
            <Popup></Popup>
        </Provider>
    );
}
export default Page;