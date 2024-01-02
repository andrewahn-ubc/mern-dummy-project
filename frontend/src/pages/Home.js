import { useEffect, useState } from 'react'

const Home = () => {

    // the emtpy dependency array [] ensures that the function is only run once - upon initialization
    useEffect(() => {
        //
    }, [])

    return (
        <div className='home'>
            <h2>Home</h2>
        </div>
    )
}

export default Home