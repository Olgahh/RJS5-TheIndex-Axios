import React, { Component } from "react";
import axios from "axios";

// import authors from "./data.js";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: []
  };

  componentDidMount() {
    try {
      let response = axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      let authors = response.data;
      this.setState({ authors: authors });
      console.log(authors);
    } catch (errors) {
      console.log(errors);
    }
  }

  selectAuthor = author => this.setState({ currentAuthor: author });

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
