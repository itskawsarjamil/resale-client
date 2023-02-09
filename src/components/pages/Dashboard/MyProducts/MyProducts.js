import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';
import Product from './Product';
import { authContext } from '../../../context/AuthContext/AuthProvider';
import { toast } from 'react-hot-toast';

const MyProducts = () => {
    const { user } = useContext(authContext);
    const { isLoading, data: Products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/books?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />;
    }
    const handleAdvertise = (id) => {
        fetch(``, {
            method: "POST",
            headers: {
                'content-type': "application/json",
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("product has been added to advertised");
                }
            })
    }
    // product delete handler
    const handleDeleteProduct = (_id) => {
        fetch(`http://localhost:5000/deletebook/${_id}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("product delete successfull");
                    refetch();
                }
            })



    }
    // console.log(Products);
    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14'>
            <h1 className='text-center text-4xl mt-8 py-4'>Total Products: {Products?.length}</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-20  mx-9 lg:mx-0'>
                {Products?.length &&
                    Products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleDeleteProduct={handleDeleteProduct}
                        handleAdvertise={handleAdvertise}
                    >
                    </Product>)
                }
            </div>

        </div>
    );
};

export default MyProducts;
