class RoutinesAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/routines"
  }

  getRoutines() {
    return fetch(this.baseUrl).then(res => res.json())
    // ! view promise response in chrome console
    // return fetch(this.baseUrl).then(res => console.log(res.json()))
  }

  createRoutine(routine) {
    const routineCreateParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ routine })
    }
    return fetch(this.baseUrl, routineCreateParams).then(res => res.json())
  }

  deleteRoutine(routineId) {
    const routineDeleteParams = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch(`${this.baseUrl}/${routineId}`, routineDeleteParams).then(res =>
      res.json()
    )
  }
  editRoutine(routineId) {
     const routineEditParams = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ routineId })
    }
    return fetch(`${this.baseUrl}/${routineId}`, routineEditParams).then(res =>
      res.json()
      )
    }
  
    addWorkout(routineId) {
     const workoutAddParams = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ routineId })
    }
    return fetch(`${this.baseUrl}/${routineId}`, workoutAddParams).then(res =>
      res.json()
      )
    }
}