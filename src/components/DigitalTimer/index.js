import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timerLimit: 25, runningSeconds: 0, isRunning: false}

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.timerId)
  }

  startButton = () => (
    <div className="play-pause-reset-container">
      <button
        className="play-pause-reset-icon-button"
        type="button"
        onClick={this.onClickStart}
      >
        <img
          className="play-pause-rest-icon"
          alt="play icon"
          src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
          id="start"
        />

        <label className="play-pause-reset-text" htmlFor="start">
          Start
        </label>
      </button>
    </div>
  )

  pauseButton = () => (
    <div className="play-pause-reset-container">
      <button
        className="play-pause-reset-icon-button"
        type="button"
        onClick={this.onClickPause}
      >
        <img
          className="play-pause-rest-icon"
          alt="pause icon"
          src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
          id="pause"
        />

        <label className="play-pause-reset-text" htmlFor="pause">
          Pause
        </label>
      </button>
    </div>
  )

  onClickDecCounter = () => {
    const {timerLimit, isRunning} = this.state
    if (timerLimit < 1 || isRunning) {
      return this.setState({timerLimit})
    }
    return this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
  }

  onClickIncCounter = () => {
    const {timerLimit, isRunning} = this.state
    console.log(isRunning)
    if (isRunning) {
      return this.setState({timerLimit})
    }
    return this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  secondsToTimer = () => {
    const {timerLimit, runningSeconds} = this.state
    const timeInSeconds = timerLimit * 60 - runningSeconds
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    const minInString = minutes > 9 ? minutes : `0${minutes}`
    const secInString = seconds > 9 ? seconds : `0${seconds}`

    return `${minInString}:${secInString}`
  }

  onClickStart = () => {
    const {isRunning} = this.state
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
    console.log(isRunning)
    if (isRunning === false) {
      this.timerId = setInterval(() => {
        this.startTimer()
      }, 1000)
    }
  }

  onClickPause = () => {
    const {isRunning} = this.state
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
    console.log(isRunning)
    if (isRunning) {
      this.clearTimer()
    }
  }

  onClickResetButton = () => {
    console.log('Reset')
    this.setState({timerLimit: 25, runningSeconds: 0, isRunning: false})
    this.clearTimer()
  }

  startTimer = () => {
    const {timerLimit, runningSeconds} = this.state
    const timeLeft = timerLimit * 60 - runningSeconds

    if (timeLeft <= 0) {
      return this.setState(prevState => ({
        isRunning: !prevState.isRunning,
        timerLimit: 0,
      }))
    }
    return this.setState(prevState => ({
      runningSeconds: prevState.runningSeconds + 1,
    }))
  }

  render() {
    const {isRunning, timerLimit} = this.state

    return (
      <div className="bg-clock-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="clock-settings-container">
          <div className="clock-bg-image-container">
            <div className="clock-container">
              <h1 className="time-displayed">{this.secondsToTimer()}</h1>
              {isRunning ? (
                <p className="clock-status-text">Running</p>
              ) : (
                <p className="clock-status-text">Paused</p>
              )}
            </div>
          </div>
          <div className="settings-container">
            <div className="pause-reset-buttons-container">
              {isRunning ? this.pauseButton() : this.startButton()}
              <div className="play-pause-reset-container">
                <button
                  className="play-pause-reset-icon-button"
                  type="button"
                  onClick={this.onClickResetButton}
                >
                  <img
                    className="play-pause-rest-icon"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    id="reset"
                  />

                  <label className="play-pause-reset-text" htmlFor="reset">
                    Reset
                  </label>
                </button>
              </div>
            </div>
            <p className="text">Set Timer Limit</p>

            <div className="counter-container">
              <button
                type="button"
                className="counter-button"
                onClick={this.onClickDecCounter}
              >
                -
              </button>
              <p className="counter">{timerLimit}</p>
              <button
                type="button"
                className="counter-button"
                onClick={this.onClickIncCounter}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
