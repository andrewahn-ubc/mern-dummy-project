import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// in the "arguments" section below, we could've just passed in "props" and then accessed "workout" 
// using props.workout, but instead we have DESTRUCTURED the props argument to make our code more readable.
// Destructuring means to extract individual elements out of a collection using curly braces.
    // note that we do not need to extract every single element!!
// MAJOR NOTE: 'props' is automatically an argument for components.
const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    // we want to delete the workout from the api and also from the context
    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className='workout-details'>
            <h4>{workout.title} </h4>
            {/* notice how we can nest JSX tags inside each other */}
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick} >Delete</span>
        </div>
    )
}

export default WorkoutDetails