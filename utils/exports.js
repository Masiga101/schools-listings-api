//require database operations module

const insertData = require('../db-operations/insert-data')
const createTable = require('../db-operations/create-table')
const fetchData = require('../db-operations/fetch-data')
const updateData = require('../db-operations/update-data')
const deleteData = require('../db-operations/delete-data')

module.exports = {
    insertData,
    createTable,
    fetchData,
    updateData,
    deleteData
}