const db = require('./database');

db.run('DELETE FROM sqlite_sequence', (err) => {
  if (err) throw err;
  console.log('Successfully reset all tables sequence!');
});