import './GamePage.css';
function Cell(){
    return (
        <div className="cell"></div>
    );
}
function Board(){
    const cells=[];
    for(let i=0;i<200;i++){
        cells.push(<Cell key={i}></Cell>);
    }
    return (
        <div class="board-container">
            {cells}
        </div>
    );
}
function TextDisplay({metric,value}){
    return (
        <h3>{metric}: {value}</h3>
    );
}
function Sidebar(){
    return(
        <div className="sidebar">
            <h1 className="title">Tetris</h1>
            <TextDisplay
                metric="Score"
                value={0}
            />
            <TextDisplay
                metric="Lines"
                value={0}
            />
            <TextDisplay
                metric="Level"
                value={0}
            />
            <button className="play-button">Play</button>
        </div>
    );
}
function Page(){
    return (
        <div className="container">
            <Sidebar></Sidebar>
            <Board></Board>
        </div>
    );
}
export default Page;