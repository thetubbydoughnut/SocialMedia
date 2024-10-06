// Cache object to store column information
const columnCache = {};

// Helper function to check if a column exists
async function columnExists(knex, tableName, columnName) {
  if (!columnCache[tableName]) {
    // If the table's columns aren't cached, fetch and cache them
    const columns = await knex.table(tableName).columnInfo();
    columnCache[tableName] = Object.keys(columns);
  }
  return columnCache[tableName].includes(columnName);
}

exports.up = async function(knex) {
  // List of columns to add
  const columnsToAdd = [
    { name: 'imageUrl', type: 'string' },
    // Add any other new columns here
  ];

  return knex.schema.table('posts', async function(table) {
    for (const column of columnsToAdd) {
      const exists = await columnExists(knex, 'posts', column.name);
      if (!exists) {
        table[column.type](column.name);
        console.log(`Added column ${column.name} to posts table`);
      } else {
        console.log(`Column ${column.name} already exists in posts table`);
      }
    }
  });
};

exports.down = async function(knex) {
  // List of columns to remove (should match the columns added in the 'up' function)
  const columnsToRemove = ['imageUrl'];

  return knex.schema.table('posts', async function(table) {
    for (const columnName of columnsToRemove) {
      const exists = await columnExists(knex, 'posts', columnName);
      if (exists) {
        table.dropColumn(columnName);
        console.log(`Removed column ${columnName} from posts table`);
      } else {
        console.log(`Column ${columnName} does not exist in posts table`);
      }
    }
  });
};