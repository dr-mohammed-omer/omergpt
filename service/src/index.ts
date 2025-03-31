import express from 'express'
import type { RequestProps } from './types'
import type { ChatMessage } from './chatgpt'
import { chatConfig, chatReplyProcess, currentModel } from './chatgpt'
import { auth } from './middleware/auth'
import { limiter } from './middleware/limiter'
import { isNotEmptyString } from './utils/is'
import { authService } from './services/auth'
import { chatService } from './services/chat'

const app = express()
const router = express.Router()

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body
    const result = await authService.register({ username, password, email })
    res.json({ status: 'Success', message: 'Registration successful', data: result })
  }
  catch (error) {
    res.status(400).json({ status: 'Fail', message: error.message, data: null })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await authService.login({ username, password })
    res.json({ status: 'Success', message: 'Login successful', data: result })
  }
  catch (error) {
    res.status(401).json({ status: 'Fail', message: error.message, data: null })
  }
})

router.post('/chat-process', [auth, limiter], async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')

  try {
    const { prompt, options = {}, systemMessage, temperature, top_p } = req.body as RequestProps
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const user = token ? await authService.verifyToken(token) : null

    let firstChunk = true
    let responseText = ''

    await chatReplyProcess({
      message: prompt,
      lastContext: options,
      process: (chat: ChatMessage) => {
        res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
        firstChunk = false
        responseText = chat.text
      },
      systemMessage,
      temperature,
      top_p,
    })

    // Save chat history if user is authenticated
    if (user) {
      await chatService.saveChat({
        userId: user.id,
        prompt,
        response: responseText,
        conversationId: options.conversationId,
        parentMessageId: options.parentMessageId,
        systemMessage,
        temperature,
        top_p,
      })
    }
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
  }
})

router.post('/config', auth, async (req, res) => {
  try {
    const response = await chatConfig()
    res.send(response)
  }
  catch (error) {
    res.send(error)
  }
})

router.post('/session', async (req, res) => {
  try {
    const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
    const hasAuth = isNotEmptyString(AUTH_SECRET_KEY)
    res.send({ status: 'Success', message: '', data: { auth: hasAuth, model: currentModel() } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body as { token: string }
    if (!token)
      throw new Error('Secret key is empty')

    if (process.env.AUTH_SECRET_KEY !== token)
      throw new Error('密钥无效 | Secret key is invalid')

    res.send({ status: 'Success', message: 'Verify successfully', data: null })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

router.get('/chat-history', auth, async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const user = await authService.verifyToken(token)
    const history = await chatService.getChatHistory(user.id)
    res.json({ status: 'Success', message: '', data: history })
  }
  catch (error) {
    res.status(401).json({ status: 'Fail', message: error.message, data: null })
  }
})

router.get('/chat-history/:conversationId', auth, async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const user = await authService.verifyToken(token)
    const history = await chatService.getChatByConversation(user.id, req.params.conversationId)
    res.json({ status: 'Success', message: '', data: history })
  }
  catch (error) {
    res.status(401).json({ status: 'Fail', message: error.message, data: null })
  }
})

router.delete('/chat-history/:chatId', auth, async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const user = await authService.verifyToken(token)
    await chatService.deleteChat(user.id, parseInt(req.params.chatId))
    res.json({ status: 'Success', message: 'Chat deleted successfully', data: null })
  }
  catch (error) {
    res.status(401).json({ status: 'Fail', message: error.message, data: null })
  }
})

app.use('', router)
app.use('/api', router)
app.set('trust proxy', 1)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => globalThis.console.log(`Server is running on port ${PORT}`))
