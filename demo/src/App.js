import React from 'react'
import SmartButton from '../../src/index'
import SaveIcon from '@material-ui/icons/Save'

class App extends React.Component {
  state = {
    value: {}
  }

  handleChange = value => {
    this.setState({
      value
    })
  }

  handleClickWithConfirmation = () => {
    return new Promise(resolve => {
      if (!window.confirm('Are you sure?')) {
        resolve(false)
        return
      }

      setTimeout(resolve, 1000)
    })
  }

  handleClick = () => {
    return new Promise(resolve => {
      setTimeout(resolve, 1000)
    })
  }

  render () {
    return (
      <div>
        <div>
          <h3>Usual case</h3>
          <SmartButton onClick={this.handleClick}><SaveIcon /></SmartButton>
        </div>

        <div>
          <h3>With confirmation</h3>
          <SmartButton onClick={this.handleClickWithConfirmation} iconTime={2000}><SaveIcon /></SmartButton>
        </div>
      </div>
    )
  }
}

export default App
