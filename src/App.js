import React, { Component } from "react";
import "bulma";
import fs from "fs";
import ytdl from "ytdl-core";
import _ from "lodash";
import "react-image-gallery/styles/scss/image-gallery-no-icon.scss";
import ImageGallery from "react-image-gallery";

class App extends Component {
  constructor() {
    super();
    this.state = { url: "", busy: false, images: [] };
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
        <ImageGallery
          items={this.state.images}
          renderItem={this.renderVideo.bind(this)}
        />
      </div>
    );
  }

  updateUrl(event) {
    this.setState({ url: event.target.value });
  }

  downloadCP() {
    this.setState({ busy: true });
    ytdl.getInfo(this.state.url, (err, info) => {
      const original = _.get(info, "iurlmaxres", "");
      const thumbnail = _.get(info, "iurlhq", "");
      const url = this.state.url;
      const path = original.replace(/[/:]/g, "") + ".mp4";
      const images = _.uniqBy(
        [ ...this.state.images, { original, thumbnail, path, url } ],
        "original"
      );

      ytdl
        .downloadFromInfo(info, { format: "mp4" })
        .pipe(fs.createWriteStream(path));
      this.setState({ images, busy: false });
    });
  }

  renderVideo(video) {
    return <video src={video.path} controls />;
  }
}

export default App;
