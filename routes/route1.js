const express = require("express")
// question: does order matter in the line below? Do the names matter?
// answer: NO, the order does not matter. Thus we know that the program depends on the names, so the
// NAMES DO matter - the names likely matter for all arrays/sets.
const {
    createWorkout, 
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../workoutController')

const router = express.Router()



// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
// note: turning "id" into a route parameter using a colon attaches it to the "params" property of "req".
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router