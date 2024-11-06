document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quizForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;
        let score = 0;

        document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
        successMessage.style.display = 'none';
        document.querySelectorAll('.correct-answer').forEach(answer => answer.style.display = 'none');

        if (!/^[A-Za-z]+$/.test(firstName.value.trim())) {
            document.getElementById('firstNameError').style.display = 'inline';
            valid = false;
        }
        if (!/^[A-Za-z]+$/.test(lastName.value.trim())) {
            document.getElementById('lastNameError').style.display = 'inline';
            valid = false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
            document.getElementById('emailError').style.display = 'inline';
            valid = false;
        }
        const q1Answer = document.querySelector('input[name="question1"]:checked');
        if (q1Answer && q1Answer.value === "let") {
            score += 1;
            displayAnswerFeedback("question1", true);
        } else {
            displayAnswerFeedback("question1", false, "let");
        }

        const q2Answers = Array.from(document.querySelectorAll('input[name="question2"]:checked')).map(input => input.value);
        if (arraysEqual(q2Answers.sort(), ["String", "Boolean"].sort())) {
            score += 1;
            displayAnswerFeedback("question2", true);
        } else {
            displayAnswerFeedback("question2", false, "String, Boolean");
        }

        const q3Answer = document.getElementById("question3").value.trim().toLowerCase();
        if (q3Answer === "object") {
            score += 1;
            displayAnswerFeedback("question3", true);
        } else {
            displayAnswerFeedback("question3", false, "object");
        }

        const q4Answers = Array.from(document.querySelectorAll('input[name="question4"]:checked')).map(input => input.value);
        if (arraysEqual(q4Answers.sort(), ["React", "Vue"].sort())) {
            score += 1;
            displayAnswerFeedback("question4", true);
        } else {
            displayAnswerFeedback("question4", false, "React, Vue");
        }

        const q5Answer = document.querySelector('input[name="question5"]:checked');
        if (q5Answer && q5Answer.value === "push") {
            score += 1;
            displayAnswerFeedback("question5", true);
        } else {
            displayAnswerFeedback("question5", false, "push");
        }

        if (valid) {
            successMessage.textContent = `Congratulations! You scored ${score} out of 5 points.`;
            successMessage.style.display = 'block';
        }
    });

    function displayAnswerFeedback(questionId, isCorrect, correctAnswer = '') {
        const answerDisplay = document.querySelector(`.question-container [name="${questionId}"]`).closest(".question-container").querySelector(".correct-answer");
        answerDisplay.style.display = "block";
        if (isCorrect) {
            answerDisplay.style.color = "green";
            answerDisplay.innerHTML = "Correct!";
        } else {
            answerDisplay.style.color = "red";
            answerDisplay.innerHTML = `Incorrect. Correct answer: ${correctAnswer}`;
        }
    }

    function arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    [firstName, lastName, email].forEach(input => {
        input.addEventListener('input', () => {
            if (/^[A-Za-z]+$/.test(input.value.trim()) || /^\S+@\S+\.\S+$/.test(email.value.trim())) {
                document.getElementById(`${input.id}Error`).style.display = 'none';
            }
        });
    });
});
