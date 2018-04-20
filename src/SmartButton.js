import React from 'react'
import Button from 'material-ui/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import CircularProgress from 'material-ui/Progress/CircularProgress'

class SmartButton extends React.Component {

  timerID = undefined
  unmounting = false

  state = {
    processing: false,
    processed: false,
    error: false
  }

  onClick = event => {
    if (event) {
      event.stopPropagation()
      event.preventDefault()
    }

    if (this.props.confirm) {
      this.props.confirm().then(confirmed => {
        if (confirmed) {
          this.runProcess()
        }
      })
    } else {
      this.runProcess()
    }
  }

  runProcess () {
    this.setState({
      processing: true
    })

    this.props.process().then(() => {
      this.setStatus(true)
    }).catch(() => {
      this.setStatus(false)
    })
  }

  setStatus = result => {
    if (this.unmounting) {
      return
    }

    this.setState({
      processing: false,
      error: result === false,
      processed: result !== false
    })

    if (this.props.iconTime) {
      this.timerID = setTimeout(() => {
        this.setState({
          processed: false,
          error: false
        })
      }, this.props.iconTime)
    }
  }

  componentWillUnmount () {
    if (this.timerID) {
      clearTimeout(this.timerID)
    }
    this.unmounting = true
  }

  render () {
    const buttonProps = {}

    buttonProps['type'] = this.props.type || 'button'
    buttonProps['onClick'] = this.onClick
    buttonProps['color'] = this.props.color || 'default'

    if (this.props.bsSize) {
      buttonProps['bsSize'] = this.props.bsSize
    }

    if (this.props.disabled !== undefined) {
      buttonProps['disabled'] = this.props.disabled
    }

    if (this.props.style) {
      buttonProps['style'] = this.props.style
    }

    if (this.props.tabIndex) {
      buttonProps['tabIndex'] = this.props.tabIndex
    }

    buttonProps['variant'] = this.props.variant || 'raised'
    buttonProps['mini'] = this.props.mini !== undefined ? this.props.mini : true

    if (this.props.icon) {
      return this.renderIconButton(buttonProps)
    }

    return this.renderStandardButton(buttonProps)
  }

  renderIconButton (buttonProps) {
    const size = buttonProps['mini'] ? 48 : 64
    return (
      <Button {...buttonProps} variant='fab'>
        {this.state.processing &&
          <CircularProgress size={size} style={{
            position: 'absolute',
            top: -4,
            left: -4,
            zIndex: 1,
            color: 'white'
          }} />
        }

        {this.state.processed &&
          <CheckCircleIcon />
        }

        {this.state.error &&
          <ErrorIcon />
        }

        {!this.state.processed && !this.state.error &&
          this.props.icon
        }
      </Button>
    )
  }

  renderStandardButton (buttonProps) {
    return (
      <Button {...buttonProps}>
        <span>{this.props.title}</span>
        {this.state.processed &&
          <CheckCircleIcon />
        }
        {this.state.processing &&
          <CircularProgress />
        }
        {this.state.error &&
          <ErrorIcon />
        }
      </Button>
    )
  }
}

export default SmartButton
