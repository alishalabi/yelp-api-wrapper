const ApiWrapper = require('./yelp-wrapper')
// import ApiWrapper from './yelp-wrapper.js';
require('dotenv').config();


const clientID = process.env.CLIENT_ID
const apiKEY = process.env.API_KEY

const test = new ApiWrapper(apiKEY, "pizza", "94117")
test.getNamesAndReviews().then((json) => {
  console.log(json)
})
test.allOpen().then((json) => {
  console.log(json)
})
test.onlyHigherThanCertainStars(4).then((json) => {
  console.log(json)
})
test.onlyCertainPricing(2).then((json) => {
  console.log(json)
})
test.getRandom().then((json) => {
  console.log(json)
})
