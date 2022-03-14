import express from 'express'

import { addComment } from '../controllers/Comments.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.patch('/post/:id', auth, addComment)

export default router