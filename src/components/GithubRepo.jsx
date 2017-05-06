import React from 'react';

const GithubRepo = (props) => {
  return (
      <a href={props.follower.html_url} className="github-repo" target="_blank">
        <span>{props.follower.full_name}</span>
        <span className="stargazers-count">{props.follower.stargazers_count}<p>&#9733;</p></span>
      </a>
  )
}

export default GithubRepo;
