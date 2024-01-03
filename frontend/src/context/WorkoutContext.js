import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
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
        <WorkoutsContext.Provider value={} >
            { children }
        </WorkoutsContext.Provider>
    )
}





