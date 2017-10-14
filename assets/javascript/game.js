 
//define players as objects
 var tyler = {
	hp:120,
	isUser:false,
	name:"tyler",
	id:0,
	defensePower:10,
	startingHP:120

};
var edward = {
	hp:101,
	isUser:false,
	name:"edward",
	id:1,
	defensePower:8,
	startingHP:101

};

var marla = {
	hp:150,
	isUser:false,
	name:"marla",
	id:2,
	defensePower:12,
	startingHP:150

};
var bob = {
	hp:180,
	isUser:false,
	name:"bob",
	id:3,
	defensePower:18,
	startingHP:180

};

//initialization conditions, allPlayers is an array of objects
var gameStatus = "selectPlayer";
var allPlayers = [tyler,edward,marla,bob];
var currentPlayer;
var currentOpponent;
var attackPower = 8;
var attackIncrement = 8;
var resultString = "";
var playersRemaining = 3;

//using this for moving the "boxes" around, tried to make it as simple as possible for caller
var moveTheBox = function(id,area){
	var box = '#' + allPlayers[id].name + "-box";
	$(box).appendTo("#"+ area);
}

//start the game (when user picks a player). Event listeners at the bottom
var startGame = function(attackerId){
	currentPlayer = allPlayers[attackerId];
	gameStatus = "selectDefender";
	for (i=0;i<allPlayers.length;i++){
		if(attackerId == i){
			moveTheBox(attackerId,'attackerArea');
			currentPlayer = allPlayers[attackerId];
		}
		else {
			moveTheBox(i,'waitingArea');			
		}
	}
	$("#topMessage").html("Choose an enemy");
}

//runs when user selects opponent
var selectDefender = function(defenderId){
	currentOpponent = allPlayers[defenderId];
	gameStatus = "readyForAttack";
	moveTheBox(defenderId,"defenderArea");
	$("#topMessage").html("GOOD LUCK");
	//only reveal attack button when two players are selected
	$("#attackRow").removeClass("hidden");
	$("#result").html("");
	}

var attack = function (){
	var defenderHP = currentOpponent.hp - attackPower;
	//I use the concatenation below (in many places) to create strings for jquery selectors...probably a better way?
	var boxToUpdate = '#' + currentOpponent.name + "-footer";
	$(boxToUpdate).html(defenderHP);
	currentOpponent.hp = defenderHP;
	resultString = "You attacked " + currentOpponent.name + " for " + attackPower + " damage.  " ;
	attackPower += attackIncrement;
	if(defenderHP <= 0 ) {
		//remove player, passing in the player ID
		removePlayer(currentOpponent.id);
	} 
	else {
		defend();
	}

}

//attack and defend are separate functions although they appear to be simultaneous to user
var defend = function() {
	var attackerHP = currentPlayer.hp - currentOpponent.defensePower;
	var boxToUpdate = '#' + currentPlayer.name + "-footer";
	$(boxToUpdate).html(attackerHP);
	currentPlayer.hp = attackerHP;
	resultString += currentOpponent.name + " countered and gave you " + currentOpponent.defensePower + " damage.<br>";
	$("#result").html(resultString);
	if(attackerHP <= 0){
		loseGame();
	}
}

function winGame(){
	resultString += "<br> YOU WIN!!  THAT'S WHAT I CALL A NEAR-LIFE EXPERIENCE!"
	$("#result").html(resultString);
	gameStatus = "gameOver";
	//attack button turns into reset game button, logic for that built into the event handler
	$("#attackButton").html("CLICK HERE TO PLAY AGAIN");

}

function loseGame() {
	resultString += "<br> YOU LOSE!! TRY AGAIN? MAYBE READ THE RULES?";
	$("#result").html(resultString);
	//show "rules"
	$("#rules").removeClass("hidden");
	gameStatus = "gameOver";
	$("#attackButton").html("CLICK HERE TO PLAY AGAIN");
}

//I have a feeling there is a standard practice for how to reset a bunch of variables like this? Did it as simply as I could think of
function resetGame() {
	var footerBox;
	var boxToShow;
	//loop through all players, reset their HP, move them to start position.  Also remove hidden class that was added when a player was defeated
	for(i=0;i<allPlayers.length;i++){
		allPlayers[i].hp = allPlayers[i].startingHP;
		footerBox = '#' + allPlayers[i].name + "-footer";
		$(footerBox).html(allPlayers[i].hp);
		//don't try to remove hidden class for user player, which was never hidden.  I don't think this is actually necessary.  
		if(currentPlayer.id != i){
			boxToShow = "#" + allPlayers[i].name + "-box";
			$(boxToShow).removeClass("hidden");
		}
		moveTheBox(i,"startArea");
	}
	attackPower = 8;
	gameStatus = "selectPlayer";
	resultString = "";
	$("#attackButton").html("Attack");
	$("#result").html(resultString);
	$("#attackRow").addClass("hidden");
	playersRemaining = 3;
	$("#topMessage").html("CHOOSE A PLAYER TO START THE GAME");
	$("#rules").addClass("hidden");


}


//hide defeated player, if its the last player, run winGame()
var removePlayer = function(id){
	$("#result").html("You have defeated " + allPlayers[id].name + "! Choose next enemy.")
	var boxToRemove = '#' + allPlayers[id].name + '-box';
	$(boxToRemove).addClass("hidden");
	gameStatus = "selectDefender";
	playersRemaining--;
	if(playersRemaining == 0){
		winGame();
	}
	else {
	$("#topMessage").html("Choose an enemy");
	}
}

$(document).ready(function() {

	$(".box").on("click",function(){
		//line below is probably the goofiest thing I did...used <a>s as my player containers, dug around in that event object to find the value that is set in HTML
		//I am certain there is a better way, but got this working so left it.  
		var playerId = ($(this)[0].attributes[4].value);
		if(gameStatus == "selectPlayer"){
			startGame(playerId);
		}
		else if (gameStatus == "selectDefender") {
			selectDefender(playerId);
		}
		
	});

	//reset game if the "attack" button was clicked while in its restart form, otherwise check if enemy ready.  If so, run attack function
	$("#attackButton").on("click",function(){
		if(gameStatus=="gameOver"){

			resetGame();
		}
		else if(gameStatus=="selectDefender"){
			$("#result").html("No enemy!");
		}
		else {
		attack();
		}
	});




});