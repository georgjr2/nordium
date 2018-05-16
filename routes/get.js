import express from 'express'
import {toArray} from 'lodash'
import knex from '../knex'
import * as routes from '../constants/routes'

const getRouter = express.Router()

getRouter.get(routes.API_ADD_STUFF, async (req, res) => {
  const kategorie = toArray(await knex.select().from('categories'))
  const umiestnenia = toArray(await knex.select().from('places'))
  res.render('add_stuff', {kategorie, umiestnenia})
})

export default getRouter
