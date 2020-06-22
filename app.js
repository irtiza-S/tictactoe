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
//Task 3.2 - Set up your HTML and write a JS function which will render the contents of the gameboard array to the webpage - for now use dummy text. - done
//Task 4 - Make functions - which allow the players to add marks to specific spots on the 3x3 grid - then linked it with tbe DOM - letting players click on the gameboard to place their marker. 
//Task 4.1 - display player1's marker and update the gameBoard array - done. 
//Task 4.2 - implement a second player - make use of boolean variables: isPlayer1Turn, isPlayer2Turn. 
//Task 4.2.1 - create two boolean variables - done. 
//Task 4.2.2 - work out the logic of the player turns - 
//--- if isplayer1Turn is true - we want to let player1 set their marker on the grid. - if isPlayer1Turn is false - then we want to set isplayer2Turn to true - which will allow player2 to place their marker on the grid
//-------------------------------------------------------

//displayController module - responsible for the UI 

var DisplayController = (function (){
    
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
    
    
    //this function creates the tictactoe grid, displays player marks on the grid, will also update the gameBoardArray
    function render(){
        for(let i = 0; i < 9; i++){
            var gbCell = document.createElement('div');
            gbCell.classList.add('square');
            container.appendChild(gbCell);
        }

    }
    
        
    //when the Pop up form fields are empty
    function isFormFieldsEmpty(){
        if(!(p1Ti.value && p2Ti.value)){
            alert('Please enter your names in! ');
        }
        else{
            let player1name = p1Ti.value;
            let player2name = p2Ti.value;
            Game.player1.name = player1name; 
            Game.player2.name = player2name;
            console.log(player1name, player2name);
            popUpForm.style.display = 'none'; //hides the popUp Form 
            overlay.style.display = 'none';
            webpageHeading.style.display = 'block';
            p1displayName.innerHTML = 'Player 1: ' + player1name;
            p2displayName.innerHTML = 'Player 2: ' + player2name;
            
        }
    }
    
    startGameBtn.addEventListener('click', isFormFieldsEmpty);

    return {
        render,   
    }

})();


//gameBoard module - IIFE
var GameBoard = (function(){
    let gameBoardArr = ['', '', '', '', '', '', '', '', ''] //gameBoard array - filled with dummy text.

    function htmlToArray(arr, cells){
        //converts html collection to array
        for(let i = 0; i < cells.length; i++){
            arr.push(cells[i]);
        }
        return arr;
    }
    
    function displayMarker(arr){
        if(Game.isPlayer1Turn){
            arr.forEach(cell => cell.addEventListener('click', (e) => {
                var currentCell = e.currentTarget.textContent = Game.player1.marker;

            }));
        }

        else{
            arr.forEach(cell => cell.addEventListener('click', (e) => {
                let currentcell = e.currentTarget.textContent = Game.player2.marker;
            }));
        }
        
    }

    // arr.forEach(cell => cell.addEventListener('click', (e) => {
    //     var currentCell = e.currentTarget.textContent = Game.player1.marker; //this will add player1's marker on to the specific spot of the grid they click on. 
    //     //2. Next update the gameBoardArr 
    //     //2.1 - grab the index of the current cell being clicked.
    //     // gridArr.indexOf(e.currentTarget) //this will return the current index.
    //     let x = (arr.indexOf(e.currentTarget));
    //     //add that index to the gameBoardArr = and set that index to player1's marker
    //     // console.log(GameBoard.gameBoardArr[x]);
    //     GameBoard.gameBoardArr[x] = Game.player1.marker; //this should replace the value at index x with player1's marker.
    //     return GameBoard.gameBoardArr;
    // }));
    
    function updateValues(arr, e){
        let x = arr.indexOf(e.currentTarget);
        if(isPlayer1Turn){
            GameBoard.gameBoardArr[x] = Game.player1.marker;
        }
        else{
            GameBoard.gameBoardArr[x] = Game.player2.marker;
        }
    }

    return {
        gameBoardArr,
        displayMarker,
        htmlToArray,
        updateValues,
    }
})();


//Player factory function
const PlayerFactory = (name, marker) => {

    return {name, marker}; //each player will have a name and a mark - which could either be 'X' or 'O'
}


//responsible for control flow of the game - this will allow the GameBoard module and DisplayController module to interact with each other. 

var Game = (function(){

    //created using PlayerFactory
    let player1 = PlayerFactory(name, 'X');
    let player2 = PlayerFactory(name, 'O');

    //responsible for player turns between the two players. 
    var isPlayer1Turn = true;
    var isPlayer2Turn = false;
    
   
    DisplayController.render();
    
    
    let gridCells = document.getElementsByClassName('square');
    var gridArr = [];

    GameBoard.htmlToArray(gridArr, gridCells); //converts html collection to array 
    GameBoard.displayMarker(gridArr); //display's player1's marker and also updates the gameBoardArr

    //function - responsible for player turns 
    function playerTurns(){
        while(isPlayer1Turn){
            //1. player1 will put their marker onto the grid
            GameBoard.displayMarker(gridArr, gridCells);
            //2. Their marker will update the gameBoardArr
            GameBoard.updateValues(gridArr, e);
            //3. Set isplayer1Turn = false and set isplayer2Turn = true
            isPlayer1Turn = false;
            isPlayer2Turn = true;
            while(isPlayer2Turn){
                //1. player2 will put their marker onto the grid
                //2.Their marker will update the gameBoardArr
                //3.Set isplayer2Turn = false and isplayer1Turn = true
                //4.break the loop after isplayer2Turn = true;

            }
        }
    }

    return{
        player1,
        player2,
        isPlayer1Turn,
        isPlayer2Turn
        
    }
})();
