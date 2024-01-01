const Workout = require('../models/workoutModel')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get one workout


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
    getWorkouts
}