import React from 'react';

class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
            timestamp: null,
            duration: null,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {attempts, tableName} = nextProps;

        if (tableName && attempts !== this.props.attempts) {
            fetch(`/api/${tableName}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        table: data.table,
                        timestamp: data.timestamp,
                        duration: data.duration,
                    });
                    this.props.setDataReceived(tableName);
                });
        }
        return true;
    }

    render() {
        const {table, timestamp, duration} = this.state;
        const row = table && table.map(row => {
            return (
                <tr key={row.data}>
                    <td>{row.id}</td>
                    <td>{row.data}</td>
                </tr>
            )
        });

        return (
            <div id="board">
                <div className="time-table">
                    Start:
                    <span className="time-value">
                        {timestamp && timestamp.seconds}s - {timestamp && timestamp.milliseconds}ms 
                    </span>
                </div>
                <div className="time-table">
                    Duration:
                    <span className="time-value">
                        {duration && duration.seconds}s - {duration && duration.milliseconds}ms
                    </span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {row || <tr>
                        <td>...</td>
                        <td>...</td>
                    </tr>}
                    </tbody>
                </table>
                <style jsx>{`
                table{
                  border: 1px solid black;
                  width: 160px;           
                 
                }
                #board{
                    float: left;
                    margin: 5px 5px;
                    box-sizing: border-box;
                  
                }
                 #board.div{
                    margin-left: 3px;
                  }
                .time-table{
                 box-sizing: border-box;
                }
                .time-value{
                font-weight: bold;
                float: right;
                display: block;           
                }
                `}</style>
            </div>

        )
    }

};

export default Data;