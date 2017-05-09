import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { NEWS_CONTAINER_ACTION_CREATORS } from 'reducers/news_container_reducer.js';

let AddNewsContainer = ({ addNewsContainer, nextContainerId }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        addNewsContainer(input.value, nextContainerId)
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

const mapStateToProps = (state) => {
  return {
    nextContainerId: state.newsContainers.length
  }
}

const mapDispatchToProps = {
  ...NEWS_CONTAINER_ACTION_CREATORS
}

AddNewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewsContainer)

export default AddNewsContainer
