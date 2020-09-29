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
      // .then( this.dropdownSetup.bind(this) )
      // .then(this.toggleEditForm.bind(this))
      // .then( this.render.bind(this) )
      .catch( (error) => console.log(error) )
    //   .catch( (error) => console.log("you broke it son!") )
  }


  assignRoutines(){
// this.getUniqueWorkouts()
let routinesString = this.routines.map(routine => routine.renderRoutinesAndWorkouts()
).join('')
this.routineCard.innerHTML = routinesString;
  // routineCard.append(roos)
  // ! show list of routine names
  // roo.innerHTML = routineHeadingsList
  // ! show list of workout names
  // list.innerHTML = routineWorkoutsList
// .setAttribute("id", box.id))
// var str = '<ul>'

//  ! main page should only show list of routines at top with list of workouts in a separate section. There will be two buttons. btn1 = a show/edit screen (drag and drop should go here) while btn2 = create routine screen --. user should see a list of routines and a list of workoutsouts. The list of routines should have create edit and a delete buttons. creating a workout should just be a name... then user can select the workout from the list and use the edit screen to drag/drop workouts...(workout already exists, are you sure you want to add?)

// this.routines.map(r =>
// ! for each [routine], create a [new row] && set the new row's [id] to the [routine id].

// this.routines.forEach(
//       r => this.routinesTable.insertRow().classList.add('routines-list')
//       // setAttribute("id", `${r.id}`)
//       // setAttribute("id", `routine-${r.id}`)
//       )
// numbers.forEach((num) => {
  // console.log(num)

  }

  handleAddRoutine(event) {
    event.preventDefault()

    const routineParams =
    {
      "routine_name": this.routineName.value
    }

    this.adapter.createRoutine(routineParams)
    .then( (routineJSON) => this.routines.push(new Routine(routineJSON)) )
    .then( this.assignRoutines.bind(this) )
    // .then( this.render.bind(this) )
    .then(
      this.routinesForm.reset() 
    )
  }

    handleEdit(event) {
      event.preventDefault()
      
      // console.log('1 event.target.id',event.target.id)
      
      let targetId = event.target.id.replace("edit-routine-", "")
      
      // console.log('2 target.id', targetId)

      // console.log('3 Routines -> handleEdit -> event.target.id.includes(`edit-routine-${targetId}`', event.target.id.includes(`edit-routine-${targetId}`))

      // console.log('4 -> `edit-routine-${event.target.id}`', `edit-routine-${event.target.id}`);
      if(event.target != null && event.target.id.includes(`edit-routine-${targetId}`))
      
      // console.log('5 event.target ', event.target );
      
      
      
      
      {
          // console.log("5 LU handleEDITis TRUE")
          // this.editRoutineName = document.getElementById('edit-routine-name')
          // this.editRoutineWorkoutName = document.getElementById('edit-routine-workout-name')
          // console.log('Routines -> handleEdit -> this.editRoutineWorkoutName', this.editRoutineWorkoutName);
          
          // console.log('6 Routines -> handleEdit -> input_name value', inputName.value);
          // this.routineFormId = document.getElementById(`edit-routine-${event}`)
          // console.log('Routines -> handleEdit -> this.routineFormId', this.routineFormId);
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
              // .then( this.assignRoutines.bind(this) )
              .then( resp => this.addWorkout(resp))
      }
      
      // else {console.log("NOPE")}
    // .then( this.assignRoutines.bind(this) )
    // .then( this.render.bind(this) )
    // .then(
    //   this.routinesForm.reset() )
  }

  addWorkout(addWorkoutResponse){
    const { workouts } = addWorkoutResponse
    // const { id, workout_name} = workouts
// console.log(`addWorkoutResponse["workouts"]`,addWorkoutResponse["workouts"])

// let apiWorkouts = workouts.map(function({ id,workout_name}){
//   return id, workout_name}
  // )
  
  // console.log(apiWorkouts)

    let changedElement = document.getElementById(`routine-${addWorkoutResponse["id"]}-workouts`)

    console.log('Routines -> addWorkout -> addWorkoutResponse["id"]', addWorkoutResponse["id"]);

    // console.log('Routines -> addWorkout -> changedElement', changedElement.innerHTML);
    // this.routines = this.routines.find(id)
    
    // console.log('Routines -> addWorkout -> id', id);
        let newBlock = addWorkoutResponse["workouts"].map(workout =>
          `
          <section class="routine-workout-block"
          id='workout-${workout.id}'>
          <div class='routine-workout-names'>
          ${workout.workout_name}
          <section class='routine-workout-details'>
          </section>
          </div>
          </section>
          `
          ).join('')

          changedElement.innerHTML = newBlock

console.log('Routines -> addWorkout -> changedElement.innerHTML', changedElement.innerHTML);
let editForm = document.getElementById(`edit-routine-${addWorkoutResponse["id"]}`)
    // this.assignRoutines()
  editForm.reset()
  }

/**
 
"id": 2,
  "routine_name": "Cardio Rush",
  "workouts": [
    {
      "id": 14,
      "workout_name": "volley ball",
      "workout_type": "Cardio",
      "distance": 2,
      "duration": 4,
      "created_at": "2020-09-26T18:39:27.523Z"
    },
    {
      "id": 15,
      "workout_name": "cricket",
      "workout_type": "Cardio",
      "distance": 8,
      "duration": 10,
      "created_at": "2020-09-26T18:39:27.529Z"
    },
    {
      "id": 21,
      "workout_name": "Break Dancing",
      "workout_type": "Cardio",
      "distance": 4,
      "duration": 4,
      "created_at": "2020-09-26T18:48:01.689Z"
    }
  ]
}



 */




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
