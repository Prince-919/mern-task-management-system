import React from "react";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">The Ultimate Todo List</h1>
        <p className="home_description">
          Streamline your day with Momentum Tasks. Effortlessly manage <br />{" "}
          tasks, set priorities, and boost productivity. Your go-to tool for{" "}
          <br />
          staying organized and achieving goals.
        </p>
        <button className="btn btn-primary px-4">Create Todo List</button>
      </div>
    </div>
  );
};

export default Home;
