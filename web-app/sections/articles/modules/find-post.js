import React from 'react'
import PropTypes from 'prop-types'

const tempPostNames = ['tem-post', 'temp-post-name', 'just temporary']

FindPost.propTypes = {
  name: PropTypes.string.isRequired,
  success: PropTypes.element.isRequired,
  failure: PropTypes.element.isRequired
}

export default function FindPost({
  name,
  success: Success,
  failure: Failure,
  ...rest
}) {
  const postNames = tempPostNames
  if (!postNames.includes(name)) {
    return <Failure name={name} />
  }

  const content = `<h2>${name}</h2><div>some fake post content.  reminder that find post still just has static content</div>`
  return <Success content={content} />
}
