import React from 'react';

const Header = ({runClick, start, end, duration}) => (
    <div style={{fontSize: '1.5em'}}>
        <button onClick={runClick} style={{width: '100px', height: '120px', float: 'left', fontSize: '1em', display: 'block'}}>Load data</button>
        <div style={{marginLeft: '10px', position: 'relative', float: 'left'}}>
            <span>Client timings</span>
            <span className="time-value">
               start: {start.minutes}m - {start.seconds}s - {start.milliseconds}ms
            </span>
            <span className="time-value">
                end: {end.minutes}m - {end.seconds}s - {end.milliseconds}ms
            </span>
            <span className="time-value">
                duration: {duration.seconds}s - {duration.milliseconds}ms
            </span>
        </div>
        <style jsx>{`
            .time-value{
                font-weight: bold;           
                display: block;                         
                }
        `}</style>
    </div>
);
export default Header;