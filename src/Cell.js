import './GamePage.css'
export default function Cell(props){
    const classes=`cell color-${props.color}`
    return (
        <div className={classes}></div>
    );
}