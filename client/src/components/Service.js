import React from "react";

const Service = ({ menuItem }) => {
  return (
    <article className="menu-item">
      <img
        src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fca%2F76%2F0b%2Fca760b70976b52578da88e06973af542.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F644437027909509488%2F&tbnid=zhse6Cj7W9ui0M&vet=12ahUKEwix8Ynd-dPtAhVIJd8KHSamBYYQMygHegUIARDiAQ..i&docid=XJybL5iT0SSPBM&w=1000&h=1080&q=images&ved=2ahUKEwix8Ynd-dPtAhVIJd8KHSamBYYQMygHegUIARDiAQ"
        alt={menuItem.title}
        className="photo"
      />
      <div className="item-info">
        <header>
          <h4>{menuItem.title}</h4>
          <h4 className="price">${menuItem.price}</h4>
        </header>
        <p className="item-text">{menuItem.desc}</p>
      </div>
    </article>
  );
};

export default Service;
