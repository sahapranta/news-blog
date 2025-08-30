import React from 'react';

const Img: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return (
        <img
            {...props}
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/placeholder.svg';
            }}
        />
    );
};

export default Img;
