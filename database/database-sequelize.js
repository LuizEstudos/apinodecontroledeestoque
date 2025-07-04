import dotenv from 'dotenv/config'

import { Sequelize } from 'sequelize'

const pe = process.env

const db_sequelize = new Sequelize( pe.PGDATABASE, pe.PGUSER, pe.PGPASSWORD, {
    host : pe.PGHOST,
    dialect : 'postgres',
    ssl : 'require'
} )

export default db_sequelize