import React from "react";
import styled from "styled-components";
import { services } from "../utils/constants";

const Services = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <h2>Custom furnitures just for you</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          voluptatum magni ipsam deleniti nulla, at sunt fugiat soluta culpa
          dignissimos?
        </p>
        <div className="services-center">
          {services.map((service) => {
            const { id, icon, text, title } = service;
            return (
              <article className="service" key={id}>
                <div>
                  <span>{icon}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;

  background: #f2f2f2;

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0.2rem;
    line-height: 1.8;
    color: var(--clr-primary-3);
    font-size: 1.2rem;
  }
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 1rem;
    justify-content: center;
  }
  .service {
    background: var(--clr-primary-4);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    width: 20rem;
    p {
      color: white;
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`;
export default Services;
