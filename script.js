"use strict";

class Participant {
  constructor(id, name, current_iteration) {
    this.id = id;
    this.name = name;
    this.current_iteration = current_iteration;
  }
  update_iteration(iterations) {
    this.current_iteration = iterations;
  }
}

class Program {
  constructor() {
    this.num_of_participant = 0;
    this.leader_board = [];
    this.list_of_participant = {};
    this.participant_id_and_steps = {};
  }
  enter_steps(id, name, num_of_steps, iterations) {
    let is_valid = true;
    if (!Object.keys(this.list_of_participant).includes(id)) {
      if (iterations !== 1) {
        document.querySelector(
          ".iteration_error"
        ).innerHTML = `<div>Your iteration needs to start from 1</div>`;
        is_valid = false;
      }
      this.num_of_participant++;
      const new_participant = new Participant(id, name, iterations);
      this.list_of_participant[id] = new_participant;
    } else {
      if (
        iterations !== this.list_of_participant[id].current_iteration + 1 &&
        iterations < 4
      ) {
        document.querySelector(
          ".iteration_error"
        ).innerHTML = `<div>Your next iteration number is ${
          this.list_of_participant[id].current_iteration + 1
        }</div>`;
        is_valid = false;
      } else if (iterations > 4) {
        document.querySelector(
          ".iteration_error"
        ).innerHTML = `<div>Maximum iteration is 4</div>`;
        is_valid = false;
      }
    }
    if (Object.keys(this.participant_id_and_steps).includes(id)) {
      const previous_iteration_step = this.participant_id_and_steps[id];
      if (
        num_of_steps < previous_iteration_step * 2 ||
        num_of_steps > previous_iteration_step * 3
      ) {
        document.querySelector(
          ".error"
        ).innerHTML = `<div>You need to enter a step between ${
          previous_iteration_step * 2
        } and ${previous_iteration_step * 3}</div>`;
        is_valid = false;
      }
    }

    if (!is_valid) return;

    this.list_of_participant[id].update_iteration(iterations);
    if (iterations === 1) {
      this.participant_id_and_steps[id] = num_of_steps;
    } else {
      this.participant_id_and_steps[id] += num_of_steps;
    }

    console.log(this.num_of_participant);
    if (this.num_of_participant >= 10) {
      this.generate_leader_board();
    }

    console.log(
      this.leader_board,
      this.list_of_participant,
      this.participant_id_and_steps
    );
  }
  generate_leader_board() {
    const sortable = Object.entries(this.participant_id_and_steps).sort(
      ([, a], [, b]) => b - a
    );
    const sortable_list = Object.entries(sortable);
    console.log(sortable_list);
    this.leader_board = [];
    let result = "<ul><li><strong>user_name ==>  score</strong></li></ul>";
    for (let i = 0; i < 10; i++) {
      const user_id = sortable_list[i][1][0];
      const user_name = this.list_of_participant[user_id].name;
      const score = sortable_list[i][1][1];
      result += `<ul><li>${user_name} ==>  ${score}</li></ul>`;
      console.log(user_id, score);
      this.leader_board.push(sortable_list[i]);
    }
    console.log(result);
    document.querySelector(".leader_board").innerHTML = result;
  }
  get_leader_board() {
    return this.leader_board;
  }
}

const submit = function () {
  const user_id = document.querySelector(".id").value;
  const user_name = document.querySelector(".name").value;
  const user_steps = document.querySelector(".steps").value;
  const user_iteration = document.querySelector(".iteration").value;
  document.querySelector(".error").innerHTML = "";
  document.querySelector(".iteration_error").innerHTML = "";

  program.enter_steps(
    user_id,
    user_name,
    Number(user_steps),
    Number(user_iteration)
  );
};
document.getElementById("clickMe").onclick = submit;
const program = new Program();
