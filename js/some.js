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
    //'Stage' se encarga de mostrar gráficos y sprites.
    var stage = new PIXI.Stage(0x000000);
    //'renderer' genera el elemento <canvas> y después se lo apenda(¿?).
    //'renderer.view' devuelve un objeto <canvas>.
    var renderer = PIXI.autoDetectRenderer(252, 432);
    $('#invader').append(renderer.view);

    //Cargo los assets del juego.
    var loader = new PIXI.AssetLoader(['images/alien.png', 
                                       'images/missile.png',
                                       'images/ship.png',
                                       'images/background.png']);
    //Indica a 'loader' que cargue los assets.
    loader.load();
    //Indica que al completar la carga, ejecute 'setup'.
    loader.onComplete = setup;

    function setup () {
        var textures = [];
        textures[0] = PIXI.TextureCache['images/alien.png'];
        textures[1] = PIXI.TextureCache['images/missile.png'];
        textures[2] = PIXI.TextureCache['images/ship.png'];
        textures[3] = PIXI.TextureCache['images/background.png'];

        var sprites = {
            alien: new PIXI.Sprite(textures[0]),
            missile: new PIXI.Sprite(textures[1]),
            ship: new PIXI.Sprite(textures[2]),
            background: new PIXI.Sprite(textures[3])
        };

        stage.addChild(sprites.background);
        stage.addChild(sprites.alien);
        stage.addChild(sprites.missile);
        stage.addChild(sprites.ship);

        sprites.alien.position.set(115, 50);
        sprites.ship.position.set(115, 380);
        sprites.missile.position.set(115, 200);

        renderer.render(stage);
    };



})();

