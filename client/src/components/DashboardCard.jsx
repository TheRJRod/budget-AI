

const DashboardCard = ({heading, data, link, classes}) => {

    
    const renderedItems = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((item) => {
        const date = new Date(item.createdAt);

        const formatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        }).format(date);
        
        return (
            <tr key={item?._id}>
                <td>{item?.title}:</td> 
                <td>${item?.total}</td>
                <td>{formatted}</td>
            </tr>
        )
    })

    const itemsTotal = data.reduce((acc, num) => {return acc + num?.total}, 0)

    return (
        <>
        <a href={link} className={`dashboard-card ${classes}`}>
        <h2>{heading}</h2>
        <div className="card-table">
           <table>
            <tbody>
            <tr >
             <td style={{fontWeight:'bold', fontSize:20}}>{heading}</td>
             <td style={{fontWeight:'bold', fontSize:20}}>Total</td>
             <td style={{fontWeight:'bold', fontSize:20}}>Date</td>
            </tr>
            {renderedItems}
            </tbody>
           </table>
        </div>
        <p style={{fontSize:24, fontWeight:'bold'}}>Total: ${itemsTotal}</p>
        </a>
        </>
    )
}

export default DashboardCard;