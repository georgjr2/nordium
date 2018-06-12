import express from 'express'
import knex from '../knex'
import * as routes from '../constants/routes'


const addRouter = express.Router()


addRouter.post(routes.API_ADD_SEEDS, async (req, res) => {
  const {body} = req
  await knex('seeds').insert(body)
  res.render('success', {json: JSON.stringify(body)})
})

addRouter.post(routes.API_ADD_SUPPLIER, async (req, res) => {
  const {body} = req
  await knex('supplier').insert(body)
  res.render('success', {json: JSON.stringify(body)})
})

addRouter.post(routes.API_ADD_POSITION, async (req, res) => {
  const {body} = req
  await knex('position').insert(body)
  res.render('success', {json: JSON.stringify(body)})
})

addRouter.post(routes.API_ADD_FOOD, async (req, res) => {
  const {body} = req
  await knex('food').insert(body)
  res.render('success', {json: JSON.stringify(body)})
})

export default addRouter

