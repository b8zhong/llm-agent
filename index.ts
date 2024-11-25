import 'dotenv/config'
import {runLLM} from './src/llm'
import {getMessages} from './src/memory'

const userMessage = process.argv[2]

if (!userMessage) {
	console.error('Please provide a message')
	process.exit(1)
}

const messages = await getMessages()
const response = await runLLM({
	messages: [
		...messages,
		{role: 'user', content: userMessage}
	]
})

console.log(response)