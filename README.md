# Welcome to Seinfeld Trivia!

Thanks for playing my trivia game! You will have **one minute** to answer **nine** questions about the television sitcom Seinfeld. This game will quiz you on how good know knowledge is about the show. 

Have fun and *try your best*! Click the Submit button when you are done, and your score will be tallied up at the end.

- Trivia Game https://eastwo0d7.github.io/TriviaGame/index.html

The problem for this assignment was to create a Trivia Game using javascript for the logic and jQuery for the HTML. Additionally, the game must include a timer, multiple choice or true/false questions, and logic that limits the user to one answer per question.

My approach was to create divs in the HTML that corresponded to the elements of the quiz which I needed to keep track of; the quiz itself, the questions answered correct, those answered incorrect, those unanswered, the the submit and start buttons. For my questions, I created an array where each question is an object with the question, a list of potential answers, and the correct answer. I then looped through that array in a function that buids the quiz with radio buttons.
I then created a function to display the results on the screen and highlight the questions which the user got correct in green, and the ones incorrect in red, and display the score on the page. I used 'hide' and 'show' functions to manipulate what appears on the page at what point during the game.