/*
    Daniel Tibbotts
    FLOX - SHEEP GENERATOR
    Date: Mon, 17 Aug 2020

*/

window.onload = () => {

// Variable Declarations
    const CANVAS = document.getElementById("canvas");
    const CTX = CANVAS.getContext("2d");

    const SHEEP_COLOR = "#f3f3f3";

    const BTN_DRAW_FLOCK = document.getElementById("draw-flock");

    const BTN_INFO = document.getElementById("info");
    const INFO_CLOSE_BTN = document.getElementById("close-info-button");

    const MOUSEX_ELEMENT = document.getElementById("mouseX-readonly")
    const MOUSEY_ELEMENT = document.getElementById("mouseY-readonly")

    const BG_COLOR = document.getElementById("bg-color-input");

    const INSTRUCT = document.querySelector(".instructions");



    let flock = [];

    let animate = true;
    let canvas_color = BG_COLOR.value;

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight / 2.2;


// Classes
    class Sheep {
        constructor(id, x, y, radius){
            this.id = id;
            this.x = x;
            this.y = y;

            this.velX = null;
            this.velY = null;

            this.dirX = null;
            this.dirY = null;

            this.radius = radius;
            this.color = SHEEP_COLOR;
        }
    }


    BTN_DRAW_FLOCK.addEventListener("click", (e)=> {
        e.preventDefault();
        validateInput();
        drawBackground();
        drawFlock();
    });

    BTN_INFO.addEventListener("click", (e)=>{
        e.preventDefault();
        INSTRUCT.classList.toggle("hidden");
    });

    INFO_CLOSE_BTN.addEventListener("click", (e)=> {
        e.preventDefault();
        INSTRUCT.classList.toggle("hidden");
    });


    CANVAS.addEventListener("mousemove", (e)=>{
        const rect = CANVAS.getBoundingClientRect();
        let mouseX = parseInt(e.clientX - rect.left);
        let mouseY = parseInt(e.clientY - rect.top);

        MOUSEX_ELEMENT.value = mouseX;
        MOUSEY_ELEMENT.value = mouseY;

    });

    CANVAS.addEventListener("click", (e)=> {
        let rect = CANVAS.getBoundingClientRect();
        let mouseX = parseInt(e.clientX - rect.left);
        let mouseY = parseInt(e.clientY - rect.top);

        let inputSpeed = document.getElementById("sheep-speed-input").value;

        newSheep = new Sheep();

        newSheep.id = flock.length + 1;
        newSheep.radius = randomSheepWeight();
        newSheep.x = mouseX;
        newSheep.y = mouseY;

        newSheep.dirX = randomDirection();
        newSheep.dirY = randomDirection();

        newSheep.velX = Number(inputSpeed) * newSheep.dirX;
        newSheep.velY = Number(inputSpeed) * newSheep.dirY;
        flock.push(newSheep);
    });


    BG_COLOR.addEventListener("change", ()=>{
        canvas_color = BG_COLOR.value;
    });




// Functions


    function validateInput(){
        // Make sure values exist
        // Check to make sure values are within range (function exists??)
        // Check to make sure min is less than max
        // Check to make sure max is greater than min
    }

    function randomNumber(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomSheepWeight(){
        let min = document.getElementById("sheep-weight-min-input").value;
        let max = document.getElementById("sheep-weight-max-input").value;
        return randomNumber(min,max);
    }

    function randomDirection(){
        let random = randomNumber(-1, 1);
        return Number(random != 0 ? random : 1);
    }

    // Return a Random X value
    function randomX(margin) {
        let x = randomNumber(0, CANVAS.width);

        if(x <= margin){
            x =+ margin + 1;
        }

        if(x >= CANVAS.width - margin){
            x =- margin - 1;
        }

        return x;
    }

    // Return a Random Y value
    function randomY(margin) {
        let y = randomNumber(0, CANVAS.height);

        if(y <= margin){
            y += margin + 1;
        }

        if(y >= CANVAS.height - margin){
            y =- margin - 1;
        }

        return y;
    }


    function drawBackground(){
        CTX.fillStyle = canvas_color;
        CTX.fillRect(0,0, CANVAS.width, CANVAS.height);
    }

    // Draw a single sheep to the canvas
    function drawSheep(x, y, radius, color){
        CTX.beginPath();
        CTX.arc(x,y,radius,0, 2 * Math.PI);
        CTX.fillStyle = color;
        CTX.fill();

        CTX.lineWidth = 2;
        CTX.strokeStyle = "#003300";
        CTX.stroke();
    }

    // Draw multiple sheep to the canvas
    function drawFlock(){
        flock = [];
        let totalSheep = document.getElementById("sheep-qty-input").value;
        let inputSpeed = document.getElementById("sheep-speed-input").value;

        for(let i = 0; i < totalSheep; i++){
            flock[i] = new Sheep;
            flock[i].id = i;
            flock[i].radius = randomSheepWeight();

            flock[i].x = randomX(flock[i].radius);
            flock[i].y = randomY(flock[i].radius);

            flock[i].dirX = randomDirection();
            flock[i].dirY = randomDirection();

            flock[i].velX = Number(inputSpeed) * flock[i].dirX;
            flock[i].velY = Number(inputSpeed) * flock[i].dirY;

            drawSheep(flock[i].x, flock[i].y, flock[i].radius, flock[i].color);
        }

    }


    function moveFlock(){
        CANVAS.width = window.innerWidth;
        CANVAS.height = window.innerHeight / 2.2;

        // clear the canvas/previous frame ready for new frame
        drawBackground();

        for (sheep of flock){

            // Check Boundries and adjust velocity of a sheep
            if((sheep.x + sheep.radius) >= CANVAS.width){
                sheep.velX  = -sheep.velX;
                sheep.x += sheep.velX;
            }

            if((sheep.x - sheep.radius) <= 0){
                sheep.velX = -sheep.velX;
                sheep.x += sheep.velX;
            }

            if((sheep.y + sheep.radius) >= CANVAS.height){
                sheep.velY = -sheep.velY;
                sheep.y += sheep.velY;
            }

            if((sheep.y - sheep.radius) <= 0){
                sheep.velY = -sheep.velY;
                sheep.y += sheep.velY;
            }

            sheep.x += sheep.velX;
            sheep.y += sheep.velY;

            // Draw sheep to canvas
            drawSheep(sheep.x, sheep.y, sheep.radius, sheep.color);
        }

        // loop moveFlock() function using requestAnimationFrame() function
        // loops approx 60 frames per second
        animate ? requestAnimationFrame(moveFlock): null;
    }

    // Call initial 
    moveFlock();

} // End of JavaScript