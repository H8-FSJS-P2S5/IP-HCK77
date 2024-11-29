const sortOption = (sort, option) => {
  const orderDirection = sort[0] == "-" ? "DESC" : "ASC";
  const orderColumn = orderDirection == "DESC" ? sort.slice(1) : sort;
  //remove '-' if direction is desc so that orderColumn will be only name without '-name'
  option.order = [[orderColumn, orderDirection]];
  return option;
};

module.exports = sortOption;
