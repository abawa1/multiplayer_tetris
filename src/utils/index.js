import Piece from './piece.js'

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

const L=new Piece(
    [[0,0,1,0],
     [1,1,1,0],
     [0,0,0,0],
     [0,0,0,0]]);
const L2=new Piece(
   [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]]);
const L3=new Piece(
    [[0,0,0,0],
     [1,1,1,0],
     [1,0,0,0],
     [0,0,0,0]]);
const L4=new Piece(
    [[1,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,0,0,0]]);
L.setNext(L2); L2.setNext(L3); L3.setNext(L4); L4.setNext(L1);
export const pieces={
'L':L,
/*    'O':,
'J':,
'T':,
'S':,
'I':,
'Z':*/
}
