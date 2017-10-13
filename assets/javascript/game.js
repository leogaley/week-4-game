 $(document).ready(function() {

//accept user click to choose player and start game
//move oppenent(s) to their area
//define characters and their attributes as objects
//onClick of attack button, adjust health
	//handle when player is defeated
	//handle when an opponent is defeated
	//handle when all opponents defeated
//reset game
//make it all look half decent
var tyler = {
	hp:150,
	isUser:false,
	name:"tyler",
	id:0,
	defensePower:30

};
var edward = {
	hp:100,
	isUser:false,
	name:"edward",
	id:1,
	defensePower:20

};

var marla = {
	hp:120,
	isUser:false,
	name:"marla",
	id:2,
	defensePower:25

};
var bob = {
	hp:80,
	isUser:false,
	name:"bob",
	id:3,
	defensePower:15

};

var gameStatus = "selectPlayer";
var allPlayers = [tyler,edward,marla,bob];
var currentPlayer;
var currentOpponent;
var attackPower = 8;


$(".box").on("click",function(){
	if(gameStatus=="selectPlayer"){
		$(this).appendTo("#currentOpponentArea");
		window.currentPlayer = allPlayers[this.value];
		gameStatus = "selectDefender";

	}

})
console.log(gameStatus);



function attack(){

}

function increaseAttack(){

}

function winGame(){

}

function loseGame() {

}

function resetGame() {

}

function removePlayer(){

}

function selectUserPlayer(){
	$(this).appendTo("#currentOpponentArea");
	window.currentPlayer = allPlayers[this.value];

}

function selectDefender() {

}





 })