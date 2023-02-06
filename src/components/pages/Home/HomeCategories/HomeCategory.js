import React from 'react';

const HomeCategory = ({ category }) => {
    const { img, title, description, total } = category;
    return (
        <div>
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={img} alt="category" className="rounded-xl h-52" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{title}</h2>
                        <p>{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
                        <h4 className='text-xl'>total book:{total}</h4>
                        <div className="card-actions">
                            <button className="btn btn-primary">See More!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;