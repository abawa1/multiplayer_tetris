const random=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1))+min;
}
const defaultGrid=()=>{
    const rows=20;
    const cols=10;
    const grid=[];
    for(let r=0;r<rows;r++){
        let temp=[];
        for(let c=0;c<cols;c++){
            temp.push(0);
        }
        grid.push(temp);
    }
    return grid;
}


const pieces=[
    //none
   [[[0,0,0,0],
     [0,0,0,0],
     [0,0,0,0],
     [0,0,0,0]]],
    
    //L
  [[[0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],
    
    [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]],

    [[0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]],

    [[1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]]],

    //O
    [[[0,2,2,0],
      [0,2,2,0],
      [0,0,0,0],
      [0,0,0,0]]],

    //J
    [[[3,0,0,0],
      [3,3,3,0],
      [0,0,0,0],
      [0,0,0,0]],
      
    [[0,3,3,0],
     [0,3,0,0],
     [0,3,0,0],
     [0,0,0,0]],
    
    [[0,0,0,0],
     [3,3,3,0],
     [0,0,3,0],
     [0,0,0,0]],
    
    [[0,3,0,0],
     [0,3,0,0],
     [3,3,0,0],
     [0,0,0,0]]],

    //T
   [[[0,4,0,0],
    [4,4,4,0],
    [0,0,0,0],
    [0,0,0,0]],
    
    [[0,4,0,0],
    [0,4,4,0],
    [0,4,0,0],
    [0,0,0,0]],

    [[0,0,0,0],
    [4,4,4,0],
    [0,4,0,0],
    [0,0,0,0]],

    [[0,4,0,0],
    [4,4,0,0],
    [0,4,0,0],
    [0,0,0,0]]],

    //S
    [[[0,0,0,0],
    [0,5,5,0],
    [5,5,0,0],
    [0,0,0,0]],

    [[0,5,0,0],
    [0,5,5,0],
    [0,0,5,0],
    [0,0,0,0]]],

    //I
    [[[0,0,0,0],
    [6,6,6,6],
    [0,0,0,0],
    [0,0,0,0]],

    [[0,6,0,0],
    [0,6,0,0],
    [0,6,0,0],
    [0,6,0,0]]],

    //Z
    [[[0,0,0,0],
    [7,7,0,0],
    [0,7,7,0],
    [0,0,0,0]],

    [[0,0,7,0],
    [0,7,7,0],
    [0,7,0,0],
    [0,0,0,0]]]
    
];

const generateRandomPiece=()=>{
    return random(1,pieces.length-1)
};
const defaultGameState=()=>{
    return{
        roomId:null,
        grid: defaultGrid(),
        piece: generateRandomPiece(),
        rotation: 0,
        x: 5,
        y: -4,
        nextPiece: generateRandomPiece(),
        isRunning:true,
        score: 0,
        lines: 0,
        level: 0,
        speed: 1000,
        gameOver: false
    }
}
const nextRotation=(piece,rotation)=>{
    return (rotation+1)%pieces[piece].length
}
const canMoveTo = (piece, grid, x, y, rotation) => {
    const currentShape = pieces[piece][rotation]
    // Get the width and height of the grid
    const gridWidth = grid[0].length - 1
    const gridHeight = grid.length - 1
    // Loop over the shape array
    for (let row = 0; row < currentShape.length; row++) {
        for (let col = 0; col < currentShape[row].length; col++) {
            // If the value isn't 0 it's part of the shape
            if (currentShape[row][col] !== 0) {
                // Offset the square to map it to the larger grid
                const proposedX = col + x
                const proposedY = row + y
                // Get the possible row. This might be undefined if we're above the top
                const possibleRow = grid[proposedY]
                // Off the left or right side or off the bottom return false
                if (proposedX < 0 || proposedX > gridWidth || proposedY > gridHeight) {
                    return false
                } else if (possibleRow !== undefined) {
                    // If the row is not undefined you're on the grid
                    if (possibleRow[proposedX] !== 0) {
                        // This square must be filled
                        return false
                    }
                }
            }
        }
    }
    return true
}

const addBlockToGrid=(piece,grid,x,y,rotation)=>{
    let blockOffGrid=false;
    const block=pieces[piece][rotation]
    const newGrid=[...grid];
    for(let r=0;r<block.length;r++){
        for(let c=0;c<block.length;c++){
            if(block[r][c]!==0){
                const newY=r+y;
                if(newY<0){
                    blockOffGrid=true;
                }
                else{
                    newGrid[r+y][c+x]=piece;
                }
            }
        }
    }
    return {grid:newGrid,gameOver:blockOffGrid};
}

const checkRows=(grid,level)=>{
    let completedRows=0;
    for(let r=0;r<grid.length;r++){
        if(grid[r].indexOf(0)===-1){
            completedRows+=1;
            grid.splice(r,1);
            grid.unshift(Array(10).fill(0));
        }
    }
    const defaultPoints = [0,40,100,300,1200];
    let points=[];
    for(let l=0;l<5;l++){
        points.push(defaultPoints[l]*(level+1));
    }
    return [points[completedRows],completedRows];
}
module.exports={
    defaultGameState,
    generateRandomPiece,
    nextRotation,
    canMoveTo,
    addBlockToGrid,
    checkRows
};