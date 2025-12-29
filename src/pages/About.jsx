import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import aboutImg from "../assets/img/about1.jpeg";

const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* LEFT FULL IMAGE */}
        <div className="col-md-6">
          <img
            src={aboutImg}
            className="img-fluid rounded shadow w-100"
            style={{ height: "350px", objectFit: "cover" }}
            alt="About Mumbaishopper"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-6">
          <h1 className="mb-3 fw-bold">About Mumbaishopper</h1>
          <p className="lead text-muted">
            Discover who we are, what we believe, and why thousands shop with us.
          </p>

          <h3 className="mt-4 fw-semibold">Who We Are</h3>
          <p>
            Mumbaishopper is a modern online shopping destination offering
            high-quality fashion, electronics, lifestyle products, and more.
            We blend quality, affordability, and trust to create a smooth
            shopping experience.
          </p>

          <h3 className="mt-4 fw-semibold">Our Mission</h3>
          <p>
            To make online shopping accessible, seamless, and secure for
            everyone. We offer the best prices, fast delivery, verified
            quality, and safe payments.
          </p>

          <h3 className="mt-4 fw-semibold">Our Vision</h3>
          <p>
            To become India’s most trusted customer-centric marketplace through
            innovation, smooth service, and continuous improvement.
          </p>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="row mt-5">
        <h2 className="fw-bold text-center mb-4">Our Core Values</h2>

        <div className="col-md-4 text-center p-3">
          <div className="p-4 border rounded shadow-sm">
            <h4 className="fw-semibold mb-2">Customer First</h4>
            <p className="text-muted">
              We focus on providing the best shopping experience with trust,
              transparency, and care.
            </p>
          </div>
        </div>

        <div className="col-md-4 text-center p-3">
          <div className="p-4 border rounded shadow-sm">
            <h4 className="fw-semibold mb-2">Quality Assurance</h4>
            <p className="text-muted">
              Every product is carefully verified to ensure durability and value
              for money.
            </p>
          </div>
        </div>

        <div className="col-md-4 text-center p-3">
          <div className="p-4 border rounded shadow-sm">
            <h4 className="fw-semibold mb-2">Innovation</h4>
            <p className="text-muted">
              We continuously upgrade our platform to give users the best and
              smoothest shopping technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
