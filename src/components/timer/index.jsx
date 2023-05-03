import React, {useEffect, useState} from "react";

const CountDown = () => {

    const [[h ,m, s], setTime] = useState([0, 0, 0]);
    const [inputValue, setInputValue] = useState('')

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    const tick = () => {

        if ( h === 0 && m === 0 && s === 0) {
            setTime([0,0,0])
        } else if( h > 0 && m === 0 && s === 0) {
            setTime([h-1, 59, 59])
        } else if ( s === 0) {
            setTime([h, m - 1, 59])
        } else if (h >= 0 && m >= 0 && s > 0 || s < 60) {
            setTime([h, m, s - 1])
        } else return
    };

   useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => {
            return clearInterval(timerID)
        };
    }, [h, m,s]);

    const converter = () => {

        const sec = inputValue
        const hours = sec / 3600
        const hoursRounding = Math.floor(hours)
        const remainderHours = sec % 3600

        const minutes = remainderHours / 60
        const minutesRounding = Math.floor(minutes)
        const remainderMinutes = remainderHours % 60

        const seconds = remainderMinutes

        setTime([hoursRounding, minutesRounding, seconds])
    }

    return (
        <div>
                <input
                    placeholder="Seconds"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={converter}>Start</button>


            <br />
            <br />

            <span>  {`
            ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}
            `}</span>

        </div>
    );
};

export default CountDown;