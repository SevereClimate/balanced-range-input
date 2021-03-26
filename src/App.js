import './App.css';
import React from 'react';

function App() {

        let values = [30,20,50];
        let params = new URLSearchParams(window.location.search).get("values")
        if (params != null) {
            values = params.split(",").map(c => parseInt(c));
        }
        return (
            <SliderBlock values={values} />
        )
}

class SliderBlock extends React.Component {
    constructor(props) {
        super(props);
        let locks = this.props.values.map(()=>false);
        this.state = {values: this.props.values, lastSlider: 0, locks: locks};
        this.updateValue = this.updateValue.bind(this);
        this.lockSlider = this.lockSlider.bind(this);
    }
    lockSlider(e){
        e.target.className = e.target.className === "slider-locked" ? "slider" : "slider-locked";
        let locks = [...this.state.locks];
        locks[e.target.id] = e.target.className === "slider-locked";
        this.setState({locks: locks});
    }
	
    updateValue(e){
        if(this.state.values.length > 1){
            let allValues = this.state.values;
            allValues[e.target.id] = parseInt(e.target.value);
            let total = allValues.reduce((acc, cur) => acc+=cur);
            let i = this.state.lastSlider;
            while(total !== 100){
                if (i === allValues.length){i = 0};
                if (i !== parseInt(e.target.id) && total !== 100 && !this.state.locks[i]){
                    if(total > 100){
                            if(allValues[i] !== 0){
                                allValues[i] --; 
                                total--;
                            }
                        } else if (total < 100){
                            if(allValues[i] !== 100){
                                allValues[i] ++;
                                total++;
                            }
                        }
                        i++;
                    } else {
                    i++;
                }
            }  
            this.setState({values: allValues, lastSlider: i});
        }
    }
    render(){
        console.log(this.state.values);
        let sliders = [];
        for (let i in this.state.values){
            sliders.push(
                <div key={"slider-"+i}>
                    <h1>{this.state.values[i]}%</h1>
                    <input type="range" id={i} className="slider" onClick={this.lockSlider} value={this.state.values[i]} onChange={this.updateValue}></input>
                </div>
            )
        }
        return(
            <div id="slider-block" className="slider-block">
                {sliders}
                <h1>Total: {this.state.values.reduce((acc, cur) => acc+=cur)}</h1>
            </div>
            )
    }

}

export default App;
