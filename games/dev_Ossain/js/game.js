function ScoreBoardGameControl (){
	var score = 0;
	var POINT_GAME = 10;
	var TEXT_SCORE = "Axe: "
	var find;
	var TOTAL_CORRECT = 10;
	var corrects = 0;

	this.updateScore =  function (){
		var scoreDiv = document.getElementById("score");
		scoreDiv.innerHTML =  TEXT_SCORE + score;
	}

	this.incrementScore =  function (){
		corrects++;
		score+= POINT_GAME;
		if (corrects ==  TOTAL_CORRECT){
			alert("Fim de Jogo! Seu Axe ficou: " + score); 
			window.location="final.html";
		}
	}

	this.decrementScore =  function (){
		score-= POINT_GAME;
	}
}

function Card(picture){
	var FOLDER_IMAGES = 'resources/'
	var IMAGE_QUESTION  = "question.png"
	this.picture = picture;
	this.visible = false;
	this.block = false;

	this.equals =  function (cardGame){
		if (this.picture.valueOf() == cardGame.picture.valueOf()){
			return true;
		}
		return false;
	}
	this.getPathCardImage =  function(){
		return FOLDER_IMAGES+picture;
	}
	this.getQuestionImage =  function(){
		return FOLDER_IMAGES+IMAGE_QUESTION;
	}
	this.getPictureName = function(){
		return picture;
	}
}

function ControllerLogicGame(){
	var firstSelected;
	var secondSelected;
	var block = false;
	var TIME_SLEEP_BETWEEN_INTERVAL = 1000;
	var eventController = this;
	var cardsel;
    
	this.addEventListener =  function (eventName, callback){
		eventController[eventName] = callback;
	};

	this.doLogicGame =  function (card,callback){
		if (!card.block && !block) {
			if (firstSelected == null){
				firstSelected = card;
				card.visible = true;
			}else if (secondSelected == null && firstSelected != card){
				secondSelected = card;
				card.visible = true;
			}

			if (firstSelected != null && secondSelected != null){
				block = true;

				var timer = setInterval(function(){
					if (secondSelected.equals(firstSelected)){
						firstSelected.block = true;
						secondSelected.block = true;
						// alert(card.getPictureName());
						var planta = card.getPictureName();
						if (planta == 'aroeira.png') {
								document.getElementById("desc").innerHTML = "Aroeira:  Boa pra curar ferimentos";
						}
						if (planta == 'alecrim.png') {
								document.getElementById("desc1").innerHTML = "Alecrim:  Bom pra circulação";
						}
						if (planta == 'babosa.png') {
								document.getElementById("desc2").innerHTML = "Babosa: Bom  pra cabelo";
						}
						if (planta == 'boldo.png') {
								document.getElementById("desc3").innerHTML = "Boldo: Boa para dor no estomago";
						}
						if (planta == 'camomila.png') {
								document.getElementById("desc4").innerHTML = "Camomila: Boa para acalmar";
						}
						if (planta == 'ervadoce.png') {
								document.getElementById("desc5").innerHTML = "Ervadoce: Boa para acalmar";
						}
						if (planta == 'goiabeira.png') {
								document.getElementById("desc6").innerHTML = "Goiabeira: O olho da goiabeira é boa pra desaranjo <br>intestinal</br>";
						}
						if (planta == 'manjericao.png') {
								document.getElementById("desc7").innerHTML = "Manjericão: Para inflamação";
						}
						if (planta == 'quebrapedra.png') {
								document.getElementById("desc8").innerHTML = "Quebrapedra: Para banho";
						}
						if (planta == 'romeira.png') {
								document.getElementById("desc9").innerHTML = "Romeira: Usado para curar problemas de garganta com <br>o chá da casca</br>";
						}
						// alert();
						//document.getElementById().value;
						//document.getElementById("descrição").innerHTML = "Aroeira:  Boa pra feidas";
						eventController["correct"](); 
						
						//document.write("nome da planta e");
						
						
					}else{
						firstSelected.visible  = false;
						secondSelected.visible  = false;
						eventController["wrong"]();
					}        				  		
					firstSelected = null;
					secondSelected = null;
					clearInterval(timer);
					block = false;
					eventController["show"]();
				},TIME_SLEEP_BETWEEN_INTERVAL);
			} 
			eventController["show"]();
		};
	};

}

function CardGame (cards , controllerLogicGame,scoreBoard){
	var LINES = 4;
	var COLS  = 5;
	this.cards = cards;
	var logicGame = controllerLogicGame;
	var scoreBoardGameControl = scoreBoard;
	
	this.clear = function (){
		var game = document.getElementById("game");
		game.innerHTML = '';
	}

	this.show =  function (){
		this.clear();
		scoreBoardGameControl.updateScore();
		var cardCount = 0;
		var game = document.getElementById("game");
		for(var i = 0 ; i < LINES; i++){
			for(var j = 0 ; j < COLS; j++){
				card = cards[cardCount++];
				var cardImage = document.createElement("img");
				if (card.visible){
					cardImage.setAttribute("src",card.getPathCardImage());
				}else{
					cardImage.setAttribute("src",card.getQuestionImage());
				}
				cardImage.onclick =  (function(position,cardGame) {
					return function() {
						card = cards[position];
						var callback =  function (){
							cardGame.show();
						};
						logicGame.addEventListener("correct",function (){
							scoreBoardGameControl.incrementScore();
							scoreBoardGameControl.updateScore();
						});
						logicGame.addEventListener("wrong",function (){
							//scoreBoardGameControl.decrementScore();
							scoreBoardGameControl.updateScore();
						});

						logicGame.addEventListener("show",function (){
							cardGame.show();
						});

						logicGame.doLogicGame(card);
						
					};
				})(cardCount-1,this);

				game.appendChild(cardImage);
			}
			var br = document.createElement("br");
			game.appendChild(br);
		}
	}
}



  function BuilderCardGame(){
	var pictures = new Array ('alecrim.png','alecrim.png',
		'aroeira.png','aroeira.png',
		'babosa.png','babosa.png',
		'boldo.png','boldo.png',
		'camomila.png','camomila.png',
		'ervadoce.png','ervadoce.png',
		'goiabeira.png', 'goiabeira.png',
		'manjericao.png','manjericao.png',
		'quebrapedra.png','quebrapedra.png',
		'romeira.png','romeira.png');


	this.doCardGame =  function (){
		shufflePictures();
		cards  = buildCardGame();
		cardGame =  new CardGame(cards, new ControllerLogicGame(), new ScoreBoardGameControl())
		cardGame.clear();
		return cardGame;
	}

	var shufflePictures = function(){
		var i = pictures.length, j, tempi, tempj;
		if ( i == 0 ) return false;
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			tempi = pictures[i];
			tempj = pictures[j];
			pictures[i] = tempj;
			pictures[j] = tempi;
		}
	}
	var buildCardGame =  function (){
		var countCards = 0;
		cards =  new Array();
		for (var i = pictures.length - 1; i >= 0; i--) {
			card =  new Card(pictures[i]);
			cards[countCards++] = card;
		};
		return cards;
	}

	// var seleccard = function (){
	 //		var cardsel = "";
	 	//	if (pictures[1].length == pictures.length[1]){
	 	//		card1 = pictures[1];
	 	//	}	
//	}	
  //return alert(pictures);
}

function GameControl (){

}

GameControl.createGame = function(){
	var builderCardGame =  new BuilderCardGame();
	cardGame = builderCardGame.doCardGame();
	cardGame.show();

	
}