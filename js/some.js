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

//Hago foco en el canvas cuando el scroll de la ventana se
//posiciona sobre este.
/*
var invader = $('#invader');
var spaceInvader = $('#spaceInvader');
var anotherThing = $('#anotherThing');

$(window).scroll(function(){
    console.log($(window).scrollTop());
    if((spaceInvader.offset().top <= $(window).scrollTop()) && ($(window).scrollTop() <= anotherThing.offset().top)){
        spaceInvader.focus();
        console.log("focused");
    }
});
*/

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
    var sprites = {};

    //Tamaño de tile.
    var sprSize = 36;
    //Ancho canvas.
    var stWidth = 252;
    //Alto canvas.
    var stHeight = 432;

    var state;

    //Función setup parecida a la de Processing.
    function setup () {
        //Asignación de teclas.
        var left = keyboard(37), right = keyboard(39);

        var textures = [];
        textures[0] = PIXI.TextureCache['images/alien.png'];
        textures[1] = PIXI.TextureCache['images/missile.png'];
        textures[2] = PIXI.TextureCache['images/ship.png'];
        textures[3] = PIXI.TextureCache['images/background.png'];

        sprites.alien = new PIXI.Sprite(textures[0]),
        sprites.missile = new PIXI.Sprite(textures[1]),
        sprites.ship = new PIXI.Sprite(textures[2]),
        sprites.background = new PIXI.Sprite(textures[3])

        stage.addChild(sprites.background);
        stage.addChild(sprites.alien);
        stage.addChild(sprites.missile);
        stage.addChild(sprites.ship);

        sprites.ship.vx = 0;

        sprites.alien.position.set(115, 50);
        sprites.ship.position.set(115, 380);
        sprites.missile.position.set(115, 200);
        //Funcionalidad de teclas.
        left.press = function(){
            sprites.ship.vx = -3;
        }
        left.release = function(){
            sprites.ship.vx = 0;
        }


        right.press = function(){
            sprites.ship.vx = 3;
        }
        right.release = function(){
            sprites.ship.vx = 0;
        }

        state = play;

        //Se lo ejecuta acá para que tenga acceso al scope
        //de setup.
        draw();
    };

    //Loop principal.
    function draw(){
        //Recursión a 60FPS.
        requestAnimationFrame(draw);

        state();

        renderer.render(stage);
    };

    //Gameplay.
    function play(){

        //sprites.ship.vx = 0;
        sprites.ship.x += sprites.ship.vx;

        if(sprites.ship.x > stWidth){
            sprites.ship.x = -sprSize;
        } else if(sprites.ship.x < (-sprSize)){
            sprites.ship.x = stWidth;
        };

    }

    //Función que maneja el teclado. Siempre los eventos deben apuntar
    //a window.
    function keyboard(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };
        //Prueba propia de scopes.
        var arriba = key.upHandler;
        var abajo = key.downHandler;

        //Attach event listeners
        window.addEventListener(
            "keydown", abajo.bind(key), false
        );
        window.addEventListener(
            "keyup", arriba.bind(key), false
        );
        return key;
    }

})();

