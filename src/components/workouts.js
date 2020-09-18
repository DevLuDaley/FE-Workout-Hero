class Workouts {
  constructor() {
    this.workouts = []
    this.initBindingsAndEventListeners()
    this.adapter = new WorkoutsAdapter()
    this.fetchAndLoadWorkouts()
  }

  initBindingsAndEventListeners() {
    this.workoutsForm = document.getElementById('new-workout-form')
    this.editsForm = document.getElementById('edit-workout-form')
    this.btnToggleEditCreate = document.getElementById('toggle-edit-create')
    this.workoutType = document.getElementById('new-workout-type')
    this.workoutName = document.getElementById('new-workout-name')
    this.workoutDistance = document.getElementById('new-workout-distance')
    this.workoutDuration = document.getElementById('new-workout-duration')
    this.workoutsNode = document.getElementById('workouts-container')
    this.editWorkoutType = document.getElementById('edit-workout-type')
    this.editWorkoutName = document.getElementById('edit-workout-name')
    this.editWorkoutDistance = document.getElementById('edit-workout-distance')
    this.editWorkoutDuration = document.getElementById('edit-workout-duration')
    this.workoutsNode = document.getElementById('workouts-container')
    this.editBtns = document.querySelectorAll('ul')
    // this.workoutsList = document.getElementById('ul')
    console.log(this.editBtns)
    this.workoutsForm.addEventListener('submit',this.handleAddWorkout.bind(this))
    this.workoutsNode.addEventListener('click',this.handleDeleteWorkout.bind(this))
    this.workoutsNode.addEventListener('click',this.handleEditWorkout.bind(this))
    this.btnToggleEditCreate.addEventListener('click',this.handleToggle.bind(this))
    

    // for (const btn in this.editBtns){
    //   btn.addEventListener('click', this.handleEditWorkout(this))
    // }
    // this.editBtns.addEventListener('click',this.handleEditWorkout.bind(this))
  }

  fetchAndLoadWorkouts() {
    this.adapter.getWorkouts()
    // .then(workoutsJSON => workoutsJSON.forEach( workout => this.workouts.
    .then(workoutsJSON => workoutsJSON.forEach( workout => this.workouts.
        push( new Workout(workout) )))
      .then( this.render.bind(this) )
      .catch( (error) => console.log(error) )
    //   .catch( (error) => console.log("you broke it son!") )
  }

  handleAddWorkout() {
    // console.log(this.workoutName.value)
    event.preventDefault()
    const workoutParams = 
    {
      "name": this.workoutName.value,
      "distance": this.workoutDistance.value,
      "workout_type": this.workoutType.value,
      "duration": this.workoutDuration.value
    }
    console.log(workoutParams)

    this.adapter.createWorkout(workoutParams)
    .then( (workoutJSON) => this.workouts.push(new Workout(workoutJSON)) )
    .then( this.render.bind(this) )
    .then(
      this.workoutsForm.reset()
      //  () => 
    // this.workoutType.value = '',
    // this.workoutName.value = '' ,
    // this.workoutDistance.value = '',
    // this.workoutDuration.value = '' 
    )
  }

    handleEditWorkout() {
    if (event.target.dataset.action === 'edit-workout' && event.target.parentElement.classList.contains("workout-element")) {
      const workoutId = event.target.parentElement.dataset.workoutid
      this.adapter.editWorkout(workoutId)
    //   .then( resp => this.editdWorkout(resp) )
    }
    console.log("hi Lu!")
  }

  handleDeleteWorkout() {
    if (event.target.dataset.action === 'delete-workout' && event.target.parentElement.classList.contains("workout-element")) {
      const workoutId = event.target.parentElement.dataset.workoutid
      this.adapter.deleteWorkout(workoutId)
      .then( resp => this.removeDeletedWorkout(resp) )
    }
  }

  handleToggle() {
    // status = "off" || "on"
    // status = "off"
    // if(this.editsForm == "off") {
      // status = "on"
      // else if(status == "on"){
      //   status = "off"
      // }
    // }
    let hiddenTrue = this.editsForm.attributes[0].value.includes("hidden");
    
    if(hiddenTrue == true) {
      // CREATE BUTTON = PURPLE
      // this.editsForm.classList.add('shown')
      this.editsForm.classList.remove('hidden')
      this.workoutsForm.classList.add('hidden')
      this.btnToggleEditCreate.innerHTML = "Create Workout"
      this.workoutsForm.reset()
      // this.editsForm.classList.add('hidden')
      // console.log('TOGGLE =>',this.ToggleEditCreate.innerHTML)
      // this.ToggleEditCreate.style.backgroundColor = 'PaleGoldenRod'
      // this.ToggleEditCreate.style.backgroundColor = 'PapayaWhip'
      // this.btnToggleEditCreate.style.color = 'light-blue'
      // this.btnToggleEditCreate.style.borderColor = "pink"
    }
    else {
      // EDIT BUTTON = LIGHT-BLUE
      this.workoutsForm.classList.remove('hidden')
      this.editsForm.classList.add('hidden')
      this.btnToggleEditCreate.innerHTML = "Edit Workout"
      this.editsForm.reset()
      // this.ToggleEditCreate.style.backgroundColor = ''
      // this.ToggleEditCreate.style.backgroundColor = 'light-blue'
      // this.ToggleEditCreate.style.backgroundColor = 'PapayaWhip'
      // this.ToggleEditCreate.style.color = 'light-green'
      // this.btnToggleEditCreate.style.borderColor = "red"
      // this.editsForm.classList.remove('hidden')
}

    // console.log(this.editsForm.attributes[0].value.includes("hidden"))
    // console.count("Toggle works")
    // this.editsForm.removeAttribute("class", "hidden")
    // console.log(this.editsForm)
    // this.editsForm.setAttribute('hidden', 'false')
  }

  removeDeletedWorkout(deleteResponse) {
    this.workouts = this.workouts.filter( workout => workout.id !== deleteResponse.workoutId )
    this.render()
  }

  workoutsHTML() {
    return this.workouts.map( workout => workout.render() ).join('')
  }

  render() {
    this.workoutsNode.innerHTML = `<ul>${this.workoutsHTML()}</ul>`
  }
}