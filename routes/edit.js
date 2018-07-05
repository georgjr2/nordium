import express from 'express'
import * as routes from '../constants/routes'

const editRouter = express.Router()

editRouter.put(routes.API_EDIT_SEEDS, async (req, res) => {
  const {body} = req
  const {id} = req.params
  await knex('seeds').where('SeedID', id).update(body)
  res.render('success', {json: JSON.stringify(body)})
})

export default editRouter
