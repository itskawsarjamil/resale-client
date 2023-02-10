import { useQuery } from "react-query";
import Spinner from "../../../Shared/Spinner/Spinner";
import { async } from "@firebase/util";

const AllSellers = () => {
    const { data: Sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/sellers', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    const handleVerify = (email) => {
        fetch(`http://localhost:5000/sellerverify?mail=${email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })

    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className='mb-36'>
            <h2 className="text-3xl text-center bg-slate-900 text-white py-6">Total Seller: {Sellers?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Sellers?.length ?
                            Sellers.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>

                                    <div className="avatar">
                                        <div className="w-11 rounded-full hover:shadow-md hover:shadow-primary">
                                            <img src={seller.img} alt='' />
                                        </div>
                                    </div>

                                </td>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {
                                        seller.appVerified ?
                                            <label
                                                className="text-green-500"
                                            >
                                                Verified </label>
                                            :

                                            <div
                                                onClick={() => handleVerify(seller.email)}
                                                className="btn btn-sm btn-primary bg-gradient-to-r from-primary to-secondary text-white hover:shadow-secondary hover:shadow-md"
                                            >
                                                Verify</div>
                                    }

                                </td>
                            </tr>) : ''
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;