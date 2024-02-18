const setPagination = (count, limit, page, result) => {
  const pagination = {
    current: page,
    previous: page - 1 > 0 ? page - 1 : null,
    next: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
    result: result,
    totalData: count,
    totalPage: Math.ceil(count / limit),
    range: `${page * limit - (limit - 1)}-${
      page * limit - (limit - 1) + (result - 1)
    }`,
  };
  return pagination;
};

module.exports = { setPagination };
