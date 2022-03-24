import React, { useContext } from 'react'
import MaticLogo from '../../../assets/imgs/matic-logo.png'
import { BalanceContext } from '../../../context/BalanceContext'


export default function MaticBalance() {

    const { balance } = useContext(BalanceContext);

    return (
        <>
            {
                (balance >= 0) &&
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
            }
        </>
    )
}
