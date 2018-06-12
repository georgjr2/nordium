import express from 'express'
import {toArray} from 'lodash'
import {get} from 'http-request'
import createError from 'http-errors'
import knex from '../knex'
import * as routes from '../constants/routes'

const getRouter = express.Router()
let spliting

getRouter.get(routes.API_ADD_SEEDS, async (req, res) => {
  const kategorie = toArray(await knex.select().from('supplier'))
  const umiestnenia = toArray(await knex.select().from('position'))
  res.render('add_seeds', {kategorie, umiestnenia})
})

getRouter.get(routes.API_ADD_SUPPLIER, async (req, res) => {
  res.render('add_supplier', {kategorie, umiestnenia})
})

getRouter.get(routes.API_ADD_POSITION, async (req, res) => {
  res.render('add_position', {kategorie, umiestnenia})
})

getRouter.get(routes.API_ADD_FOOD, async (req, res) => {
  res.render('add_food', {kategorie, umiestnenia})
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
