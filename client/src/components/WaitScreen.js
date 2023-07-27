
export default function WaitScreen({roomId}){
    return (
        <div className="wait-screen">
            <h2>Room ID: {roomId}</h2>
            <h2>Send this to your opponent so they can join</h2>
        </div>
    )
}