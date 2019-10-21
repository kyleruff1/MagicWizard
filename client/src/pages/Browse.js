import React, { Component } from "react";
// import React from "react";
import Navbar from "../components/Navbar";
const mtg = require("mtgsdk");

export default class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      searchTerm: ""
    };
  }

  handleClick = event => {
    event.preventDefault();
    console.log("Submit Click");
    mtg.card
      .all({ name: this.state.searchTerm, pageSize: 1 })
      .on("data", card => {
        console.log(card.name);
        console.log(card.imageUrl);
      });
  };

  handleAutoChange = () => {
    mtg.card.where({ name: this.state.searchTerm }).then(results => {
      console.log(results);
    });
  };

  handleChange = event => {
    console.log(this.state.searchTerm);
    let searchTerm = event.target.value;
    this.setState({ searchTerm: event.target.value });
    mtg.card.where({ name: searchTerm, pageSize: 10 }).then(results => {
      console.log(results);
      this.setState({ items: results });
    });
    console.log(this.state.items.map(item => item.name));
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <label>
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Search for a card"
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </label>
          {/* <button
            type="button"
            className="btn btn-light"
            onClick={this.handleClick}
          >
            Search
          </button> */}
          {/* idk lists here */}
          <ul class="list-group">
            {this.state.items.map(item => (
              <li class="list-group-item" key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>

          {/* idk pagination here */}
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}