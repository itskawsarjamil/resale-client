import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/resalelogo.png';
import { authContext } from '../../context/AuthContext/AuthProvider';
import { useForm } from 'react-hook-form';
import useToken from '../../hooks/useToken';
import useTitle from '../../hooks/useTitle';

const Login = () => {
    useTitle("Login");

    const { register, handleSubmit, formState: { errors }, watch, } = useForm({
        email: null,
        password: null
    });
    const { modifyPassword, googleSignin, signin } = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [loginEmail, setLoginEmail] = useState('');

    const [token] = useToken(loginEmail);

    if (token) {
        navigate(from, { replace: true });
    }

    const handleForgetPassword = () => {
        const email = watch("email");
        // console.log(email);
        if (!email) {
            alert("please enter your email");
        }
        else {
            modifyPassword(email)
                .then(() => {
                    alert("password reset mail sent!");
                })
                .catch(err => {
                    console.log(err);
                    alert(err);
                })
        }

    }

    const handleGooglelogin = () => {
        googleSignin()
            .then(res => {
                const user = res.user;
                console.log(user);
                const { displayName, email, photoURL } = user;
                const userData = {
                    name: displayName,
                    email: email,
                    role: "buyer",
                    img: photoURL,
                }
                fetch('https://resale-server-murex.vercel.app/g-users', {
                    method: "POST",
                    headers: {
                        'content-type': "application/json",
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                // setLoginEmail(email);
                const currentUser = {
                    email: user.email
                }
                fetch('https://resale-server-murex.vercel.app/jwt', {
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
                alert("user login succcessfull");
                // console.log(from);
                // const currentUser = {
                //     email: user.email
                // }

            })
    }

    const handleInput = (e) => {

        signin(e.email, e.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const currentUser = {
                    email: user.email
                }
                fetch('https://resale-server-murex.vercel.app/jwt', {
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
                // setLoginEmail(user.email);
                alert("user login succcessfull");
                // console.log(from);
                // const currentUser = {
                //     email: user.email
                // }


            })
            .catch(err => {
                console.log(err);
            })
    }

    const shadow = {
        boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset',
    }
    return (
        <section className="bg-teal-100  py-14">
            <div className="bg-white p-4 mx-auto mt-6 xl:p-12 w-fit shadow-xl">
                <Link to="/" title="Home Page" className="flex items-center justify-start">
                    <img alt='' className='w-10' src={logo}></img>
                    <span className="text-black font-bold text-2xl ml-2">Resale</span>
                </Link>
                <h1 className="mt-6 mb-4 text-xl font-light text-left text-gray-800">Log in to your account</h1>
                <form onSubmit={handleSubmit(handleInput)} className="pb-1 space-y-4">
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">Your Email</span>
                        <input  {...register("email", {
                            required: "Enter Your Email",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"
                            }
                        })} style={shadow} className="w-full pl-5 py-2 form-input bg-white border-2 text-black" type="email" placeholder="Ex. james@bond.com" />
                        {
                            errors.email && <span className='text-red-500'>{errors.email.message}</span>
                        }
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700 ">Your Password</span>
                        <input {...register("password", {
                            required: "enter your password",
                            minLength: {
                                value: 5,
                                message: "min length is 5",
                            }
                        })} style={shadow} className="w-full pl-5 py-2 form-input bg-white border-2 text-black" type="password" placeholder="••••••••" />
                        {
                            errors.password && <span className='text-red-500'>{errors.password.message}</span>
                        }
                    </label>

                    <div className="grid grid-cols-2 gap-4 mt-2 ">
                        <input type="submit" className="py-1 btn btn-primary" value="Login" />
                        <div className="py-1 btn btn-icon btn-google">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                                <path
                                    d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z"
                                />
                            </svg>
                            <span onClick={handleGooglelogin} className='text-white'>Google</span>
                        </div>
                    </div>

                </form>
                <div className="my-6 space-y-2">
                    <p className="text-xs text-gray-600">
                        Don't have an account?
                        <Link to="/signup" className="text-purple-700 hover:text-black"> Create an account</Link>
                    </p>

                    <button onClick={handleForgetPassword} className="block text-xs text-purple-700 hover:text-black">Forgot password?</button>
                    <Link to="#" className="block text-xs text-purple-700 hover:text-black">Privacy & Terms</Link>
                </div>
            </div>

        </section>

    );
};

export default Login;

