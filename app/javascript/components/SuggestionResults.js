import React from "react"
import { connect } from "react-redux"

import Spinner from "./Spinner"
import Champion from "./Champion"

import { clearSelectedHeroes } from "../actions/heroes"
import { MAX_HEROES_SELECTED } from "../actions/actionTypes"

class SuggestionResults extends React.Component {

  constructor(props) {
    super(props)
    
    this.resultsRef = React.createRef()

    this.handleReset = this.handleReset.bind(this)
  }

  handleReset() {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 30);
    this.props.clearSelectedHeroes()
  }

  componentDidUpdate() {
    if(this.props.champions.length != 0 || this.props.isFetching)
      this.resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', })
  }      

  render () {
    const champions = <ul className="champions">
        {this.props.champions.map((champion) => (
          <Champion {...champion} key={champion.similarity_info.champion_id} />
        ))}
      </ul>;

    return (
      <div className="suggestion-results-container" ref={this.resultsRef}>
        <div className="suggestion-results-container__hint">
          { this.props.champions.length == 0 ? `Select up to ${MAX_HEROES_SELECTED} Dota 2 heroes and click Suggest button!` : "" }
        </div>
        { this.props.isFetching ? <Spinner /> : champions }

        <button
          onClick={this.handleReset}
          className={`button action-scroll-to-heroes ${this.props.champions.length > 0 ? '' : 'button--hidden'}`}
          type="button">
          { window.screen.width < 978 ? 'Suggest Again' : 'Reset'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ champions: state.champions.list, isFetching: state.champions.isFetching });
const mapDispatchToProps = { clearSelectedHeroes };
export default connect(mapStateToProps, mapDispatchToProps)(SuggestionResults)
