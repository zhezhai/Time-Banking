import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/index";
import styled from "styled-components";

const PostService = () => {
  return (
    <div>
      <Navbar />
      <Wrapper>
        <form>
          <div className="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect1">Example select</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect2">
              Example multiple select
            </label>
            <select
              multiple
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button classNameName='btn'>Post Service</button>
        </form>
        
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin-left: 10rem;
  margin-right: 10rem;
`;
export default PostService;
