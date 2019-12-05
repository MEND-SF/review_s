/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import Stats from './Stats.jsx';
import Reviews from './Reviews.jsx';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: {},
      reviews: [],
    };
    this.getListing = this.getListing.bind(this);
  }

  componentDidMount() {
    this.getListing();
  }

  getListing() {
    const endpoint = window.location.pathname;
    let url = '';
    if (endpoint.length === 1) {
      url = 'http://localhost:3000/api/listing/1';
    } else {
      const arr = endpoint.split('/');
      const id = arr[arr.length - 2];
      url = `http://localhost:3000/api/listing/${id}`;
    }
    axios.get(url)
      .then((results) => {
        this.setState({ listing: results.data.stats[0], reviews: results.data.reviews });
      })
      .catch((err) => {
        throw (err);
      });
  }

  render() {
    const { listing, reviews } = this.state;
    return (
      <div>
        <Stats listing={listing} />
        <Search />
        <Reviews reviews={reviews} />
      </div>
    );
  }
}

export default App;
