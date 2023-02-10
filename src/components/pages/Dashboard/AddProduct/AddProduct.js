import { useContext } from "react";
import { authContext } from "../../../context/AuthContext/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-hot-toast";


const AddProduct = () => {
    const { user, logout } = useContext(authContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb;
    // //date and time
    const currentDate = new Date();
    const time = (currentDate.getHours() + ':' + currentDate.getMinutes());
    const date = format(currentDate, 'PP');
    const navigate = useNavigate()


    const handleAddProduct = data => {

        //image hosting
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((imgData) => {
                // console.log(imgData)
                if (imgData.success) {
                    const { book_title,
                        original_price,
                        used,
                        seller_price,
                        category_name,
                        condition,
                        location,
                        phone,
                        description,
                        relevantInformation } = data;


                    fetch(`http://localhost:5000/categoryid?catname=${category_name}`)
                        .then(res => res.json())
                        .then(catidobj => {
                            const product = {
                                seller_email: user.email,
                                book_img: imgData.data.url,
                                book_title,
                                original_price,
                                used,
                                seller_price,
                                post_date: date,
                                post_time: time,
                                category_name,
                                category_id: catidobj._id,
                                condition,
                                location,
                                contact: phone,
                                description,
                                relevantInformation,
                                sold: false,
                                adv: false,

                            }
                            fetch('http://localhost:5000/addbook', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json',
                                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                                },
                                body: JSON.stringify(product)
                            })
                                .then(res => {
                                    if (res.status === 401 || res.status === 403) {
                                        return logout();
                                    }
                                    return res.json();
                                })
                                .then(result => {
                                    // console.log(result)
                                    fetch(`http://localhost:5000/addbook?pid=${result.insertedId}`)
                                        .then(res => res.json())
                                        .then(data => {
                                            // console.log(data);
                                            if (data.acknowledged) {
                                                toast.success(`${user.displayName} product added successfully.`)
                                                navigate('/dashboard/myproducts')
                                            }
                                        })


                                })
                        })

                    // product data 

                }
            })
            .catch(err => console.log(err));
    };
    const categories = ["Art and Collectibles", "Fiction", "Non Fiction"];
    const condition = ['excellent', 'good', 'fair']
    const locations = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Barishal', 'Khulna'];

    const shadow = {
        boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset',
    }

    return (
        <div className='max-w-[1440px] min-h-screen mx-auto my-14 text-black bg-white'>
            <div className='p-7'>
                <h2 className="text-4xl text-center">Add A Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10' >


                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Book Name</span></label>
                            <input style={shadow}
                                type="text"
                                className="bg-white text-black input input-bordered w-full max-w-xs"
                                {...register("book_title", {
                                    required: 'book name is required'
                                })}
                            />
                            {errors.book_title && <p className='text-red-600'>{errors.book_title?.message}</p>}

                        </div>


                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">seller price</span></label>
                            <input style={shadow}
                                type="text"
                                className="bg-white text-black input input-bordered w-full max-w-xs"
                                {...register("seller_price", {
                                    required: 'resale price is required'

                                })}
                            />
                            {errors.seller_price && <p className='text-red-600'>{errors.seller_price?.message}</p>}
                        </div>
                        {/*  original price  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text"> Original price</span></label>
                            <input style={shadow}
                                type="text"
                                className="bg-white text-black input input-bordered w-full max-w-xs"
                                {...register("original_price", {
                                    required: ' original price is required'

                                })}
                            />
                            {errors.original_price && <p className='text-red-600'>{errors.original_price?.message}</p>}
                        </div>

                        {/* used */}

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text"> Use Day</span></label>
                            <input style={shadow}
                                type="text"
                                className="bg-white text-black input input-bordered w-full max-w-xs"
                                {...register("used", {
                                    required: ' total used day is required'

                                })}
                            />
                            {errors.used && <p className='text-red-600'>{errors.used?.message}</p>}
                        </div>




                        {/* category */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Category</span></label>
                            <select style={shadow}
                                {...register("category_name")}
                                className="bg-white text-black select select-bordered w-full max-w-xs" defaultValue={categories[0]}>
                                {
                                    categories.map((category, i) => <option
                                        key={i}
                                        value={category}
                                    >{category}</option>)
                                }
                            </select>
                        </div>

                        {/* condition  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Condition</span></label>
                            <select style={shadow}
                                {...register("condition")}
                                className="bg-white text-black select select-bordered w-full max-w-xs">
                                {
                                    condition.map((con, i) => <option
                                        key={i}
                                        defaultValue={con}
                                    >{con}</option>)
                                }
                            </select>
                        </div>

                        {/* location  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Location</span></label>
                            <select style={shadow}
                                {...register("location")}
                                className="bg-white text-black select select-bordered w-full max-w-xs">
                                {
                                    locations.map((location, i) => <option
                                        key={i}
                                        defaultValue={location}
                                    >{location}</option>)
                                }
                            </select>
                        </div>

                        {/* Contact  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Mobile Number</span></label>
                            <input style={shadow}
                                type="phone"
                                className="bg-white text-black input input-bordered w-full max-w-xs"
                                {...register("phone", {
                                    required: 'Mobile number is required'

                                })}
                            />
                            {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                        </div>

                        {/* Description */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea style={shadow}
                                className="bg-white text-black textarea textarea-bordered"
                                placeholder="description"
                                {...register("description", {
                                    required: 'description is required'

                                })}
                            ></textarea>
                            {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                        </div>

                        {/* Relevant information */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Relevant information</span></label>
                            <textarea style={shadow}
                                className="bg-white text-black textarea textarea-bordered"
                                placeholder="relevant information"
                                {...register("relevantInformation", {
                                    required: 'relevant information is required'
                                })}
                            ></textarea>
                            {errors.relevantInformation && <p className='text-red-600'>{errors.relevantInformation?.message}</p>}
                        </div>
                        {/* image  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Photo</span></label>
                            <input style={shadow}
                                type="file"
                                className="bg-white text-black input input-bordered w-full max-w-xs"
                                {...register("image", {
                                    required: 'image is required'
                                })}
                            />
                            {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}

                        </div>
                    </div>
                    <input className='btn btn-accent max-w-xs mt-4' value='Add Product' type="submit" />
                </form>
            </div>
        </div>

    );
};

export default AddProduct;