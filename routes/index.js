import express from 'express'
import {toArray} from 'lodash'
import knex from '../knex'
import requireToken from '../middlewares'
import {API_MENO_AHOJ, API_QR_USER} from '../constants/routes'

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

router.get(API_QR_USER, (req, res) => {
  requireToken()
  const params = 'xyz'
  res.render('show_qr', {params})
})

export default router
