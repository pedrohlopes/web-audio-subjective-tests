import React, { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
function Home( {setHomeClear, homeInfo}) {
    



    return (
        <div>
            <h1>{homeInfo.title}</h1>
            <p>{homeInfo.message}</p>
            <Button onClick={()=> {setHomeClear(true)}} color='blue'>{homeInfo.buttonText}</Button>
        </div>
    );
}

export default Home;