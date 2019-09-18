let map = new Map();
map.set("whiterook1",white_rook1);
map.set("whiteknight1",white_knight1);
map.set("whitebishop1",white_bishop1);
map.set("whitequeen",white_queen);
map.set("whiteking",white_king);
map.set("whitebishop2",white_bishop2);
map.set("whiteknight2",white_knight2);
map.set("whiterook2",white_rook2);
map.set("whitepawn1",white_pawn1);
map.set("whitepawn2",white_pawn2);
map.set("whitepawn3",white_pawn3);
map.set("whitepawn4",white_pawn4);
map.set("whitepawn5",white_pawn5);
map.set("whitepawn6",white_pawn6);
map.set("whitepawn7",white_pawn7);
map.set("whitepawn8",white_pawn8);
map.set("blackrook1",black_rook1);
map.set("blackknight1",black_knight1);
map.set("blackbishop1",black_bishop1);
map.set("blackqueen",black_queen);
map.set("blackking",black_king);
map.set("blackbishop2",black_bishop2);
map.set("blackknight2",black_knight2);
map.set("blackrook2",black_rook2);
map.set("blackpawn1",black_pawn1);
map.set("blackpawn2",black_pawn2);
map.set("blackpawn3",black_pawn3);
map.set("blackpawn4",black_pawn4);
map.set("blackpawn5",black_pawn5);
map.set("blackpawn6",black_pawn6);
map.set("blackpawn7",black_pawn7);
map.set("blackpawn8",black_pawn8);


 
function movesHighlight(arg) {
    console.log(possibleMoves);
    for(let i=0;i<possibleMoves.length;i++) {
        let field=possibleMoves[i];
        let element = document.getElementById(field);
        element.classList.remove("black");
        element.classList.remove("white");
        element.classList.add("clr");
    } 
}

    function removeHighlight(arg) {
        let field = "";
        console.log(arg);
        for(let x=0;x<possibleMoves.length;x++) {
            document.getElementById(possibleMoves[x]).classList.remove("clr");
            document.getElementById(possibleMoves[x]).classList.remove("field")
            let str = possibleMoves[x].split("+");
            let i = str[0];
            let j  = str[1];
            if(i%2 === 0 && j%2 ===0) {
                document.getElementById(possibleMoves[x]).classList.add("black");
                document.getElementById(possibleMoves[x]).classList.add("field");
            }
            else if(i%2 === 0 && j%2 ===1) {
                document.getElementById(possibleMoves[x]).classList.add("white");
                document.getElementById(possibleMoves[x]).classList.add("field");

            }
            if(i%2 !== 0 && j%2 ===1) {
                document.getElementById(possibleMoves[x]).classList.add("black");
                document.getElementById(possibleMoves[x]).classList.add("field");

            }
            else if(i%2 !== 0 && j%2 !==1) {
                document.getElementById(possibleMoves[x]).classList.add("white");
                document.getElementById(possibleMoves[x]).classList.add("field");

            }
        }
        possibleMoves.splice(0,possibleMoves.length);
    
    }

function moves(arg) {
    if(clicked === false) {

    }
    else {
        
    }
}

