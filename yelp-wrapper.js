const yelp = require('yelp-fusion')
require('dotenv').config();
const apiKEY = process.env.API_KEY

class ApiWrapper {
  constructor(apiKEY, term, location) {
    this.apiKEY = apiKEY
    this.term = term
    this.location = location
    this.searchRequest = {
      term: this.term,
      location: this.location
    }
    this.client = yelp.client(this.apiKEY)
  }

  getNamesAndReviews() {
    this.client.search(this.searchRequest).then(res => {
      const result = res.jsonBody.businesses
      // console.log(result)
      const prettyJson = JSON.stringify(result, null, 4)
      // console.log(prettyJson)
      const ret = result.forEach(business => {
        return {name: business.name, rating: business.rating}
      })
      return ret
    }).catch(error => {
      console.log(error)
    })
  }

  // allOpen()
  // firstRated()
  // onlyHigherThanCertainStars
  // onlyCertainPricing(rating)
  // getRandom
}

// export default ApiWrapper;

test = new ApiWrapper(apiKEY, "pastrami", "94117")

console.log(test.getNamesAndReviews())
