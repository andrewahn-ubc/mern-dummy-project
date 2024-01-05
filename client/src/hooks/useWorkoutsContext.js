import { WorkoutsContext } from '../context/WorkoutContext'
import { useContext } from 'react'

// the purpose of this hook is so that anytime we need to access the workout context, we can just
// call this hook instead of having to call useContext(WorkoutsContext)
export const useWorkoutsContext = () => {
    // 'context' below is equal to whatever we passed into the "value" property in the context Provider.
    const context = useContext(WorkoutsContext) 

    // Detects whether context is null, which in turn detects whether we are outside of the scope of WorkoutContext.
    if (!context) {
        throw Error('useWorkoutsContext was called outside of the scope of WorkoutContext.')
    }

    return context
}




