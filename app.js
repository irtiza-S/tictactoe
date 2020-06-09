//Planning: 
//Does your project have a UI? Yes it does. 
//What does the UI look like? It will be a 3 x 3 grid, 
//-------------------------------------------------------



//gameBoard module - IIFE
var GameBoard = (function(){
    let gameBoardArr = ['', '', '', '', '', '', '', '', ''] //gameBoard array

    
    return {
        gameBoardArr,
    }
})();

//displayController module - IIFE
var DisplayController = (function (){
    //target relevant elements
    let webpageHeading = document.getElementById('heading');
    let container = document.getElementById('container');
    let startGameBtn = document.getElementById('startGame'); //startGame Button
    let p1Ti = document.getElementById('pTi1');
    let p2Ti = document.getElementById('pTi2');
    let p1displayName = document.getElementById('pTitle1');
    let p2displayName = document.getElementById('pTitle2');
    let popUpForm = document.getElementById('popupForm');
    let overlay = document.getElementById('overlay');
    //this will be responsible for creating the game
    //step 1 - create the 3x3 grid 
    function render(){
        for(let i = 0; i < 9; i++){
            let gbCell = document.createElement('div');
            gbCell.classList.add('square');
            container.appendChild(gbCell);
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