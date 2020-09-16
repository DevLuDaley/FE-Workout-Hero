class WorkoutsAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/workouts"
  }

  getWorkouts() {
    return fetch(this.baseUrl).then(res => res.json())
//     return fetch(this.baseUrl).then(res => console.log(res.json()))
  }

  createWorkout(workout) {
    const workoutCreateParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ workout })
    }
    return fetch(this.baseUrl, workoutCreateParams).then(res => res.json())
  }

  deleteWorkout(workoutId) {
    const workoutDeleteParams = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch(`${this.baseUrl}/${workoutId}`, workoutDeleteParams).then(res =>
      res.json()
    )
  }
  editWorkout(workoutId) {
     const workoutUpdateParams = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ workout })
    }
  }
}