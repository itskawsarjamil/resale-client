import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';
import CategoryBook from './CategoryBook';

const CategoryBooks = () => {
    const navigation = useNavigation();
    const books = useLoaderData();
    // console.log(books);
    if (navigation.state === "loading") {
        return <Spinner />;
    }
    return (
        <div className='p-10 mx-auto w-fit lg:mt-5'>
            {
                books.map(book => <CategoryBook key={book._id} book={book}></CategoryBook>)
            }
        </div>
    );
};

export default CategoryBooks;