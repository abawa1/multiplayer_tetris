import Cell from './Cell.js'
export default function NextBlock(props){
    const box=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
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