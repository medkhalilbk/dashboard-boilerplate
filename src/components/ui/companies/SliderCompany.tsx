import Slider from "react-slick";




const SliderCompany : React.FC<{images:string[]}> = ({images}) => {
    const settings = {
   dots: true, 
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt="company" className="w-500 h-40 object-cover" />
                </div>
            ))}
        </Slider>
    );
};

export default SliderCompany