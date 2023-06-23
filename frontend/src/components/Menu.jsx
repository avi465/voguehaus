import React from 'react'
import Card from './Card';
import Carousel from './common/Carousel';

const Menu = () => {
    return (
        <>
            <section>
                <Carousel />
                <div className="grid grid-cols-card gap-2 items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <Card />
                    <Card />
                </div>

            </section>
        </>
    )
}
export default Menu