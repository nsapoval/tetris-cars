//BEGIN LIBRARY CODE
var x;
var y;
var dx = 0;
var dy;
var sq_size; 
var ctx;
var WIDTH;
var HEIGHT;
var bars = [[]];
var game_over = false;
var score;
var time_coeff = 1;
var draw_interval;
var top_score = 0;
var database_writeable;

function init() {
  init_game();
}
 
function init_game() {
  ctx = $('#canvas')[0].getContext("2d");
  sq_size = Math.floor(window.innerHeight/25)
  ctx.canvas.height = sq_size*15;
  ctx.canvas.width = sq_size*9;
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  x = 4*sq_size;
  y = HEIGHT-4*sq_size;
  game_over = false;
  score = 0;
  time_coeff = 1;
  dy = sq_size/5;
  bars = [[sq_size,0]];
  bar();
  bar();
  database_writeable = true;
  draw_interval = setInterval(draw, 60*time_coeff);
  return draw_interval;
}

function car(x,y) {
  rect(x,y,sq_size,sq_size);
  rect(x-sq_size,y+sq_size,sq_size,sq_size);
  rect(x+sq_size,y+sq_size,sq_size,sq_size);
  rect(x,y+2*sq_size,sq_size,sq_size);
  rect(x-sq_size,y+3*sq_size,sq_size,sq_size);
  rect(x+sq_size,y+3*sq_size,sq_size,sq_size);
} 

function bar() {
  n = Math.floor(Math.random()*(3)+0);
  var xn = sq_size + n*sq_size*3;
  var multi = 10;
  if(score < 3) { multi = 10; }
  else if(score < 5) { multi = 9; }
  else if(score < 10) { multi = 8; }
  else if(score < 20) { multi = 7; }
  else { multi = 6; }
  if (score > 35) { time_coeff = 1 + (score - 35)/50; }
  var yn = bars[bars.length-1][1]-sq_size*multi;
  rect(xn,yn,sq_size,sq_size);
  rect(xn-sq_size,yn,sq_size,sq_size);
  rect(xn+sq_size,yn,sq_size,sq_size);
  bars.push([xn,yn]);  
}

function draw_bar(xb,yb) {
  for(var i=0; i<3; i = i + 1) {
    if(sq_size+i*sq_size*3 != xb) {
      rect(i*sq_size*3,yb,sq_size,sq_size);
      rect(i*sq_size*3+sq_size,yb,sq_size,sq_size);
      rect(i*sq_size*3+2*sq_size,yb,sq_size,sq_size);
    }
  }
}

function obstacles() {
  if(game_over == false) {
    if(bars[0][1]>=HEIGHT) {
      bar();
      bars.shift();
      score += 1;
    }
    for(var i=0; i<bars.length; i = i + 1) {
      bars[i][1] += dy;
    }
  }
}

function check() {
  if( bars[0][0] != x && bars[0][1]>=HEIGHT-5*sq_size) {
    game_over = true;
    if(score > top_score) {
      top_score = score;
      $("#high_score .value").html(top_score);
    }
  }
}

function onHit(e) {
  switch(e.which) {
        case 37: // left
        if(x != sq_size) {
            x = x - 3*sq_size;
            clear();
        }
        break;

        case 39: // right
        if(x != 7*sq_size) {
            x = x + 3*sq_size;
            clear();
        }
        break;
        
        case 13: //enter
        if(game_over == true) {
            window.clearInterval(draw_interval);
            init_game();
        }
    }
}

//Page action block 
//----------------------------------------------
$(document).keydown(onHit);
//----------------------------------------------
 
function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function pix(x,y) {
  rect(sq_size*0.6+x*sq_size/3,5.4*sq_size+y*sq_size/3,sq_size/3,sq_size/3);
}

function clear() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  $("#score .value").html(score);
  
  if(game_over == true) {
    //G  
    {
    pix(1,0);
    pix(2,0);
    pix(3,0);
    pix(0,1);
    pix(4,1);
    pix(0,2);
    pix(0,3);
    pix(3,3);
    pix(0,4);
    pix(4,4);
    pix(1,5);
    pix(2,5);
    pix(3,5);
    }
    //A
    {
    pix(8,0);
    pix(9,0);
    pix(7,1);
    pix(10,1);
    pix(6,2);
    pix(10,2);
    pix(6,3);
    pix(7,3);
    pix(8,3);
    pix(9,3);
    pix(10,3);
    pix(6,4);
    pix(10,4);
    pix(6,5);
    pix(10,5);
    }
    //M
    {
    pix(12,0);
    pix(16,0);
    pix(12,1);
    pix(13,1);
    pix(15,1);
    pix(16,1);
    pix(12,2);
    pix(14,2);
    pix(16,2);
    pix(12,3);
    pix(16,3);
    pix(12,4);
    pix(16,4);
    pix(12,5);
    pix(16,5);
    }
    //E
    {
    pix(18,0);
    pix(19,0);
    pix(20,0);
    pix(21,0);
    pix(22,0);
    pix(18,1);
    pix(18,2);
    pix(19,2);
    pix(20,2);
    pix(21,2);
    pix(18,3);
    pix(18,4);
    pix(18,5);
    pix(19,5);
    pix(20,5);
    pix(21,5);
    pix(22,5);
    }
    
    //O
    {
    pix(1,7);
    pix(2,7);
    pix(3,7);
    pix(0,8);
    pix(4,8);
    pix(0,9);
    pix(4,9);
    pix(0,10);
    pix(4,10);
    pix(0,11);
    pix(4,11);
    pix(1,12);
    pix(2,12);
    pix(3,12);
    }
    //V
    {
    pix(6,7);
    pix(10,7);
    pix(6,8);
    pix(10,8);
    pix(7,9);
    pix(9,9);
    pix(7,10);
    pix(9,10);
    pix(7,11);
    pix(9,11);
    pix(8,12);
    }
    //E
    {
    pix(12,7);
    pix(13,7);
    pix(14,7);
    pix(15,7);
    pix(16,7);
    pix(12,8);
    pix(12,9);
    pix(13,9);
    pix(14,9);
    pix(15,9);
    pix(12,10);
    pix(12,11);
    pix(12,12);
    pix(13,12);
    pix(14,12);
    pix(15,12);
    pix(16,12);
    }
    //R
    {
    pix(18,7);
    pix(19,7);
    pix(20,7);
    pix(21,7);
    pix(18,8);
    pix(22,8);
    pix(18,9);
    pix(22,9);
    pix(18,10);
    pix(19,10);
    pix(20,10);
    pix(21,10);
    pix(18,11);
    pix(22,11);
    pix(18,12);
    pix(22,12);
    }
  }
  else {
  
    car(x,y);
  
    for(var i=0; i<bars.length; i = i + 1) {
      draw_bar(bars[i][0],bars[i][1]);
    }
  }
}
 
//END LIBRARY CODE