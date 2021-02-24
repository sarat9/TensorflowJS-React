import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HomeLayout from './home/HomeLayout'

import ObjectDetectionByCam from './objectdetectbycam/ObjectDetect.jsx'
import ObjectDetectionUpload from './objectdetectupload/ObjectDetect.jsx'
import ImageClassification from './imageclassification/ImageClassification'
import BodySegmentation from './bodysegmentation/BodySegmentation'
import TextToxicity from './texttoxicity/TextToxicity'


const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/objectdetectbycam' component={ObjectDetectionByCam} />
          <Route exact path='/objectdetectupload' component={ObjectDetectionUpload} />
          <Route exact path='/imageclassification' component={ImageClassification} />
          <Route exact path='/bodysegmentation' component={BodySegmentation} />
          <Route exact path='/texttoxicity' component={TextToxicity} />
          <Route path='/' component={HomeLayout} />
        </Switch>
      </Router>
    </>
  )
}

export default App
