import React, { useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CategoryBook from './CategoryBook';
import Modal from './Modal';
import Spinner from '../Shared/Spinner/Spinner';


const CategoryBooks = () => {
    const navigation = useNavigation();
    const data = useLoaderData();
    const [books, setBooks] = useState(data);

    const [sellermail, setSellerMail] = useState('');

    const [orderBook, setOrderBook] = useState(null);

    if (navigation.state === "loading") {
        return <Spinner />;
    }
    return (
        <div className='p-10 mx-auto w-fit lg:mt-5'>
            {
                books.map(book => <CategoryBook key={book._id} book={book} setOrderBook={setOrderBook} setSellerMail={setSellerMail}></CategoryBook>)
            }
            {
                orderBook && <Modal orderBook={orderBook} setOrderBook={setOrderBook} sellermail={sellermail} />
            }
        </div>
    );
};

export default CategoryBooks;