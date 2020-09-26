class Routines {
  constructor() {
    this.routines = []
    this.allWorkoutsList = []
    this.initBindingsAndEventListeners()
    this.adapter = new RoutinesAdapter()
    this.fetchAndLoadRoutines()
    // this.getUniqueWorkouts()
    // this.dropdownSetup()
    this.assignRoutines()
    // this.addWorkout()
  }

  initBindingsAndEventListeners() {
    this.routineCard = document.getElementById('routine-card')
    this.routinesForm = document.getElementById('new-routine-form')
    this.editsForm = document.getElementById('edit-routine-form')
    this.btnToggleForms = document.getElementById('btn-toggle-forms')
    this.routineType = document.getElementById('new-routine-type')
    this.routineName = document.getElementById('new-routine-name')
    this.routineDistance = document.getElementById('new-routine-distance')
    this.routineDuration = document.getElementById('new-routine-duration')
    this.routinesNode = document.getElementById('routines-container')
    this.editRoutineType = document.getElementById('edit-routine-type')
    this.editRoutineName = document.getElementById('edit-routine-name')
    this.editRoutineDistance = document.getElementById('edit-routine-distance')
    this.editRoutineDuration = document.getElementById('edit-routine-duration')
    this.routinesNode = document.getElementById('routines-container')
    this.btnsDelete = document.querySelectorAll('btn-delete')
    this.spaContainer = document.getElementById('spa-container')
    this.deleteBtns = document.getElementsByClassName('all-routine-delete-btns')
    this.routinesForm.addEventListener('submit', this.handleAddRoutine.bind(this))
    this.btnToggleForms.addEventListener('click', this.handleToggle.bind(this))
    this.spaContainer.addEventListener('click',this.handleDeleteRoutine.bind(this))
    this.spaContainer.addEventListener('click',this.handleDropDownMenu.bind(this))
    this.spaContainer.addEventListener('click',this.addWorkout.bind(this))
    //? need to rewire the addRoutine method to use data action so that the handleEdit function won't block it.
    this.spaContainer.addEventListener('submit',this.handleEdit.bind(this))
    // this.routinesNode.addEventListener('click',this.handleEditRoutine.bind(this))
    // for (const btn in this.editBtns){
    //   btn.addEventListener('click', this.handleEditRoutine(this))
    // }
    // this.editBtns.addEventListener('click',this.handleEditRoutine.bind(this))
  }

  fetchAndLoadRoutines() {
    this.adapter.getRoutines()
    // .then(routinesJSON => routinesJSON.forEach( routine => this.routines.
    .then(routinesJSON => {
      // console.table({routinesJSON})
      // console.log({routinesJSON})
      routinesJSON.forEach( routine => { 
        this.routines.
        // push(routine)
        // ! create new note instance/object
        push( new Routine(routine) )
      // console.table(this.routine)
    })
    // console.log(this.routines)
    })
        .then( this.assignRoutines.bind(this) )
      .then( this.dropdownSetup.bind(this) )
      // .then(this.addWorkout.bind(this))
      // .then( this.render.bind(this) )
      .catch( (error) => console.log(error) )
    //   .catch( (error) => console.log("you broke it son!") )
  }


  assignRoutines(){
// this.getUniqueWorkouts()
let routinesString = this.routines.map(routine => routine.renderRoutinesAndWorkouts()
).join('')
this.routineCard.innerHTML  = routinesString;
  
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
    // console.log(this.routineName.value)
    event.preventDefault()
    // event.stopPropagation() 
    const routineParams =
    {
      "name": this.routineName.value
    }
    // console.log('Routines -> handleAddRoutine -> this.routineName.value', this.routineName.value);
    // console.log(routineParams)

    this.adapter.createRoutine(routineParams)
    .then( (routineJSON) => this.routines.push(new Routine(routineJSON)) )
    .then( this.assignRoutines.bind(this) )
    // .then( this.render.bind(this) )
    .then(
      this.routinesForm.reset() 
    )
  }

    handleEdit(event) {
      this.editRoutineName = document.getElementById('edit-routine-name')
      this.editRoutineWorkoutName = document.getElementById('edit-routine-workout-name')
       event.preventDefault()
      // event.stopPropagation() 
       const updateRoutineParams =
// console.log('Routines -> handleEdit -> event.target.dataset.action', event.target.dataset.action);

    // if (event.target.dataset.action != null && event.target.dataset.action.includes('update-routine')
    // //  && event.target.parentElement.classList.contains("routine-element")
    // ) 
    {
    
    // "name": this.editRoutineName.value,
    name: this.editRoutineWorkoutName.value

    }

    // else {console.log("NOPE")}
  }

  handleDeleteRoutine(event) {
    if (event.target.dataset.action != null && event.target.dataset.action.includes("delete-routine")
    ) 
    // if (event.target.dataset == "DOMStringMap"
    // //  && event.target.parentElement.classList.contains("routine-element")
    // if (event.target.dataset.action.includes("delete-routine")
    {
      console.log("THE IF STATEMENT IS TRUE!")
      // const routineId = event.target.parentElement.dataset.routineid
      const routineId = event.target.dataset.action.replace("delete-routine-", "")
      console.log('ROUTINE-ID' ,routineId)
      // const deleteAction = event.target.dataset.action
      //     console.log("ACTION: ", deleteAction)
      // const routineId = deleteAction.replace('delete-routine-', '')
      this.adapter.deleteRoutine(routineId)
      .then( resp => this.removeDeletedRoutine(resp) )
    }
    
    else{ console.log("THE IF STATEMENT IS FALSE")}
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
        this.uniqueWorkoutsList = [...new Set(this.allWorkoutsList.map(item => item.name))];
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

dropdownSetup(){
  this.workoutListUnique = document.getElementsByClassName('workout-list-unique')
  // console.log("UNIQUE",workoutListUnique)\
  // console.log( "YUP",this.workoutListUnique )
  this.workoutListUnique.innerHTML = `p>YO LU</p>
  `
}
    // workoutListUnique.addEventListener('click', function() {

handleDropDownMenu(){
  // var values = this.getUniqueWorkouts();
  // let u = this.getUniqueWorkout()
  // console.log("object")
    // var values = ["dog", "cat", "parrot", "rabbit"];
    // console.log("handleDropDownMenu => values", values)
    // console.log("uniqueWorkoutsList", this.uniqueWorkoutsList)
    // console.log("DROP",this.getUniqueWorkouts())

  // var select = document.createElement("select");
  // select.name = "pets";
  // select.id = "pets"

  // for (const val of values) {
  //   var option = document.createElement("option");
  //   option.value = val;
  //   option.text = val.charAt(0).toUpperCase() + val.slice(1);
  //   select.appendChild(option);
  // }

  // var label = document.createElement("label");
  // label.innerHTML = "Choose your pets: "
  // label.htmlFor = "pets";

  // document.getElementById("container").appendChild(label).appendChild(select);
  // document.getElementById("container").appendChild(select);
}


  
  removeDeletedRoutine(deleteResponse) {
    this.routines = this.routines.filter(routine => routine.id !== deleteResponse.routineId)
    // this.render()
    this.assignRoutines()
  }
  
  routinesHTML() {
    return this.routines.map( routine => 
      routine.assignRoutines()).join('')
      // routine.render()).join('')
    }
    
    handleToggle() {
      let hiddenTrue = this.editsForm.attributes[0].value.includes("hidden");
  
      if(hiddenTrue == true) {
        // CREATE BUTTON = PURPLE
        // this.editsForm.classList.add('shown')
        this.editsForm.classList.remove('hidden')
        this.routinesForm.classList.add('hidden')
        this.btnToggleForms.innerHTML = "Create Routine"
        this.routinesForm.reset()
        // this.editsForm.classList.add('hidden')
        // console.log('TOGGLE =>',this.ToggleEditCreate.innerHTML)
        // this.ToggleEditCreate.style.backgroundColor = 'PaleGoldenRod'
        // this.ToggleEditCreate.style.backgroundColor = 'PapayaWhip'
        // this.btnToggleForms.style.color = 'light-blue'
        // this.btnToggleForms.style.borderColor = "pink"
      }
      else {
        // EDIT BUTTON = LIGHT-BLUE
        this.routinesForm.classList.remove('hidden')
        this.editsForm.classList.add('hidden')
        this.btnToggleForms.innerHTML = "Edit Routine"
        this.editsForm.reset()
        // this.ToggleEditCreate.style.backgroundColor = ''
        // this.ToggleEditCreate.style.backgroundColor = 'light-blue'
        // this.ToggleEditCreate.style.backgroundColor = 'PapayaWhip'
        // this.ToggleEditCreate.style.color = 'light-green'
        // this.btnToggleForms.style.borderColor = "red"
        // this.editsForm.classList.remove('hidden')
  }
  
      // console.log(this.editsForm.attributes[0].value.includes("hidden"))
      // console.count("Toggle works")
      // this.editsForm.removeAttribute("class", "hidden")
      // console.log(this.editsForm)
      // this.editsForm.setAttribute('hidden', 'false')
    }


    addWorkout(event){
    // this.allRoutineWorkouts = document.getElementsByClassName('all-routine-workouts')
    // console.log("addWorkout()", this.allRoutineWorkouts.namedItem('weight-training-workouts'))
    // this.allRoutineWorkouts.map(w => console.log(w)
    // )
    // let wLength = this.allRoutineWorkouts.length
    // console.log('Routines -> addWorkout -> this.allRoutineWorkouts.length', this.allRoutineWorkouts.length);
    // if
 if (event != null 
  && event.target.dataset.action === 'edit-routine'
//  if (event.target.dataset.action != null
    ) 

    // if (event.target.dataset == "DOMStringMap"
    // //  && event.target.parentElement.classList.contains("routine-element")
    // if (event.target.dataset.action.includes("delete-routine")
    {
      console.log("LU THE IF STATEMENT IS TRUE!")
      console.log('Routines -> addWorkout -> event.target', event.target);
      console.log('Routines -> addWorkout -> event.target.dataset.action', event.target.dataset.action);
      console.log('Routines -> addWorkout -> event.target.id', event.target.id);

      let workoutsSection = document.getElementById(`routine-${event.target.id.replace('btn-routine-','')}-workouts`
      )

      console.log('Routines -> addWorkout -> workoutsSection', workoutsSection);

      let routineEditForm = document.getElementById(`edit-routine-${event.target.id.replace('btn-routine-','')}`)
      console.log('Routines -> addWorkout -> routineEditForm', routineEditForm);

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
      // console.log('Routines -> addWorkout -> workoutsSection.innerHTML()', workoutsSection.innerHTML);

    }
    else{ console.log("Lu THE IF STATEMENT IS FALSE")}

    // console.log('Routines -> addWorkout -> this.allRoutineWorkouts[1]', this.allRoutineWorkouts.item(1));


    
  //     for (var i = 0; i < this.allRoutineWorkouts.length; i++) {
  //          this.allRoutineWorkouts.item.addEventListener('click', function (){
  //            console.log(this.allRoutineWorkouts.item(i))
  //          })
  
  //         // for (let workout of this.allRoutineWorkouts) workout => console.log(workout)
  // // )
  //   // console.log('LOOPED', this.allRoutineWorkouts[i])    
  //     }
  
  }

  render() {
      // ! shows routine table data
  // this.largerContainer.append(rows)
  // this.routineTh.innerHTML= this.routines[1].name
          }
}
          // <a class="show-link" href='#'>${this.routines.map(routine => Object.keys(routine) )}</a>
          //! trigger routines function
//                 ${this.routinesHTML()}
          // ! show workoutNames
// `${r.workouts.map(w=> `Workoutname = ${w.name}`)}
          // ! show routineNames
          //  ${this.routines.map(r => `Routinename = ${r.name}`)}