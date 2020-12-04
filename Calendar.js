const dayNameElement = document.getElementById('dayNames');
const daysElement = document.getElementById('days');

const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const selectDate = document.getElementById('selectDate');
const currentDate = new Date();

const weekDays = 7;

let nowDate = new Date();
let selectedMonth = nowDate.getMonth() === new Date().getMonth() ? nowDate.getMonth() + 1 : nowDate.getMonth();
let selectedYear = nowDate.getFullYear();

let lastMonthDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();

const createDiv = () => {
  return document.createElement('div');
}

const clickPrev = () => {
  if (selectedMonth - 1 === 0) {
    selectedMonth = 12;
    selectedYear -= 1;
  } else {
    selectedMonth -= 1;  
  }
  
  nowDate = new Date(selectedYear, selectedMonth - 1);
  onLoad();
};

const clickNext = () => {
  if (selectedMonth + 1 === 13) {
    selectedMonth = 1;
    selectedYear += 1;
  } else {
    selectedMonth += 1;  
  }

  nowDate = new Date(selectedYear, selectedMonth - 1);
  onLoad();
}

const clearData = () => {
  if (daysElement.children.length > 0) {
    while (daysElement.firstChild) {
      daysElement.removeChild(daysElement.firstChild);
    }
  }

  if (dayNameElement.children.length > 0) {
    while (dayNameElement.firstChild) {
      dayNameElement.removeChild(dayNameElement.firstChild);
    }
  }
}

const onClickDate = (event) => {
  if (event !== null) {
    const otherMonthDay = event.target.id;
    const otherMonthDayYear = Number(otherMonthDay.split("-")[0]);
    const otherMonthDayMonth = Number(otherMonthDay.split("-")[1]);

    const clickDate = event.target.innerHTML;

    if (!otherMonthDayMonth && !otherMonthDayYear) {
      const makeDate = new Date(selectedYear, selectedMonth - 1, clickDate);
      const subtractTime = makeDate.getTime() - currentDate.getTime();

      const diff = Math.ceil(subtractTime / (1000 * 3600 * 24));
      if (diff !== -0) {
        diff > 0 ? alert(`오늘보다 ${diff}일 후입니다.`) : alert(`오늘보다 ${Number(diff) * -1}일 전입니다.`);
      } else {
        alert('오늘 입니다.');
      }
    } else {
      const makeDate = new Date(otherMonthDayYear, otherMonthDayMonth - 1, clickDate);
      const subtractTime = makeDate.getTime() - currentDate.getTime();

      const diff = Math.ceil(subtractTime / (1000 * 3600 * 24));

      if (diff < 0) {
        alert(`오늘보다 ${diff * -1}일 전입니다.`);
      } else if (diff > 0) {
        alert(`오늘보다 ${diff}일 후입니다.`);
      }
    }
    
  }
}

const onChangeDate = (event) => {
  const changeDate = new Date(event.target.value);
  const changeYear = changeDate.getFullYear();
  const changeMonth = changeDate.getMonth() + 1;

  if ((nowDate.getMonth() + 1) !== changeMonth) {
    selectedYear = changeYear;
    selectedMonth = changeMonth;
    nowDate = new Date(selectedYear, selectedMonth - 1);
    lastMonthDay = new Date(selectedYear, selectedMonth, 0).getDate();

    onLoad();
  }
}

const setDayNames = () => {
  for (let i = 0; i < dayNames.length; i++) {
    const div = createDiv();

    if (i === 0 || i === 6) {
      div.style.color = '#ea8685';
    }

    div.append(dayNames[i]);
    dayNameElement.appendChild(div);
  }
}

const calculateFirstDay = (dayCount) => {
  for (let i = dayCount - 1; i >= 0; i--) {
    const prevDiv = createDiv();

    const prevDate = new Date(selectedYear, selectedMonth - 1, (i * -1));
    prevDiv.id = `${prevDate.getFullYear()}-${prevDate.getMonth() + 1}`;

    prevDiv.append(prevDate.getDate());
    prevDiv.className = "Calendar-Box-Days-NextPrev";
    daysElement.appendChild(prevDiv);
  }
}

const calculateLastDay = (dayCount) => {
  for (let i = 1; i < (weekDays - dayCount); i++) {
    const nextDiv = createDiv();
    const nextDate = new Date(selectedYear, selectedMonth, (i));

    nextDiv.id = `${nextDate.getFullYear()}-${nextDate.getMonth() + 1}`;
    nextDiv.append(nextDate.getDate());
    nextDiv.className = "Calendar-Box-Days-NextPrev";
    daysElement.appendChild(nextDiv);
  }
}

const setDates = () => {
  for (let i = 1; i <= lastMonthDay; i++) {
    const dayYear = nowDate.getFullYear();
    const dayMonth = nowDate.getMonth() + 1;
    let dayString = new Date(`${dayYear}-${dayMonth}-${i}`);
    dayString = new Date(dayString.setHours(dayString.getHours() + 9));

    const dayCount = dayString.getDay();
    if (i === 1) {
      calculateFirstDay(dayCount);
    }

    const isSameYear = dayString.getFullYear() === currentDate.getFullYear();
    const isSameMonth = dayString.getMonth() === currentDate.getMonth();
    const isSameDate = dayString.getDate() === currentDate.getDate();
    
    if (isSameYear && isSameMonth && isSameDate) {
      const currentDiv = createDiv();
      currentDiv.append(dayString.getDate());
      currentDiv.className = "Calendar-Box-Days-Today";
      daysElement.appendChild(currentDiv);
    }

    else {
      const dateDiv = createDiv();
      dateDiv.nodeValue = dayString.getDate();
      dateDiv.append(dayString.getDate());
      daysElement.appendChild(dateDiv);
    }

    if (i === lastMonthDay) {
      calculateLastDay(dayCount);
    }
  }
}

const onLoad = () => {
  clearData();
  selectDate.value = `${selectedYear}-${selectedMonth < 10 ? '0' + selectedMonth : selectedMonth}`;
  setDayNames();
  setDates();
}

selectDate.addEventListener('change', onChangeDate);

prevMonth.addEventListener('click', clickPrev);
nextMonth.addEventListener('click', clickNext);
daysElement.addEventListener('click', onClickDate);

onLoad(); 