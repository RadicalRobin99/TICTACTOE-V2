let top_left = document.getElementById("top_left_field");
let top_middle = document.getElementById("top_middle_field");
let top_right = document.getElementById("top_right_field");
let middle_left = document.getElementById("middle_left_field");
let center = document.getElementById("center_field");
let middle_right = document.getElementById("middle_right_field");
let bottom_left = document.getElementById("bottom_left_field");
let bottom_middle = document.getElementById("bottom_middle_field");
let bottom_right = document.getElementById("bottom_right_field");

var game_fields = [
  [top_left, top_middle, top_right],
  [middle_left, center, middle_right],
  [bottom_left, bottom_middle, bottom_right]
];

let number_of_goes = 0;
var player_1_name;
var player_2_name;


function place_player_letter(chosen_game_field) {
  if (chosen_game_field.value == '') { // if there is no value already in the grid field
    
    if (number_of_goes % 2 == 0) {
      chosen_game_field.value = 'X'
      chosen_game_field.style.color = "blue";
      chosen_game_field.style.backgroundColor = "orange";

    }
    else if (number_of_goes % 2 == 1) {
      chosen_game_field.value = 'O'
      chosen_game_field.style.color = "orange";
      chosen_game_field.style.backgroundColor = "blue";
    }
    else {}

    number_of_goes++;
  }
}


function update_game(clicked_game_field) {
  place_player_letter(clicked_game_field)
  state_player_turn()
  check_win()
  cursor_correction()
}


function check_column_win() {

  if ((game_fields[0][0].value != "") && (game_fields[0][0].value == game_fields[1][0].value &&
  game_fields[0][0].value == game_fields[2][0].value)) {

    draw_win_line(95, 35, 95, 465)
    return true
  }

  else if ((game_fields[0][1].value != "") && (game_fields[0][1].value == game_fields[1][1].value &&
  game_fields[0][1].value == game_fields[2][1].value)) {

    draw_win_line(250, 35, 250, 465)
    return true
  }

  else if ((game_fields[0][2].value != "") && (game_fields[0][2].value == game_fields[1][2].value &&
  game_fields[0][2].value == game_fields[2][2].value)) {

    draw_win_line(405, 35, 405, 465)
    return true
  }

  else {}
  
}

function state_player_turn() {

  let player_turn = document.getElementById("player_number_turn");
  
  if (number_of_goes % 2 == 0) {
    player_turn.innerText = `${player_1_name.toUpperCase()}'S (X) TURN...`;
  }

  else if (number_of_goes % 2 == 1) {
    player_turn.innerText = `${player_2_name.toUpperCase()}'S (O) TURN...`;
  }

  else {}

  return
}

function check_row_win() {

  if ((game_fields[0][0].value != "") && (game_fields[0][0].value == game_fields[0][1].value &&
  game_fields[0][0].value == game_fields[0][2].value)) {

    draw_win_line(33, 92, 467, 92)
    return true
  }

  else if ((game_fields[1][0].value != "") && (game_fields[1][0].value == game_fields[1][1].value &&
  game_fields[1][0].value == game_fields[1][2].value)) {

    draw_win_line(33, 250, 467, 250)
    return true
  }

  else if ((game_fields[2][0].value != "") && (game_fields[2][0].value == game_fields[2][1].value &&
  game_fields[2][0].value == game_fields[2][2].value)) {

    draw_win_line(33, 408, 467, 408)
    return true
  }

  else {
    return false
  }
  
}

function check_diagonal_win() {

  if ((game_fields[0][0].value != "") && (game_fields[0][0].value == game_fields[1][1].value &&
  game_fields[0][0].value == game_fields[2][2].value)) {

    draw_win_line(45, 45, 455, 455);
    return true
  }

  else if ((game_fields[2][0].value != "") && (game_fields[2][0].value == game_fields[1][1].value &&
  game_fields[2][0].value == game_fields[0][2].value)) {

    draw_win_line(45, 455, 455, 45);
    return true
  }

  else {
    return false
  }
  
}

