class Workout {
  constructor(workoutJSON) {
    this.id = workoutJSON.id
    this.name = workoutJSON.name
    this.distance = workoutJSON.distance
    this.duration = workoutJSON.duration
    this.workout_type = workoutJSON.workout_type
  }

  renderShow() {
    return `<h3>${this.name}</h3>`
  }

  render() {
    return `<li data-workoutid='${this.id}' data-props='${JSON.stringify(
      this
    )}' class='workout-element'><a class="show-link" href='#'>${
      this.name
    }</a> <button class='edit-buttons' data-action='edit-workout'>Edit</button> <i data-action='delete-workout' class="em  em-x"></i>
    duration = ${this.duration}
    workout_type = ${this.workout_type}
    distance = ${this.distance}
    
    </li>`
  }
  //   }</a> <button data-action='edit-workout'>Edit</button> <i data-action='delete-workout' class="em em-scream_cat"></i>
  //   duration = ${this.duration}
  //   workout_type = ${this.workout_type}
  //   distance = ${this.distance}
    
  //   </li>`
  // }
}