import { pool } from "../db/index.js";

export async function getShoppingList() {
  const data = await pool.query("SELECT * FROM shopping;");
  console.log("The shopping list is", data.rows);
  return data.rows;
}

export async function postListItem(listItem) {
  const { item, completed } = listItem;
  const data = await pool.query(
    `INSERT INTO shopping (
      item,
      completed
    ) VALUES ($1,$2) RETURNING *;`,
    [item, completed]
  );
  return data.rows[0];
}

export async function deleteAll() {
  await pool.query(`DELETE FROM shopping`);
  return 'deleted';
}

export async function updateCompleted(id) {
  const data = await pool.query(
    `UPDATE shopping SET completed = NOT completed WHERE id = $1 RETURNING *;`, [id]);
  return data.rows[0];
}
