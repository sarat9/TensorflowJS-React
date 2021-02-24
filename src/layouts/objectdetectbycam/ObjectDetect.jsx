import React, { useRef, useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import * as cocoSSD from '@tensorflow-models/coco-ssd';
import Grid from '@material-ui/core/Grid';
import { resolve } from '../../../node_modules/url';

// import * as BackendCPU from '@tensorflow/tfjs-backend-cpu';
// import * as WebGL from '@tensorflow/tfjs-backend-webgl';
// require('@tensorflow/tfjs-backend-cpu');
// require('@tensorflow/tfjs-backend-webgl');

const ObjectDetect = () => {

    const videoEl = useRef(null)
    const canvasEl = useRef(null)
    const [isLoading, setLoading] = useState(true);

    function webcam_init() {
        console.log('webcam_init')

        return navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: { facingMode: "user" }
            })
            .then(stream => {
                let video = videoEl.current
                console.log('video',video)
                video.srcObject = stream
                video.onloadedmetadata = () => {
                    video.play();
                    resolve()
                }
            });
    }

    async function predictWithCocoModel() {
        console.log('predictWithCocoModel')

        let video = videoEl.current
        const model = await cocoSSD.load('lite_mobilenet_v2');
        setLoading(false)
        // const model = await cocoSSD.load();
        console.log('coco model loaded with mobilenet data set')

        detectFrame(video, model);

    }

    function detectFrame(video, model) {
        console.log('detect frame')
        try {
            model.detect(video).then(predictions => {
                console.log(predictions)
                renderPredictions(predictions);
                requestAnimationFrame(() => {
                    detectFrame(video, model);
                });
            })
        } catch (error) {
            console.log(error)
            detectFrame(video, model);
        }

    }

    function renderPredictions(predictions) {
        let video = videoEl.current
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
        webcam_init().then(()=>{
            predictWithCocoModel()
        })
    }, [])

    return (
        <>
            <div>
                <Grid container spacing={2}>
                    <h1>Tensorflow.js Real Time Object Detection with React</h1>
                    <Grid item md={6} sm={6} xs={12}>
                        <video ref={videoEl} id="vid" width="500" height="500"></video>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        {isLoading&&<>Loading Tensorflow Model</>}
                        <canvas ref={canvasEl} id="canvas"></canvas>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ObjectDetect
