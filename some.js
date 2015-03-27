window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();


//----- ADIVINAR EL NÚMERO -----//

 var guessinGame = (function(){
    var output = document.getElementById('output');
    var input = document.getElementById('input');
    var button = document.querySelector('.css_btn_class');
    theNumber = Math.floor(Math.random() * 100 + 1);
    var gameMessage = document.getElementById('game_message');

    var guessesRemaining = 10;
    var gameState = "";

    var winGame = function(){
        gameMessage.innerText = "You've just won! Bitch.";
        gameMessage.style.display = "block";
    }

    var loseGame = function(){
        gameMessage.innerText = "You've just lost! Bitch.";
        gameMessage.style.display = "block";
    }

    var hide = function(){
        if(gameMessage.style.display !== "none"){
            gameMessage.style.display = "none";
        }
    }


    
    var clickHandler = function(){
        guessesRemaining = guessesRemaining - 1;
        gameState = " You have " + guessesRemaining + " lives left.";

        var guess = parseInt(input.value);
        if (guess > theNumber){
            output.innerText = 'Too high.' + gameState;
            hide();
        } else if (guess < theNumber){
            output.innerText = 'Too low.' + gameState;
            hide();
        } else if (guess === theNumber){
            guessesRemaining = 10;
            output.innerText = "That's it!";
            winGame();
            theNumber = Math.floor(Math.random() * 100 + 1);
        }
        if (guessesRemaining < 1){
            guessesRemaining = 10;
            loseGame();
            theNumber = Math.floor(Math.random() * 100 + 1);
        }
    }
    
    button.addEventListener('click', clickHandler, false);
    input.addEventListener('keypress', function(e){
        var key = e.which || e.keyCode;
        console.log(key);
        if(key == 13){
            clickHandler();
            return false;
        }
    }, false);
    
})();


//----- SPACE INVADERS -----//


var spaceInvaders = (function(){
    var canvas = document.querySelector('#canvas1');
    var context = canvas.getContext('2d');

    var background = new Image();
    var alien = new Image();
    var missile = new Image();  
    var ship = new Image();

    
    background.onload = function(){
        context.drawImage(background, 0, 0);
    }
    alien.onload = function(){
        context.drawImage(alien, 100, 0);
    }
    missile.onload = function(){
        context.drawImage(missile, 0, 100);
    }
    ship.onload = function(){
        context.drawImage(ship, 100, 100);
    }

    background.src = 'images/background.png';
    alien.src = 'images/alien.png';
    missile.src = 'images/missile.png';
    ship.src = 'images/ship.png';
})();

