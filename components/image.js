import {getStrapiMedia} from "../lib/api";


const Image = ({ image, style }) => {
    const imageUrl = getStrapiMedia(image);

    return (
        <img
            src={imageUrl}
            alt={image.alternativeText || image.name}
            style={style}
        />
    );
};

export default Image;