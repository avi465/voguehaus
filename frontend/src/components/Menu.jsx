import React from 'react'
import Card from './Card';
import Carousel from './common/Carousel';
import Header from './Header';
import Footer from './Footer';

const Menu = () => {
    return (
        <>
            <Header />
            <section>
                <Carousel />
                <div className="grid grid-cols-card gap-2 items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    {/* <Card />
                    <Card /> */}
                </div>

            </section>
            <Footer />
        </>
    )
}
export default Menu