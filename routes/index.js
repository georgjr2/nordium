import express from 'express'
import {toArray} from 'lodash'
import knex from '../knex'
import {API_MENO_AHOJ} from '../constants/routes'

const router = express.Router()

/* GET home page. */

router.get('/', async (req, res) => {
  const places = toArray(await knex.select().from('places'))
  const cats = toArray(await knex.select().from('categories'))
  const stuff = toArray(await knex.select().from('stuff'))
  const users = toArray(await knex.select().from('users'))
  res.render('index', {title: 'Ahoj', places, cats, stuff, users})
})

router.get(API_MENO_AHOJ, (req, res) => {
  const {name} = req.params
  res.render('index', {title: 'Ahoj', params: name})
})

export default router
