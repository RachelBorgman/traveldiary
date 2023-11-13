import React from 'react';
import './StarRating.css'

const StarRating = ({ rating, onChange }) => {
    const stars = Array(5)
    .fill()
    .map((element, index) => {
        const starValue = index + 1;
        return (
        <span
            key={starValue}
            className={`star ${rating >= starValue ? 'active' : ''}`}
            onClick={() => onChange(starValue)}
        >
            &#9733;
        </span>
        );
    });

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;