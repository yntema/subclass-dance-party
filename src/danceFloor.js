var lineup = function() {
  var styleSettings = {
    left : '10px'
  };
  window.dancers.forEach(function(dancer) {
    dancer.css(styleSettings);
  });
};

var horizontalCenter = Math.floor(window.innerWidth/2);
var verticalCenter = Math.floor(window.innerHeight/2);
var time = 0;
var theta = 0;
var radius = 300;
var following = false;
var revolving = false;
var chase = function() {
  $('.revolve').css({display: 'inline'});
  if (window.dancers.length < 1) {
    return;
  }
  incrementTime();
  revolve(window.dancers[0]);
};

var incrementTime = function() {
  var timeInterval = setInterval(function() {
    time += 0.008;
    if (revolving) {
     revolve(window.dancers[0]);  
    }
    if (!following) {
      getCloser(window.dancers[0], window.dancers[window.dancers.length-1]); 
    }
    for (var i = 1; i < window.dancers.length; i++) {
      // if (window.dancers[i].attr('class').split(' ').indexOf('velocityDancer') === -1) {
        getCloser(window.dancers[i], window.dancers[i-1]);
      // }
    }

  }, 50);
};

var startRevolve = function(){ 
  revolving = true;
};

var revolve = function($node) {
  var theta = (2*Math.PI/10 * time)%(2*Math.PI);
  var top = verticalCenter + radius*Math.sin(theta);
  var left = horizontalCenter + radius*Math.cos(theta);
  var styleSettings = {
    top: top,
    left: left
  };
  $node.css(styleSettings);
};

var getCloser = function($chaser, $chasee) {
  var chaserTop = Number($chaser.css('top').slice(0,this.length-2));
  var chaserLeft = Number($chaser.css('left').slice(0,this.length-2));
  
  var chaseeTop = Number($chasee.css('top').slice(0,this.length-2));
  var chaseeLeft = Number($chasee.css('left').slice(0,this.length-2));
  
  var topDiff =  chaseeTop - chaserTop;
  var leftDiff = chaseeLeft - chaserLeft;

  chaserTop += topDiff * 0.1;
  chaserLeft += leftDiff * 0.1;

  var styleSettings = {
    top: chaserTop,
    left: chaserLeft
  };
  $chaser.css(styleSettings);
};

$(document).ready(function(){
  Mousetrap.bind("r", function(e) { $('.rainbow').click()});
  Mousetrap.bind("x", function(e) { $('.elton').click()});
  Mousetrap.bind("t", function(e) { $('.tiny').click()});
  Mousetrap.bind("c", function(e) { $('.chase').click()});
  Mousetrap.bind("f", function(e) { $('.follow').click()});
  Mousetrap.bind("v", function(e) { $('.velocity').click()});
  Mousetrap.bind("o", function(e) { $('.revolve').click()});
  Mousetrap.bind("b", function(e) { $('.blackHole').click()});
  Mousetrap.bind("g", function(e) { $('.gravity').click()});
  Mousetrap.bind("e", function(e) { $('.Earth').click()});
  Mousetrap.bind("m", function(e) { $('.Mars').click()});
  Mousetrap.bind("s", function(e) { $('.Sun').click()});
  Mousetrap.bind("j", function(e) { $('.Jupiter').click()});
  Mousetrap.bind("a", function(e) { $('.Saturn').click()});
  Mousetrap.bind("p", function(e) { $('.Pluto').click()});
  var screenWidth = $('body').width();
  var screenHeight = $('body').height();
  var centerScreen = {
    x: screenWidth/2,
    y: screenHeight/2
  };

});


var follow = function() {
  following = true;
  if (window.dancers.length > 0) {
    $(document).mousemove(function(e){
      var $frontDancer = window.dancers[0];
      $frontDancer.css({top:e.pageY-10, 
                       left:e.pageX-10});
    });
    $('.follow').text('unfollow').attr('onclick', "unFollow()");
  }
};

var unFollow = function() {
  following = false;
  $(document).off('mousemove');
  $('.follow').text('follow').attr('onclick', "follow()");

};
