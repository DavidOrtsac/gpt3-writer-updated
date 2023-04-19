import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
  `Essay/Story:\n${req.body.userInput}
Choices and Answers:\n${basePromptOutput.text}

Follow the instructions below:
1. I want you to place the entire essay/story and its questions, choices, and answers in an HTML file with a modern, clean, beautiful, and simple CSS design.
2. The text must always be black and readable. Do not change the font.
3. Do not style the body.
4. The essay/story must be placed in a box.
5. Each question must be placed in a curved box.
6. Each of the choices must be placed under their respective questions, in a curved box.
7. The answer must be placed in a box under their respective choices. It's class name is "answerBox". DO NOT STYLE THE ANSWERBOX.
8. Do not put shadows.

HTML and CSS code:\n
  `
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.8,
    max_tokens: 2550,
  });
  
  // Grab output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;