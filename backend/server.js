require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT } = process.env

const app = express()
app.use(cors())
app.use(bodyParser.json())

const SYSTEM_PROMPT = `You are an HR assistant. Answer questions about leave, payroll, benefits, and company policies. If asked about anything outside HR scope, politely redirect the user to contact HR.`

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {}
  if(!message) return res.status(400).json({ error: 'message required' })

  // Fallback demo reply when Azure vars are not provided
  if(!AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_API_KEY || !AZURE_OPENAI_DEPLOYMENT){
    return res.json({ reply: "This is a demo reply because Azure OpenAI keys are not configured." })
  }

  try{
    const { OpenAIClient, AzureKeyCredential } = require('@azure/openai')
    const client = new OpenAIClient(AZURE_OPENAI_ENDPOINT, new AzureKeyCredential(AZURE_OPENAI_API_KEY))

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      // include recent history if provided
      ...(Array.isArray(history)? history.slice(-6).map(h => ({ role: h.from === 'user' ? 'user' : 'assistant', content: h.text })) : []),
      { role: 'user', content: message }
    ]

    const result = await client.getChatCompletions(AZURE_OPENAI_DEPLOYMENT, { messages })
    const output = (result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content) || ''

    res.json({ reply: output })
  }catch(err){
    console.error('chat error', err)
    res.json({ reply: "Sorry, I couldn't get a response from the assistant." })
  }
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('Backend listening on', port))
