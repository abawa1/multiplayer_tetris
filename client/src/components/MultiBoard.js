import Cell from '../components/Cell.js'
import {pieces} from '../utils'
import {useSelector} from 'react-redux'
export function MultiBoard({player}){
    const game=useSelector((state)=>state[player]);
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