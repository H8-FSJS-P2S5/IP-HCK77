const convertImgToString = async (file) => {
  const mimeType = file.mimetype;
  const stringBase64 = file.buffer.toString("base64");
  const data = `data:${mimeType};base64,${stringBase64}`;
  return data;
};

module.exports = convertImgToString;
