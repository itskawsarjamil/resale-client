import React from 'react';

const WhyWeStart = () => {
    return (
        <div>
            <section className="  bg-gray-800   text-gray-100">
                <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                    <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
                    <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
                    <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                        <div>
                            <h3 className="font-semibold">Why this initiative</h3>
                            <p className="mt-1   text-gray-400">Showing the world of the importance of conserving sharing.<br />Help to build a better planet through a circular economy</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Why i should sell in this website</h3>
                            <p className="mt-1   text-gray-400">super quick product listing.<br />pickup is on us.<br />secure payment.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Why I should resale books?</h3>
                            <p className="mt-1   text-gray-400">People who trade books for cash can help in protecting the natural resources. This is one of the major benefits of buying and selling used books. Cost effective Used books prove to be a boon for people who lack the financial resources to buy new ones or do not wish to invest in buying fresh copies</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Why I should buy used books?</h3>
                            <p className="mt-1   text-gray-400">The beauty of second-hand shops is the possibility of finding old versions of your favourite books, or first-edition copies. These editions are much more valuable and special that newer versions. a must-have for any book lover! You'll never know what you'll find hidden in a dusty pile of books at a second-hand shop</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyWeStart;