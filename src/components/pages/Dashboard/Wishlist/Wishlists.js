import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import Wishlist from './Wishlist';
import Modal from '../../CategoryBooks/Modal';
import Spinner from '../../Shared/Spinner/Spinner';
import { authContext } from '../../../context/AuthContext/AuthProvider';

const Wishlists = () => {
    const { user } = useContext(authContext);
    const { isLoading, data: books = [] } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/wishlist?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })
    // const [books, setBooks] = useState([]);

    const [sellermail, setSellerMail] = useState('');

    const [orderBook, setOrderBook] = useState(null);

    if (isLoading) {
        return <Spinner />;
    }
    // console.log(books);
    return (
        <div className='p-10 mx-auto w-fit lg:mt-5'>

            {books.length ?
                books.map(book => <Wishlist key={book._id} book={book} setOrderBook={setOrderBook} setSellerMail={setSellerMail}></Wishlist>)
                : ''
            }
            {/* {
                orderBook && <Modal orderBook={orderBook} setOrderBook={setOrderBook} sellermail={sellermail} />
            } */}
        </div>
    );
};

export default Wishlists;