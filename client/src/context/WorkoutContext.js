import { createContext, useReducer } from 'react'

// Why are we even using React Context here? 

// When we add a workout to the database, our local 'workouts' variable is not automatically updated
// because we do not automatically run a fetch request, and doing so would be super costly anyways.

// The first instinct might be to update the 'workouts' state in Home.js every time that a new 
// workout is added in the WorkoutForm.js file, but 'workouts' is a local variable inside Home.js
// thus we cannot access it in the WorkoutForm.js file. We need a way to maintain data ACROSS multiple
// components in our program. This is where React Context comes in.

// To make sure that our local workouts variable is kept in sync with our database, we  
// created a React Context that will keep track of every workout we've added to the database, and allow
// us to access it across multiple components (most notably the WorkoutForm and the Home page).

export const WorkoutsContext = createContext()

// The state is going to be an object containing an array (called 'workouts') containing all of the workouts.
export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                // the ... "spreads" the inner contents of the "state.workouts" array.
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                // we want to compare id's and not the entire workouts themselves because comparing
                // objects might not always work due to memory allocation.
                // note: in the filter function, you want to input a function that will return true for the 
                //       items you want to keep, and false for the items you want to remove.
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

// the "children" element of props is everything that the WorkoutsContextProvider component wraps around.
// In this case, is is <App />.
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        // Whatever is wrapped inside the Provider will have access to the context of that provider.
        // CRUCIAL: the "value" property below is the HEART of the context hook - this is where we specify 
        //          what is actually being passed town our component tree.
        <WorkoutsContext.Provider value={{...state, dispatch}} >
            {/* we pass in BOTH the state and dispatch property as a single object so that
             every component in our application has access to 1) the current state and 2) the dispatch
             function that will allow it it to manipulate the state.*/}
            { children }
        </WorkoutsContext.Provider>
    )
} 





