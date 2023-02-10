import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const formData = new FormData();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // const [SigninEmail, setSigninEmail] = useState('');
    // const [token] = useToken(SigninEmail);
    // if (token) {
    //     navigate(from, { replace: true });
    // }

    const imghostkey = process.env.REACT_APP_imgbb;
    const { signup, modifyInfo, googleSignin } = useContext(authContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const shadow = {
        boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset',
    }

    const handleInput = e => {
        setError(null);
        // console.log(e.image[0]);
        const img = e.image[0];
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                const imgurl = imgData.data.image.url;
                const userData = {
                    name: e.name,
                    email: e.email,
                    role: e.role,
                    img: imgurl,
                    appVerified: false
                }
                // console.log(userData);
                signup(e.email, e.password)
                    .then((userCredential) => {
                        toast.success("profile created");
                        const user = userCredential.user;
                        // console.log(user);
                        modifyInfo({
                            displayName: e.name,
                            photoURL: imgurl,
                        })
                            .then(() => {
                                toast.success("profile updated");
                                const currentUser = {
                                    email: user.email
                                }
                                fetch('http://localhost:5000/jwt', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(currentUser)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        console.log(data)
                                        localStorage.setItem('accessToken', data.Access_token);
                                    })
                                navigate(from, { replace: true });

                            })
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err.message);
                    })

            })



    }


    const handleGooglelogin = () => {
        googleSignin()
            .then(res => {
                const user = res.user;
                console.log(user);
                alert("user login succcessfull");
                const { displayName, email, photoURL } = user;
                const userData = {
                    name: displayName,
                    email: email,
                    role: "buyer",
                    img: photoURL,
                }
                fetch('http://localhost:5000/g-users', {
                    method: "POST",
                    headers: {
                        'content-type': "application/json",
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // setSigninEmail(email);
                        const currentUser = {
                            email: user.email
                        }
                        fetch('http://localhost:5000/jwt', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(currentUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                localStorage.setItem('accessToken', data.Access_token);
                            })
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <section className="px-4 py-24 mx-auto w-full bg-teal-100">
            <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 bg-white shadow-2xl p-10 rounded-2xl">
                <h1 className="text-4xl font-semibold text-center text-gray-900">Sign up</h1>
                <div className="pb-6 space-y-2 border-b border-gray-600">
                    <button onClick={handleGooglelogin} className="w-full py-3 btn btn-icon btn-google text-white mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                            <path
                                d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z"
                            />
                        </svg>
                        Continue with Google
                    </button>
                    <p className="my-8 text-xs font-medium text-center text-gray-700">
                        By clicking "Continue with Google" you agree to become a
                        <span className="text-purple-700"> Buyer </span>
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleInput)} className="space-y-4 w-full">
                    <label className="block">
                        <span className="block mb-1 text-xl font-bold  text-gray-500">Name</span>
                        <input {...register("name",
                            {
                                required: "Enter Your Name",
                                maxLength: {
                                    value: 20,
                                    message: "name must be less than 20 character"
                                }
                            }
                        )} className=" text-black w-full p-3 bg-white " style={shadow} type="text" placeholder="Your full name" />
                        {
                            errors.name && <span className='text-red-500'>{errors.name.message}</span>
                        }
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xl font-bold  text-gray-500">Your Email</span>
                        <input {...register("email", {
                            required: "Enter Your Email",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"
                            }
                        })} className=" w-full p-3 bg-white text-black" style={shadow} type="email" placeholder="Ex. james@bond.com" />
                        {
                            errors.email && <span className='text-red-500'>{errors.email.message}</span>
                        }
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xl font-bold  text-gray-500">Create a password</span>
                        <input {...register("password", {
                            required: "Please Enter a Password",
                            minLength: {
                                value: 5,
                                message: "min length is 5",
                            }
                        })} className=" w-full p-3 bg-white text-black" style={shadow} type="password" placeholder="••••••••" />
                        {
                            errors.password && <span className='text-red-500'>{errors.password.message}</span>
                        }
                    </label>



                    <label className="block">
                        <span className="block mb-1 text-xl font-bold  text-gray-500">Enter Your Image</span>
                        <input {...register("image", {
                            required: "Please Enter your image",

                        })} className=" w-full p-3 bg-white text-black" style={shadow} type="file" placeholder="Image" />
                        {
                            errors.image && <span className='text-red-500'>{errors.image.message}</span>
                        }
                    </label>
                    <select defaultValue={"buyer"} {...register("role")} className='text-black bg-white w-full px-5 py-2 border  focus:border-black focus:shadow-lg' >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                    <input type="submit" className="w-full btn btn-primary btn-lg" value="Sign Up" />
                </form>
                <p className="my-0 text-xs font-medium text-center text-gray-700 sm:my-5">
                    Already have an account?
                    <Link to="/signin" className="text-purple-700 hover:text-purple-900"> Sign in</Link>
                </p>
                {
                    error && <span className='text-red-500'>{error}</span>
                }
                <p className="my-8 text-xs font-medium text-center text-gray-700">
                    By clicking "Sign Up" or "Continue with Google"<br /> you agree to our
                    <Link to="" className="text-purple-700 hover:text-purple-900"> Terms of Service </Link>
                    and
                    <Link to="" className="text-purple-700 hover:text-purple-900"> Privacy Policy</Link>
                </p>
            </div>
        </section>


    );
};

export default Signup;