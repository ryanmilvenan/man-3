import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NEWS_CONTAINER_ACTION_CREATORS } from 'reducers/news_container_reducer';
import { ASYNC_ACTION_CREATORS } from 'reducers/async_reducer';
import NewsItem from 'components/NewsItem';
import CircularProgress from 'material-ui/CircularProgress';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';


export class NewsContainer extends Component {
  componentDidMount() {
    this.props.refreshSource(this.props);
    setInterval(this.props.refreshSource, this.props.timeout, this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this.props.persistState(this.props.newsContainers);
    }
  }

  handleHeadlineSliderAdjust(e, newVal) {
    this.props.changeMaxHeadlines(this.props.id, newVal);
  }

  handleTitleChange(e, newVal) {
    this.props.changeTitle(this.props.id, newVal);
  }

  refreshSouce(state) {
    fetch(API + `/refresh/${encodeURIComponent(state.url)}`)
      .then((response) => {
        return response.json();
      }).then((response) => {
        const { feed, err } = response.data;
        if (err) {
          console.error(`Error Refreshing Sources: ${err}`);
        } else {
          const { id, url } = this.props;
          this.props.updateNewsContainerSources(id, url, feed, err);
        }
      });
  }


  styles = {
    titleConfigure: {
      padding: '0.1rem',
      alignItems: 'center'
    }
  }

  render() {
    const {
      newsContainers,
      id,
      title,
      maxHeadlines,
      configureMode,
      loading,
      items,
      allItems,
      refreshSource,
      persistState,
      deleteContainer,
      rearrangeContainer,
      toggleConfigureMode,
      updateTitleForContainer
    } = this.props;
    return (
     <div className="news-container">
       <Toolbar
        style={(configureMode) ? this.styles.titleConfigure : {}}>
        {configureMode ? 
          <TextField
            id={title}
            inputStyle={{marginLeft:'0.5rem'}}
            onChange={this.handleTitleChange.bind(this)}
            value={title}
          />
        :
          <ToolbarTitle
            text={title}
          />
        }
        <ToolbarGroup>
          {configureMode &&
            <div>
              <IconButton
                touch={true}
                onTouchTap={() => rearrangeContainer(id, {left:true})}>
                <LeftIcon />
              </IconButton>
            </div>
          }
          {configureMode &&
            <div>
              <IconButton
                touch={true}
                onTouchTap={() => rearrangeContainer(id, {right:true})}>
                <RightIcon />
              </IconButton>
            </div>
          }
					<IconMenu
						iconButtonElement={
							<IconButton 
								touch={true}>
								<MenuIcon />
							</IconButton>
						}>
						<MenuItem 
							primaryText="Delete" 
							onTouchTap={() => deleteContainer(id)} />
            <MenuItem
              primaryText="Configure"
              onTouchTap={() => {
                toggleConfigureMode(id);
              }}/>
					</IconMenu>
        </ToolbarGroup>
      </Toolbar>
      {configureMode &&
        <Slider
          label="Number of Items"
          min={1}
          max={allItems.length}
          step={1}
          sliderStyle={{marginBottom:0, marginTop:0}}
          onDragStop={() => {
            refreshSource(this.props);
            persistState(newsContainers)
          }}
          onChange={this.handleHeadlineSliderAdjust.bind(this)}
          value={maxHeadlines}
        />
      }
      <div className="content">
        <Paper
          zDepth={3}
          style={{display: 'flex', flexDirection: 'column', width: '100%'}}
        >
          {loading ? 
            <CircularProgress 
              size={120}
              style={{
                alignSelf: 'center',
                marginTop: '3rem',
                marginBottom: '3rem',
              }}
              />
          : 
          items.map((item, idx) => 
            <NewsItem
              key={idx}
              {...item}
            />
          )}
        </Paper>
      </div>
     </div>
    )
  }
}

NewsContainer.propTypes = {
  refreshSource: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  maxHeadlines: PropTypes.number.isRequired,
  timeout: PropTypes.number.isRequired,
  feed: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    newsContainers: state.newsContainers
  };
}

const mapDispatchToProps = {
  ...NEWS_CONTAINER_ACTION_CREATORS,
  ...ASYNC_ACTION_CREATORS
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);