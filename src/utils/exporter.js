const { Parser } = require('json2csv');

exports.exportToJSON = (records) => records;

exports.exportToCSV = (records) => {
  const parser = new Parser();
  return parser.parse(records);
};
