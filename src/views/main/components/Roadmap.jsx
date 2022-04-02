import React, { useState } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { ProgressBar, Step } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css"

const dataStep = [
    {
        label: "The Beginning",
        list: [
            { text: ["Discord", "Twitter"], links: ["https://discord.gg/AM65VtvP2Q", "https://twitter.com/RPSGamesClub"] },
            { text: ["Website & Gameplay (Polygon)"] }
        ]
    },
    {
        label: 'Welcome SOLANA',
        list: [
            { text: ["Multichain Gameplay (Solana)"] },
            { text: ["Solana NFTs"] },
        ]
    },
    {
        label: 'Multichain Project',
        list: [
            { text: ["Ronin (Gameplay)"] },
            { text: ["Polkadot (Gameplay)"] },
            { text: ["Binance Smart Chain (Gameplay)"] },
        ]
    },
    {
        label: 'More than RPS',
        list: [
            { text: ["Welcome Games Club"] },
            { text: ["New gameplay"] },
        ]
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
                        {dataStep[step].label}
                    </CardTitle>

                    <ul>
                        {dataStep[step].list.map((item, i) => {
                            if (item.links) {
                                return <li key={`li-${i}`}>
                                    {
                                        item.text.map((txt, j) => {
                                            if (j < item.text.length - 1) {
                                                return <span key={`link-${j}`}><i className="fa-solid fa-hashtag"></i>&nbsp;<a className="roadmap-link" href={item.links[j]} target="_blank" rel="noopener noreferrer">{txt}</a> & </span>
                                            } else {
                                                return <a className="roadmap-link" key={`link-${j}`} href={item.links[j]} target="_blank" rel="noopener noreferrer">{txt}</a>
                                            }
                                        })
                                    }
                                </li>
                            } else {
                                return <li key={`li-${i}`}>
                                    {
                                        item.text.map((txt, j) => {
                                            return <span key={`txt-${j}`}><i className="fa-solid fa-hashtag"></i>&nbsp;{txt}</span>
                                        })
                                    }
                                </li>
                            }
                        })}
                    </ul>
                </CardBody>
            </Card>

            <div className='text-end'>
                <button className='btn btn-transparent' onClick={prevStep}>
                    <i className={`fa-solid fa-angle-left ${step === 0 ? 'arrow-default' : 'arrow-highlight'}`} />
                </button>
                <button className='btn btn-transparent' onClick={nextStep}>
                    <i className={`fa-solid fa-angle-right ${step < (dataStep.length - 1) ? 'arrow-highlight' : 'arrow-default'}`} />
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