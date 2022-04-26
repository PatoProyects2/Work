import React, { useContext } from 'react'
import MaticLogo from '../../../assets/imgs/matic-logo.png'
import { Button } from 'reactstrap'
import { Context } from '../../../context/Context'
import MetamaskLogo from '../../../assets/imgs/fox.png';
export default function MaticBalance(props) {
    const { balance } = useContext(Context);

    const openMetamask = () => {
        const ouathLink = 'https://metamask.app.link/dapp/rpsgames.club/'
        location.href = ouathLink
    }

    return (
        <>
            {
                (balance !== '') ?
                    <>{props.isMobileResolution ?
                        <>
                            <div className='matic-balance-wrapper-mobile'>
                                <div className='flip-image me-3'>
                                    <div className='flip-image-front'>
                                        <img src={MaticLogo} alt="Matic Amount" width='30' height='30' />
                                    </div>
                                    <div className='flip-image-back'>
                                        <img src={MaticLogo} className='image-reverse' alt="Matic Amount" width='30' height='30' />
                                    </div>
                                </div>
                                <span>{balance}</span>
                            </div>
                        </>
                        :
                        <div className='matic-balance-wrapper'>
                            <div className='flip-image me-3'>
                                <div className='flip-image-front'>
                                    <img src={MaticLogo} alt="Matic Amount" width='30' height='30' />
                                </div>
                                <div className='flip-image-back'>
                                    <img src={MaticLogo} className='image-reverse' alt="Matic Amount" width='30' height='30' />
                                </div>
                            </div>
                            <span>{balance}</span>
                        </div>
                    }
                    </>
                    :
                    <>
                        {props.isMobileResolution &&
                            <div className='d-flex align-items-center gap-2'>
                                <Button onClick={openMetamask} color="warning">
                                    <span>OPEN</span> <img src={MetamaskLogo} className="mb-1" width="20" height="20" alt="fox" />
                                </Button>
                            </div>
                        }
                    </>
            }
        </>
    )
}
