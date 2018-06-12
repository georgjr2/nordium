import express from 'express'
import addRouter from './add'
import getRouter from './get'
import editRouter from './edit'
import listRouter from './list'
import knex from '../knex'
import {catchExceptions} from '../middlewares'
import {API_QR_USER} from '../constants/routes'

const router = express.Router()

/* GET home page. */

getRouter.get('/', async (req, res) => {
  res.render('login_page')
})

router.use(addRouter)
router.use(getRouter)
router.use(editRouter)
router.use(listRouter)


const mapQRidToId = (QRid) => QRid

router.get(API_QR_USER,
  catchExceptions(async (req, res) => {
    const {QRid} = req.params
    const id = mapQRidToId(QRid)
    const data = await knex.select().from('seeds').where('SeedID', id).first()
    res.render('show_qr', {
      data,
      // Foto1: `data:image/jpeg;base64,${data.foto1.toString('base64')}`,
    })
  })
)

export default router
