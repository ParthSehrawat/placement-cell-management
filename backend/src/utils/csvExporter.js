const { format } = require('@fast-csv/format');

const toCsv = (rows) => {
  const csvStream = format({ headers: true });
  rows.forEach((row) => csvStream.write(row));
  csvStream.end();
  return csvStream;
};

module.exports = { toCsv };


