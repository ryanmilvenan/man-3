import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NEWS_CONTAINER_ACTION_CREATORS } from 'reducers/news_container_reducer.js';

let AddNewsContainer = ({ dispatch, addNewsContainer }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        addNewsContainer(input.value)
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add News Container
        </button>
      </form>
    </div>
  )
}

AddNewsContainer.propTypes = {
  AddNewsContainer: PropTypes.func
}

const mapDispatchToProps = {
  ...NEWS_CONTAINER_ACTION_CREATORS
}

AddNewsContainer = connect(
  undefined,
  mapDispatchToProps
)(AddNewsContainer)

export default AddNewsContainer
