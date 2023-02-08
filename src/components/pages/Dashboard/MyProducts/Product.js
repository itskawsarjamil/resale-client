import React, { useContext } from 'react';
import { FaCheckCircle, FaUser } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { authContext } from '../../../context/AuthContext/AuthProvider';
import { useQuery } from 'react-query';



const Product = ({ product }) => {
    // const { , booked,time, advertise } = product;
    const { user } = useContext(authContext);
    const { book_img, _id, book_title, seller_email, seller_price, used, original_price, location, condition, description,post_date,post_time } = product;
    const { displayName, photoURL, } = user;
    // console.log(user);
    // console.log(product);

    const {  data: userDetail = [] } = useQuery({
        queryKey: ["userDetail"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellerDetail?email=${seller_email}`);
            const data = await res.json();
            return data;
        }
    })
    const { appVerified } = userDetail;
    return (
        <div>
            <div className="card bg-base-100 border shadow-xl" >

                <PhotoProvider >
                    <PhotoView src={book_img}>
                        <figure>
                            <img className='w-full h-64' src={book_img} alt="Shoes" />
                        </figure>
                    </PhotoView>
                </PhotoProvider>

                <div className="card-body bg-white text-black">
                    <div className='flex items-center'>
                        <div className="avatar">
                            <div className="w-8 rounded-full ring ring-primary">
                                {
                                    photoURL ?
                                        <img src={photoURL} alt='' />
                                        :
                                        <p className='text-4xl'><FaUser /></p>
                                }
                            </div>
                            {
                                appVerified && <p className='-ml-1 text-blue-700'><FaCheckCircle></FaCheckCircle></p>
                            }

                        </div>
                        <h4 className='text-xl font-bold ml-1'>{displayName}</h4>
                    </div>
                    <p><small>{post_date}({post_time}) </small></p>
                    <h2 className="card-title">
                        {book_title}
                    </h2>
                    <p className='font-semibold'>Location: {location}</p>
                    <p className='font-semibold'>Condition: {condition}</p>
                    <p className='font-semibold'>Purchase Year: {used}</p>
                    <p>{description.slice(0, 97
                    )}...</p>
                    <div>
                        <h4 className="card-title">Resale Price:<span style={{ color: 'darkorange' }}>{seller_price} TK</span></h4>
                        <h4 className="card-title">Original Price: {original_price} TK</h4>
                    </div>
                    {/* <div className="card-actions justify-between">
                        {
                            booked ?
                                <button
                                    className="badge badge-outline bg-green-500 px-5 text-white hover:shadow-green-500 hover:shadow-md">
                                    Sold
                                </button>
                                :
                                <>{
                                    advertise ?
                                        <button
                                            className="badge badge-outline px-5 text-red-500 hover:shadow-secondary hover:shadow-md">
                                            Off Advertise
                                        </button>
                                        :
                                        <button
                                            // onClick={() => handleAdvertise(_id)}
                                            className="badge badge-outline px-5 text-blue-900 hover:shadow-secondary hover:shadow-md">
                                            Advertise
                                        </button>
                                }</>

                        }
                        <label
                            htmlFor="confirmation-modal"
                            // onClick={() => setDeletingProduct(product)}
                            className="badge badge-outline px-5 text-blue-900 hover:shadow-secondary hover:shadow-md"
                        >Delete</label>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Product;