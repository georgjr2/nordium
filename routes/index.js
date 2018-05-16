import express from 'express'
import {toArray} from 'lodash'
import addRouter from './add'
import getRouter from './get'
import editRouter from './edit'
import listRouter from './list'
import knex from '../knex'
import {catchExceptions} from '../middlewares'
import {API_QR_USER} from '../constants/routes'

const router = express.Router()

/* GET home page. */

router.get('/', async (req, res) => {
  const places = toArray(await knex.select().from('places'))
  const cats = toArray(await knex.select().from('categories'))
  const stuff = toArray(await knex.select().from('stuff'))
  const users = toArray(await knex.select().from('users'))
  res.render('index', {title: 'Ahoj', places, cats, stuff, users})
})

router.use(addRouter)
router.use(getRouter)
router.use(editRouter)
router.use(listRouter)


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

export default router
