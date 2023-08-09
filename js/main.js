document.addEventListener('DOMContentLoaded', () => {

  const dateIm = document.querySelector('#date');
  const dateToday = new Date();
  const btn = document.querySelector('#add')

  
//   Защита от дурака - проверка на то, что если даты больше или меньше иходной даты
  function dateCheck (){
    const num =  parseDate();
    if (num[1] > num[0]){
        const value = getInputValues();
        let startYear = value[0].getFullYear();
        let endYear = value[1].getFullYear();
        return startYear, endYear;
    } else {
        const value = getInputValues();
        let startYear = value[1].getFullYear();
        let endYear = value[0].getFullYear();
        return [startYear, endYear];
    }

  }


  // Функция для проверки високосного года
  function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function getInputValues() {
    const value1 = new Date (dateIm.value);
    const value2 = dateToday;

      return [value1, value2]
  }

  function parseDate() {
    const getDate = getInputValues();
    value1 = Date.parse(getDate[0]) 
    value2 = Date.parse(getDate[1])

    return [value1, value2]
  }

  function calculate() {
    const values = parseDate();

    if (values[0] > values[1]){
      const result = values[0] - values[1];
      return result
    } else {
        const result = values[1] - values[0];
        return result        
    }
  }

  function reverseDate() {
    const resultCalc = calculate();

    // Коэфициенты деления
    const kYear = 365 * 24 * 60 * 60 * 1000;
    const kDay = 24 * 60 * 60 * 1000;
    const kHour = 60 * 60 * 1000;
    const kMin = 60 * 1000;


    // Получаем разницу в годах
    let years = Math.floor(resultCalc / kYear);

    // Получаем остаток от деления на года
    let remainder = resultCalc % (kYear);

    // Проверяем, есть ли високосные годы между датами

    //Проверка дат (больше или меньше)
    const yearCheck = dateCheck()
    const start = yearCheck[0];
    const end = yearCheck[1];

    // const value = getInputValues();
    // let startYear = value[1].getFullYear();
    // let endYear = value[0].getFullYear();
    let leapYears = 0;

    //Проверка на высокосный год
    for (let i = start; i <= end; i++) {
    if (isLeapYear(i)) {
        leapYears++;
    }
    }
    
    // Добавляем к остатку количество миллисекунд в високосных годах
    remainder += leapYears * (kDay);
    
    // Получаем разницу в днях
    const days = Math.floor(remainder / (kDay));

    // Получаем остаток от деления на дни
    remainder = resultCalc % (kDay);

    // Получаем разницу в часах
    const hours = Math.floor(remainder / (kHour));

    // Получаем остаток от деления на часы
    remainder = remainder % (kHour);

    // Получаем разницу в минутах
    const min = Math.floor(remainder / (kMin));

    const message = " Лет: " + years + " Дней: " + days + " Часов: " + hours + " Минут: " + min;

    displayResult(message)
  }

  function displayResult(result) {
    output.closest('.card').style.display = 'block'
    output.innerHTML = `До этой даты:  ${result}`
    console.trace()
  }

  btn.addEventListener('click', reverseDate)

});