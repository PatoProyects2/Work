import NFTCard from '../../../../../assets/imgs/nft_hover_card.png'
import RPSGameCard from '../../../../../assets/imgs/animation.gif'
import LogoCard from '../../../../../assets/imgs/Games_Club.png'
import SecurityCard from '../../../../../assets/imgs/security_card.png'
import ComingSoonCard from '../../../../../assets/imgs/coming_soon_hover_card.png'

export const roadmapData = [
    {
        title: "RPS GAMES CLUB",
        text: "We are building a fairplay games ecosystem, where players feel comfortable thanks to our public and audited smart contracts. We operate with an off-chain service powered by Chainlink which ensures the randomness of the results and prevents the system from being exploited and hacked.",
        img: {LogoCard},
        imgStyles: "sm-image"
    },
    {
        title: "Web Development",
        text: "We decided to show our interface and that the game runs smoothly before our marketing campaign and sales. In our opinion, the NFT community needs to receive before giving away, this way we ensure our holders the correct functionality of our resources.",
        img: {ComingSoonCard}
    },
    {
        title: "Security",
        text: "The security of our holders is of paramount importance to us, therefore we are implementing all the safety measures to protect our holders and the community wallets.",
        img: {SecurityCard}
    },
    {
        title: "RPS GAME",
        text: "RPS stands for Rock, Paper, Scissors, a traditional game that we have decided to bring back thanks to the power of Web3 development. You have an unbiased 50% chance of winning, we do not contemplate draws. What side will you choose?",
        img: {RPSGameCard}
    },
    {
        title: "NFTs",
        text: "Our NFTs goal is to reward our holders via an incentivized staking, holders will receive 2.5% of the total volume of the RPS game. Additionally, we have a low entry price (TBA). What are you waiting for?",
        img: {NFTCard}
    }
];