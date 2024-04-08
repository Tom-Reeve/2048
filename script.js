let grid_squares = document.getElementsByClassName("square"); // 0 is top left, 15 is bottom right
let board_state = [ // 0 is empty grid squares, 1 is grid squares containing game squares
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
let active_squares = [];

let can_move_in_direction = false;
let key_down = false;

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 38 && !key_down) {
        key_down = true;
        for (let i = 0 ; i < grid_squares.length ; i++) {
            if (active_squares[i] != undefined && active_squares[i] != "") {
                active_squares[i].moveUp();
            }
        }
    }
    if (e.keyCode === 40 && !key_down) {
        key_down = true;
        for (let i = grid_squares.length ; i >= 0 ; i--) {
            if (active_squares[i] != undefined && active_squares[i] != "") {
                active_squares[i].moveDown();
            }
        }
    }
    if (e.keyCode === 37 && !key_down) {
        key_down = true;
        for (let i = 0 ; i < grid_squares.length ; i++) {
            if (active_squares[i] != undefined && active_squares[i] != "") {
                active_squares[i].moveLeft();
            }
        }
    }
    if (e.keyCode === 39 && !key_down) {
        key_down = true;
        for (let i = grid_squares.length ; i >= 0 ; i--) {
            if (active_squares[i] != undefined && active_squares[i] != "") {
                active_squares[i].moveRight();
            }
        }
    }
});
document.addEventListener("keyup", function(e) {
    key_down = false;
    NewSquare();
});

class GameSquare {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;

        this.index = CalculateIndex(this.x, this.y); // where is it in the grid square?
        
        board_state[this.index] = 1; // puts the square in the board state
        grid_squares[this.index].style.backgroundColor = "blue";
        grid_squares[this.index].innerHTML = this.value;

        active_squares[this.index] = this;
    }
    moveUp() {
        grid_squares[this.index].classList.remove("MoveUp");
        
        grid_squares[this.index].style.backgroundColor = "orange";
        let touching_upper_wall = this.y === 0 ? true : false;
        let square_above = board_state[this.index - 4] === 1 ? true : false;

        if (touching_upper_wall) {
            return;
        } else if (square_above) {
            if (active_squares[this.index - 4].value === active_squares[this.index].value) {
                active_squares[this.index].value = this.value * 2;
                active_squares[this.index].innerHTML = this.value;
            } else {
                return;
            }
        }
        board_state[this.index] = 0;
        grid_squares[this.index].style.backgroundColor = "white";
        grid_squares[this.index].innerHTML = "";
        active_squares[this.index] = "";

        this.y -= 1;
        this.index = CalculateIndex(this.x, this.y);
        board_state[this.index] = 1; // puts the square in the board state
        grid_squares[this.index].style.backgroundColor = "orange";
        grid_squares[this.index].innerHTML = this.value;
        active_squares[this.index] = this;
        
        this.moveUp();
    }
    moveDown() {
        grid_squares[this.index].style.backgroundColor = "orange";
        let touching_lower_wall = this.y === 3 ? true : false;
        let square_below = board_state[this.index + 4] === 1 ? true : false;
        
        if (touching_lower_wall) {
            return;
        } else if (square_below) {
            if (active_squares[this.index + 4].value === active_squares[this.index].value) {
                active_squares[this.index].value = this.value * 2;
                active_squares[this.index].innerHTML = this.value;
            } else {
                return;
            }
        }
        can_move_in_direction = true;

        board_state[this.index] = 0;
        grid_squares[this.index].style.backgroundColor = "white";
        grid_squares[this.index].innerHTML = "";
        active_squares[this.index] = "";

        this.y += 1;
        this.index = CalculateIndex(this.x, this.y);
        board_state[this.index] = 1; // puts the square in the board state
        grid_squares[this.index].style.backgroundColor = "orange";
        grid_squares[this.index].innerHTML = this.value;
        active_squares[this.index] = this;
        
        this.moveDown();
    }
    moveLeft() {
        grid_squares[this.index].style.backgroundColor = "orange";
        let touching_left_wall = this.x === 0 ? true : false;
        let square_to_left = board_state[this.index - 1] === 1 ? true : false;

        if (touching_left_wall) {
            return;
        } else if (square_to_left) {
            if (active_squares[this.index - 1].value === active_squares[this.index].value) {
                active_squares[this.index].value = this.value * 2;
                active_squares[this.index].innerHTML = this.value;
            } else {
                return;
            }
        }
        can_move_in_direction = true;

        board_state[this.index] = 0;
        grid_squares[this.index].style.backgroundColor = "white";
        grid_squares[this.index].innerHTML = "";
        active_squares[this.index] = "";

        this.x -= 1;
        this.index = CalculateIndex(this.x, this.y);

        board_state[this.index] = 1; // puts the square in the board state
        grid_squares[this.index].style.backgroundColor = "orange";
        grid_squares[this.index].innerHTML = this.value;
        active_squares[this.index] = this;
        
        this.moveLeft();
    }
    moveRight() {
        grid_squares[this.index].style.backgroundColor = "orange";
        let touching_right_wall = this.x === 3 ? true : false;
        let square_to_right = board_state[this.index + 1] === 1 ? true : false;

        if (touching_right_wall) {
            return;
        } else if (square_to_right) {
            if (active_squares[this.index + 1].value === active_squares[this.index].value) {
                active_squares[this.index].value = this.value * 2;
                active_squares[this.index].innerHTML = this.value;
            } else {
                return;
            }
        }
        can_move_in_direction = true;

        board_state[this.index] = 0;
        grid_squares[this.index].style.backgroundColor = "white";
        grid_squares[this.index].innerHTML = "";
        active_squares[this.index] = "";

        this.x += 1;
        this.index = CalculateIndex(this.x, this.y);

        board_state[this.index] = 1; // puts the square in the board state
        grid_squares[this.index].style.backgroundColor = "orange";
        grid_squares[this.index].innerHTML = this.value;
        active_squares[this.index] = this;
        
        this.moveRight();
    }
}

function CalculateIndex(x, y) {
    return x + (y * 4);
}

function NewSquare() {
    let random_index = Math.floor(Math.random() * grid_squares.length);

    let active_square_count = 0;
    for (let i = 0 ; i < active_squares.length ; i++) {
        if (active_squares[i] !== undefined) {
            active_square_count += 1;
        }
    }
    
    if (board_state[random_index] == 1) {
        NewSquare();
        return;
    }
    
    let new_x = random_index % 4;
    let new_y = Math.floor(random_index / 4);
    let new_value = Math.random() < 0.9 ? 2 : 4;

    let new_square = new GameSquare(new_x, new_y, new_value);
}

function Init() {
    NewSquare();
    NewSquare();
}
Init();

//check spawn logic
//check combine multiplication
//game over condition
//stop new block spawning if no pieces have moved
//score
//rewrite with canvas (reduce block moving + spawn jumpiness)
//change colours based on block values
//stop random key presses spawning blocks












