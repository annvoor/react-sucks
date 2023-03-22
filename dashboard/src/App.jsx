import React from 'react'
import { useEffect, useState } from 'react'
import { render } from 'react-dom'
import './App.css'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherDatas: [],
      d: new Date(),
      hours: ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"]
    }
  }

  // this function runs once the first time this
  // component is rendered
  componentDidMount() {
    this.updateWeatherData()
    setInterval(this.updateWeatherData, 3600000)
  }

  updateWeatherData(){
    fetchWeatherData().then(data=>{
      const todayForecast = data.properties.periods[0]
      // get first twelve periods
      // get temperature and short forecast
      // [{ temp: __, forecast: __}, ...]
      const shortData = data.properties.periods.slice(0, 12)
      const lessData = shortData.map(elem => ({ temp: elem.temperature, forecast: elem.shortForecast}))
      console.log(lessData)
      this.setState({
        weatherDatas: lessData
      })
    })
  }  

  render() {
    return (
      <div id="page">
          <div className="bigScreenLeft">
            {/* <Schedule className="screenLeft"/> */}
          </div>
        <div className="screenRight">
          <div className="weather">
            {this.state.weatherDatas.map((elem, i) => (
              <div key={elem.forecast+i} className="miniWeather">
                <p className="weatherBits">{this.state.hours[(this.state.d.getHours()+i)%24]}</p>
                <p className="weatherBits" id="temp">{elem.temp}°</p>
                <p className="weatherBits">{elem.forecast}</p>
              </div>
            ))}
          </div>
          <div id="images">
            <Inspo />
            <Animals />
          </div>
        </div>
      </div>
    );
  }

}

function Inspo() {
  var inspo = ["quotes/inspo1.png", "quotes/inspo2.png", "quotes/inspo3.png", "/quotes/inspo4.png", "/quotes/inspo5.png", "/quotes/inspo6.png", "/quotes/inspo7.png", "/quotes/inspo8.png", "/quotes/inspo9.png", "/quotes/inspo10.png", "/quotes/inspo11.png", "/quotes/inspo12.png", "/quotes/inspo13.png", "/quotes/inspo14.png", "/quotes/inspo15.png", "/quotes/inspo16.png", "/quotes/inspo17.png", "/quotes/inspo18.png", "/quotes/inspo19.png", "/quotes/inspo20.png", "/quotes/inspo21.png", "/quotes/inspo22.png", "/quotes/inspo23.png", "/quotes/inspo24.png", "/quotes/inspo25.png", "/quotes/inspo26.png", "/quotes/inspo27.png", "/quotes/inspo28.png", "/quotes/inspo29.png", "/quotes/inspo30.png", "/quotes/inspo31.png"]
  const d = new Date();
  return(
    <React.Fragment>
      <img src={ inspo[d.getDate()-1] } alt="inspirational AI generated quote" />
    </React.Fragment>
  )
}

function Animals() {
  var animals = ["animals/animal1.jpeg","animals/animal2.jpeg","animals/animal3.jpeg","animals/animal4.jpeg","animals/animal5.jpeg","animals/animal6.jpeg","animals/animal7.jpeg","animals/animal8.jpeg","animals/animal9.jpeg","animals/animal10.jpeg"]
  const d = new Date();
  return(
    <React.Fragment>
      <img src={ animals[d.getDate()%10] } alt="cute animal" id="animal" />
    </React.Fragment>
  )
}

async function fetchWeatherData(){
  const data = await fetch("https://api.weather.gov/gridpoints/MTR/86,95/forecast/hourly")
  return (data.json())
}

function Schedule() {
  const [showSchedule, hideSchedule] = useState(true)
  function changeSchedule() {
    console.log("changing")
    hideSchedule(!showSchedule)
  }
  var schedules = [
    <div className="scheduleText">
      <p>9:45 - 12: Silver Practice</p>
      <p>12 - 4:30: Robotics</p>
    </div>, 
    <div className="scheduleText">
      <p>8:55 - 10:10: Math</p>
      <p>10:15 - 11:30: Full Stack</p>
      <p>11:35 - 12: Lunch</p>
      <p>12 - 12:30: Advisory</p>
      <p>12:35 - 1:50: English</p>
      <p>1:55 - 3:10: DWI</p>
      <p>4 - 6: Robotics</p>
    </div>, 
    <div className="scheduleText">
      <p>8:55 - 10:10: Spanish</p>
      <p>10:15 - 11:30: Physics</p>
      <p>11:35 - 12:30: Lunch</p>
      <p>12:35 - 1:50: History</p>
      <p>1:55 - 3:10: Chemistry</p>
      <p>3:15 - 3:45: Kpop Club</p>
      <p>6:30 - 7:30: Piano Lesson</p>
    </div>, 
    <div className="scheduleText">
      <p>8:55 - 3:10: WEDNESDAY SCHEDULE :DD</p>
      <p>4 - 6: Robotics</p>
      <p>6:30 - 7:15: Voice Lesson</p>
    </div>, 
    <div className="scheduleText">
      <p>8:55 - 10:10: Math</p>
      <p>10:15 - 11:30: Full Stack</p>
      <p>11:35 - 12: Lunch</p>
      <p>12 - 12:30: Advisory</p>
      <p>12:35 - 1:50: SOM</p>
      <p>1:55 - 3:10: English</p>
      <p>4 - 6: Robotics</p>
    </div>, 
    <div className="scheduleText">
      <p>8:55 - 10:10: Spanish</p>
      <p>10:15 - 11:30: Physics</p>
      <p>11:35 - 12:30: Lunch</p>
      <p>12:35 - 1:50: Chemistry</p>
      <p>1:55 - 3:10: History</p>
      <p>4 - 7: Robotics</p>
    </div>, 
    <div className="scheduleText">
      <p>8:45 - 10: Red and Orange Ball</p>
      <p>10 - 12: Green Dot</p>
    </div>]

  const d = new Date();

    let schedule = null;

  if (showSchedule){
    schedule = schedules[d.getDay()];
  }

  return(
    <div>
      <button onClick={ changeSchedule } />
      { schedule }
    </div>
  )
}