import Head from 'next/head';
import Image from 'next/image';
import dashoContentLogo from '../assets/DOC - square logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <Image src={dashoContentLogo} alt="dashocontent logo" />
            <h1>Dash of Content Ideas</h1>
          </div>
          <div className="header-subtitle">
            <h2>Stumped and out of content? Write your brand name and offer below and let's generate a list of content ideas:</h2>
          </div>
            <br/><br/>
            Example: DashoContent, a content subscription platform
        </div>
        {}
        <div className="prompt-container">
                  <textarea
          className="prompt-box"
          placeholder="start typing here"
          value={userInput}
          onChange={onUserChangedText}
        />;
      <div className="prompt-buttons">
      <a className="generate-button" onClick={callGenerateEndpoint}>
        <div className="generate">
          {isGenerating ? <span class="loader"></span> : <p>Generate Ideas</p>}
        </div>
      </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Here are some Content Ideas:</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}



        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://dashocontent.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={dashoContentLogo} alt="dashocontent logo" />
            <p>create with dashocontent</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
