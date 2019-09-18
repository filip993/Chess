let table = [];
let table2=[];
let possibleMoves= [];
tableFigures();
addEvents();
let clicked=false;
//let figure = "";
let figureHtml= "";
let figure_object = null;
let variable = null;
let classes = ""; 
let classBefore = "";
let idBefore = "";

function addEvents() {

    let fields= document.getElementsByClassName("field");
    
    for(let i=0;i<fields.length;i++) {
        fields[i].addEventListener("click", function() {  
            
            variable = this;
            classes = variable.className.split(" ");
            console.log(variable);
            if(clicked === false && classes.length === 3 ) {
                classBefore = classes[2];
                idBefore = variable.id;
                selectFigure();
                movesHighlight(classes[2]);
             }

            //IF CLICKED ON EMPTY FIELD WHEN FIGURE IS CHOSEN
             if(clicked === true && classes.length === 2) {
                moveFigure();
            }

            //IF CLICKED ON FIGURE
            if(clicked === true && classes.length === 3) {
                    Game();
            }
        })
    }
}

function selectFigure() {
    figure_object = map.get(classes[2]);
    console.log(figure_object);
    figureHtml = variable.innerHTML;
    figure_object.movement();
    clicked = true;
    variable = null;
    classes = "";
}

function moveFigure() {
    let x = figure_object.x;
    let y = figure_object.y;
    let result = x + "+" + y;
    let move  = variable.id.split("+");
    document.getElementById(idBefore).classList.remove(classBefore);
    classBefore = "";
    idBefore = "";
    for(let i=0;i<possibleMoves.length;i++) {
        if(variable.id === possibleMoves[i]) {
            console.log(figure_object);
            document.getElementById(result).innerHTML = " ";
            variable.innerHTML = figureHtml;
            removeHighlight(classes);
            figure_object.x = parseInt(move[0]);
            figure_object.y = parseInt( move[1]);
            document.getElementById(variable.id).classList.add(figure_object.name);
            clicked = false;
            variable = null;
            classes = "";
            figure_object = null;
            break;
        }
    }
}

function Game() {
    
        if(clicked === true) {
        let allowed = false;
        if(classes.length === 2) {
            for(let i=0;i<possibleMoves.length;i++) {
                if(variable.id === possibleMoves[i]) {
                    document.getElementById(possibleMoves[i]).innerHTML = figurehtml;
                    document.getElementById(possibleMoves[i]).classList.add(figure_object.name); 
                    let x = figure_object.x;
                    let y = figure_object.y;
                    let fieldHTML = "" + x + "+" + y;                                                                                    
                    document.getElementById(fieldHTML).innerHTML = "";
                    //document.getElementById(fieldHTML).classList.remove(figure_object);                                                   
                    allowed = true;
                    let id = variable.id.split("+");
                    figure_object.x = parseInt(id[0]);
                    figure_object.y = parseInt(id[1]);
                    removeHighlight();                                
                    clicked = false;
                    break;
                }
            }
            if(allowed === false) {alert("NOT ALLOWED TO PLAY HERE"); }
        }
        else if(classes.length === 3) {
            removeHighlight();
            if(classes[2].length > classes[0].length) {   
                movesHighlight(classes[2]);
            }
            else {
                movesHighlight(classes[0]);
            }
            clicked = true;
            figurehtml = figure;
        }
    }            
}



function tableFigures() {
    for(let i=0;i<8;i++) {
        table.push([]);
        table2.push([]);
        for(let j=0;j<8;j++) {  
            if(i%2===0) {
                if(j%2===0) {
                    table[i].push(0);
                    table2[i].push(0);
                }
                else {
                    table[i].push(1);
                    table2[i].push(1);
                } 
            }
            else {
                if(j%2===0) {
                    table[i].push(1);
                    table2[i].push(1);
                } 
                else {
                    table[i].push(0);
                    table2[i].push(0);
                }
            }
        }
    }
}

