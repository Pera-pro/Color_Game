let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let stripe = document.querySelector("#stripe");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            
            // Operador ternario para actualizar numSquares según el texto del botón
            numSquares = this.textContent === "Hard" ? 6 : 3;
            reset();
        });
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            let clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "¡Correcto!";
                resetButton.textContent = "Jugar de nuevo";
                changeColors(pickedColor);
                document.body.style.backgroundColor = pickedColor;
                h1.style.backgroundColor = pickedColor;
                stripe.style.backgroundColor = getStripeColor(pickedColor);
                let textColor = getContrastColor(pickedColor);
                h1.style.color = textColor;
                messageDisplay.style.color = textColor;
            } else {
                this.style.backgroundColor = document.body.style.backgroundColor;
                messageDisplay.textContent = "Intentalo nuevamente";
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "Nuevos Colores";
    
    document.body.style.backgroundColor = "#232323";
    h1.style.backgroundColor = "#232323";
    h1.style.color = "white";
    stripe.style.backgroundColor = "white";
    messageDisplay.style.color = "black";

    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

resetButton.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function getContrastColor(rgbString) {
    let rgb = rgbString.match(/\d+/g);
    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128 ? "black" : "white";
}

function getStripeColor(rgbString) {
    let rgb = rgbString.match(/\d+/g);
    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    if (brightness >= 128) {
        r = Math.max(0, r - 35);
        g = Math.max(0, g - 35);
        b = Math.max(0, b - 35);
    } else {
        r = Math.min(255, r + 35);
        g = Math.min(255, g + 35);
        b = Math.min(255, b + 35);
    }
    return "rgb(" + r + ", " + g + ", " + b + ")";
}