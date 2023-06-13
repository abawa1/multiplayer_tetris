import './GamePage.css';
import Cell from './Cell.js'
import NextBlock from './NextBlock.js'
import ScoreBoard from './ScoreBoard.js'
function Board(){
    const cells=[];
    for(let i=0;i<20;i++){
        for(let j=0;j<10;j++){
            cells.push(<Cell key={`${i}${j}`} color='0'></Cell>);
        }
    }
    return (
        <div class="board-container">
            {cells}
        </div>
    );
}
function Page(){
    return (
        <div className="container">
            <div className="side-area">
                <NextBlock></NextBlock>
                <ScoreBoard></ScoreBoard>
            </div>
            <Board></Board>
        </div>
    );
}
export default Page;