function Figures(x,y,color,name,worth) {
        this.x=x;
        this.y=y;
        this.color=color;
        this.name=name;
        this.worth=worth;
        this.movement= function() {
            if(this.color === "white") {
                if(table[this.x+1][this.y] !== Figures) {
                    let possibleMove = "";
                    let z = this.x + 1;
                    possibleMove = "" + z + "+" + this.y;
                    possibleMoves.push(possibleMove);
                    if(this.x === 1) {
                        if(table[this.x+2][this.y]===1 || table[this.x+2][this.y]===0) {
                            z = this.x + 2;
                            possibleMove = "" + z + "+" + this.y;
                            possibleMoves.push(possibleMove); 
                    }
                }
            }
            }
            else {
                if(table[this.x-1][this.y] !== Figures) {
                    let possibleMove = "";
                    let z = this.x - 1;
                    possibleMove = "" + z + "+" + this.y;
                    possibleMoves.push(possibleMove);
                    if(this.x === 6) {
                        if(table[this.x-2][this.y] === 1 || table[this.x-2][this.y] === 0) {
                            z = this.x - 2;
                            possibleMove = "" + z + "+" + this.y;
                            possibleMoves.push(possibleMove); 
                    }
                }
            }                
        }
    }
        table[x][y]=this;
}

