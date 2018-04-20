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

  process = () => {
    return new Promise(resolve => {
      if (!window.confirm('Are you sure?')) {
        resolve(false)
        return
      }

      setTimeout(resolve, 1000)
    })
  }

  render () {
    return (
      <div>
        <SmartButton
          process={this.process}
          icon={<SaveIcon />}
          iconTime={2000}
        />
      </div>
    )
  }
}

export default App
