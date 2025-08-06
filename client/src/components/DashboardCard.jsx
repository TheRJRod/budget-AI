import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const DashboardCard = ({ heading, data, link, classes, icon }) => {
  const formatted = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date());
  const now = new Date();

  const settings = {
    dots: false, // Optional: pagination dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Show next/prev arrows
  };

  const renderedItems = data
    .filter((item) => {
      const transactionDate = item.transactionDate;
      const inputDate = new Date(transactionDate)
      const isSameMonth = inputDate.getMonth() === now.getMonth() && inputDate.getFullYear() === now.getFullYear();
      return (
      item.recurringType === "monthly" || isSameMonth
      )
    })
    .sort((a, b) => {
    const getComparableDate = (item) => {
      if (item.recurringType === "monthly" && item.recurrenceDetails?.dayOfMonth) {
        return new Date(now.getFullYear(), now.getMonth(), item.recurrenceDetails.dayOfMonth);
      }
      return new Date(item.transactionDate || item.createdAt);
    };

    const dateA = getComparableDate(a);
    const dateB = getComparableDate(b);

    return dateA - dateB;
  })
    .map((item) => {
      const date = item.recurringType === "monthly" ? new Date(now.getFullYear(),  now.getMonth(), item.recurrenceDetails.dayOfMonth) : new Date(item.transactionDate);

      const formatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);

      return (
        <div
          className={`card-slide ${
            heading === "Income" ? "text-emerald-200" : "text-red-200"
          }`}
          key={item?._id}
        >
          <div>
            <span>{item?.title}: </span>
            <span>${item?.total}</span>
          </div>
          <span>{formatted}</span>
        </div>
      );
    });

  const itemsTotal = data.filter((item) => {
      const transactionDate = item.transactionDate;
      const inputDate = new Date(transactionDate)
      const isSameMonth = inputDate.getMonth() === now.getMonth() && inputDate.getFullYear() === now.getFullYear();
      return (
      item.recurringType === "monthly" || isSameMonth
      )
    }).reduce((acc, num) => {
    return acc + num?.total;
  }, 0);

  return (
    <>
      <a href={link} className={`dashboard-card ${classes}`}>
        <h2 className="text-2xl font-bold flex items-center gap-[10px]">{icon} {formatted} {heading}</h2>
        <p style={{ fontSize: 30, fontWeight: "bold" }}>${itemsTotal}</p>
        <div className="card-slider">
          {data.length > 1 ? (
            <Slider {...settings}>{renderedItems}</Slider>
          ) : (
            renderedItems
          )}
        </div>
      </a>
    </>
  );
};

export default DashboardCard;
