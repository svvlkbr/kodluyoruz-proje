let scores = {};

function selectAnswer(question, color, element) {
  scores[question] = color;
  let images = element.parentElement.getElementsByTagName('img');
  for (let img of images) {
    img.classList.remove('selected');
  }
  element.classList.add('selected');
}

function nextQuestion(current) {
  document.getElementById('q' + current).classList.remove('active');
  document.getElementById('q' + (current + 1)).classList.add('active');
}

function previousQuestion(current) {
  document.getElementById('q' + current).classList.remove('active');
  document.getElementById('q' + (current - 1)).classList.add('active');
}

function showResult() {
  let requiredQuestions = [1, 2, 3, 4, 5];
  let answeredQuestions = Object.keys(scores).map(Number);
  let missingQuestions = requiredQuestions.filter(
    (q) => !answeredQuestions.includes(q)
  );
  if (missingQuestions.length > 0) {
    alert('Lütfen tüm sorulara bir cevap seçin');
    return;
  }

  let colorCounts = {};
  Object.values(scores).forEach((color) => {
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  });

  let bestColor = Object.keys(colorCounts).reduce((a, b) =>
    colorCounts[a] > colorCounts[b] ? a : b
  );

  document.getElementById('quiz').style.display = 'none';
  const result = document.getElementById('result');
  result.innerText = 'Senin rengin: ' + bestColor.toUpperCase();
  result.style.display = 'block';
  result.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
  scores = {};
  document.getElementById('result').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  const questions = document.querySelectorAll('.question');
  questions.forEach((q, index) => {
    q.classList.remove('active');
    if (index === 0) q.classList.add('active');
    const images = q.querySelectorAll('img');
    images.forEach((img) => img.classList.remove('selected'));
  });
}