import express from 'express'
import {toArray} from 'lodash'
import {get} from 'http-request'
import createError from 'http-errors'
import knex from '../knex'
import * as routes from '../constants/routes'

const getRouter = express.Router()
let humid
let temp

getRouter.get(routes.API_ADD_STUFF, async (req, res) => {
  const kategorie = toArray(await knex.select().from('categories'))
  const umiestnenia = toArray(await knex.select().from('places'))
  res.render('add_stuff', {kategorie, umiestnenia})
})


getRouter.get(routes.API_SHOW_SENSOR, async (req, res) => {
  await get('http://192.168.88.202:3000/senzor', (err, res) => {
    if (err) createError(400)
    const combin = (res.buffer).toString('utf-8')
    humid = combin.split(',')
  })
  res.render('sensors', {temp: Number(humid[0]).toFixed(2), humid: Number(humid[1]).toFixed(2)})
})

export default getRouter
