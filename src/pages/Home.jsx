import "../styles/Home.css";
const ingredientsImg ="https://www.shutterstock.com/shutterstock/photos/2405795463/display_1500/stock-photo-various-fresh-vegetables-and-herbs-on-white-background-2405795463.jpg";
const chefImg="https://www.shutterstock.com/shutterstock/photos/2250816003/display_1500/stock-photo-pizza-chef-working-in-the-kitchen-2250816003.jpg";
const deliveryImg="https://www.shutterstock.com/shutterstock/photos/2750319109/display_1500/stock-vector-fast-time-delivery-clock-icon-featuring-red-horizontal-motion-lines-on-clean-white-background-layout-2750319109.jpg";
function Home() {
  return (
    <div className="home-container">
      
      <section className="story-section">
        <h1>Our Story</h1>

        <p>
          At Pizzeria, we believe that great pizza starts with passion and
          quality ingredients. Our mission is to bring customers a delightful
          dining experience through freshly prepared pizzas made with care and
          attention to detail.
        </p>

        <p>
          Since our journey began, we have focused on creating unique flavors,
          maintaining high-quality standards, and ensuring customer
          satisfaction. Every pizza is prepared using fresh ingredients and
          traditional techniques to deliver the perfect taste.
        </p>

        <p>
          Our commitment to quality, innovation, and excellent service has
          helped us become a trusted destination for pizza lovers. Whether you
          prefer classic flavors or customized creations, Pizzeria has
          something special for everyone.
        </p>
      </section>

      <section className="section-row">
        <img src={ingredientsImg} alt="Ingredients" />

        <div className="section-content">
          <h2>Ingredients</h2>

          <p>
            We use fresh vegetables, premium cheese, flavorful sauces, and
            carefully selected toppings to ensure every pizza delivers an
            exceptional taste. Quality ingredients are the foundation of every
            meal we serve.
          </p>
        </div>
      </section>

      <section className="section-row reverse">
        <div className="section-content">
          <h2>Our Chefs</h2>

          <p>
            Our experienced chefs combine creativity, skill, and passion to
            craft delicious pizzas. Their dedication and attention to detail
            ensure that every order is prepared with consistency and care.
          </p>
        </div>

        <img src={chefImg} alt="Chef" />
      </section>

      <section className="section-row">
        <img src={deliveryImg} alt="Delivery" />

        <div className="section-content">
          <h2>45 Min Delivery</h2>

          <p>
            We value your time and work hard to deliver orders quickly while
            maintaining freshness and quality. Our delivery service aims to
            bring hot and delicious pizzas to your doorstep within 45 minutes.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;