import React from 'react'
import PropTypes from 'prop-types'
import CarouselMaker from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CardSmall } from '../Card';
import data from '../../data/cardData'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        partialVisibilityGutter: 30
    }
}

const Carousel = props => {
    return (
        <div className="App">
            <div className='h-fit py-4 px-6 bg-green-50'>
                <CarouselMaker responsive={responsive}>
                    {data && data.map((item) => <CardSmall key={item.id} image={item.image} />)}
                </CarouselMaker>
            </div>
        </div>
    )
}

Carousel.propTypes = {}

export default Carousel