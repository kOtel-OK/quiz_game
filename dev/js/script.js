(function(){
  
  class Question {
    constructor(question, answers, correct) {
      this.question = question;
      this.answers = answers;
      this.correct = correct;
    }
  }

  let totalScore = 0,
      questionWindow = document.querySelector('.question_window');

  const q1 = new Question('What is the season follows after winter?', {
    a1: 'spring',
    a2: 'summer'
  }, 'spring');

  const q2 = new Question('What is the name of the first black president of the US?', {
    a1: 'Omar',
    a2: 'Barak'
  }, 'Barak');

  const q3 = new Question('What is the most common operating system in the world?', {
    a1: 'Linux',
    a2: 'MAC',
    a3: 'Windows'
  }, 'Windows');
  




  let questionsArray = [q1, q2, q3];

  document.querySelector('.start').addEventListener('click', startGame);
 
  
  //Start Game
  function startGame() {
    document.querySelector('.start_window').classList = 'd-none'; //убирам начальный экран
    questionWindow.classList.add('d-block'); //выводим игровой экран
    game(); //запускаем игру
  }
  
  //Game
  function game() {

    let randomQuestion, 
        currentQuestion,
        currentAnswers,
        currentCorrect,
        form = document.forms["question"];

    function nextQuestion() {
      let checkButton = document.getElementById('check_button'),
          questionVariantBody = document.querySelector('.question_variant');
      
      questionWindow.querySelector('.score span').textContent = totalScore;
      
      
      if (questionsArray.length > 0) {
        
        randomQuestion = Math.floor(Math.random() * (questionsArray.length)); //рандомное число по кл-ву элем в массиве
        currentQuestion = questionsArray[randomQuestion]; //выбираем рандомно вопрос (здесь он объект)
        currentAnswers = currentQuestion.answers; //объект с вариантами ответов
        currentCorrect = currentQuestion.correct; //правильный ответ
          
        questionVariantBody.textContent = ''; //очищаем DIV с вариантами ответа   
        document.querySelector('.question').textContent = currentQuestion.question; //выводим вопрос
        
    

        for (let key in currentAnswers){ //по кол-ву ответов строим список вариантов и выводим на страницу
          let div = document.createElement('div'),
              label = document.createElement('label'),
              input = document.createElement('input');

          input.setAttribute('type', 'radio');
          input.setAttribute('name', 'question');
          label.textContent = currentAnswers[key];
          questionVariantBody.appendChild(div)
                             .appendChild(label)
                             .appendChild(input);
        }
        
        checkButton.setAttribute('disabled', 'disabled');
        
        form.addEventListener('change', function() {
          checkButton.removeAttribute('disabled');
        })
        
         checkButton.addEventListener('click', checkAnswer); //проверяем ответ
        
      } else {
//        alert(`Game Over! Yout total: ${totalScore}`);
          checkButton.removeEventListener('click', checkAnswer);
        }
    }

    function checkAnswer() { //проверка ответа
      let formInputs = form.querySelectorAll('input'), //находим все варианты ответов
          checkedInput;

      deleteQuestion = randomQuestion !== 0 ? randomQuestion : randomQuestion + 1; //проверяем какой элемент в массиве ответов нужно удалить после того, как ответ получен

      for (let i = 0; i < formInputs.length; i++) { //проверяем по вариантам, какой ответ выбран
        checkedInput = formInputs[i].checked ? formInputs[i].labels[0].textContent : checkedInput; //запоминаем текст из <label> в переменной checkedInput
      }

      if (checkedInput === currentCorrect) { //сравниваем выбранный ответ с правильным и если верно, то
        totalScore++; //увеличиваем totalScore на 1
        alert(`Rigt answer! Yout total: ${totalScore}`); 
      } 
      
      questionsArray.splice(randomQuestion, deleteQuestion); //удаляем вопрос из массива
      nextQuestion();
    }
      
    nextQuestion();

  }

}());

  
  
  
  
  
  
  
  
  
  
  
  
  
  