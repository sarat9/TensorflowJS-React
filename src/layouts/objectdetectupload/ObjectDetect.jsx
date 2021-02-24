import React, { useRef, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';

import * as tf from '@tensorflow/tfjs';
import * as cocoSSD from '@tensorflow-models/coco-ssd';
// import * as BackendCPU from '@tensorflow/tfjs-backend-cpu';
// import * as WebGL from '@tensorflow/tfjs-backend-webgl';
// require('@tensorflow/tfjs-backend-cpu');
// require('@tensorflow/tfjs-backend-webgl');

const ObjectDetect = () => {

    const [selectedFile, setSelectedFile] = React.useState(null);
    const canvasEl = useRef(null)
    const imageEl = useRef(null)

    function onFileChange(event) {
        event.preventDefault()
        // Update the state 
        setSelectedFile(URL.createObjectURL(event.target.files[0]))
    }

    function onFileUpload(event) {
        event.preventDefault()
        predictWithCocoModel(imageEl.current)
    }


    async function predictWithCocoModel(image) {
        console.log('predictWithCocoModel')

        const model = await cocoSSD.load('lite_mobilenet_v2');
        // const model = await cocoSSD.load();
        console.log('coco model loaded with mobilenet data set')

        detectFrame(image, model);

    }

    function detectFrame(image, model) {
        console.log('detect frame')
        model.detect(image).then(predictions => {
            console.log(predictions)
            renderPredictions(predictions);
        })
    }

    function renderPredictions(predictions) {
        console.log(imageEl)
        let video = new HTMLImageElement(imageEl.current)
        // let video = document.getElementById("image")
        let canvas = canvasEl.current
        let ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;
        ctx.font = "16px sans-serif";
        ctx.textBaseline = "top"
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(video, 0, 0, 500, 500)
        predictions.forEach(prediction => {
            const x = prediction.bbox[0];
            const y = prediction.bbox[1];
            const width = prediction.bbox[2];
            const height = prediction.bbox[3];
            // Bounding box
            ctx.strokeStyle = "#00FFFF";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            // Label background
            ctx.fillStyle = "#00FFFF";
            const textWidth = ctx.measureText(prediction.class).width;
            const textHeight = parseInt("16px sans-serif", 10); // base 10
            ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
        });
        predictions.forEach(prediction => {

            const x = prediction.bbox[0];
            const y = prediction.bbox[1];
            ctx.fillStyle = "#000000";
            ctx.fillText(prediction.class, x, y);
        });
    }


    useEffect(() => {
        // predictWithCocoModel()
    }, [])

    return (
        <>
            <div>
                <h1>Tensorflow.js Real Time Object Detection with React</h1>
                <input type="file" onChange={onFileChange} />
                <img hidden id="image" ref={imageEl} src={selectedFile}/>
                <Button onClick={onFileUpload} color="primary" autoFocus>
                    Upload 
                    </Button>
                <canvas ref={canvasEl} id="canvas"></canvas>
            </div>
        </>
    )
}

export default ObjectDetect
