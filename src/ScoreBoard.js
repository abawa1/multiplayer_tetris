export default function ScoreBoard(){
    return(
        <div className="scoreboard">
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
    );
}
function TextDisplay({metric,value}){
    return (
        <h3>{metric}: {value}</h3>
    );
}