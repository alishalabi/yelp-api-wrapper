const yelp = require('yelp-fusion')
require('dotenv').config();

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

  // Helper function to return json
  async connection() {
    const res = await this.client.search(this.searchRequest)
    const result = res.jsonBody.businesses
    return result
  }

  // Helper function to format return json
  formatNameReview(array) {
    const ret = array.map(business => {
      return {name: business.name, rating: business.rating, id: business.id, phone:business.phone, image_url: business.image_url, location: business.location}
    })
    return ret
  }

  // Get name + reviews based on unfiltered search parameters
  async getNamesAndReviews() {
    const result = await this.connection()
    const ret = this.formatNameReview(result)
    return ret
  }

  // Filter: only allow open restaurants
  async allOpen() {
    const unfiltered = await this.connection()
    const filtered = unfiltered.filter(business => {
      return business.is_closed === false
    })
    const ret = this.formatNameReview(filtered)
    return ret
  }

  // Filter: rating higher than set amount of stars
  // Param: star is an int between 0 and 5
  async onlyHigherThanCertainStars(stars) {
    const unfiltered = await this.connection()
    const filtered = unfiltered.filter(business => {
      return business.rating >= stars
    })
    const ret = this.formatNameReview(filtered)
    return ret
  }

  // Filter: only price equal to set pricing
  // Param: pricing is a string between "$" and "$$$$"
  async onlyCertainPricing(pricing) {
    const unfiltered = await this.connection()
    const filtered = unfiltered.filter(business => {
      return business.price == "$".repeat(pricing)
    })
    const ret = this.formatNameReview(filtered)
    return ret
  }

  // Get random restautant based on unfiltered search
  async getRandom() {
    const unfiltered = await this.connection()
    const arrayLen = unfiltered.length
    const randomInt = Math.floor(Math.random() * Math.floor(arrayLen - 1))
    const business = unfiltered[randomInt]
    return {name: business.name, rating: business.rating, phone: business.phone}
  }

}

module.exports = ApiWrapper;
