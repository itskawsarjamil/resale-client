import React from 'react';
import { Link } from 'react-router-dom';

const HomeCategory = ({ category }) => {
    const { img, category_name, description, total, _id } = category;
    return (
        <div>
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={img} alt="category" className="rounded-xl h-52" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{category_name}</h2>
                        <p>{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
                        <h4 className='text-xl'>total book:{total}</h4>
                        <div className="card-actions">
                            <Link to={`/categorybooks/${_id}`}><button className="btn btn-primary">See More!</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;