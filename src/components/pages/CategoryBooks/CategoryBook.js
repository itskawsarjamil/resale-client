import React from 'react';

const CategoryBook = ({ book }) => {
    const { category_name, book_title, book_img, description, original_price, seller_price, location, post_date, seller_name, used, condition, contact, isVerified } = book;
    return (
        <div className="hero bg-base-200 mb-10">
            <div className="hero-content flex-col md:flex-row">
                <img alt='' src={book_img} className="max-w-sm rounded-lg shadow-2xl" />
                <div className='flex flex-col gap-2'>
                    <h1 className="text-4xl font-bold"> {book_title}</h1>
                    <p className=" text-2xl  font-bold">{seller_name}<span className={isVerified ? `text-green-500 font-bold` : `text-red-500 font-bold`}>{isVerified ? "Y" : "x"}</span></p>
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 px-4'>
                        <p className="">Category: {category_name}</p>
                        <p className="">Original Price: {original_price}</p>
                        <p className="">Seller Price: {seller_price}</p>
                        <p className="">Post Date: {post_date}</p>
                        <p className="">Location: {location}</p>
                        <p className="">Used: {used}</p>
                        <p className="">Condition: {condition}</p>
                        <p className="">Contact: {contact}</p>
                    </div>
                    
                    <p className="">{description}</p>
                    
                    <button className="btn btn-primary mt-4">Buy Now!</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryBook;