import express from 'express'
import {toArray} from 'lodash'
import knex from '../knex'
import requireToken from '../middlewares'
import {API_MENO_AHOJ, API_QR_USER, API_ADD_FORM} from '../constants/routes'

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

const mapQRidToId = (QRid) => QRid

router.get(API_QR_USER,
  // RequireToken(),
  catchExceptions(async (req, res) => {
    const {QRid} = req.params
    // If(QRid === 'style.css'){res.send(style)}
    const id = mapQRidToId(QRid)
    const data = await knex.select().from('stuff').where('id', id).first()
    res.render('show_qr', {
      data,
      foto1: `data:image/jpeg;base64,${data.foto1.toString('base64')}`,
      foto2: `data:image/jpeg;base64,${data.foto2.toString('base64')}`,
    })
  })
)

router.get(API_ADD_FORM, async (req, res) => {
  const kategorie = toArray(await knex.select().from('categories'))
  const umiestnenia = toArray(await knex.select().from('places'))
  res.render('add_form', {kategorie, umiestnenia})
})

router.post(API_ADD_FORM, async (req, res) => {
  await knex('stuff').insert(req.body)
  res.render('add_form')
})

export default router
