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
            const res = await fetch(`http://localhost:5000/books?email=${user.email}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />;
    }
    const handleOffAdvertise = (id) => {
        fetch(`http://localhost:5000/offadv/${id}`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
            }

        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success("product has been removed from advertised");
                    refetch();
                }
            })
    }
    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/adv/${id}`, {
            method: "POST",
            headers: {
                'content-type': "application/json",

            }

        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success("product has been added to advertised");
                    refetch();
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
                        handleOffAdvertise={handleOffAdvertise}
                    >
                    </Product>)
                }
            </div>

        </div>
    );
};

export default MyProducts;
