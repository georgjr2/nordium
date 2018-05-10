import express from 'express'
import knex from '../knex'
import * as routes from '../constants/routes'


const addRouter = express.Router()


addRouter.post(routes.API_ADD_STUFF, async (req, res) => {
  await knex('stuff').insert(req.body)
  res.render('add_stuff')
})

export default addRouter

