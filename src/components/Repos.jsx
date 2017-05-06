import React, {Component} from 'react';
import GithubRepo from './GithubRepo';
import Infinite from 'react-infinite';

class Repos extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      loading: false,
      followers: []
    }
  }

  fetchData = () => {

    let {page, loading, repos} = this.state;

    this.setState({
      loading: true
    })

    fetch(`https://api.github.com/users/${this.props.params.username}/repos?page=${page}&per_page=50`)
    .then(response => response.json())
    .then(
        repos => {
            // How can we use `this` inside a callback without binding it??
            // Make sure you understand this fundamental difference with arrow functions!!!
            this.setState({
                repos: repos.concat(repos),
                loading: false,
                page: page + 1
            });
        }
    );
  }


  componentDidMount() {
    this.fetchData();
  }

  render() {
    let {repos, loading, page} = this.state;

    if (!repos) {
      return <div>LOADING REPOS...</div>
    }

    return (
      <div className="followers-page">
        <h2>{this.props.params.username}'s repos</h2>
        <ul className="list-followers">
          <Infinite
            className="infinite__container"
            isInfiniteLoading={loading}
            onInfiniteLoad={this.fetchData}
            useWindowAsScrollContainer
            elementHeight={50}
            infiniteLoadBeginEdgeOffset={100}
            >
          {repos.map((user) => <GithubRepo key={user.id} follower={user} />)}
          </Infinite>
        </ul>
    </div>
    );
  }
};

export default Repos;
