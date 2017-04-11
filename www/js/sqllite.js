var db = null;
var sqlite = angular.module('sqlite', ['ionic', 'ngCordova']);

sqlite.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS chats (id integer primary key, firstname varchar(10), lastname varchar(10), especialidades varchar(16), email varchar(16))");
  });
});


sqlite.factory('profissionalSQLFactory', function($cordovaSQLite) {
  return {
    insert : function(firstname, lastname, especialidades, email) {
      var query = "INSERT INTO chats (firstname, lastname, especialidades, email) VALUES (?, ?, ?, ?);";
      var values = [firstname, lastname, especialidades, email];

      $cordovaSQLite.execute(db, query, values).then(
        function(res) {
          console.log('INSERTED ID: '+res.insertId);
        },
        function(err) {
          console.log('ERROR: '+err);
        }
      );
    },
    select : function(id) {
      var query = "SELECT * FROM chats WHERE id=?";
      var values = [id];

      $cordovaSQLite.execute(db, query, values).then(
        function(res) {
          if (res.rows.length > 0) {
            var first = res.rows.item(0);
            console.log(res.rows.length + ' records, fist: ' + first.firstname + ' ' + first.lastname + ' - ' + first.especialidades);
          } else {
            console.log('No records found');
          }
        }
      );
    }
  }
});