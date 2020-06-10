//Planning: 
//Does your project have a UI? Yes it does. 
//What does the UI look like? It will be a 3 x 3 grid, --- done.
//Does your UI have a popup form? Yes -- done
//Current task 3.2 - 
//1.Understand the problem - write a function - which will display the elements in the gameBoard array onto the grid. For now just manually fill the gameBoard array with 'X's and 'O's.
//Step 1 - Manually fill in values for the gameBoard array - done.
//Step 2 - We need to loop through the gameBoard array and display each value onto the grid.
//Step 2 - sub problem: to display each value of the gameBoard array onto each cell of grid - we need to also loop through the grid cells - and for each cell we would have to display the corresponding gameBoardArr element. 
//So - 2.1: Target the grid cells - document.getElementsByCLassName('square') - done.
//2.2 Loop through the gridCells nodeList - gridCells.forEach(gridCell => ...)
//2.2 sub - problem - since the grid was created inside of another scope - we need to loop inside of the same scope. - done
//2.2 sub-problem: need to attach each element of the gameBoardArr to each element of the gridCells nodeList
//Task 3.2 has been completely.
//Task 4 - 
//-------------------------------------------------------



//gameBoard module - IIFE
var GameBoard = (function(){
    let gameBoardArr = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'] //gameBoard array

    
    return {
        gameBoardArr,
    }
})();

//displayController module - IIFE - 
var DisplayController = (function (){
    //this will be responsible for creating the game

    //target relevant elements
    const webpageHeading = document.getElementById('heading');
    let container = document.getElementById('container');
    const startGameBtn = document.getElementById('startGame'); 
    let p1Ti = document.getElementById('pTi1');
    let p2Ti = document.getElementById('pTi2');
    let p1displayName = document.getElementById('pTitle1');
    let p2displayName = document.getElementById('pTitle2');
    let popUpForm = document.getElementById('popupForm');
    let overlay = document.getElementById('overlay');
    let gameBoardArr = GameBoard.gameBoardArr;
    
    
    function render(){
        // create the 3x3 grid 
        for(let i = 0; i < 9; i++){
            let gbCell = document.createElement('div');
            gbCell.classList.add('square');
            container.appendChild(gbCell);
        }
        
        //target the grid's nodeList
        let gridCells = document.getElementsByClassName('square');
        //Loop through the gridCells nodeList 
        for(let i = 0; i < gridCells.length; i++){
            gridCells[i].textContent = gameBoardArr[i]; //since both arrays have the same length all we need is the index position and then to render the board what we need to use is .textContent. 
            
        }
    }

    //Create event listener - for when the Pop up form has been submitted
    startGameBtn.addEventListener('click', ()=> {
        if(!(p1Ti.value && p2Ti.value)){
            alert('Please enter your names in! ');
        }
        else{
            let player1name = p1Ti.value;
            let player2name = p2Ti.value;
            console.log(player1name, player2name);
            popUpForm.style.display = 'none'; //hides the popUp Form 
            overlay.style.display = 'none';
            webpageHeading.style.display = 'block';
            p1displayName.innerHTML = 'Player 1: ' + player1name;
            p2displayName.innerHTML = 'Player 2: ' + player2name;
            
        }
    })

     
    
    return {
        render,
    }

})();

//Player factory function
const PlayerFactory = (name, marker) => {
    return {name, marker};
}



//Module for controlling flow of the game - IIFE
var Game = (function(){
    //responsible for controlling the flow of the game

    //created two players --- using PlayerFactory
    let player1 = PlayerFactory(name, 'X');
    let player2 = PlayerFactory(name, 'O');

    return{
        player1,
        player2,
    }

})();

DisplayController.render();