class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.q
      ? {
          name: {
            $regex: this.queryStr.q,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["q", "color" ,"mileage"];

    removeFields.forEach((key) => delete queryCopy[key]);

    

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
}
module.exports = ApiFeature;
