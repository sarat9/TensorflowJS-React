import React from 'react';
//import COCO-SSD model as cocoSSD
import * as cocoSSD from '@tensorflow-models/coco-ssd';
// import * as tf from '@tensorflow/tfjs';


class ObjectDetect extends React.Component {

  componentDidMount(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width  = 500;
    this.canvas.height = 500;
    this.font = "16px sans-serif";
    this.ctx.font = this.font;
    this.ctx.textBaseline = "top"
    this.webcam_init();
    this.predictWithCocoModel();
  }

  webcam_init(){
    this.video = document.getElementById("vid");
    navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {facingMode: "user"}
    })
    .then(stream => {
      this.video.srcObject = stream
      this.video.onloadedmetadata = () => {
        this.video.play();
      }
    });
  }

  predictWithCocoModel(){
    (async () => {
      const model = await cocoSSD.load('lite_mobilenet_v2');
      console.log('loaded')

      this.detectFrame(this.video,model);
    })()
  }

   detectFrame(video, model){
    model.detect(video).then(predictions => {
      console.log('predictions',predictions)
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);});
      })
    }
    sarat(){
      console.log('s')
      console.log('s')
      console.log('s')
    }

    renderPredictions(predictions){
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.drawImage(this.video,0, 0,500,500)
      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Bounding box
        this.ctx.strokeStyle = "#00FFFF";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);
        // Label background
        this.ctx.fillStyle = "#00FFFF";
        const textWidth = this.ctx.measureText(prediction.class).width;
        const textHeight = parseInt(this.font, 10); // base 10
        this.ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });
      predictions.forEach(prediction => {

        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(prediction.class, x, y);});
      }

      render() {
        return (
          <div style={{textAlign:"center"}}>
          <h1>Tensorflow.js Real Time Object Detection with React</h1>
          <video  id="vid" width="500" height="500"></video>
          <canvas id="canvas"></canvas>
          </div>
        );
      }
    }

    export default ObjectDetect;