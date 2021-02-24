import React, { useRef, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';


const BodySegmentation = () => {

    const videoEl = useRef(null)
    const canvasEl = useRef(null)
    const canvasElPersonOnBG = useRef(null)
    const canvasElPersonWithoutBG = useRef(null)

    const sampleBackGroundImageEl = useRef(getImageFileFromURL('https://github.githubassets.com/images/modules/explore/social.jpg'))

    function getImageFileFromURL(url) {
        var myImg = new Image();
        myImg.src = url;
        myImg.width = "640"
        myImg.crossOrigin = "Anonymous";

        myImg.height = "480"
        return myImg;
    }

    function webcam_init() {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: { facingMode: "user" }
            })
            .then(stream => {
                let video = videoEl.current
                video.srcObject = stream
                video.onloadedmetadata = () => {
                    video.play();
                }
            });
    }

    async function predictWithBodyPixModel() {
        console.log('predictWithBodyPixModel')

        let video = videoEl.current
        const model = await bodyPix.load();
        console.log('loaded body pix data set')
        detectFrame(video, model);
    }

    function detectFrame(video, model) {
        console.log('detect frame')
        try {
            let params = {

            }
            model.segmentPerson(video).then(predictions => {
                console.log(predictions)
                overlayPersonOnBackgroundImage(predictions)
                overlayPersonWithoutBG(predictions)
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
        let sampleBackGroundImage = sampleBackGroundImageEl.current
        // Convert the segmentation into a mask to darken the background.
        const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
        const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };
        const coloredPartImage = bodyPix.toMask(predictions, foregroundColor, backgroundColor);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 2;
        let ctx = canvas.getContext("2d");
        ctx.font = "16px sans-serif";
        ctx.textBaseline = "top"

        bodyPix.drawMask(
            canvas, video, coloredPartImage, opacity, maskBlurAmount,
            flipHorizontal);


        // const backgroundBlurAmount = 3;
        // const edgeBlurAmount = 3;
        // bodyPix.drawBokehEffect(
        //     canvas, video, predictions, backgroundBlurAmount,
        //     edgeBlurAmount, flipHorizontal);
    }


    // ------ overlayPersonOnBackgroundImage --------
    function overlayPersonOnBackgroundImage(personSegmentation) {
        let video = videoEl.current
        let canvas = canvasElPersonOnBG.current
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 640, 480);
        var imageData = ctx.getImageData(0, 0, 640, 480);
        var pixel = imageData.data;
        for (var p = 0; p < pixel.length; p += 4) {
            if (personSegmentation.data[p / 4] == 0) {
                pixel[p + 3] = 0;
            }
        }
        ctx.imageSmoothingEnabled = true;
        ctx.putImageData(imageData, 0, 0);
    }

    function overlayPersonWithoutBG(personSegmentation) {
        let video = videoEl.current
        let canvas = canvasElPersonWithoutBG.current
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 640, 480);
        var imageData = ctx.getImageData(0, 0, 640, 480);
        var pixel = imageData.data;
        for (var p = 0; p < pixel.length; p += 4) {
            if (personSegmentation.data[p / 4] == 0) {
                pixel[p + 3] = 0;
            }
        }
        ctx.imageSmoothingEnabled = true;
        ctx.putImageData(imageData, 0, 0);
    }



    //--------- END  -----------

    useEffect(() => {
        webcam_init()
        setTimeout(() => {
            predictWithBodyPixModel()
        }, 2000)
    }, [])

    return (
        <>
            <div>
                <h1>Tensorflow.js Real Time Body Segmentation with React</h1>
                <video ref={videoEl} id="vid" width="640px" height="480px" ></video>
                
                <canvas ref={canvasEl} id="canvas"></canvas>

                <canvas ref={canvasElPersonWithoutBG} id="canvasElPersonWithoutBG" width="640px" height="480px"></canvas>

                <div>
                    <img id="image" src={'https://github.githubassets.com/images/modules/explore/social.jpg'} crossOrigin="Anonymous" width="640px" height="480px" />
                    <canvas
                        ref={canvasElPersonOnBG}
                        id="canvasPersonOnBG"
                        width="640px"
                        height="480px"
                        style={{position:'absolute', left:'0px'}}
                    />
                </div>

            </div>
        </>
    )
}

export default BodySegmentation
