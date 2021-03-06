const ApiWrapper = require('./index')
// import ApiWrapper from './yelp-wrapper.js';
require('dotenv').config();


const clientID = process.env.CLIENT_ID
const apiKEY = process.env.API_KEY

const test = new ApiWrapper(apiKEY, "pastrami", "94117")
test.getNamesAndReviews().then((json) => {
  console.log("All names and ratings:")
  console.log(json)
})
test.allOpen().then((json) => {
  console.log("Only open:")
  console.log(json)
})
test.onlyHigherThanCertainStars(4).then((json) => {
  console.log("Only higher than 4 stars:")
  console.log(json)
})
test.onlyCertainPricing(2).then((json) => {
  console.log("Only $$ pricing:")
  console.log(json)
})
test.getRandom().then((json) => {
  console.log("Random:")
  console.log(json)
  // console.log(`Random: ${json}`)
})
