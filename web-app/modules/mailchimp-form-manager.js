import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import PropTypes from 'prop-types'

import mailchimp from 'utils/mailchimp'

const { subscribeUrl, fields } = mailchimp

const propTypes = {
  children: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.string)
}

const defaultProps = {
  fields: { [fields.email]: '' }
}

const STATUS = {
  READY: 'ready',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error'
}

class MailchimpFormManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props.fields
    }

    this.updateField = this.updateField.bind(this)
    this.submit = this.submit.bind(this)
  }

  submit(subscribe, event) {
    subscribe(this.state)
    event.preventDefault()
  }

  updateField(name, value) {
    this.setState({
      [name]: value
    })
  }

  localizeMessage(message) {
    if (!message) return ''
    if (message.indexOf('already subscribed') > -1) {
      return 'This email is already subscribed, thanks!'
    }
    return 'Please use a valid email.'
  }

  render() {
    const { children } = this.props
    const managedFields = Object.keys(this.state).reduce((fields, key) => {
      return {
        ...fields,
        [key]: {
          value: this.state[key],
          onChange: this.updateField.bind(this, key)
        }
      }
    }, {})
    return (
      <MailchimpSubscribe
        url={subscribeUrl}
        render={({
          subscribe,
          status: subscribeStatus,
          message: serverMessage
        }) => {
          const managedSubscribe = this.submit.bind(this, subscribe)
          const status =
            subscribeStatus != null ? subscribeStatus : STATUS.READY
          const message = this.localizeMessage(serverMessage)
          return children({ managedFields, managedSubscribe, status, message })
        }}
      />
    )
  }
}

MailchimpFormManager.propTypes = propTypes
MailchimpFormManager.defaultProps = defaultProps
MailchimpFormManager.STATUS = STATUS

export default MailchimpFormManager
