import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const DashboardCard = ({heading, data, link, classes}) => {

    const settings = {
    dots: false,        // Optional: pagination dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,      // Show next/prev arrows
  };

    
    const renderedItems = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((item) => {
        const date = new Date(item.createdAt);

        const formatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        }).format(date);
        
        return (
            
            <div className={`card-slide ${heading === "Income" ? "text-emerald-200" : "text-red-200" }`} key={item?._id}>
                <div>
                <span>{item?.title}: </span> 
                <span>${item?.total}</span>
                </div>
                <span>{formatted}</span>
            </div>
        )
    })

    const itemsTotal = data.reduce((acc, num) => {return acc + num?.total}, 0)

    return (
        <>
        <a href={link} className={`dashboard-card ${classes}`}>
        <h2>Monthly {heading}</h2>
        <p style={{fontSize:30, fontWeight:'bold'}}>${itemsTotal}</p>
        <div className="card-slider" >
            <Slider {...settings}>
                {renderedItems}
            </Slider>
        </div>
        
        </a>
        </>
    )
}

export default DashboardCard;