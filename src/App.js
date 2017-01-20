import React, { Component } from "react";
import "bulma";
import fs from "fs";
import ytdl from "ytdl-core";
import _ from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = { url: "", preview: "", busy: false };
  }

  render() {
    const button = this.state.busy ? "button is-loading" : "button";
    return (
      <div className="container" style={{ margin: 10 }}>
        <p className="control has-addons">
          <input
            className="input"
            type="text"
            placeholder="YouTube URL"
            onChange={this.updateUrl.bind(this)}
          />
          <a className={button} onClick={this.downloadCP.bind(this)}>
            🐻 ✊ 💃
          </a>
        </p>
        <figure class="image is-16by9">
          <img src={this.state.preview} />
        </figure>
      </div>
    );
  }

  updateUrl(event) {
    this.setState({ url: event.target.value });
  }

  downloadCP() {
    this.setState({ busy: true });
    ytdl.getInfo(this.state.url, (err, info) => {
      this.setState({ preview: _.get(info, "iurlhq", ""), busy: false });
    });
  }
}

export default App;
