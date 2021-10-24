function check_line(row, char) {
  for (var i = 0; i < row.length; i++) {
    if (row[i] != char) {
      return false;
    }
  }
  return true;
}

function check_win(grid, x_turn) {
  var ch = x_turn ? " X " : " O ";
  //check horizontals
  var horizontal_win = false;
  for (var i = 0; i < grid.length; i++) {
    if (check_line(grid[i], ch)) {
      horizontal_win = true;
    }
  }
  //check verticals
  var vertical_win = false;
  for (var i = 0; i < grid.length; i++) {
    var column = [grid[0][i], grid[1][i], grid[2][i]];
    if (check_line(column, ch)) {
      vertical_win = true;
    }
  }
  //check diagonals
  diagonal_win = false;

  first_diagonal = [grid[0][0], grid[1][1], grid[2][2]];
  second_diagonal = [grid[2][0], grid[1][1], grid[0][2]];

  if (check_line(first_diagonal, ch) || check_line(second_diagonal, ch)) {
    diagonal_win = true;
  }
  return horizontal_win || vertical_win || diagonal_win;
}
function print_grid(grid) {
  for (var i = 0; i < 3; i++) {
    var st = grid[i][0] + grid[i][1] + grid[i][2];
    console.log(st);
  }
}
var grid = [
  [" - ", " - ", " - "],
  [" - ", " - ", " - "],
  [" - ", " - ", " - "],
];

var gameOver = false;
var x_turn = true;

const prompt = require("prompt-sync")();

while (!gameOver) {
  print_grid(grid);
  var valid_move = false;
  while (!valid_move) {
    var x = prompt("Enter column of move: ");
    var y = prompt("Enter row of move: ");

    if (0 <= x < 3 && 0 <= y < 3 && grid[y][x] == " - ") {
      valid_move = true;
    } else {
      console.log("Invalid move. Try again");
    }
  }
  var place = x_turn ? " X " : " O ";
  grid[y][x] = place;

  if (check_win(grid, x_turn)) {
    gameOver = true;
    print_grid(grid);
    var winner_string = x_turn ? "X wins!" : "O wins!";
    console.log(winner_string);
  }
  var x_turn = !x_turn;
}
