import type { Handler } from '@netlify/functions'

const SYSTEM_PROMPT = `You are an HR assistant. Answer questions about leave, payroll, benefits, and company policies. If asked about anything outside HR scope, politely redirect the user to contact HR.`

export const handler: Handler = async (event) => {
  try{
    const body = event.body ? JSON.parse(event.body) : {}
    const { message, history } = body
    if(!message) return { statusCode: 400, body: JSON.stringify({ error: 'message required' }) }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT
    const key = process.env.AZURE_OPENAI_API_KEY
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT

    if(!endpoint || !key || !deployment){
      return { statusCode: 200, body: JSON.stringify({ reply: "This is a demo reply because Azure OpenAI keys are not configured." }) }
    }

    const { OpenAIClient, AzureKeyCredential } = require('@azure/openai')
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(key))

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history)? history.slice(-6).map((h:any)=> ({ role: h.from === 'user' ? 'user' : 'assistant', content: h.text })) : []),
      { role: 'user', content: message }
    ]

    const result = await client.getChatCompletions(deployment, { messages })
    const output = (result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content) || ''

    return { statusCode: 200, body: JSON.stringify({ reply: output }) }
  }catch(err){
    console.error(err)
    return { statusCode: 200, body: JSON.stringify({ reply: "Sorry, the assistant is unavailable right now." }) }
  }
}
