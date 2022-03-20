import React from 'react'
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';

const dataSlides = [
  {
    src: 'https://picsum.photos/800/400',
    alt: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'https://picsum.photos/800/400',
    alt: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'https://picsum.photos/800/400',
    alt: 'Slide 3',
    caption: 'Slide 3'
  },
];

export default function Nfts() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slides = dataSlides.map((slide) => {
    return (
      <div key={slide.alt}>
        <img src={slide.src} alt={slide.alt} />
        <p>{slide.caption}</p>
      </div>
    );
  });

  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto'>
          <h1 className='d-inline heading-black text-capitalize border-bottom border-4'>NFTs RPS</h1>
          <p className='lead py-3'>
            Rock, Paper, Scissors is a traditional game that is well known around the world. <br />Our NFTs represent the three factions, <strong>what side will you choose?</strong>
          </p>
          <p className='lead'>
            These NFTs grant you a percentage of all the transactions that take place in our RPS Game, more precisely 1.75% of each transaction. NFT holders will receive their
            rewards via incentivized staking.
          </p>
          <h3>When will you be able to Mint?</h3>
          <p className='lead'>
            The final date is yet to be announced. These NFTs will be released in three waves with a very limited supply. They will be released in the following order:
            ROCK, PAPER and SCISSOR.
          </p>
          <div className='d-flex justify-content-center'>
            <NavLink to="/rps" className='btn btn-warning'>Play RPS NOW!! &nbsp;<i className='fa-solid fa-arrow-right'></i></NavLink>
          </div>
        </div>
      </div>

      <div className='w-50 my-5 mx-auto text-center'>
        <Slider {...settings}>
          {slides}
        </Slider>
      </div>

    </div>
  );
}