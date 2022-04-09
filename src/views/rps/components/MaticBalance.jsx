import React, { useContext } from 'react'
import MaticLogo from '../../../assets/imgs/matic-logo.png'
import { Button } from 'reactstrap'
import { Context } from '../../../context/Context'
import MetamaskLogo from '../../../assets/imgs/fox.png';
export default function MaticBalance(props) {
    const { balance } = useContext(Context);

    const openMetamask = () => {
        const ouathLink = 'https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Faaa7-81-32-7-32.ngrok.io%2F&response_type=code&scope=email%20identify'
        location.href = ouathLink
    }

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
                            <Button onClick={openMetamask} color="danger">
                               OPEN APP
                            </Button>
                        }
                    </>
            }
        </>
    )
}
