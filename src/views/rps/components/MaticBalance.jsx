import React, { useContext } from 'react'
import MaticLogo from '../../../assets/imgs/matic-logo.png'
import { Context } from '../../../context/Context'
import MetamaskLogo from '../../../assets/imgs/fox.png';
export default function MaticBalance(props) {
    const { balance } = useContext(Context);

    return (
        <>
            {
                (balance !== '') ?
                    <div className='matic-balance-wrapper'>
                        <div className='flip-image me-3'>
                            <div className='flip-image-front'>
                                <img src={MaticLogo} alt="Matic Amount" width='30' height='30' />
                            </div>
                            <div className='flip-image-back'>
                                <img src={MaticLogo} className='image-reverse' alt="Matic Amount" width='30' height='30' />
                            </div>
                        </div>
                        <span>{(balance / 1000000000000000000).toFixed(3)}</span>
                    </div>
                    :
                    <>
                        {props.isMobileResolution &&
                            <a href="https://metamask.app.link/dapp/rpsgames.vercel.app/" target="_blank" rel="noopener noreferrer">
                                <img src={MetamaskLogo} width="25" height="25" alt="" />
                                <span>MOBILE APP</span>
                            </a>
                        }
                    </>
            }
        </>
    )
}
