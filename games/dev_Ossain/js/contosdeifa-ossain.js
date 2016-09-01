$( document ).ready(function() {
	// Skrollr
  var s = skrollr.init({
        forceHeight: true,
         constants: {
            ossain: 100,
            ossains: 1000
        }

    });
    $("#intro_setas").each(function () {
        var hovered = false;
        var loop = window.setInterval(function () {
            if (hovered) {
                var steps = $(document).scrollTop();
                steps+=100;
                s.animateTo(steps);
            }
        }, 450);

        $(this).hover(
           function () {
             hovered = true;
           },
           function () {
             hovered = false;
           }
        );
    });
    
  $("#preloader").hide();

  // Trilha Sonora

  $("#dsp_toada").jPlayer({
      ready: function(event) {
          $(this).jPlayer("setMedia", {
              mp3: "audio/toada_ossain.mp3"
          });
      },
      ended: function() { // The $.jPlayer.event.ended event
          $(this).jPlayer("play");
      },
      swfPath: "/js",
      supplied: "mp3, oga"
  });

  $("#dsp_floresta").jPlayer({
      ready: function(event) {
          $(this).jPlayer("setMedia", {
              mp3: "audio/floresta_ossain.mp3"
          });
      },
      ended: function() { // The $.jPlayer.event.ended event
      },
      swfPath: "/js",
      supplied: "mp3, oga"
  });
     // volume da trilha
    function volumeUp(){
    var volume = $(".dsp_floresta").prop("volume")+0.2;
    if(volume > 1){
        volume = 1;
    }
    $(".dsp_floresta").prop("volume",volume);
}
 
function volumeDown(){
    var volume = $(".floresta_ossain").prop("volume")-0.2;
    if(volume < 0){
        volume = 0;
    }
    $(".floresta_ossain").prop("volume",volume);
}

  $(window).scroll(function(){
    if ($(window).scrollTop() == 0){
      $("#dsp_toada").jPlayer("stop");
        $("#dsp_floresta").jPlayer("stop");
        
    }
    if ($(window).scrollTop() < 10){
        $("#intro_setas").fadeIn(300).fadeOut(300).fadeIn(300).fadeIn(400).fadeOut(500).fadeIn(300);
    }
    if ($(window).scrollTop() > 10){
      $("#dsp_toada").jPlayer("play");
      $("#dsp_floresta").jPlayer("stop");

    }
    
    
    if ($(window).scrollTop() >= 700){
        $("#dsp_floresta").jPlayer("play");
        
    }

  });
	$("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $("#menu-toggle").fadeIn();
    });

  	$("#menu-toggle").click(function(e) {
    	e.preventDefault();
      	$("#sidebar-wrapper").toggleClass("active");
      	$(this).fadeOut();
  	});
});