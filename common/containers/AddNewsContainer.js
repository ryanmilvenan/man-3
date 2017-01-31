import React from 'react'
import { connect } from 'react-redux'
import { addNewsContainer, sendSocketMessage } from '../actions'

let AddNewsContainer = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        //dispatch(addNewsContainer(input.value))
        dispatch(sendSocketMessage(input.value))
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
AddNewsContainer = connect()(AddNewsContainer)

export default AddNewsContainer
