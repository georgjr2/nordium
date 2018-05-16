import express from 'express'
import {toArray} from 'lodash'
import knex from '../knex'
import * as routes from '../constants/routes'


const addRouter = express.Router()


addRouter.post(routes.API_ADD_STUFF, async (req, res) => {
  await knex('stuff').insert(req.body)
  const kategorie = toArray(await knex.select().from('categories'))
  const umiestnenia = toArray(await knex.select().from('places'))
  res.render('add_stuff', {kategorie, umiestnenia})
})

export default addRouter

