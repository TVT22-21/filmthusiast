const pgPool = require('./connection');

const database = {
  INSERT_RATING: `
      INSERT INTO rated (idmovie, rating, ratingtext, ratingdate, person_idperson)
      SELECT
        $1 AS idmovie,
        $2 AS rating,
        $3 AS ratingtext,
        $4 AS ratingdate,
        p.idperson AS person_idperson
      FROM person p
      WHERE p.username = $5;
    `,
  GET_RATING: `
    SELECT r.idrated, r.idmovie, r.rating, r.ratingtext, r.ratingdate, p.username
    FROM rated r
    JOIN person p ON r.person_idperson = p.idperson
    WHERE p.username = $1;
  `,
  GET_RATINGID: `
    SELECT
      r.idmovie,
      r.idrated,
      r.idmovie,
      r.rating,
      r.ratingtext,
      r.ratingdate,
      p.username
    FROM rated r
    JOIN person p ON r.person_idperson = p.idperson
    WHERE r.idmovie = $1;
  `,
  GET_RATING_NUM: `SELECT
  r.idrated,
  r.idmovie,
  r.rating,
  r.ratingtext,
  r.ratingdate,
  p.username
FROM rated r
JOIN person p ON r.person_idperson = p.idperson
WHERE r.rating = $1;`,
CHECK_RATING_EXISTS: 'SELECT * from rated WHERE idmovie =$1',
DELETE_RATED: `DELETE FROM rated r
USING person p
WHERE r.person_idperson = p.idperson
AND r.idmovie = $1
AND p.username = $2;`,
DELETE_IDRATED:'DELETE FROM rated WHERE idrated =$1',
UPDATE_RATING: 'UPDATE rated SET rating = $1, ratingtext = $2 WHERE idrated =$3',
UPDATE_RATING_TEXT: 'UPDATE rated SET ratingtext = $1 WHERE idrated =$2',
GET_TOP_RATINGS: `
SELECT
    r.idrated,
    r.idmovie,
    r.rating,
    r.ratingtext,
    r.ratingdate,
    p.username
FROM
    rated r
JOIN
    person p ON r.person_idperson = p.idperson
ORDER BY
    r.rating DESC
LIMIT 5`,
GET_NEWEST_RATINGS:`
SELECT
r.idrated,
r.idmovie,
r.rating,
r.ratingtext,
r.ratingdate,
p.username
FROM
rated r
JOIN
person p ON r.person_idperson = p.idperson
ORDER BY
r.ratingdate DESC
LIMIT 5;`
};


//getRatingrating(5);
//getRatingid(4);
//getRating('niilo');
//addRating(3, 5, '111Hyvä leffa, asdasddasdasdasdoapsdkaspdkaspodkapsdkapsokdasd', new Date(), 'niilo');

async function addRating(idmovie, rating, ratingtext, ratingdate, username) {
  try {
    const result = await pgPool.query(database.INSERT_RATING, [idmovie, rating, ratingtext, ratingdate, username]);
    console.log("Arvostelu lisätty:", result);
  } catch (error) {
    console.error("Arvostelu epäonnistui", error);
  }
}

async function checkRatingExists(idmovie) {
    const result = await pgPool.query(database.CHECK_RATING_EXISTS, [idmovie]);
    return result.rows.length > 0;
}


async function getRating(username) {
  const result = await pgPool.query(database.GET_RATING, [username]);
  console.log("Arvostelu username:", result.rows);
  return result.rows;
}

async function getRatingid(idmovie) {
  const result = await pgPool.query(database.GET_RATINGID, [idmovie]);
  console.log("Arvostelu idmovie:", result.rows);
  return result.rows;
}
async function getRatingnum(rating){
  const result = await pgPool.query(database.GET_RATING_NUM, [rating]);
  console.log("Arvostelu rating:", result.rows);
  return result.rows;
}

async function deleteRated(idmovie, username){
  try{
    const result = await pgPool.query(database.DELETE_RATED, [idmovie, username]);
    if(result.rowCount > 0){
      console.log('Poisto onnistu');
    }else{
      console.log('Poisto epäonnistu');
    }
  }catch (error){
    console.error("Poisto epäonnistui:", error)
  }
}

async function deleteidRated(idrated){
  await pgPool.query(database.DELETE_IDRATED, [idrated]);
}

async function updateRating(rating, ratingtext, idrated){
  await pgPool.query(database.UPDATE_RATING, [rating, ratingtext, idrated])
}
async function updateRatingText(ratingtext, idrated){
  await pgPool.query(database.UPDATE_RATING_TEXT, [ratingtext, idrated])
}

async function topRating(){
  const result = await pgPool.query(database.GET_TOP_RATINGS)
  return result.rows;
}
async function newestRating(){
  const result = await pgPool.query(database.GET_NEWEST_RATINGS)
  return result.rows;
}
module.exports = { addRating, getRating, getRatingid, getRatingnum, checkRatingExists, deleteRated, deleteidRated, updateRating, updateRatingText, topRating, newestRating};