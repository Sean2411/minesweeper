var Mine;//for  mark the value of the cell  
var markNum = 20;//initalize the total number of mine that the user want to chellege

// disable the original right click function



// Initialize the game interface.
// row: rows of the grid
// col: columns of the grid
// number: total number of mines
function Interface(row, col, number){
    markNum = number;
    var mainFrame = $("mainInt");
    $("markNum").innerText = markNum;
    mainFrame.innerHTML = "";
    var mine = new Array(row);
    for (var i = 0; i < row; i++){
        mine[i] = new Array(col);
    }
    mine = randomNumber(mine, number);
    Mine = mine;
    for (var i = 0; i < row; i++){
        mainFrame.appendChild(createRow(i, col, mine));
    }
}


// Setup the mines randomly
// mine: grid - is an Array
// num: numbers of mine
function randomNumber(mine, num) {
    var mine = mine;
    var rows = mine.length;
    var cols = mine[0].length;
    var i = 0;

    // Initial Mines
    while (i < num){
        var row = Math.ceil((rows*Math.random())) - 1;
        var col = Math.ceil((cols*Math.random())) - 1;
        if (mine[row][col] != "M"){
            mine[row][col] = "M";
            i++;
        }
    }

    // Check cells
    for (var i = 0; i < rows; i++){
        for (var j = 0; j < cols; j++){
            var mineNum = 0;
            //check left front
            if ((i  -  1 >= 0) && (j  -  1 >= 0)){
                if (mine[i  -  1][j  -  1] == "M")
                mineNum++;
            }
            //check up
            if (i >= 1){
                if (mine[i  -  1][j] == "M")
                mineNum++;
            }
            //check right front
            if ((i  -  1 >= 0) && (j <= cols  -  2)){
                if (mine[i  -  1][j + 1] == "M")
                mineNum++;
            }
            //check left
            if (j >= 1){
                if (mine[i][j  -  1] == "M")
                mineNum++;
            }
            //check right
            if (j <= cols  -  2){
                if (mine[i][j + 1] == "M")
                mineNum++;
            }
            //check left back
            if ((i <= rows  -  2)&&(j  -  1 >= 0)){
                if (mine[i + 1][j  -  1] == "M")
                mineNum++;
            }
            //check down
            if (i <= rows  -  2){
                if (mine[i + 1][j] == "M")
                mineNum++;
            }
            //check right back
            if ((i <= rows - 2)&&(j <= cols - 2)){
                if (mine[i + 1][j + 1] == "M")
                mineNum++;
            }
            if (mine[i][j] != "M"){
            mine[i][j] = mineNum;
            }
        }
 }
    console.log(mine);
    return mine;
 }

// Create and check if fail
function createRow(row, len, mine){
    var mine = mine;
    var tr = document.createElement("tr");
    for (var i = 0; i < len; i++){
        var td = document.createElement("td");
        var button = document.createElement("input");
        button.type = "button";
        button.id = row + "." + i;
        button.className = "myButton";

        var context = mine[row][i];
        button.onclick = function (){
            getValue(this);
            if (this.value == "M"){
                this.className = "myButton_";
                getValue("over");
                alert("You clicked on a mine, GAME OVER");
                if (confirm("Do you want to play again?")){
                    window.location.reload();
                }
                return false;
            }
            if (this.value == 0){
                showSpace2(this);
            }
            this.oncontextmenu = function (){
                return false;
            }
            judge();
        };
        button.oncontextmenu = function (){

            if (this.value == "X"){
                this.value = "?";
                markNum++;
                $("markNum").innerHTML = markNum;
            }else if (this.value == "?"){
                this.value = "";
            }else{
                this.value = "X";
                markNum-- ;
                $("markNum").innerHTML = markNum;
                judge();
            }

        }
        td.appendChild(button);
        tr.appendChild(td);
    }
    return tr;
}


