import React, { Component } from 'react';
import Title from './components/Title';
import Widget from './components/Widget';
import WeeklyForecast from './components/WeeklyForecast';

const API_KEY = '9c0233c5ac8b48a88f0170504182912';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            temperature: undefined,
            city: undefined,
            country: undefined,
            condition: undefined,
            humidity: undefined,
            cloud: undefined,
            wind_speed: undefined,
            wind_dir: undefined,
            Lat: 'Loading',
            Long: 'Loading',
            week: []
        };
        this.getWeather = this.getWeather.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({inputValue: e.target.value});
    }

    handleClear(e){
        e.preventDefault();
        this.setState({inputValue: ''})
    }

    handleSubmit(e) {
        e.preventDefault();
        const city = e.target.elements.city.value;
        this.getWeather(city)
    }

    componentDidMount() {
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            var coor = `${position.coords.latitude},${position.coords.longitude}`;
            that.getWeather(coor)
        })
    }

    getWeather(q){
        fetch(`https://api.apixu.com/v1/forecast.json?key=${API_KEY}&q=${q}&days=7`)
        .then(response => response.json())
        .then(data => { 
            this.setState({ 
                week: data.forecast.forecastday,
                time: data.location.localtime,
                country: data.location.country,
                city: data.location.name,
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                humidity: data.current.humidity,
                cloud: data.current.cloud,
                wind_speed: data.current.wind_kph,
                wind_dir: data.current.wind_dir
            })
        })
        .catch(e => console.log(e))
    }

    render() {   
        return (
            <div className="app">
                <Title country={this.state.country} city={this.state.city} time={this.state.time} 
                       temperature={this.state.temperature} condition={this.state.condition} />

                <div className="weather">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="city" onChange={this.handleChange} 
                            value={this.state.inputValue} placeholder="City..."/>
                            {this.state.inputValue && <button type="reset" className="clear"
                            onClick={this.handleClear}></button>}   
                    </form>

                    <Widget humidity={this.state.humidity} cloud={this.state.cloud} 
                            wind_speed={this.state.wind_speed} wind_dir={this.state.wind_dir}/>
                    <WeeklyForecast week={this.state.week}/>
                </div>
            </div>
        );
    }
}

export default App;