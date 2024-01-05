import { useEffect } from 'react'
// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    // the emtpy dependency array [] ensures that the function is only run once - upon initialization
    useEffect(() => {
        // we can't make the outer function async, so we create an inner async function 
        // and call it in the outer function
        const fetchWorkouts = async () => {
            // the fetch() function returns the "response" object when we run a GET request at the given route.
            // WHEN WE DON'T SPECIFY THE METHOD, fetch() automatically runs a GET request.
            const response = await fetch('/api/workouts')
            // response is now an array containing every workout.
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])

    return (
        <div className='home'>
            <div className="workouts">
                {/* the map() function performs a certain transformation on every element of a collection */}
                {/* the && ensures that the second argument only runs if workouts is true (non-empty) */}
                {workouts && workouts.map((workout) => (
                    // we use normal parentheses here because we are returning an OBJECT (the JSX for each workout)
                    // if we had used curly brackets, React would think that we are running a function.
                    <WorkoutDetails key={workout._id} workout={workout} />
                    // for EVERY element in an array, we want to assign an id so that we can keep track of 
                    // each one. It might not always be necessary, but it's good practice!
                ))}
            </div>

            <WorkoutForm />
        </div>
    )
}

export default Home