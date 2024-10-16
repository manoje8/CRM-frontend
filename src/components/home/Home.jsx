import "./Home.css"

const feature = [
    {
        cardTitle: "Build Relationships",
        cardSub: "No More Mess",
        cardText: "Our powerful reporting and dashboards give you quick visibility of key metrics to support your business."
    },
    {
        cardTitle: "Engage Your Customers",
        cardSub: "Stop sending the wrong message to the wrong customer",
        cardText: "Engage your customers more effectively with personalised experiences and consistent messaging. Automate customer segmentation, send targeted marketing content and track important activity"
    },
    {
        cardTitle: "Improve Customer Satisfaction",
        cardSub: "Keep your customer happy",
        cardText: "Customer service team with the tools that will allow them to service smarter, faster and more professionally."
    },

]

const Home = () => {
    return(
    <div className="home">
        <div className="heading">
            <h1 className="display-4">Whatever your goal, CRM will help your business thrive.</h1>
            <h5>The CRM that's simple to set up and easy to use </h5>
            <hr />
            <a className="btn btn-secondary" href="/user/login">Get Started</a>
        </div>
        <h3 className="text-center"><span>Transform your business with CRM</span></h3>
        
        <div className="features">
            {
                feature.map((value, id) => (
                    <div key={id} className="card bg-dark" style={{width: "18rem"}}>
                        <div className="card-body text-center bg-light">
                            <h5 className="card-title">{value.cardTitle}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{value.cardSub}</h6>
                            <hr className="bg-light"/>
                            <p className="card-text">{value.cardText}</p>
                        </div>
                     </div>
                ))
            }
        </div>
    </div>
)}

export default Home