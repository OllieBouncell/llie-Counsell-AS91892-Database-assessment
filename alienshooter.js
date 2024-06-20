console.log("%c t01_create_sprite", "color: blue;");

/*******************************************************/
// global variables
/*******************************************************/

const SCREEN_WIDTH = 500;
const SCREEN_HEIGHT = 300;;
const OBSTACLE_HEIGHT = 25;
const OBSTACLE_WIDTH = 25;
const WALL_WDITH = 8

var spawnDist = 0;
var nextSpawn = 0;
let bullets = [];
var score = 0;
var lives = 3;
var screenSelector = "start"; 

/*******************************************************/
// setting up game
/*******************************************************/

// preloads the image before it is added //
function preload() {
    imgPlayer = loadImage('/images/player.png');
}

 //parameter function for inviisble wall //
function invisible_wall(x, y, w, h){
    wallSide  = new Sprite(x, y, w, h, 's');
    wallSide.color = 'lightblue';
    wallSide = noStroke();
}

//called on start
function setup() {
    console.log("setup: ");

    //set canvas
    cnv = new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT);

    // Group all of my things together //
    obstacles = new Group();
    bulletGroup = new Group();

    // invisble Border around the screen //
    invisible_wall(0, SCREEN_HEIGHT/2, WALL_WDITH, SCREEN_HEIGHT);
    invisible_wall(SCREEN_WIDTH/2, SCREEN_HEIGHT, SCREEN_WIDTH, WALL_WDITH);
    invisible_wall(SCREEN_WIDTH/2, 0, SCREEN_WIDTH, WALL_WDITH);

    //  the player and the image for the player //
    player = new Sprite(100, 100, 20, 'd');
    player.color = 'green';
    player.addImage(imgPlayer);
    imgPlayer.resize(100, 100);

    // where you press space to switch through screens //
    document.addEventListener("keydown", 
        function(event) {
            if(screenSelector == "start" || screenSelector == "end"){
                screenSelector = "game"
                resetGame()
            }
    }); 

     // Keyboard Movement-Up and Down //
    document.addEventListener("keydown", function(event) {

        if (event.code === 'ArrowLeft') {
            player.vel.x = -3;
        }
        else if (event.code === 'ArrowRight')  {
            player.vel.x = 3;
        }
        else if (event.code === 'ArrowUp') {
            player.vel.y = -3;
        }
        else if (event.code === 'ArrowDown')  {
            player.vel.y = 3; 
        }
    });

    document.addEventListener("keyup", function(event) {

        if (event.code === 'ArrowLeft') {
            player.vel.x = 0; // Set sprite's velocity to 0
        }
        else if (event.code === 'ArrowRight') {
            player.vel.x = 0;
        }
        else if (event.code === 'ArrowUp')  {
            player.vel.y = 0;
        }
        else if (event.code === 'ArrowDown')  {
            player.vel.y = 0;
        }

    });

//collisions
    player.collides(obstacles, playerHitobstacle);
    bulletGroup.collides(obstacles, bulletHitObstacle);    
}



/*******************************************************/
// function for game
/*******************************************************/
function draw() {
    // Selects what function Screen to use when something happens //

    if (lives <= 0) {
        screenSelector = "end";
    }

    if(screenSelector=="game"){
       gameScreen();
    }
    else if(screenSelector=="end"){
        endScreen();
    }
    else if(screenSelector=="start"){
        startScreen();
    }
    else {
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }

}


// when a key is pressed the bullet is shot  //
function keyPressed() {
      if (keyCode == 32) {
            bullet = new Sprite( player.x + 50, player.y, 5, 'd');
            bullet.color = 'yellow';
            bullet.bounciness = 0;
            bullet.vel.x = 3;
            bulletGroup.add(bullet);
            bullet.life = 30; // life of how many frames the bullet lasts found on p5.play website
        }

}

// Calculetes where the Obstacle spawns on the Y-Value  // 
function obstaclesY(max_val, min_val) {
    var result = random(min_val, max_val - min_val)
    console.log(result)
    return result
}


// Creates an obstacle and adds it to group   //
function newObstacle() {
    var screenY = obstaclesY(SCREEN_HEIGHT, OBSTACLE_HEIGHT)
    var obstacle = new Sprite(SCREEN_WIDTH, screenY, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');

    obstacle.color = color("green");
    obstacle.vel.x = -5;

    obstacles.add(obstacle);
}



  // Remove bullet and obstacle and add score  //
function bulletHitObstacle(bullet, obstacle) {
    player.bounciness = 0;
    obstacle.remove();
    bullet.remove();
    score++;
}

 // when player hits allien player loses life  //
function playerHitobstacle (_player,obstacle) {
    obstacle.remove();
    console.log("Lives");
    lives--;
}



/*******************************************************/
// functions for each screen
/*******************************************************/

 // Startscreen function aka the landing page   //
function startScreen(){
    //setup for startscreen
    allSprites.visible = false;
    background("orange");
    textSize(24);
    fill(255);
    stroke(0);
    strokeWeight(4);

    //text for startscreen
    text("Infinity Assault ", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 90);
    textSize(18);
    text("Rules and How to Play", 50, 130);
    textSize(14);
    text("move with the arrow keys", 50, 160);
    textSize(14);
    text("shoot the ailens with the space key", 50, 190);
    textSize(12);
    text("your goal is to Shoot aliens, score high, avoid losing all three lives or you lose", 50, 230);
}





// gameScreen function where the user plays the game   //
function gameScreen(){
    //setup for gamescreen
    background("lightblue");
    player.rotation = 0;
    player.bounciness = 0;
    allSprites.visible = true;

    //displays lives
    for (i = 0; i <lives; i++){
        rect(40 * i, 10, 35, 35);
    }

    fill(0);
    stroke(0);
    strokeWeight(); 
    textSize(32);
    text(score, 410, 40);

    //how quick obstacles spawn
    if(frameCount > nextSpawn){
        newObstacle();
        nextSpawn = frameCount + random(10,200);
    }
}
// endScreen function where the user dies   //
function endScreen(){
    //setup for endscreen
    background("orange");
    allSprites.visible = false;
    textSize(24);
    fill(255);
    stroke(0);
    strokeWeight(4);

    //text for endscreen
    text("You Died your lives have reached: " +lives, 50, 50);
    textSize(24);
    text("your score was: "+score, 50, 110);
    textSize(14);
    text("press any key to restart", 50, 150);

}

// resetGame where the game resets so you can play again //
function resetGame(){
    //setup for reseting the game
    score = 0;
    lives = 3;
    player.position.x = 100;
    player.position.y = 100;
    obstacles.removeAll();
    bulletGroup.removeAll();
    spawnDist = 0;
    nextSpawn = 0;
    gameScreen();  
 }