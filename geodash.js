console.log("%c t01_create_sprite", "color: blue;");

// variables
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 200;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;

const OBSTACLE_HEIGHT = PLAYER_HEIGHT;
const OBSTACLE_WIDTH = PLAYER_WIDTH;

var spawnDist = 0;
var nextSpawn = 0;
var score = 0;
var player;
var screenSelector = "start";
var obstacles;
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    cnv = new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT);

    obstacles = new Group();

    // size and color of floor
    floor = new Sprite(SCREEN_WIDTH / 2, SCREEN_HEIGHT, SCREEN_WIDTH, 4, 's');
    floor.color = color("black");
    world.gravity.y = 70;

    // Player Movement
    document.addEventListener("keydown",
        function(event) {
            if (screenSelector == "start" || screenSelector == "end") {
                screenSelector = "game"
                resetGame();
            } else {
                if (player.y > 184) {
                    console.log("Key pressed!");
                    player.vel.y = -20;
                }
            }
        });

}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    // how u switch through the screens
    if (screenSelector == "game") {
        gameScreen();
    } else if (screenSelector == "end") {
        endScreen()
    } else if (screenSelector == "start") {
        startScreen();
    } else {
        text("wrong screen", 50, 50);
        console.log("wrong screen ")
    }
}
// size and color of obstacles
function newObstacle() {
    obstacle = new Sprite((SCREEN_WIDTH - 100), SCREEN_HEIGHT - OBSTACLE_HEIGHT / 2, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    obstacle.color = color("green");
    obstacle.vel.x = -10;

    obstacles.add(obstacle);
}

// How the Player dies
function youDied(_player, _obstacle) {
    fb_saveScore('geoDash/', score);
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
};

// Main screen functions

function startScreen() {
    // the introduction screen
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("GEODASH", 50, 50);
    textSize(24);
    text("Press to start", 50, 110);
}

function gameScreen() {
    // the screen were the game is played
    background("lightblue");
    allSprites.visible = true;
    score++;
    if (frameCount > nextSpawn) {
        newObstacle();
        nextSpawn = frameCount + random(10, 100);
        //Obstacle spawn
    }
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}
// the screen where you die
function endScreen() {
    background("white");
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died", 50, 50);
    textSize(24);
    text("your score was: " + score, 50, 110);
    textSize(14);
    text("press any key to play again", 50, 150);
}
// how you try again when you finish the game
function resetGame() {
    player = new Sprite(PLAYER_WIDTH * 1.2, SCREEN_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
    player.color = color("pink");
    player.collides(obstacles, youDied);
    score = 0;
}

/*******************************************************/
//  END OF APP
/*******************************************************/