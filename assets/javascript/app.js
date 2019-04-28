const quizContainer = document.getElementById('quiz');
const correctContainer = document.getElementById('correct');
const wrongContainer = document.getElementById('wrong');
const unansweredContainer = document.getElementById('unanswered');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');

var number = 61;
var intervalId;

$(document).ready(function(){
    $("#quiz").hide();
    $("#submit").hide();
    $("#startButton").show();
});

    $("#quiz").hide();
    $("#finished").hide();

    $("#startButton").on("click", function() {
        $("#quiz").show();
        $("#submit").show();
        $("#startButton").hide();
        decrement();
    });
    
    function decrement() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        number--;
        $("#showNumber").text("You have " + number + " seconds left.");

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
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            
            if(userAnswer!==currentQuestion.correctAnswer){
                numWrong++;
                answerContainers[questionNumber].style.color = 'red';
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
            // $("#quiz").hide();
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
            question: "What is Kramer's first name?",
            answers: {
                a: "Michael",
                b: "Cosmo",
                c: "Andrew",
                d: "John"
            },
            correctAnswer: "b"
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
            question: "What is the group's favorite TV show?",
            answers: {
                a: "Murphy Brown",
                b: "The Cosby Show",
                c: "Melrose Place",
                d: "The Golden Girls"
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
        },
        {
            question: "What is Jerry's favorite baseball team?",
            answers: {
                a: "New York Mets",
                b: "New York Yankees",
                c: "Boston Red Sox",
                d: "Cleveland Indians"
            },
            correctAnswer: "a"
        },
        {
            question: "What brand of golf ball does George pull out of the whale's blow hole?",
            answers: {
                a: "Srixon",
                b: "Callaway",
                c: "Titleist",
                d: "Top-Flite"
            },
            correctAnswer: "c"
        },
        {
            question: "Which cookie does Jerry mean when he says we should 'follow the cookie'?",
            answers: {
                a: "Sugar",
                b: "Chocolate Chip",
                c: "Oreo",
                d: "Black and White"
            },
            correctAnswer: "d"
        },
        {
            question: "What make/model car does George buy that he mistakenly thinks used to be Jon Voigt's car?",
            answers: {
                a: "Chrysler LeBaron",
                b: "Toyota Corrola",
                c: "Honda Accord",
                d: "Buick LeSabre"
            },
            correctAnswer: "a"
        }
    ];

buildQuiz();

submitButton.addEventListener('click', showResults);