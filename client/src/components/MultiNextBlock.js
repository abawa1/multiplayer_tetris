import Cell from './Cell.js'
import {useSelector} from 'react-redux'
import {pieces} from '../utils'

export default function MultiNextBlock({player}){
    const nextPiece=useSelector((state)=>state[player].nextPiece);
    const box=pieces[nextPiece][0];
    const grid=box.map((rowArray,row)=>{
        return rowArray.map((square,col)=>{
            return <Cell key={`${row}${col}`} color={square}></Cell>
        })
    })
    return (
        <div className="next-block">
            {grid}
        </div>
    )
}