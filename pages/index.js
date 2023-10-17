import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => { 
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Creating worksheet...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("HTMLizing...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
      
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1 className="bigtitle">The Worksheet Engine</h1>
            <h2>by David Castro</h2>

          </div>
        </div>
        <div className="prompt-container">
        <textarea className={isGenerating ? "prompt-box loading" : "prompt-box"} placeholder="Paste your story/essay/report here and the AI will convert it into a worksheet. Note: Passages that are too long will break the engine." value={userInput} onChange={onUserChangedText} required/>
        <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button' }
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
<div className="App">

      {/* <PDFFile /> */}
    </div>
  {apiOutput && (
<article>
  <div className="output">
  <p>{userInput}</p>
    <div className="output-header-container">
      <div className="output-header">
        <h3>Worksheet</h3>
      </div>
    </div>
    <div className="output-content">
      <div dangerouslySetInnerHTML={{__html: apiOutput}}></div>
    </div>
  </div>
  </article>
)}

{/*  <div className="badge-container grow">
        <a>
          <div className="badge">
            <p>Made by David Castro</p>
          </div>
        </a>
      </div>
    </div>
    */}
        </div>
      </div>
    </div>
  ); 

};
export default Home;
