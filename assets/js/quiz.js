function checkQuiz() {
    // Array of correct answers
    const answers = {
        q1: 'B',
        q2: 'A',
        q3: 'C',
        q4: 'D',
        q5: 'C',
        // Add the rest of your answers here
    };

    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    // Loop through each question
    for (let question in answers) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);

        // Check if an answer is selected and matches the correct one
        if (userAnswer && userAnswer.value === answers[question]) {
            score++;
        }
    }

    // Display the result
    const resultDiv = document.getElementById('result');
    const percentage = (score / totalQuestions) * 100;
    let message = `You got ${score} out of ${totalQuestions} correct! (${percentage}%)`;

    if (percentage === 100) {
        message += " Excellent work!";
    } else if (percentage >= 75) {
        message += " Great job!";
    } else if (percentage >= 50) {
        message += " You can do better!";
    } else {
        message += " Keep studying!";
    }

    resultDiv.innerHTML = message;
}
