const Workout = require('../models/workoutModel')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get one workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    const workout = await Workout.findById(id)

    if (!workout) {
        // we must RETURN so that if an error occurs, we don't want to run the line below this if statement.
        return res.status(404).json({error: "No such workout"})
    }   

    res.status(200).json(workout)
}


// create a new workout
const createWorkout = async (req, res) => {
    // in the line below, the variable names DO matter, but their order does not.   
    const {reps, title, load} = req.body

    // add a workout document to db
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    } 
}

// delete a workout


// update a workout

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout
}