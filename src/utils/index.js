export const random=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1))+min;
}
export const defaultGrid=()=>{
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


export const pieces=[
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

export const generateRandomPiece=()=>{
    return random(1,pieces.length-1)
};

export const defaultGameState=()=>{
    return{
        grid: defaultGrid(),
        piece: generateRandomPiece(),
        rotation: 0,
        x: 5,
        y: -4,
        nextPiece: generateRandomPiece(),
        isRunning:true,
        score: 0,
        lines: 0,
        level: 1,
        speed: 1000,
        gameOver: false
    }
}

export const nextRotation=(piece,rotation)=>{
    return (rotation+1)&pieces[piece].length
}
export const canMoveTo=(piece,grid,x,y,rotation)=>{
    const currentPiece=pieces[piece][rotation]
    for(let r=0;r<currentPiece.length;r++){
        for(let c=0;c<currentPiece[r].length;c++){
            if(currentPiece[r][c]!==0){
                const newX=c+x;
                const newY=r+y;
                if(newY<0){
                    continue;
                }
                const newRow=grid[newY];
                if(newRow){
                    if(newRow[newX]===undefined||newRow[newX]!==0){
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
        }
    }
    return true;
}
