function init(){
    canvas = document.getElementById('myCanvas');
    W = canvas.width = 800;
    H = canvas.height = 580;
    cs = 20;
    gameOver = false;
    score = 5;

    food = getRandomFood();
    pen = canvas.getContext('2d');
    pen.fillStyle = "red";

    food_img = new Image();
    food_img.src = "Assets/food.png";

    trophy = new Image();
    trophy.src = "Assets/trophy.jpg";

    snake = {
        //snake object!
        init_len : 5,
        color : "red",
        cells : [],
        direction : "right",

        createSnake : function(){   //defining snake
            for(var i = this.init_len; i > 0; i--){
                this.cells.push({x:i, y:0});
            }
        },
        
        drawSnake : function(){     //drawing snake on canvas
            for(var i =0; i < this.cells.length; i++){
                pen.fillRect(this.cells[i].x *cs , this.cells[i].y*cs , cs-2, cs-2 );
            }
        },

        updateSnake : function(){
            var headX = this.cells[0].x;    //cells[] mei elements desc order mei hi
            var headY = this.cells[0].y;
            //if snake eats food
            if(headX == food.x && headY == food.y){
                //snake eats food
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();   //delete one rect from back
            }
            
            var X, Y;
            if(this.direction == "right"){
                X = headX + 1;
                Y = headY;
            }
            else if(this.direction == "left"){
                X = headX - 1;
                Y = headY;
            }
            else if(this.direction == "up"){
                X = headX;
                Y = headY - 1;
            }
            else if(this.direction == "down"){
                X = headX;
                Y = headY + 1;
            }
            this.cells.unshift({x: X, y: Y}); //add one rect to front

            //game over - logic
            var lastX = (W/cs);
            var lastY = (H/cs);
            var currX = this.cells[0].x;
            var currY = this.cells[0].y;

            if(currX < 0 || currY < 0 || currX > lastX || currY > lastY){
                gameOver = true;
            }

        }
    }
    snake.createSnake();
    function keypressed(e){
        if(e.key == "ArrowRight"){
            snake.direction = "right";
        }
        
        else if(e.key == "ArrowUp"){
            snake.direction = "up";
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        console.log(e.key);
        console.log(snake.direction);
    }
    document.addEventListener('keydown', keypressed); //listen which key is pressed
    //keypressed is a jason object having various properties and one property is key 
    //which actually tells which key is pressed!
}

function draw(){
    pen.clearRect(0, 0, W, H);  //deleting the old frame
    pen.fillStyle = snake.color;
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x*cs, food.y*cs, cs, cs);

    pen.drawImage(trophy, 25, 25, cs*3, cs*2);
    pen.font = "20px Roboto";
    pen.fillText(score,50, 40);
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W - cs)/cs);
    var foodY = Math.round(Math.random()*(H - cs)/cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "black",
    }

    return food;
}

function game_loop(){
    if(gameOver == true){
        clearInterval(g);
        alert("Game Over");
    }
    draw();
    update();
}


init();
var g = setInterval(game_loop, 100);
// draw();
