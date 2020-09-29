class Routines {
  constructor() {
    this.routines = []
    this.allWorkoutsList = []
    this.initBindingsAndEventListeners()
    this.adapter = new RoutinesAdapter()
    this.fetchAndLoadRoutines()
    this.assignRoutines()
  }

  initBindingsAndEventListeners() {
    this.routineCard = document.getElementById('routine-card')
    this.routinesNode = document.getElementById('routines-container')
    this.editsForm = document.getElementById('edit-routine-form')
    this.routineName = document.getElementById('new-routine-name')
    
    //! Btns
    this.btnsDelete = document.querySelectorAll('btn-delete')
    this.deleteBtns = document.getElementsByClassName('all-routine-delete-btns')
    
    // ! bindings that have event listeners
    this.spaContainer = document.getElementById('spa-container')
    this.spaContainer.addEventListener('click',this.handleDeleteRoutine.bind(this))
    
    this.spaContainer.addEventListener('click',this.toggleEditFrom.bind(this))
    this.spaContainer.addEventListener('submit',this.handleEdit.bind(this))

    this.routinesForm = document.getElementById('new-routine-form')
    this.routinesForm.addEventListener('submit', this.handleAddRoutine.bind(this))
  }

  fetchAndLoadRoutines() {
    this.adapter.getRoutines()
    .then(routinesJSON => {
      routinesJSON.forEach( routine => { 
        this.routines.
        // push(routine)
        // ! create new note instance
        push( new Routine(routine) )
    })
    })
        .then( this.assignRoutines.bind(this) )
      .catch( (error) => console.log(error) )
    //   .catch( (error) => console.log("you broke it son!") )
  }


  assignRoutines(){
  let routinesString = this.routines.map(
    routine => routine.renderRoutinesAndWorkouts()
  ).join('')
  this.routineCard.innerHTML = routinesString;
  }

  handleAddRoutine(event) {
    event.preventDefault()
    const routineParams =
    {
      "routine_name": this.routineName.value
    }

    this.adapter.createRoutine(routineParams)
    .then(
      (routineJSON) => 
        this.routines.push(new Routine(routineJSON)) )
    .then(
      this.assignRoutines.bind(this) )
    .then(
      this.routinesForm.reset() 
    )
  }

    handleEdit(event) {
      event.preventDefault()
      let targetId = event.target.id.replace("edit-routine-", "")

      if(event.target != null && event.target.id.includes(`edit-routine-${targetId}`))
      {
          let id = targetId
          let inputName = document.getElementById(`input-routine-${id}-workout-name`)  

       const updateRoutineParams = {
         "id": id,
         "workout_name": inputName.value.toLowerCase(),
         "workout_type": "Cardio",
         "distance": 13,
         "duration": 12,
         "routine":[
           {
              }
            ]
       }
              this.adapter.editRoutine(updateRoutineParams)
              .then( resp => this.addWorkout(resp))
      }

  }

  addWorkout(addWorkoutResponse){
    const { workouts } = addWorkoutResponse

    let editForm = document.getElementById(`edit-routine-${addWorkoutResponse["id"]}`)
    
    let routinesElement = document.getElementById(`routine-${addWorkoutResponse["id"]}-workouts`)

    console.log('Routines -> addWorkout -> addWorkoutResponse["id"]', addWorkoutResponse["id"]);

        let updatedRoutinesElement = addWorkoutResponse["workouts"].map(workout =>
          `
          <section 
            class="routine-workout-block"
              id='workout-${workout.id}'>

                <div class='routine-workout-names'>
                  ${workout.workout_name}
                  <section 
                    class='routine-workout-details'>
                  </section>
                </div>
          </section>
          `
          ).join('')

    routinesElement.innerHTML = updatedRoutinesElement
  editForm.reset()
  }

  handleDeleteRoutine(event) {
    if (event.target.dataset.action != null && event.target.dataset.action.includes("delete-routine")
    ) 

    {
      const routineId = event.target.dataset.action.replace("delete-routine-", "")
      this.adapter.deleteRoutine(routineId)
      .then( resp => this.removeDeletedRoutine(resp) )
    }
  }
  
  removeDeletedRoutine(deleteResponse) {
    this.routines = this.routines.filter(routine => routine.id !== deleteResponse.routineId)
    this.assignRoutines()
  }

getUniqueWorkouts(){
this.adapter.getRoutines()
    // .then(routinesJSON => routinesJSON.forEach( routine => this.routines.
    .then(routinesJSON => {
      // console.table({routinesJSON})
      // console.log({routinesJSON})
      routinesJSON.forEach( routine => { 
         routine.workouts.forEach(workout => this.allWorkoutsList.push(workout))
         // ! create new note instance/object
         
        })
        this.uniqueWorkoutsList = [...new Set(this.allWorkoutsList.map(item => item.workout_name))];
        // console.log(this.uniqueWorkoutsList)
        return this.uniqueWorkoutsList
    } )        
      .catch( (error) => console.log(error) )

  // console.log(this.routines.workouts)
  // for (let r of this.routines) console.log(r.workouts)
// this.routines.map(routine => console.log(routine))
// console.log(this.adapter.getRoutines())

// [this.routines].map(r => r.map(w => console.log(w)) )
// this.routines.map(r => r.map(w => console.log(w)) )

// for (var i = 0; i < [this.routines].length; i++) {
//     console.log(this.routines[i])
// }
}

// dropdownSetup(){
//   this.workoutListUnique = document.getElementsByClassName('workout-list-unique')
//   // console.log("UNIQUE",workoutListUnique)\
//   // console.log( "YUP",this.workoutListUnique )
//   this.workoutListUnique.innerHTML = `p>YO LU</p>
//   `
// }

// handleDropDownMenu(){
// }



  
  routinesHTML() {
    return this.routines.map( routine => 
      routine.assignRoutines()).join('')
      // routine.render()).join('')
    }
    



    toggleEditFrom(event){
   if (event != null && event.target.dataset.action === 'edit-routine')
    {
      let workoutsSection = document.getElementById(`routine-${event.target.id.replace('btn-routine-','')}-workouts`
      )

      console.log('Routines -> toggleEditForm -> workoutsSection', workoutsSection);

      let routineEditForm = document.getElementById(`edit-routine-${event.target.id.replace('btn-routine-','')}`)
      console.log('Routines -> toggleEditForm -> routineEditForm', routineEditForm);

      if (routineEditForm.classList.value.includes('hidden'))
      routineEditForm.classList.remove('hidden')
      else {routineEditForm.classList.add('hidden')}
      // console.log()
      // console.log("it's hidden!")
// let newString = `<h1> YO LU!</h1>`
// document.body.appendChild(newString)
      // workoutsSection.appendChild(newString)
      // workoutsSection.innerHTML(newString)
      // workoutsSection.innerHTML += newString
      // console.log('Routines -> toggleEditForm -> workoutsSection.innerHTML()', workoutsSection.innerHTML);

    }
    else{ console.log("Lu THE IF STATEMENT IS FALSE")}

    // console.log('Routines -> toggleEditForm -> this.allRoutineWorkouts[1]', this.allRoutineWorkouts.item(1));


    
  //     for (var i = 0; i < this.allRoutineWorkouts.length; i++) {
  //          this.allRoutineWorkouts.item.addEventListener('click', function (){
  //            console.log(this.allRoutineWorkouts.item(i))
  //          })
  
  //         // for (let workout of this.allRoutineWorkouts) workout => console.log(workout)
  // // )
  //   // console.log('LOOPED', this.allRoutineWorkouts[i])    
  //     }
  
  }
}
