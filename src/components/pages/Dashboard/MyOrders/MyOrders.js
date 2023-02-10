import { useContext } from "react";
import { authContext } from "../../../context/AuthContext/AuthProvider";
import { useQuery } from "react-query";
import Spinner from "../../Shared/Spinner/Spinner";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";


const MyOrders = () => {
    useTitle("My Orders")
    const { user } = useContext(authContext)
    // console.log(user);
    const { data: myOrders = [], isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-murex.vercel.app/orders?email=${user.email}`, {
                headers: {
                    // authorization: `bearer ${localStorage.getItem('usePhonsToken')}`
                }
            });
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />;
    }
    // console.log(myOrders);
    return (
        <div className=' mb-36 min-h-screen bg-white text-black'>
            <h2 className="text-3xl text-center bg-white text-black py-6">Total Order: {myOrders?.length}</h2>
            <div className="bg-white text-black">
                <table className="table w-full bg-white text-black">
                    <thead className=" text-white">
                        <tr className="mr-6 text-white">
                            <th></th>
                            <th>Product Name</th>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Meeting Location</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {myOrders?.length &&
                            myOrders.map((order, i) => <tr
                                key={order._id}
                                className="hover  text-white"
                            >
                                <th>{i + 1}</th>
                                <td>{order.bookTitle}</td>
                                <td>{order.seller_name}</td>
                                <td>{order.seller_email}</td>
                                <td>{order.location}</td>
                                <td>{order.bookPrice}</td>
                                <td>
                                    {
                                        order.bookPrice && !order.paid && <Link
                                            to={`/dashboard/payment/${order._id}`}
                                        >
                                            <button
                                                className='btn btn-primary  bg-blue-400'
                                            >Pay</button>
                                        </Link>
                                    }
                                    {
                                        order.bookPrice && order.paid && <span className='text-green-500'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;