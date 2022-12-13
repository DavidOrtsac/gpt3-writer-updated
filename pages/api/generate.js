import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
//const basePromptPrefix = "generate a title of new korean love drama series for Netflix, setting: South Korea, and then write a detailed synopsis about this series where the protagonist name is:";
const basePromptPrefix = "generate a list of content ideas. list a minimum of 30 content ideas in bullet list.";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


/*  const secondPrompt = 
  `
  Take the character name and synopsis below and generate a script created in the style of Kim Won-seok. Make it feel like a movie. Don't just list the basic script. Include the description of the setting, a meet cute, and add conversations in the script:

  Character Name: ${req.body.userInput}

  Synopsis: ${basePromptOutput.text}

  Script:
  `
*/
  const secondPrompt = 
  `
  Refine the content ideas and include brand name and industry below. Make it unique. Then create a table with following columns - number, content title, media direction. Make sure the list is numbered and column 1 has a number. For the content title, write a catchy title in the style of Apple. For the media direction, include detailed instruction on what graphics or video to create based on the content idea. 

  Brand Name and Industry: ${req.body.userInput}

  Content Ideas: ${basePromptOutput.text}
  `
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
    // I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;