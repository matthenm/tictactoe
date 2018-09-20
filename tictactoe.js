var playerUp = "X";
var gameOn = true;
var computerOpponent = true;
var victoryList = [
    ["c0r0", "c1r0", "c2r0"], // row 1
    ["c0r1", "c1r1", "c2r1"], // row 2
    ["c0r2", "c1r2", "c2r2"], // row 3
    ["c0r0", "c0r1", "c0r2"], // column 1
    ["c1r0", "c1r1", "c1r2"], // column 2
    ["c2r0", "c2r1", "c2r2"], // column 3
    ["c0r0", "c1r1", "c2r2"], // diagonal top left to bottom right
    ["c2r0", "c1r1", "c0r2"] // diagonal top right to bottom left
];

function getEle(id) {
    return document.getElementById(id);
}

function makeMove(ele) {
    if (gameOn) {
        if (ele.innerHTML == "") {
            ele.innerHTML = playerUp;
            checkForWin();
            if (playerUp === "X") {
                playerUp = "O";
                if (computerOpponent && gameOn) {
                    makeMove(computerChoice());
                    playerUp = "X";
                }
            } else {
                playerUp = "X";
            }
        } else {
            alert("You can't make a move there.");
        }
    } else {
        alert("Game Over - you cannot make any more moves");
    }
}

function checkForWin() {
    var anyEmpty = false;

    for (var i = 0; i < 8; i++) {
        var victoryCheck = getEle(victoryList[i][0]).innerHTML + getEle(victoryList[i][1]).innerHTML + getEle(victoryList[i][2]).innerHTML;
        if (victoryCheck.length < 3)
            anyEmpty = true;
        if(victoryCheck === "XXX" || victoryCheck === "OOO") {
            gameOn = false;
            alert("Player " + playerUp + " is the winner!");
            increaseScore();
        }
    }

    if (anyEmpty === false && gameOn === true) {
        gameOn = false;
        alert("It's a tie");
    }
}

function resetGame() {
    //Challenge 9
    playerUp = "X";
    gameOn = true;
    document.getElementById("c0r0").innerHTML = "";
    document.getElementById("c0r1").innerHTML = "";
    document.getElementById("c0r2").innerHTML = "";
    document.getElementById("c1r0").innerHTML = "";
    document.getElementById("c1r1").innerHTML = "";
    document.getElementById("c1r2").innerHTML = "";
    document.getElementById("c2r0").innerHTML = "";
    document.getElementById("c2r1").innerHTML = "";
    document.getElementById("c2r2").innerHTML = "";
}

function increaseScore() {
    //Challenge 10
    if (playerUp == "X") {
        document.getElementById('playerXScore').innerHTML++;
    }
    else {
        document.getElementById('playerOScore').innerHTML++;
    }
}

function computerChoice() {
    //Weekly Assignment

    // winning moves for computer
    for (var i = 0; i < victoryList.length; i++) {
        var test = getEle(victoryList[i][0]).innerHTML + getEle(victoryList[i][1]).innerHTML +
            getEle(victoryList[i][2]).innerHTML;

        if (test === "OO") {
            for(var j = 0; j < victoryList[i].length; j++) {
                if(getEle(victoryList[i][j]).innerHTML === "") {
                    return getEle(victoryList[i][j]);
                }
            }
        }
    }

    // blocking moves for computer
    for (var i = 0; i < victoryList.length; i++) {
        var test = getEle(victoryList[i][0]).innerHTML + getEle(victoryList[i][1]).innerHTML +
            getEle(victoryList[i][2]).innerHTML;

        // looks for two X's in a row and if it is found, it will play an "O" in that spot
        if (test === "XX") {
            for (var j = 0; j < victoryList[i].length; j++) {
                if(getEle(victoryList[i][j]).innerHTML === "") {
                    return getEle(victoryList[i][j]);
                }
            }
        }
    }

    // random move
    while (true) {

        // local variables that generate a random row and column between 0 and 2
        var randcol = Math.floor((Math.random() * 3));
        var randrow = Math.floor((Math.random() * 3));

        // checks to see if random spot on board is open by checking row and column
        if (document.getElementById('c' + randcol + 'r' + randrow).innerHTML === "") {
            return getEle('c' + randcol + 'r' + randrow);
        }
    }
}

