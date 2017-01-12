import React from 'react'
import 'bulma'
import fs from 'fs'
import ytdl from 'ytdl-core'

ytdl.getInfo(
  'http://www.youtube.com/watch?v=A02s8omM_hI',
  (err, info) => {
    console.log(info)
  })

const App = () =>
  <div className="container" style={{margin: 10}}>
    <p className="control has-addons">
      <input className="input" type="text" placeholder="YouTube URL" />
      <a className="button">
        🐻 ✊ 💃
      </a>
    </p>
  </div>

export default App
