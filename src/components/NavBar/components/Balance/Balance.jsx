import React, { useContext } from 'react'
import { Button } from 'reactstrap'
import { Context } from '../../../../context/Context'
import MaticLogo from '../../../../assets/imgs/matic-logo.png'
import MetamaskLogo from '../../../../assets/imgs/fox.png';

const Balance = (props) => {
    const { balance } = useContext(Context);

    const openMetamask = () => {
        const ouathLink = 'https://metamask.app.link/dapp/rpsgames.club/'
        location.href = ouathLink
    }

    return (
        balance !== '' ?
            <div className={props.isMobileResolution ? 'matic-balance-wrapper-mobile' : 'matic-balance-wrapper'}>
                <div className='flip-image me-3'>
                    <div className='flip-image-front'>
                        <img src={MaticLogo} alt="Matic Amount" width='30' height='30' />
                    </div>
                    <div className='flip-image-back'>
                        <img src={MaticLogo} className='image-reverse' alt="Matic Amount" width='30' height='30' />
                    </div>
                </div>
                <span style={{ color: "white" }}>{balance}</span>
            </div>
            :
            props.isMobileResolution &&
            <div className='d-flex align-items-center gap-2'>
                <Button onClick={openMetamask} color="warning">
                    <span>OPEN</span> <img src={MetamaskLogo} className="mb-1" width="20" height="20" alt="fox" />
                </Button>
            </div>
    )
}

export default Balance;