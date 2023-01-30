import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
//const basePromptPrefix = "generate a title of new korean love drama series for Netflix, setting: South Korea, and then write a detailed synopsis about this series where the protagonist name is:";
const basePromptPrefix = "Expand the following idea/thought and turn it into a debate topic:";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 100,
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
Create two characters that are debating against each other. Write the Statement at the start of the debate. The first character's name is Side One, and he will defend the Statement by speaking in detailed, persuasive and logical essays proving his point. The second character's name is Side Two, and he will argue against the Statement by speaking in persuasive and logical essays. Side Two is a bit aggressive.
Make them take two turns each. End the debate with an unbiased summary.
Statement: ${req.body.userInput}
Question: ${basePromptOutput.text}
The Debate:
  `
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
    // I also increase max_tokens.
    max_tokens: 1550,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;