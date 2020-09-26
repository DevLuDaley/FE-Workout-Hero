class Routine {
  constructor(routineJSON) {
    this.id = routineJSON.id
    this.routine_name = routineJSON.routine_name
    this.workouts = routineJSON.workouts
    // this.renderRoutinesAndWorkouts
    // this.mapWorkouts()

    // this.duration = routineJSON.duration
    // this.routine_type = routineJSON.routine_type
  }

  // renderShow() {
  //   return `<label for="routine-name">
  //   <h3>${this.workout_name}</h3>
  //   </label>`
  // }

  // ! use prototype methods here
  renderRoutinesAndWorkouts(){
    return `
    <section
        class='all-routines routine-${this.id}'>
              <div class="routine-name-btns-wrapper">

                

                <h1 class="routine-names">${this.routine_name}</h1>

                <button id='btn-routine-${this.id}' class="${this.routine_name.replace(' ','-').toLowerCase()}-workout-edit-btns all-routine-edit-btns"

                data-action='edit-routine'>Edit</button>
<section class='workout-list-unique'>

</section>
               <label for="workout-list">Add Workouts:
                </label>

                <select class="workout-list"> 
                <option value="item-2">Item 2</option>
                <option value="item-1">${`BLANK`}</option>
                  <option value="item-3">Item 3</option>
                  <option value="item-4">Item 4</option>
                  <option value="item-5"></option>
                </select>

          <div>
                <button class="${this.routine_name.replace(' ','-').toLowerCase()}-workout-delete-btns all-routine-delete-btns" em em-x btns-delete id='delete-routine-${this.id}'data-action='delete-routine-${this.id}'>
                Delete
                </button>
          </div>
      </section>
      <section
          id='routine-${this.id}-workouts' class='all-routine-workouts'>
        ${this.workouts.map(workout => `

          <section class="routine-workout-block"
            id='workout-${workout.id}'>
              <div class='routine-workout-names'>
              ${workout.workout_name}
              
              <section class='routine-workout-details'>
              </section>
              </div>
          </section>
        `).join('')}

      </section>
      <div>
      <form class='edit-forms hidden' id='edit-routine-${this.id}'><!-- <fieldset> -->
<legend><h1>Edit Routine</h1>
</legend>

<label for="edit-routine-name">Name:</label>
<input type="text" name="edit-routine-name"
placeholder="${this.routine_name}">

      <label for="edit-routine-workout-name">Workout:</label>
      <input type="text" name="edit-routine-workout-name"
      placeholder="">

      <label for="edit-routine-duration">Duration:</label>
      <input type="text" name="edit-routine-duration"
placeholder="drop-down-menu">

<!-- </fieldset> -->
      <input class="btns-all" type="submit" data-action="update-routine-${this.id}" value="update routine">
  </form>
</div>



`

  }

  // mapWorkouts(){

//     this.allRoutineWorkouts = document.getElementsByClassName('all-routine-workouts')
//     console.log("ALL",this.allRoutineWorkouts)
// for (var i = 0; i < this.allRoutineWorkouts.length; i++) {
//     console.log(this.allRoutineWorkouts[i])
// }


    // this.allRoutineWorkouts.map( workout => workout.addEventListener('click', console.log("all-routine-workouts"))
      // )



    // let card2 = document.getElementById("routine-card-2")
    // console.log({card2})
    // this.workouts.map(workout => {
      // workout
      // console.count(this.workouts)tth
      // for (const workout of this.workouts) {
        // card2.append(workout)
        // console.log({workout})
        // console.log({card2})
        // return `RENDERING ${workout.workout_name}`
      // for (let w in workout)
      // console.log(w)
      // return `<h1> ${w} </h1>`
      // console.log(workout.workout_name)
      // console.log("workout.workout_name")
    // }
      // }
  // }
  // }

  render() {
//     return `
//     <tr>
//         ${this.workouts.map(workout =>
//         `
//         <td>
//         </td>
//         <td>
//             ${(Object.values(workout)[1])}
//         </td>
//         <td>
//               ${(Object.values(workout)[2])}
//         </td>

//         <td>
//               ${(Object.values(workout)[4])}
//         </td>

//         <td>
//               ${(Object.values(workout)[3])}
//         </td>
//     </tr>
// `)}
//     `
  }
}

//             <a class="show-link" href='#'>${this.routine_name}</a>
