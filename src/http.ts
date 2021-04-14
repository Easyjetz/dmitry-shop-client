import axios from 'axios';

export let $host: any;

if (process.env.NODE_ENV === 'production') {
  $host = axios.create({
    baseURL: process.env.REACT_APP_HEROKU_URL
  })
} else {
  $host = axios.create({
    baseURL: process.env.REACT_APP_
  });
}




