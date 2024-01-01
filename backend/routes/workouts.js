const express = require("express")
// does order matter in the line below? because name doesn't (for single variable exports)
const {
    createWorkout, 
    getWorkouts
} = require('../controllers/workoutController')

const router = express.Router()



// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workout'})
})

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
})


module.exports = router