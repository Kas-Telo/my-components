import React from 'react';
import './App.css';
import {DoubleRange} from "./components/DoubleRange/DoubleRange";
import {Toggle} from "./components/Toggle/Toggle";
import {SquareWithRangeValue} from "./components/SquareWithRangeValue/SquareWithRangeValue";
import {InputSearch} from "./components/InputSearch/InputSearch";

const App = () => {
    return (
        <div className="App">
            <div style={{margin: '20px 0 0', display: "flex", flexDirection: 'row', alignItems: 'center'}}>
                <SquareWithRangeValue value={0}/>
                <DoubleRange/>
                <SquareWithRangeValue value={10}/>
            </div>
            <div style={{margin: '20px 0 0'}}>
                <Toggle/>
            </div>
            <div>
                <InputSearch/>
            </div>
        </div>
    );
}

export default App;
