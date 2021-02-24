import React, { useRef, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';

import * as tf from '@tensorflow/tfjs';
// const toxicity = require('@tensorflow-models/toxicity');
import * as toxicity from '@tensorflow-models/toxicity';


const TextToxicity = () => {

    function handleSubmit(event) {
        event.preventDefault()
        predictToxicity()
    }


    async function predictToxicity() {
        console.log('predictToxicity')
        // The minimum prediction confidence.
        const threshold = 0.9;
        toxicity.load(threshold).then(model => {
            const sentences = ['You are so stupid'];
            model.classify(sentences).then(predictions => {
                // `predictions` is an array of objects, one for each prediction head,
                // that contains the raw probabilities for each input along with the
                // final prediction in `match` (either `true` or `false`).
                // If neither prediction exceeds the threshold, `match` is `null`.

                console.log(predictions);
            })
        })
    }



    useEffect(() => {
    }, [])

    return (
        <>
            <div>
                <h1>Tensorflow.js Text Toxicity with React</h1>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Check
                </Button>
            </div>
        </>
    )
}

export default TextToxicity
