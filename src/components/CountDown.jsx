import { useState } from 'react';
import './CountDown.css';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function CountDown() {
    const [currTime,setCurrTime] = useState(null);
    const [diff,setDiff] = useState(0);
    const intervalId = useRef(null);

    function handleSubmit(){
        const id = setInterval(()=>{
            intervalId.current = id;
            setDiff(new Date(currTime)-new Date());
        },1000);
    };

    useEffect(()=>{
        if(diff<0){
            clearInterval(intervalId.current);
            setDiff(0);
        }
    },[diff]);

    const getDays = () => {
        return Math.floor(diff/(1000*60*60*24));
    }

    const getHours = () => {
        const hours = diff%(1000*60*60*24);
        return Math.floor(hours/(1000*60*60));
    }

    
    const getMinutes = () => {
        const minutes = diff%(1000*60*60);
        return Math.floor(minutes/(1000*60));
    }

    const getSeconds = () => {
        const seconds = diff%(1000*60);
        return Math.floor(seconds/(1000));
    }

  return (
    <div>
        <p>CountDown App</p>
        <input type="datetime-local" onChange={(e)=>{setCurrTime(e.target.value),clearInterval(intervalId.current)}}/>
        <button onClick={handleSubmit}>start</button>
        <ul className="timer-lock">
            <li><span>{getDays()}</span>days</li>
            <li><span>{getHours()}</span>hours</li>
            <li><span>{getMinutes()}</span>minutes</li>
            <li><span>{getSeconds()}</span>seconds</li>
        </ul>
    </div>
  )
}
