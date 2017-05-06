import React, {Component} from 'react';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

class Followers extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      loading: false,
      followers: []
    };
  }

  fetchData = () => {
    let {page, loading, followers} = this.state;

    this.setState({
      loading: true
    })


    fetch(`https://api.github.com/users/${this.props.params.username}/followers?page=${page}&per_page=50`)
    .then(response => response.json())
    .then(
        followers => {
            // How can we use `this` inside a callback without binding it??
            // Make sure you understand this fundamental difference with arrow functions!!!
            this.setState({
                followers: followers.concat(followers),
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
    let {followers, loading, page} = this.state;

    if (!followers) {
      return <div>LOADING FOLLOWERS...</div>
    }

    return (
      <div className="followers-page">
        <h2>Followers of {this.props.params.username}</h2>
        <ul className="list-followers">
          <Infinite
            className="infinite__container"
            isInfiniteLoading={loading}
            onInfiniteLoad={this.fetchData}
            useWindowAsScrollContainer
            elementHeight={50}
            infiniteLoadBeginEdgeOffset={100}
            >
          {followers.map((follower) => <GithubUser key={follower.id} follower={follower} />)}
          </Infinite>
        </ul>
      </div>
    );
  }
};

export default Followers;
