class APIFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const copyQuery = { ...this.queryStr };
    const removableFields = ['page', 'keyword', 'limit'];
    removableFields.forEach((field) => delete copyQuery[field]);
    // advance filter for price and rating..
    let queryStr = JSON.stringify(copyQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(productPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = productPerPage * (currentPage - 1);

    this.query = this.query.limit(productPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeature;
