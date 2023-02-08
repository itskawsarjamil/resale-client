import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../Shared/Spinner/Spinner';
import { authContext } from '../../context/AuthContext/AuthProvider';
import { toast } from 'react-hot-toast';
const Modal = ({ orderBook, setOrderBook }) => {
    const { book_title, seller_price, seller_email, _id } = orderBook;

    const { user } = useContext(authContext);
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
    const { appVerified, email, name: seller_name } = sellerDetail;
    // console.log(sellerDetail);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const bookTitle = form.bookTitle.value;
        const bookPrice = form.bookPrice.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const orderData = {
            name,
            email,
            bookTitle,
            bookPrice,
            phone,
            location,
            seller_name,
            seller_email,
            product_id: _id
        }
        // console.log(orderData);

        fetch(`http://localhost:5000/orders`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast("order submitted please pay from dashboard or will be canceled");
                }
            })
        setOrderBook(null);
    }



    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">


                    <form onSubmit={handleSubmit}>

                        <input required name='name' type="text" value={user?.displayName} disabled placeholder="Your Name" className="input input-bordered w-full mb-3 " />
                        <input required name='email' value={user?.email} disabled type="email" placeholder="Email Address" className="input input-bordered w-full mb-3 " />
                        <input required name='bookTitle' value={book_title} disabled type="Text" placeholder="book name" className="input input-bordered w-full mb-3 " />
                        <input required name='bookPrice' value={seller_price} disabled type="Text" placeholder="book price" className="input input-bordered w-full mb-3 " />
                        <input name='phone' type="phone" placeholder="Phone Number" className="input input-bordered mb-3 w-full " />
                        <input required name='location' type="Text" placeholder="meeting location" className="input input-bordered w-full mb-3 " />
                        <div className="modal-action">
                            <input htmlFor="my-modal" type="submit" value="submit" className='btn btn-primary  w-1/2' />

                            <button onClick={() => setOrderBook(null)} className='btn btn-secondary w-1/2'>Cancel</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Modal;