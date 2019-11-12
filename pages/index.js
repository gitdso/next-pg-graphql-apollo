import React from 'react'
import Header from "../components/Header";
import Body from "../components/Body";

// import "./styles/index.css"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attempts: 0,
            start: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0,
            },
            end: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0,
            },
        };

        this.fetchDataFinished = this.fetchDataFinished.bind(this);
        this.changeRun = this.changeRun.bind(this);
    }

    changeRun() {
        const start = new Date();
        this.setState((state) => {
            return {
                attempts: state.attempts + 1,
                start: {
                    minutes: start.getMinutes(),
                    seconds: start.getSeconds(),
                    milliseconds: start.getMilliseconds()
                },
                end: {
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0,
                },
            }
        })
    }

    fetchDataFinished = () => {
        const end = new Date();
        this.setState({
            end: {
                minutes: end.getMinutes(),
                seconds: end.getSeconds(),
                milliseconds: end.getMilliseconds(),
            }
        })
    };

    render() {
        const {attempts, start, end} = this.state;
        const durationMs = (end.seconds * 1000 + end.milliseconds) - (start.seconds * 1000 + start.milliseconds);
        const duration = {
            seconds: Math.trunc(durationMs / 1000),
            milliseconds: (durationMs - Math.trunc(durationMs / 1000) * 1000),
        };
        return (
            <>
                <Header runClick={this.changeRun} start={start} end={end} duration={duration}/>
                <Body attempts={attempts} fetchFinished={this.fetchDataFinished}/>
            </>
        )
    }

};

export default Home
