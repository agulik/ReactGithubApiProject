import React from 'react';
import {Link} from 'react-router';

const GithubUser = (props) => {
  return (
      <Link to={`/user/${props.follower.login}`} className="github-user">
        <img src={props.follower.avatar_url} alt=""/>
        <span>{props.follower.login}</span>
      </Link>
  )
}

export default GithubUser;
