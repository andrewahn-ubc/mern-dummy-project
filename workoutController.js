const Workout = require('./models/model1')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get one workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }

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

    // the only errors that can occur is when parts of the form aren't filled in, so we'll detect which
    // elements are missing so that we can create a tailored error message.
    let emptyFields = []

    // !title is true when title is empty, ie. null, ie. false
    if (!title) {
        // "push" is how we add an element to an array in JavaScript
        emptyFields.push('title')
    } 
    if (!reps) {
        emptyFields.push('reps')
    } 
    if (!load) {
        emptyFields.push('load')
    } 

    if (emptyFields.length > 0) {
        // we can return here because createWorkout will run again when the user presses the "submit"
        // button again, since the onSubmit function will run again, meaning we will run another fetch POST request
        return res.status(400).json({ error: 'Please fill in all of the fields', emptyFields})
    }


    // add a workout document to db
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        // "error" is a property of the response JSON
        res.status(400).json({error: error.message})
    } 
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }   

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }

    // findOneAndUpdate() takes in two arguments: the "find" criteria and the object representing the 
    // update we want to make
    // question: can you just put req.body as the second argument?
    // note: "workout" below will be equal to the PRE-UPDATE document, NOT the new, updated document.
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        // the ... in front of req.body spreads out the elements in req.body into the outer curly brackets.
        ...req.body 
    })

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }   

    const workout1 = await Workout.findById(id)

    res.status(200).json(workout1)
}

// the order in which the functions are listed below does NOT matter, since we will be matching 
// them by name when we import them anyways.
module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}