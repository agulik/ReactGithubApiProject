import React, {Component} from 'react';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

class Followings extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      loading: false,
      followers: []};
  }

  fetchData = () => {

    let {page, loading, followings} = this.state;

    this.setState({
      loading: true
    })

    fetch(`https://api.github.com/users/${this.props.params.username}/following?page=${page}&per_page=50`)
    .then(response => response.json())
    .then(
        followings => {
            // How can we use `this` inside a callback without binding it??
            // Make sure you understand this fundamental difference with arrow functions!!!
            this.setState({
                followings: followings.concat(followings),
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
    let {followings, loading, page} = this.state;

    if (!followings) {
      return <div>LOADING FOLLOWINGS...</div>
    }

    return (
      <div className="followers-page">
        <h2>Followings of {this.props.params.username}</h2>
        <ul className="list-followers">
          <Infinite
            className="infinite__container"
            isInfiniteLoading={loading}
            onInfiniteLoad={this.fetchData}
            useWindowAsScrollContainer
            elementHeight={50}
            infiniteLoadBeginEdgeOffset={100}
            >
          {followings.map((user) => <GithubUser key={user.id} follower={user} />)}
          </Infinite>
        </ul>
    </div>
    );
  }
};

export default Followings;
