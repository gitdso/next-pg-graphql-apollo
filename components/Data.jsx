import React from 'react';

const query = `
query Query($table: String){
  response(table: $table){
    table{
      id
      data
    }
    timestamp{
      minutes
      seconds
      milliseconds
    }
    duration{
      seconds
      milliseconds
    }
  }
}
`;

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
        const {attempts, tableName, index} = nextProps;

        if (tableName && attempts !== this.props.attempts) {
            fetch(`/api/graphql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: {table: tableName}
                    })
                }
            )
                .then(res => res.json())
                .then(data => {
                    const {table, timestamp, duration} = data.data.response[0];
                    this.setState({
                        table: table,
                        timestamp: timestamp,
                        duration: duration,
                    });
                    this.props.setDataReceived(index);
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