function check_win() {

  if (check_row_win() || check_column_win() || check_diagonal_win()) {

    if (number_of_goes % 2 == 1) {
      let player_turn = document.getElementById("player_number_turn");
      player_turn.innerText = `${player_1_name.toUpperCase()} WINS!!!`;

      let player_1_score = document.getElementById("number_of_p1_wins");
      let current_score = player_1_score.innerHTML;
      current_score = current_score.replace(/(\r\n|\n|\r|\t)/gm, "");
      let current_score_num = Number(current_score);
      let new_score =  current_score_num + 1;

      player_1_score.innerHTML = String(new_score);
      number_of_goes ++;
      return
    }
  
    else if (number_of_goes % 2 == 0) {
  
      let player_turn = document.getElementById("player_number_turn");
      player_turn.innerText = `${player_2_name.toUpperCase()} WINS!!!`;

      let player_2_score = document.getElementById("number_of_p2_wins");
      let current_score = player_2_score.innerHTML;
      current_score = current_score.replace(/(\r\n|\n|\r)/gm, "");
      let current_score_num = Number(current_score);
      let new_score =  current_score_num + 1;

      player_2_score.innerHTML = String(new_score);
      number_of_goes ++;
      return
    }

  }

  else {}
}


function draw_win_line(pointA_x_cord, pointA_y_cord, pointB_x_cord, pointB_y_cord) {

  const canvas = document.getElementById('drawing_canvas');
  const ctx = canvas.getContext('2d');

    // set line stroke and line width
    canvas.style.zIndex = 1
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 7.5;
  

    ctx.beginPath();
    ctx.moveTo(pointA_x_cord, pointA_y_cord);
    ctx.lineTo(pointB_x_cord, pointB_y_cord);
    ctx.stroke();

}

function erase_win_line() {

  const canvas = document.getElementById('drawing_canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.zIndex = -1
}

function clear_fields() {

  for(i = 0; i < 3; i++) {
    for(j = 0; j < 3; j++) {
      game_fields[i][j].value = "";
      game_fields[i][j].style.backgroundColor = "";
    }
  }
}

function cursor_correction() {
  for(i = 0; i < 3; i++) {
    for(j = 0; j < 3; j++) {

      if (game_fields[i][j].value != "") {
        game_fields[i][j].style.cursor = "not-allowed";
      }
      
    }
  }
}

function restart_game() {
  if (number_of_goes % 2 == 0) {
    number_of_goes = 1;
  }
  else {
    number_of_goes = 0
  }
  erase_win_line()
  state_player_turn()
  clear_fields()
  

  for(i = 0; i < 3; i++) {
    for(j = 0; j < 3; j++) {
      game_fields[i][j].style.cursor = "pointer";
    }

  }
}


function update_player_name(player_number) {
  if (player_number == 1) {
    
    let name_txtbox = document.getElementById("p1_name_input");
    let name_input_button = document.getElementById("p1_name_submission");
    let player_wins_display = document.getElementById("player_1_wins");
    
    let inputted_name = name_txtbox.value;
    player_1_name = inputted_name;
    player_wins_display.innerText = `${player_1_name.toUpperCase()}'S NO. OF WINS`;

    name_txtbox.remove();
    name_input_button.remove();

  }

  else if (player_number == 2) {
    
    let name_txtbox = document.getElementById("p2_name_input");
    let name_input_button = document.getElementById("p2_name_submission");
    let player_wins_display = document.getElementById("player_2_wins");
    
    let inputted_name = name_txtbox.value;
    player_2_name = inputted_name;
    player_wins_display.innerText = `${player_2_name.toUpperCase()}'S NO. OF WINS`

    for(i = 0; i < 3; i++) {
      for(j = 0; j < 3; j++) {
        game_fields[i][j].style.cursor = "pointer";
        game_fields[i][j].disabled = false;
      }
  
    }

    name_txtbox.remove();
    name_input_button.remove();
    state_player_turn();
  }

  else {}

  

  return

  
}