import { useQuery } from "react-query";
import Spinner from "../../../Shared/Spinner/Spinner";
import useTitle from "../../../../hooks/useTitle";

const AllBuyers = () => {
    useTitle("Buyers")
    const { data: Buyers = [], isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('https://resale-server-murex.vercel.app/buyers', {
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
        return <Spinner />
    }
    return (
        <div className='mb-36'>
            <h2 className="text-3xl text-center bg-slate-900 text-white py-6">Total Buyer: {Buyers?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>picture</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Buyers?.length ?
                            Buyers.map((buyer, i) => <tr key={buyer._id}>
                                <th>{i + 1}</th>
                                <td>

                                    <div className="avatar">
                                        <div className="w-11 rounded-full hover:shadow-md hover:shadow-primary">
                                            <img src={buyer.img} alt='' />
                                        </div>
                                    </div>

                                </td>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>

                            </tr>) : ''
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;