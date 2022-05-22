"use strict";

class Participant {
  constructor(id, name, current_iteration) {
    this.id = id;
    this.name = name;
    this.current_iteration = current_iteration;
  }
  update_iteration() {
    this.current_iteration++;
  }
}

class Program {
  constructor() {
    this.num_of_participant = 0;
    this.leader_board = [];
    this.list_of_participant = {};
    this.participant_id_and_steps = {};
  }
  enter_steps(id, name, num_of_steps) {
    if (!Object.keys(this.list_of_participant).includes(id)) {
      this.num_of_participant++;
      const new_participant = new Participant(id, name, 2);
      this.list_of_participant[id] = new_participant;
    } else {
      this.list_of_participant[id].update_iteration();
    }
    if (!Object.keys(this.participant_id_and_steps).includes(id)) {
      this.participant_id_and_steps[id] = num_of_steps;
    } else {
      const previous_iteration_step = this.participant_id_and_steps[id];
      if (
        num_of_steps >= previous_iteration_step * 2 &&
        num_of_steps <= previous_iteration_step * 3
      ) {
        this.participant_id_and_steps[id] += num_of_steps;
      } else {
        // TODO: Show error to user
        document.querySelector(
          ".error"
        ).innerHTML = `<div>You need to enter a step between ${
          previous_iteration_step * 2
        } and ${previous_iteration_step * 3}</div>`;
      }
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
      ([, a], [, b]) => a - b
    );
    const sortable_list = Object.entries(sortable);
    console.log(sortable_list);
    this.leader_board = [];
    let result = "";
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

  program.enter_steps(user_id, user_name, Number(user_steps));
};
document.getElementById("clickMe").onclick = submit;
const program = new Program();
