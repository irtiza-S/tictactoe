
var GameBoard = (function() {
 
    var gBArray = ['', '', '', '', '', '', '', '', '']; //gameboard array
 
 
    return {
        htmlToArray(arr, cells) {
            //arr = is an empty array which will be used to push each element of the cells html collection to arr - this will convert the cells html collection to an array. 
            for (let i = 0; i < cells.length; i++) {
                arr.push(cells[i]);
            }
            return arr;
        },
        gBArray,
        updateArr(currentCell, arr, gbArr) {
            //this will be responsible for updating the gameboard array with the player's marker when they put their marker on the grid
            //three arguments - gridCell: this refers to the current gridCell being clicked, arr: refers to the gridCell array, gbArr - which is the gameboard array
            //if player1sturn is true
            if (Game.isPlayer1Turn) {
                let currentindex = arr.indexOf(currentCell); //grab the current index - of element being clicked
                gbArr[currentindex] = Game.player1.marker;   //target the click'th index of the arr + set this to player's marker
                
            } else {
                let currentindex = arr.indexOf(currentCell);
                gbArr[currentindex] = Game.player2.marker;
                
            }
        },
        
    }
 
})();
 
function PlayerFactory(name, marker) {
    return {name, marker}; //this will generate a name and a marker for player 1 and player 2
}
 
var DisplayController = (function() {
    //this will be responsible for all the DOM manipulation 
 
    //target the relevant elements 
    const webpageHeading = document.getElementById('heading');
    let container = document.getElementById('container');
    const startGameBtn = document.getElementById('startGame'); 
    let p1Ti = document.getElementById('pTi1');
    let p2Ti = document.getElementById('pTi2');
    let p1displayName = document.getElementById('pTitle1');
    let p2displayName = document.getElementById('pTitle2');
    let popUpForm = document.getElementById('popupForm');
    let overlay = document.getElementById('overlay');
     
    //1.create the grid
    function render() {
        for(let i = 0; i < 9; i++){
            var gbCell = document.createElement('div');
            gbCell.classList.add('square');
            container.appendChild(gbCell);
        }
    }
 
    //2.deal with the modal
    function isFormFieldsEmpty() {
        if(!(p1Ti.value && p2Ti.value)) {
            //if player1TextInput && player2TextInput are empty
            alert('Please enter your names in!');
        }
        else {
            //if they aren't empty then we want to hide the modal and display the names of player1 and player2
            
            let player1Name = p1Ti.value; //this will set player 1's name to the value of player1TextInput
            let player2Name = p2Ti.value;
            Game.player1.name = player1Name; //sets the player object name property to p1Ti.value
            Game.player2.name = player2Name;
            popUpForm.style.display = 'none'; //hides the modal
            overlay.style.display = 'none'; //hides the overlay set for when the modal is visible
            webpageHeading.style.display = 'block'; //the title of the webpage will become visible once the modal has disappeared. 
            p1displayName.innerHTML = 'Player 1: ' + player1Name;
            p2displayName.innerHTML = 'Player 2: ' + player2Name;
        }
    }
 
    startGameBtn.addEventListener('click', isFormFieldsEmpty);
 
    
 
    
    return {
        //methods inside this returned object are public for other modules to use.
        render,
        displayMarker(arr) {
            arr.forEach(cell => cell.addEventListener('click', (e) => {
                if (Game.isPlayer1Turn) {
                    //1. target the current cell's text
                    let currentCell = e.currentTarget.textContent = Game.player1.marker;
                    GameBoard.updateArr(e.currentTarget, arr, GameBoard.gBArray); //2. update the gameboard arr
                    console.log(GameBoard.gBArray); //logs gameboard array to the console.
                    Game.isPlayer1Turn = false;
                    return Game.isPlayer1Turn;
                } else {
                    let currentCell = e.currentTarget.textContent = Game.player2.marker;
                    GameBoard.updateArr(e.currentTarget, arr, GameBoard.gBArray);
                    console.log(GameBoard.gBArray); //logs gameboard array to the console.
                    Game.isPlayer1Turn = true;
                }
                // //2. update the GameBoard array - 
                // //2.1 grab the current index of the cell being clicked
                // let x = arr.indexOf(e.currentTarget);
                // //target the xth index of the gameboard array and set that index's element to player 1's marker. 
                // GameBoard.gBArray[x] = Game.player1.marker
            }, { once: true }));
        },
    }
})();
 
var Game = (function() {
    //this module is responsible for the control flow of the game and the general interaction between the GameBoard module and the DisplayController module. 
 
    //1.create players 1 and 2 using the PlayerFactory
    var player1 = PlayerFactory(name, 'X');
    var player2 = PlayerFactory(name, 'O');
 
    //2.Render the grid
    DisplayController.render();
 
    //3.target the gridCells, create an empty array, convert the gridCells html collection to an array
    var gridCells = document.getElementsByClassName('square'); //returns html collection
    var gridCellsArr = [];
    GameBoard.htmlToArray(gridCellsArr, gridCells);
 
    // console.log(gridCellsArr); - returns the converted html collection
 
    //4.call displayMarker method - so players can display their markers.
    // DisplayController.displayMarker(gridCellsArr);
    
    //5. Declare variables responsible for determining which player's turn it is. 
    var isPlayer1Turn = true;
    
    
    // function activePlayer() {
    //     //this will be determine the behaviour of the active player
 
    //     if (isPlayer1Turn) {
    //         DisplayController.displayMarker(gridCellsArr);
    //         console.log(isPlayer1Turn);
    //     } else {
    //         DisplayController.displayMarker(gridCellsArr);
            
    //     }
    // }
    

    // activePlayer();
    DisplayController.displayMarker(gridCellsArr);
    
    return {
        player1,
        player2,
        gridCellsArr,
        isPlayer1Turn,
        
    }
 
 
 
})();
 
 
//current issue cannot seem to update the gbArray when a grid cell is clicked on.  - solved i didn't return the gBArray inside the returned object - not doing this means the array is still private however we want it to be public so other modules can use it. 
 
//implement player 2 - work in progress.
//Step 1 - split display marker into 2 functions - displaymarker and updatearray ---- DONE
//Step 2 - create a variable responsible for players' turns. ---- DONE
//step 3 - work out the logic as to how players' turns work;
//3.1 - 

