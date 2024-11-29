const paginationOption = (page, option) => {
  if (!option.limit) {
  } // Default
  option.limit = 10;
  if (!option.offset) {
  } // Default
  option.offset = 0;
  if (page.size) {
    //berapa data yang akan muncul di findAll
    option.limit = page.size;
  }
  if (page.number) {
    //page size itu halaman saat ini
    option.offset = page.number * option.limit - option.limit;
  }
  return option;
};
module.exports = paginationOption;
