const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

const cohortName = process.argv[2] || 'FEB12';
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

return pool.query(queryString, values).then((res) => console.log(res.rows));