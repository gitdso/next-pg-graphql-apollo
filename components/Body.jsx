import React from 'react';
import Data from "../components/Data";

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSources: [
                'table1',
                'table2',
                'table3',
                'table4',
                'table5',
            ],
            dataReceived: Array(5).fill(false),
        };
        this.setDataReceived = this.setDataReceived.bind(this)
    }

    setDataReceived = (table) => {
        const index = this.state.dataSources.indexOf(table);
        this.setState(({dataReceived}) => ({
            dataReceived: dataReceived.map((item, i) => {
                if (i === index) {
                    item = true;
                }
                return item;
            })
        }), ()=>{
            const allDataReceived = this.state.dataReceived.reduce((previousValue, currentValue) => {
               return currentValue && previousValue
            });
            if (allDataReceived)
                this.props.fetchFinished();
        })
    };

    render() {
        const {dataSources} = this.state;
        const {attempts} = this.props;
        const boards = dataSources && dataSources.map((table) => {
            return <Data tableName={table} setDataReceived={this.setDataReceived} attempts={attempts} key={table}/>
        });

        return (
            <div>
                <div style={{padding: '20px', clear: 'both', position: 'relative', fontSize: '1.5em'}}>
                    Attempts: {attempts}
                </div>
                {boards}
            </div>
        );
    }

};

export default Body;