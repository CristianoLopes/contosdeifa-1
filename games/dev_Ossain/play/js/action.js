var correctCards = 0;
$( init );
 
function init() {
 
  // Set progress bar
  document.getElementById('progress').style.width= '0%';

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
 
  // Create the pile of shuffled cards
  var i = 0;
  var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  var folhas = ["carambola", "colônia", "goiaba", "cactus", "camomila", "artemisia", "manjerona", "capim santo"];
  var loremIpsum = "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos."
  var folhasAux = [loremIpsum, loremIpsum, loremIpsum, loremIpsum, loremIpsum, loremIpsum, loremIpsum, loremIpsum];
  numbers.sort( function() { return Math.random() - .5 } );
 
  for ( i=0; i<10; i++ ) {
    $('<div></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );

    document.getElementById('card'+numbers[i]).style.backgroundImage = "url('images/folha" + numbers[i] + ".png')";
    document.getElementById('card'+numbers[i]).style.backgroundRepeat = "no-repeat";
    document.getElementById('card'+numbers[i]).style.backgroundSize = "contain";
    document.getElementById('card'+numbers[i]).style.backgroundPosition = "center";

    $("#" + 'card'+ numbers[i]).mouseover(function() {
      var id = $(this).attr('id');
      i = id.replace("card", "");
      $(this).attr( 'title', folhasAux[i] )
    });
   }
 
  // Create the card slots
  for ( var i=1; i<=10; i++ ) {
    $('<div></div>').data( 'number', i ).attr({id: 'cardSlot'+i, class: 'cardSlot'}).appendTo( '#content' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );

    document.getElementById('cardSlot'+i).style.backgroundImage = "url('images/doenca" + i + ".png')";
    document.getElementById('cardSlot'+i).style.backgroundRepeat = "no-repeat";
    document.getElementById('cardSlot'+i).style.backgroundSize = "contain";
  }
 
  		
}

function setTopo(){
    $(window).scrollTop(0);
}

$(window).bind('scroll', setTopo);

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );
 
  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again
 
  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
    document.getElementById('progress').style.width= (correctCards * 10) + '%';
  } 
   
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go
 
  if ( correctCards == 10 ) {
	alert("Done");
  }
 
}
