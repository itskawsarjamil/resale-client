import React, { useContext } from 'react';
import Spinner from '../Shared/Spinner/Spinner';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { authContext } from '../../context/AuthContext/AuthProvider';

const CategoryBook = ({ book, setOrderBook, setSellerMail }) => {

    const { user } = useContext(authContext);

    const { category_name, book_title, book_img, description, original_price, seller_price, location, post_date, seller_name, used, condition, contact, isVerified, seller_email } = book;
    // console.log(book);
    const { isLoading, data: sellerDetail = {} } = useQuery({
        queryKey: ['sellerdetail'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellerDetail?email=${seller_email}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />;
    }
    const { appVerified, name } = sellerDetail;
    // console.log(sellerDetail);

    const handleClick = () => {

        setOrderBook(book);
        setSellerMail(seller_email);
    }

    const handleWishList = () => {
        const data = {
            email: user.email
        }

        fetch(`http://localhost:5000/wishlist/${book._id}`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("added to wishlist");
                }
            })
        // console.log(book._id);
    }
    return (
        <div className="hero bg-base-200 mb-10">
            <div className="hero-content flex-col md:flex-row">
                <img alt='' src={book_img} className="max-w-xs rounded-lg shadow-2xl" />
                <div className='flex flex-col gap-2'>
                    <h1 className="text-4xl font-bold"> {book_title}</h1>
                    <p className=" text-2xl  font-bold">{name}<span className={appVerified ? `text-green-500 font-bold` : `text-red-500 font-bold`}>{isVerified ? "Y" : "x"}</span></p>
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 px-4'>
                        <p className="">Category: <span className='font-bold'>{category_name}</span></p>
                        <p className="">Original Price: <span className='font-bold'>{original_price}</span></p>
                        <p className="">Seller Price: <span className='font-bold'>{seller_price}</span></p>
                        <p className="">Post Date: <span className='font-bold'>{post_date}</span></p>
                        <p className="">Location: <span className='font-bold'>{location}</span></p>
                        <p className="">Used: <span className='font-bold'>{used}</span></p>
                        <p className="">Condition: <span className='font-bold'>{condition}</span></p>
                        <p className="">Contact: <span className='font-bold'>{contact}</span></p>
                    </div>

                    <p className="">{description}</p>

                    <div className='flex w-full gap-2'>
                        <label onClick={() => {
                            setOrderBook(book);
                            setSellerMail(seller_email);
                        }} htmlFor="my-modal" className="btn btn-primary mt-4">Buy Now!</label>
                        <button onClick={() => handleWishList()} htmlFor="my-modal" className="btn btn-accent mt-4">wishlist</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryBook;