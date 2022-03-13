import React, { useState } from 'react'
import { ProgressBar, Step } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css"
import { Button, Card, CardBody, CardSubtitle, CardTitle, CardText } from 'reactstrap'

const dataStep = [
    {
        label: 'Label 1',
        title: "Title 1",
        subTitle: "Subtitle 1",
        text: "Some quick example text to buid on card"
    },
    {
        label: 'Label 2',
        title: "Title 2",
        subTitle: "Subtitle 2",
        text: "Some quick example text to buid on card"
    },
    {
        label: 'Label 3',
        title: "Title 3",
        subTitle: "Subtitle 3",
        text: "Some quick example text to buid on card"
    },
    {
        label: 'Label 4',
        title: "Title 4",
        subTitle: "Subtitle 4",
        text: "Some quick example text to buid on card"
    }
];

const transitionStyles = {
    entering: { transform: "scale(1.5)" },
    entered: { transform: "scale(1)" },
    exiting: { transform: "scale(1.5)" },
    exited: { transform: "scale(1)" }
  };

const Roadmap = () => {
    const [percent, setPercent] = useState(0);
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < dataStep.length - 1) {
            setPercent((step * 100 + 100) / (dataStep.length - 1));
            setStep(step + 1);
        }
    }

    const prevStep = () => {
        if (step > 0) {
            setPercent((step * 100 - 100) / (dataStep.length - 1));
            setStep(step - 1);
        }
    }    

    return (
        <div className="roadmap">
            <h3 className='heading-black text-capitalize text-center my-5'>Roadmap</h3>
            <ProgressBar
                percent={percent}
                className='roadmap-pb'
                // filledBackground="#bbbbbb"
                height="5px">

                {
                    dataStep.map((data, i) => {
                        return <Step key={`roadmap-label-${i}`} >
                            {
                                ({ accomplished, transitionState, position }) => (
                                    <div
                                        style={transitionStyles[transitionState]} 
                                        className={`indexedStep ${accomplished ? 'accomplished' : ''} ${percent === position ? 'current' : ''}`}>
                                        {percent > position ? <i className='fa-solid fa-check' /> : ''}
                                        <p className={`roadmap-label ${accomplished ? 'accomplished' : ''}`}>{data.label}</p>
                                    </div>
                                )
                            }
                        </Step>
                    })
                }

            </ProgressBar>            

            <Card className='mt-5 roadmap-card'>
                <CardBody>
                    <CardTitle tag="h5">
                        { dataStep[step].title }
                    </CardTitle>
                    <CardSubtitle
                        className='mb-2 text-muted'
                        tag="h6">
                        { dataStep[step].subTitle }
                    </CardSubtitle>
                    <CardText>
                        { dataStep[step].text }
                    </CardText>
                    <Button>
                        Button
                    </Button>
                </CardBody>
            </Card>

            <div className='text-end'>
                <button className='btn btn-transparent' onClick={prevStep}>
                    <i className={`fa-solid fa-angle-left ${ step === 0 ? 'arrow-default' : 'arrow-highlight'}`}/>
                </button>
                <button className='btn btn-transparent' onClick={nextStep}>
                    <i className={`fa-solid fa-angle-right ${ step < (dataStep.length - 1) ? 'arrow-highlight': 'arrow-default'}`}/>
                </button>
                {/* <Button color='secondary' onClick={prevStep}>
                    <i className='fa-solid fa-arrow-left'></i>&nbsp;Back
                </Button>

                <Button color='primary' onClick={nextStep}>
                    Next&nbsp;<i className='fa-solid fa-arrow-right'></i>
                </Button> */}
            </div>
        </div>
    );
}

export default Roadmap