import React from "react";

const Service = ({ menuItem }) => {
  return (
    <article className="menu-item">
      <div className="item-info">
        <header>
          <h4>{menuItem.title}</h4>
        </header>
        <p className="item-text">{menuItem.desc}</p>
      </div>
    </article>
  );
};

export default Service;
