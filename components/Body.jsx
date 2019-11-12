import React from 'react';
import Data from "../components/Data";

const tables = [
    'table1',
    'table2',
    'table3',
    'table4',
    'table5',
];

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourcesCount: 10,
        };
        
        this.dataSources = [
            'table1',
            'table2',
            'table3',
        ];
        this.dataReceived = Array(this.dataSources.length).fill(false);

        this.setDataReceived = this.setDataReceived.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    setDataReceived = (index) => {
        this.dataReceived[index] = true;
        const allDataReceived = this.dataReceived.reduce((previousValue, currentValue) => {
            return currentValue && previousValue
        });
        if (allDataReceived)
            this.props.fetchFinished();
    };

    randomTable = (tables) => {
        return tables[Math.floor(Math.random() * tables.length)];
    };

    handleInputChange = (e) => {
        this.setState({sourcesCount: parseInt(e.target.value) ? parseInt(e.target.value) : 0})
    };

    render() {
        const {sourcesCount} = this.state;
        const {attempts} = this.props;
        this.dataSources = new Array(sourcesCount).fill('').map(() => {
                return this.randomTable(tables)
            }
        );
        this.dataReceived = Array(this.dataSources.length).fill(false);
        const boards = this.dataSources && this.dataSources.map((table, index) => {
            return <Data tableName={table} index={index} setDataReceived={this.setDataReceived} attempts={attempts}
                         key={index}/>
        });

        return (
            <div>
                <div style={{clear: 'both', paddingTop: '15px', fontSize: '1.5em'}}>
                    <label>
                        Queies count:
                        <input type="text" onChange={this.handleInputChange} id="sources" value={sourcesCount}
                               style={{fontSize: '1em', paddingLeft: '5px'}}
                        />
                    </label>
                </div>
                <div style={{padding: '20px', clear: 'both', position: 'relative', fontSize: '1.5em'}}>
                    Attempts: {attempts}
                </div>
                {boards}
            </div>
        );
    }

}

export default Body;