const white_rook1 = new Figures(4,2,"white","whiterook1",5);
table2[4][5]=white_rook1;
white_rook1.movement = function() {
   
    let z = this.y;
    let possibleMove = "";
    for(let i=this.x;i<8;i++) {
        if(table2[i][z] === 0 || table2[i][z] === 1 || table2[i][z] === this) {
            possibleMove = "" + i + "+" +  z;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
    for(let i=this.x;i>=0;i--) {
        if(table2[i][z] === 0 || table2[i][z] === 1 || table2[i][z] === this) {
            possibleMove = "" + i + "+" +  z;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
    let i=this.x;
    for(let j=this.y;j<8;j++) {
        if(table2[i][j]===0 || table2[i][j]===1 || table2[i][j] === this) {
            possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        else {
            break;  
        }
    }

    for(let j=this.y;j>=0;j--) {
        if(table2[i][j]===0 || table2[i][j]===1 || table2[i][j] === this) {
            possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
}

const white_knight1 = new Figures(0,1,"white","whiteknight1",3);
white_knight1.movement = function() {
    if(this.x < 7) {
        if(this.y < 6 ) {
            let i = this.x + 1;
            let j = this.y + 2;
            if(table[i][j] === 0 || table[i][j] === 1) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove); 
            }
            else {
                if(table[i][j].color === "black") {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            }
        }
        if(this.y > 1) {
            let i = this.x + 1;
            let j = this.y - 2;
            
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
            else {
                if(table[i][j].color === "black")  {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            }
        }
    }
    if(this.x > 0) {
        if(this.y < 6 && this.y > 1) {
            let i = this.x - 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
            else {
                if(table[i][j].color === "black") {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            }
        }
        if(this.y > 1 && this.y < 6 ) {
            let i = this.x - 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
            else {
                if(table[i][j].color === "black") {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            }
        }     
    }

    if(this.y < 7) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
            else {
                if(table[i][j].color === "black") {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            } 
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
            else {
                if(table[i][j].color === "black") {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            }
        }
    }

    if(this.y > 0 ) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
            else {
                if(table[i][j].color === "black") {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            }
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
            else {
                if(table[i][j].color === "black") {
                    let possibleMove = "" + i + "+" +  j;
                    possibleMoves.push(possibleMove);
                }
            }
        }
    }

    console.log("white knight movement");
}
   
const white_bishop1 = new Figures(5,3,"white","whitebishop1",3);
white_bishop1.movement = function() {
    for(let i=this.x,j=this.y;i<8 && j<8;i++,j++) {
        possibleMove = "" + i + "+" +  j;  
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i>=0 && j<8;i--,j++) {
        possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i>=0 && j>=0;i--,j--) {
        possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i<8 && j>=0;i++,j--) {
        possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    console.log("white bishop movement");
}

const white_queen = new Figures(0,3,"white","whitequeen",10);
white_queen.movement = function() {

    for(let i=this.x,j=this.y;i<8 && j<8;i++,j++) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i>=0 && j<8;i--,j++) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i>=0 && j>=0;i--,j--) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i<8 && j>=0;i++,j--) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    let z = this.y;
    let possibleMove = "";
    for(let i=this.x;i<8;i++) {
        if(table2[i][z] === 0 || table2[i][z] === 1 ) {
            possibleMove = "" + i + "+" +  z;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
    for(let i=this.x;i>=0;i--) {
        if(table2[i][z] === 0 || table2[i][z] === 1 ) {
            possibleMove = "" + i + "+" +  z;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
    let i=this.x;
    for(let j=this.y;j<8;j++) {
        if(table2[i][j]===0 || table2[i][j]===1 || table2[i][j] === this) {
            possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        else {
            break;  
        }
    }

    for(let j=this.y;j>=0;j--) {
        if(table2[i][j]===0 || table2[i][j]===1 || table2[i][j] === this) {
            possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
}
    

const white_king = new Figures(0,4,"white","whiteking",100);
white_king.movement = function() {
    console.log("king is moving");   
}

const white_bishop2 = new Figures(0,5,"white","whitebishop2",3);
white_bishop2.movement = function() {
    
        for(let i=this.x,j=this.y;i<8 && j<8;i++,j++) {
            possibleMove = "" + i + "+" +  j;  
            possibleMoves.push(possibleMove);
        }
        for(let i=this.x,j=this.y;i>=0 && j<8;i--,j++) {
            possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        for(let i=this.x,j=this.y;i>=0 && j>=0;i--,j--) {
            possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        for(let i=this.x,j=this.y;i<8 && j>=0;i++,j--) {
            possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
}

const white_knight2 = new Figures(0,6,"white","whiteknight2",3);
white_knight2.movement = function() { 
    if(this.x < 7) {
        if(this.y < 6) {
            let i = this.x + 1;
            let j = this.y + 2;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
            
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.y > 2) {
            let i = this.x + 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }
    if(this.x > 0) {
        if(this.y < 6) {
            let i = this.x - 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.y > 1) {
            let i = this.x - 1;
            let j = this.y + 2;
            if(table[i][j] === 0 || table[i][j] === 1) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    if(this.y < 7) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
               
                possibleMoves.push(possibleMove);
            }
        }
    }

    if(this.y > 0 ) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "black") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "black") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    console.log("white knight movement");
}

const white_rook2 = Object.create(white_rook1);
white_rook2.x=0;
white_rook2.y=7; 
/*
new Figures(0,7,"white","white rook2", 5);
white_rook2.movement = function() {
    console.log("white rook 2 movement");
}*/

const white_pawn1 = new Figures(1,0,"white","whitepawn1",1);
const white_pawn2 = new Figures(1,1,"white","whitepawn2",1);
const white_pawn3 = new Figures(1,2,"white","whitepawn3",1);
const white_pawn4 = new Figures(1,3,"white","whitepawn4",1);
const white_pawn5 = new Figures(1,4,"white","whitepawn5",1);
const white_pawn6 = new Figures(1,5,"white","whitepawn6",1);
const white_pawn7 = new Figures(1,6,"white","whitepawn7",1);
const white_pawn8 = new Figures(1,7,"white","whitepawn8",1);


const black_rook1 = new Figures(7,0,"black","black rook1", 5);
black_rook1.movement = function() {
    console.log("black rook 1 movement");   
}

const black_knight1 = new Figures(7,1,"black","black knight1",3);
black_knight1.movement = function() {
    if(this.x < 7) {
        if(this.y < 6) {
            let i = this.x + 1;
            let j = this.y + 2;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "black") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.y > 2) {
            let i = this.x + 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }
    if(this.x > 0) {
        if(this.y < 6) {
            let i = this.x - 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "black") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.y > 1) {
            let i = this.x - 1;
            let j = this.y + 2;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "black") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    if(this.y < 7) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    if(this.y > 0 ) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    console.log("black knight movement");
}

const black_bishop1 = new Figures(7,2,"black","black bishop1", 3);
black_bishop1.movement = function() {
    console.log("black bishop movement");
}

const black_queen = new Figures(7,3,"black","black queen",10)
black_queen.movement = function() {
    for(let i=this.x,j=this.y;i<8 && j<8;i++,j++) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i>=0 && j<8;i--,j++) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i>=0 && j>=0;i--,j--) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    for(let i=this.x,j=this.y;i<8 && j>=0;i++,j--) {
        let possibleMove = "" + i + "+" +  j;
        possibleMoves.push(possibleMove);
    }
    console.log("white queen movement");
    let z = this.y;
    let possibleMove = "";
    for(let i=this.x;i<8;i++) {
        if(table2[i][z] === 0 || table2[i][z] === 1 || table2[i][z] === this) {
            let possibleMove = "" + i + "+" +  z;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
    for(let i=this.x;i>=0;i--) {
        if(table2[i][z] === 0 || table2[i][z] === 1 || table2[i][z] === this) {
            let possibleMove = "" + i + "+" +  z;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
    let i=this.x;
    for(let j=this.y;j<8;j++) {
        if(table2[i][j]===0 || table2[i][j]===1 || table2[i][j] === this) {
            let possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        else {
            break;  
        }
    }

    for(let j=this.y;j>=0;j--) {
        if(table2[i][j]===0 || table2[i][j]===1 || table2[i][j] === this) {
            let possibleMove = "" + i + "+" +  j;
            possibleMoves.push(possibleMove);
        }
        else {
            break;
        }
    }
    console.log("black queen is moving")
}

const black_king = new Figures(7,4,"black","black king",100);
black_king.movement = function() {
    console.log("black king is moving")
}

const black_bishop2 = new Figures(7,5,"black","black bishop2", 3);
black_bishop2.movement = function() {
    console.log("black bishop movement");
}

const black_knight2 = new Figures(5,6,"black","black knight2",3);
black_knight2.movement = function() {
    if(this.x < 7) {
        if(this.y < 6) {
            let i = this.x + 1;
            let j = this.y + 2;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.y > 2) {
            let i = this.x + 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 ) {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }
    if(this.x > 0) {
        if(this.y < 6) {
            let i = this.x - 1;
            let j = this.y - 2;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.y > 1) {
            let i = this.x - 1;
            let j = this.y + 2;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    if(this.y < 7) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
            }
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y + 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    if(this.y > 0 ) {
        if(this.x <6) {
            let i = this.x + 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
        if(this.x > 1) {
            let i = this.x - 2;
            let j = this.y - 1;
            if(table[i][j] === 0 || table[i][j] === 1 || table[i][j].color === "white") {
                let possibleMove = "" + i + "+" +  j;
                possibleMoves.push(possibleMove);
            }
        }
    }

    console.log("black knight movement");
}

const black_rook2 = new Figures(7,7,"black","black rook2", 5);
black_rook2.movement = function() {
    console.log("black rook 2 movement");   
}

const black_pawn1 = new Figures(6,0,"black","black pawn1",1);
const black_pawn2 = new Figures(6,1,"black","black pawn2",1);
const black_pawn3 = new Figures(6,2,"black","black pawn3",1);
const black_pawn4 = new Figures(6,3,"black","black pawn4",1);
const black_pawn5 = new Figures(6,4,"black","black pawn5",1);
const black_pawn6 = new Figures(6,5,"black","black pawn6",1);
const black_pawn7 = new Figures(6,6,"black","black pawn7",1);
const black_pawn8 = new Figures(6,7,"black","black pawn8",1);

