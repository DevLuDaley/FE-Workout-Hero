class Workouts {
  constructor() {
    this.workouts = []
    this.initBindingsAndEventListeners()
    this.adapter = new WorkoutsAdapter()
    this.fetchAndLoadWorkouts()
  }

  initBindingsAndEventListeners() {
    this.workoutsForm = document.getElementById('new-workout-form')
    this.workoutType = document.getElementById('new-workout-type')
    this.workoutName = document.getElementById('new-workout-name')
    this.workoutDistance = document.getElementById('new-workout-distance')
    this.workoutDuration = document.getElementById('new-workout-duration')
    this.workoutsNode = document.getElementById('workouts-container')
    this.workoutsForm.addEventListener('submit',this.handleAddWorkout.bind(this))
    this.workoutsNode.addEventListener('click',this.handleDeleteWorkout.bind(this))
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
    event.preventDefault()
    const workoutParams = 
    {
      "workout_type": this.workoutType.value,
      "name": this.workoutName.value,
      "distance": this.workoutDistance.value,
      "duration": this.workoutDuration.value
    }
    this.adapter.createWorkout(workoutParams)
    .then( (workoutJSON) => this.workouts.push(new Workout(workoutJSON)) )
    .then(  this.render.bind(this) )
    .then(
      this.workoutsForm.reset()
      //  () => 
    // this.workoutType.value = '',
    // this.workoutName.value = '' ,
    // this.workoutDistance.value = '',
    // this.workoutDuration.value = '' 
    )
  }

  handleDeleteWorkout() {
    if (event.target.dataset.action === 'delete-workout' && event.target.parentElement.classList.contains("workout-element")) {
      const workoutId = event.target.parentElement.dataset.workoutid
      this.adapter.deleteWorkout(workoutId)
      .then( resp => this.removeDeletedWorkout(resp) )
    }
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