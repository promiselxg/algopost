const queryFilter = (model, populate) => async (req, res, next) => {
  let query;
  //  sort by specific fields
  const reqQuery = { ...req.query };

  //  Array of fields to exclude from matching
  const removeFields = ['select', 'sort', 'page', 'limit'];

  //  Loop over removeFields and delete them from req.query
  removeFields.forEach((param) => delete reqQuery[param]);

  //  sort based on given condition / create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators ($gt,$gte,$lt,$lte,$in)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //  Finding Resource
  if (Object.keys(req.query).length === 0) {
    query = model.find({ isApproved: true });
  } else {
    query = model.find(JSON.parse(queryStr));
  }

  //  Select fields /api/coins?select=field1,field2....
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //  Sort by multiple fields /api/coins?sort=field1,field2....[-prefix for descending]
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort({ _id: -1, vote: 1 });
  }

  //  Pagination /api/coins?page=1&limit=2
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);
  //    populate
  if (populate) {
    query = query.populate({
      path: `${populate}`,
      select: 'username _id',
    });
  }
  // executing query
  const result = await query;

  //  Pagination result
  const pagination = {};
  // next page
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  //  prev page
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  if (!result) {
    res.status(404);
    throw new Error('No Token found.');
  }

  //    send response back
  res.queryResults = {
    success: true,
    count: result.length,
    pagination,
    data: result,
  };

  next();
};

module.exports = {
  queryFilter,
};
