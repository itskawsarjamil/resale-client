import { useLoaderData, useNavigation } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Spinner from "../../Shared/Spinner/Spinner";
import CheckoutForm from "./CheckOutForm";
import useTitle from "../../../hooks/useTitle";


const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const MakePayment = () => {
    useTitle("Payments");
    const order = useLoaderData();
    const navigation = useNavigation();
    const { bookTitle, bookPrice } = order;
    if (navigation.state === "loading") {
        return <Spinner />;
    }
    return (
        <div>
            <h3 className="text-3xl">Payment for {bookTitle}</h3>
            <p className="text-xl">Please pay <strong>${bookPrice}</strong> for your order </p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default MakePayment;