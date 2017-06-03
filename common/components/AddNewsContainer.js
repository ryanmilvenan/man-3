import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { NEWS_CONTAINER_ACTION_CREATORS } from 'reducers/news_container_reducer.js';
import { APP_STATE_ACTION_CREATORS } from 'reducers/app_state_reducer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

let AddNewsContainer = ({ 
  nextContainerId, 
  titleText,
  urlText,
  addNewsContainer, 
  resetTextFields,
  setTitleText, 
  setUrlText 
}) => {
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        addNewsContainer(titleText, urlText, nextContainerId);
        resetTextFields();
      }}>
        <TextField
          floatingLabelText="Title"
          inputStyle={{marginLeft:'1rem'}}
          onChange={setTitleText}
          value={titleText}
        />
        <TextField
          floatingLabelText="RSS URL"
          inputStyle={{marginLeft:'1rem'}}
          onChange={setUrlText}
          value={urlText}
        />
        <RaisedButton
          label="Add Source"
          fullWidth={true}
          type="submit"
        />
      </form>
    </div>
  )
}

AddNewsContainer.propTypes = {
  AddNewsContainer: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    nextContainerId: state.newsContainers.length,
    titleText: state.appState.title,
    urlText: state.appState.url
  }
}

const mapDispatchToProps = {
  ...NEWS_CONTAINER_ACTION_CREATORS,
  ...APP_STATE_ACTION_CREATORS
}

AddNewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewsContainer)

export default AddNewsContainer
