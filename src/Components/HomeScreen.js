import React, { useState, useEffect } from 'react';
import { Button, Card } from "@material-tailwind/react";
function Home( {setHomeClear, homeInfo}) {
    



    return (
        <Card className="flex justify-center items-center content-center self-center text-start gap-4 p-8 max-w-[100%]">
            <h1 className='text-lg font-bold'>{homeInfo.title}</h1>
            <p className="whitespace-pre-line">{homeInfo.message}</p>
            <Button onClick={()=> {setHomeClear(true)}} color='blue'>{homeInfo.buttonText}</Button>
        </Card>
    );
}

export default Home;