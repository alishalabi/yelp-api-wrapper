import ApiWrapper from './yelp-wrapper.js';
require('dotenv').config();


const clientID = process.env.CLIENT_ID
const apiKEY = process.env.API_KEY

test = new ApiWrapper(apiKEY, "pizza", "94117")

console.log(test.connect())
