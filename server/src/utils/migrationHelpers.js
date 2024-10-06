const columnCache = {};

async function columnExists(knex, tableName, columnName) {
  if (!columnCache[tableName]) {
    const columns = await knex.table(tableName).columnInfo();
    columnCache[tableName] = Object.keys(columns);
  }
  return columnCache[tableName].includes(columnName);
}

async function addColumnIfNotExists(knex, tableName, columnName, columnDefinition) {
  const exists = await columnExists(knex, tableName, columnName);
  if (!exists) {
    await knex.schema.table(tableName, (t) => {
      columnDefinition(t);
    });
    console.log(`Added column ${columnName} to ${tableName} table`);
  } else {
    console.log(`Column ${columnName} already exists in ${tableName} table`);
  }
}

module.exports = {
  columnExists,
  addColumnIfNotExists
};