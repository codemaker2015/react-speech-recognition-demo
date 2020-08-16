// import React from 'react'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// const Dictaphone = () => {
//   const { transcript, resetTranscript } = useSpeechRecognition()

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return null
//   }

//   return (
//     <div>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   )
// }
// export default Dictaphone

import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!'),
      matchInterim: true
    },
    {
      command: 'Yes',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  const { transcript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }
  

  return (
    <div>
      <button onClick={SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <p>{message}</p>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone