const quizContainer = document.getElementById('quiz');
const correctContainer = document.getElementById('correct');
const wrongContainer = document.getElementById('wrong');
const unansweredContainer = document.getElementById('unanswered');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');

var number = 60;
var intervalId;

// $(document).ready(function(){
//     $("#quiz").hide();
//     $("#sumbmit").hide();
//     $("#startButton").show();
// });

    $("#quiz").hide();
    $("#finished").hide();

    $("#startButton").on("click", function() {
        $("#quiz").show();
        $("#sumbmit").show();
        $("#startButton").hide();
        decrement();
    });
    
    function decrement() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        number--;
        $("#showNumber").text("You have " + number + " seconds left.");
        console.log("You have " + number + " seconds left.");

        if (number === 0) {
            showResults();
            clearInterval(intervalId);
            $("h2").show();
            $("#submitButton").hide();
            $("#quiz").hide();
            $("#showNumber").hide();
        }
    }
    
    
    function buildQuiz(){
        const output = [];
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
                const answers = [];
                for(letter in currentQuestion.answers){
                    answers.push(
                        `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                        </label>`
                    );
                }
                    output.push(
                        `<div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join('')} </div>`
                    );
            }
        );
        quizContainer.innerHTML = output.join('');
    }

    
            
    function showResults(){
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;
        let numWrong = 0;
        let numUnanswered = 0;
        
        myQuestions.forEach( (currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = 'input[name=question'+questionNumber+']:checked';
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            if(userAnswer===currentQuestion.correctAnswer){
                numCorrect++;
            }
            
            
            if(userAnswer!==currentQuestion.correctAnswer){
                numWrong++;
            } 
            
            if(userAnswer==null) {
                numUnanswered++;
            }
        });
        
        wrongContainer.innerHTML ='You got ' + numWrong + ' out of ' + myQuestions.length + ' wrong.';
        correctContainer.innerHTML ='You got ' + numCorrect + ' out of ' + myQuestions.length + ' correct.';
        unansweredContainer.innerHTML ='You left ' + numUnanswered + ' out of ' + myQuestions.length + ' unanswered.';

        $("#submitButton").on("click", function() {
            $("h2").show();
            $("#submitButton").hide();
            $("#quiz").hide();
            $("#showNumber").hide();

            clearInterval(intervalId);
        });

    }
            
    const myQuestions = [
        {
            question: "Who is Jerry's mailman?",
            answers: {
                a: "Art Vandelay",
                b: "Kramer",
                c: "Newman"
            },
            correctAnswer: "c"
        },
        {
            question: "What would you call someone who is against dentists?",
            answers: {
                a: "Anti-Dentite",
                b: "Dentalist",
                c: "Dentizer"
            },
            correctAnswer: "a"
        },
        {
            question: "What is George's dream occupation?",
            answers: {
                a: "Latex Salesman",
                b: "Architect",
                c: "Nothing",
                d: "Baseball Player"
            },
            correctAnswer: "b"
        }
    ];

buildQuiz();

submitButton.addEventListener('click', showResults);