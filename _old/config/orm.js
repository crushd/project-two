var connection = require("./connection.js");

var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },




  insertOne: function(insertTable,insertColumns,columnValues, cb) {
    var queryString = "INSERT INTO ?? (??) VALUES (?)";
    connection.query(queryString,[insertTable,insertColumns,columnValues], function(err,result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    })
  },




  updateOne: function() {
    var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    connection.query(queryString,[updateTable,updateColumn,updateValue,conditionCol,conditionVal], function(err,result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    })
  }











  /*selectWhere: function(tableInput, colToSearch, valOfCol) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";

    console.log(queryString);

    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  leftJoin: function(whatToSelect, tableOne, tableTwo, onTableOneCol, onTableTwoCol) {
    var queryString = "SELECT ?? FROM ?? AS tOne";
    queryString += " LEFT JOIN ?? AS tTwo";
    queryString += " ON tOne.?? = tTwo.??";

    console.log(queryString);

    connection.query(queryString, [whatToSelect, tableOne, tableTwo, onTableOneCol, onTableTwoCol], function(
      err,
      result
    ) {
      if (err) throw err;
      console.log(result);
    });
  }*/



};

module.exports = orm;
