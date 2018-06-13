import express from 'express'
import {toArray} from 'lodash'
import {get} from 'http-request'
import createError from 'http-errors'
import knex from '../knex'
import * as routes from '../constants/routes'

const getRouter = express.Router()
let spliting

getRouter.get(routes.API_LIST_SEEDS, async (req, res) => {
  const seeds = toArray(await knex.select().from('seeds'))
  res.render('zoznam', {seeds})
})

getRouter.get(routes.API_ADD_SEEDS, async (req, res) => {
  const supplier = toArray(await knex.select().from('supplier'))
  const position = toArray(await knex.select().from('position'))
  const food = toArray(await knex.select().from('food'))
  const country = toArray(await knex.select().from('apps_countries'))
  res.render('add_seeds', {supplier, position, food, country})
})

getRouter.get(routes.API_ADD_SUPPLIER, async (req, res) => {
  res.render('add_supplier')
})

getRouter.get(routes.API_ADD_POSITION, async (req, res) => {
  res.render('add_position')
})

getRouter.get(routes.API_ADD_FOOD, async (req, res) => {
  res.render('add_food')
})

getRouter.get(routes.API_EDIT_SEEDS, async (req, res) => {
  const {id} = req.params
  const current = await knex.select().from('seeds').where('SeedID', id).first()
  const supplier = toArray(await knex.select().from('supplier'))
  const position = toArray(await knex.select().from('position'))
  const food = toArray(await knex.select().from('food'))
  const country = toArray(await knex.select().from('apps_countries'))
  res.render('edit_seeds', {current, supplier, position, food, country})
})

getRouter.get(routes.API_EDIT_SUPPLIER, async (req, res) => {
  res.render('edit_supplier')
})

getRouter.get(routes.API_EDIT_POSITION, async (req, res) => {
  res.render('edit_position')
})

getRouter.get(routes.API_EDIT_FOOD, async (req, res) => {
  res.render('edit_food')
})

getRouter.get(routes.API_SHOW_SENSOR, async (req, res) => {
  await get('http://192.168.88.202:3000/senzor', (err, res) => {
    if (err) createError(500)
    const combin = (res.buffer).toString('utf-8')
    spliting = combin.split(',')
  })
  res.render('sensors', {temp: Number(spliting[0]).toFixed(2), humid: Number(spliting[1]).toFixed(2)})
})


export default getRouter
