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

  async getNamesAndReviews() {
    const res = await this.client.search(this.searchRequest)
    const result = res.jsonBody.businesses
    const prettyJson = JSON.stringify(result, null, 4)
    const ret = result.map(business => {
      return {name: business.name, rating: business.rating}
    })
    return ret
  }

  async allOpen() {
    const res = await this.client.search(this.searchRequest)
    const unfiltered = res.jsonBody.businesses
    const filtered = unfiltered.filter(business => {
      return business.is_closed === false
    })
    // const prettyJson = JSON.stringify(filtered, null, 4)
    const ret = filtered.map(business => {
      return {name: business.name, rating: business.rating, pricing: business.price}
    })
    return ret
  }

  async onlyHigherThanCertainStars(stars) {
    const res = await this.client.search(this.searchRequest)
    const unfiltered = res.jsonBody.businesses
    const filtered = unfiltered.filter(business => {
      return business.rating >= stars
    })
    // const prettyJson = JSON.stringify(filtered, null, 4)
    const ret = filtered.map(business => {
      return {name: business.name, rating: business.rating, pricing: business.price}
    })
    return ret
  }

  async onlyCertainPricing(pricing) {
    const res = await this.client.search(this.searchRequest)
    const unfiltered = res.jsonBody.businesses
    const filtered = unfiltered.filter(business => {
      return business.price == "$".repeat(pricing)
    })
    // const prettyJson = JSON.stringify(filtered, null, 4)
    const ret = filtered.map(business => {
      return {name: business.name, rating: business.rating, pricing: business.price}
    })
    return ret
  }

  async getRandom() {
    const res = await this.client.search(this.searchRequest)
    const unfiltered = res.jsonBody.businesses
    const arrayLen = unfiltered.length
    const randomInt = Math.floor(Math.random() * Math.floor(arrayLen - 1))
    // console.log(arrayLen)
    const business = unfiltered[randomInt]
    return {name: business.name, rating: business.rating}
  }

}

module.exports = ApiWrapper;

// test = new ApiWrapper(apiKEY, "pastrami", "94117")

// test.getNamesAndReviews()
