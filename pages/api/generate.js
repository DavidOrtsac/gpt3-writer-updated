import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
//const basePromptPrefix = "generate a title of new korean love drama series for Netflix, setting: South Korea, and then write a detailed synopsis about this series where the protagonist name is:";
const basePromptPrefix = `You are a detailed and powerful, intelligent English teacher for stories and essays. Your goal is to analyze and then make worksheet questions and solution keys for stories and essays.
Essay or Story. Analyze the story or essay. Then, create 4 difficult multiple-choice questions and solutions based on the essay and 2 true/false questionnaires with answers, and 1 essay question portion:\n`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}\n${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 800,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


/*  const secondPrompt = 
  `
  Then, place the entire essay or story and its questions, choices, and answers in an HTML file with a modern CSS design inside style tags. The text must always be black. The background must always be white. The font must be Times New Roman. The essay or story must be in a box. Each question and choices must be inside their own curved boxes.
  THERE MUST BE A JAVASCRIPT BUTTON THAT, WHEN CLICKED, REVEALS THE ANSWERS FOR EACH QUESTION. Each answer, when revealed, must be in a separate outlined, curved box:
Essay/Story:\n${req.body.userInput}
Choices and Answers:\n${basePromptOutput.text}
HTML and CSS code:\n
  `
*/
const secondPrompt = 
  `
  Then, place the entire essay or story and its questions, choices, and answers in an HTML file with a modern CSS design inside style tags. The text must always be black. The background must always be white. The essay or story must be in a box. Each question and choices must be inside their own curved boxes. DO NOT put shadows. The answer must be in a curved box. The whole document must be inside a black-bordered curved box.
Essay/Story:\n${req.body.userInput}
Choices and Answers:\n${basePromptOutput.text}
HTML and CSS code:\n
  `
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
    // I also increase max_tokens.
    max_tokens: 2550,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;