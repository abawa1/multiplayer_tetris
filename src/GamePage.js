import './GamePage.css';
function Board(){
    return (
        <div classname="board"></div>
    )
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
        </div>
    )
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