//if checked cell is not empty, this function will be triggered
function getValue(object){
    if ("over" != object){
	    var id = object.id;
	    var button = document.getElementById(id);
	    var row = id.split(".")[0];
	    var col = id.split(".")[1];
	    button.value = Mine[row][col];
	    button.className = "myButton" + button.value;
   	}else{
	    for (var i = 0;i<Mine.length;i++)
	      for (var j = 0;j<Mine[i].length;j++){
	      var button = $(i + "." + j);
	       if (Mine[i][j] == "M"){
	        button.value = Mine[i][j];
	        button.className = "myButton_";
	        }
	      }
	   }
}


// if checked cell is empty, this function will be triggered
function showSpace2(object){
    var id = object.id;
    var row = parseInt(id.split(".")[0]);
    var col = parseInt(id.split(".")[1]);
    var cols = Mine[0].length;
    var rows = Mine.length;
            //check left front
            if ((row - 1 >= 0)&&(col - 1 >= 0)){
                var but = $((row - 1) + "." + (col - 1));
                if (but.value != "0"){
                but.value = (Mine[row - 1][col - 1] == "M") ? "" : Mine[row - 1][col - 1];
                but.className = "myButton" + but.value;
                  if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
            //check up
            if (row >= 1){
                var but = $((row - 1) + "." + (col));
                if (but.value != "0"){
                but.value = (Mine[row - 1][col] == "M") ? "" : Mine[row - 1][col];
                but.className = "myButton" + but.value;
                 if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
            //check right front
            if ((row - 1 >= 0)&&(col <= cols - 2)){
                var but = $((row - 1) + "." + (col + 1));
                if (but.value != "0"){
                but.value = (Mine[row - 1][col + 1] == "M") ? "" : Mine[row - 1][col + 1];
                but.className = "myButton" + but.value;
                 if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
            //check left
            if (col >= 1){
                var but = $((row) + "." + (col - 1));
                if (but.value != "0"){
                but.value = (Mine[row][col - 1] == "M") ? "" : Mine[row][col - 1];
                but.className = "myButton" + but.value;
                 if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
            //check right
            if (col <= cols - 2){
                var but = $((row) + "." + (col + 1));
                if (but.value != "0"){
                but.value = (Mine[row][col + 1] == "M") ? "" : Mine[row][col + 1];
                but.className = "myButton" + but.value;
                 if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
            //check left back
            if ((row <= rows - 2)&&(col - 1 >= 0)){
                var but = $((row + 1) + "." + (col - 1));
                if (but.value != "0"){
                but.value = (Mine[row + 1][col - 1] == "M") ? "" : Mine[row + 1][col - 1];
                but.className = "myButton" + but.value;
                 if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
            //check down
            if (row <= rows - 2){
                var but = $((row + 1) + "." + (col));
                if (but.value != "0"){
                but.value = (Mine[row + 1][col] == "M") ? "" : Mine[row + 1][col];
                but.className = "myButton" + but.value;
                 if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
            //check right back
            if ((row <= rows - 2)&&(col <= cols - 2)){
                var but = $((row + 1) + "." + (col + 1));
                if (but.value  !=  "0"){
                but.value = (Mine[row + 1][col + 1] == "M") ? "" : Mine[row + 1][col + 1];
                but.className = "myButton" + but.value;
                 if (but.value == "0"){
                    showSpace2(but);
                  }
                }
            }
}

// check if won
function judge(){
    var cols = Mine.length;
    var rows = Mine[0].length;
    var allTrue = true;
    for (var i = 0; i < cols; i++)
      for (var j = 0; j < rows; j++){
       var button = $(i + "." + j);
          console.log(button);
       if (Mine[i][j] == "M" && button.value != "X"){
           allTrue = false;
          }
       else if (Mine[i][j] != "M" && button.value != Mine[i][j]){
        allTrue = false;
       }
       }
       if (allTrue){
        if (confirm("Congratulations! You won! Do you want to play again?")){
                    window.location.reload();
                }
       }
 }

// selectLevel - total numbers of Mines
function selectLevel(level){
    if (level == "1"){
        Interface(30, 15, 20);
    }else if (level == "2"){
        Interface(30, 15, 30);
    }else if (level == "3"){
        Interface(30, 15, 40);
    }
}

function $(id){
    return document.getElementById(id);
}