const dayNameElement = document.getElementById('dayNames');
const daysElement = document.getElementById('days');
const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const selectDate = document.getElementById('selectDate');
const currentDate = new Date();

const weekDays = 7;

let nowDate = new Date();
let selectedMonth = nowDate.getMonth() === new Date().getMonth() ? nowDate.getMonth() + 1 : nowDate.getMonth();
let selectedYear = nowDate.getFullYear();

let lastMonthDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();

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

const onClickDate = (e) => {
  if (e !== null) {
    const otherMonthDay = e.target.id;
    const otherMonthDayYear = Number(otherMonthDay.split("-")[0]);
    const otherMonthDayMonth = Number(otherMonthDay.split("-")[1]);

    const clickDate = e.target.innerHTML;

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

const onLoad = () => {
  clearData();
  selectDate.defaultValue = `${selectedYear}-${selectedMonth}`;

  for (let i = 0; i < dayNames.length; i++) {
    const div = document.createElement('div');
    div.append(dayNames[i]);
    dayNameElement.appendChild(div);
  }

  for (let i = 1; i <= lastMonthDay; i++) {
    const dayYear = nowDate.getFullYear();
    const dayMonth = nowDate.getMonth() + 1;
    let dayString = new Date(`${dayYear}-${dayMonth}-${i}`);
    dayString = new Date(dayString.setHours(dayString.getHours() + 9));

    const dayCount = dayString.getDay();
    if (i === 1) {
      for (let i = dayCount - 1; i >= 0; i--) {
        const prevDiv = document.createElement('div');

        const prevDate = new Date(selectedYear, selectedMonth - 1, (i * -1));
        prevDiv.id = `${prevDate.getFullYear()}-${prevDate.getMonth() + 1}`;

        prevDiv.append(prevDate.getDate());
        prevDiv.className = "Calendar-Box-Days-NextPrev";
        daysElement.appendChild(prevDiv);
      }
    }

    const isSameYear = dayString.getFullYear() === currentDate.getFullYear();
    const isSameMonth = dayString.getMonth() === currentDate.getMonth();
    const isSameDate = dayString.getDate() === currentDate.getDate()
    
    if (isSameYear && isSameMonth && isSameDate) {
      const currentDiv = document.createElement('div');
      currentDiv.append(dayString.getDate());
      currentDiv.className = "Calendar-Box-Days-Today";
      daysElement.appendChild(currentDiv);
    }

    else {
      const dateDiv = document.createElement('div');
      dateDiv.nodeValue = dayString.getDate();
      dateDiv.append(dayString.getDate());
      daysElement.appendChild(dateDiv);
    }

    if (i === lastMonthDay) {
      for (let i = 1; i < (weekDays - dayCount); i++) {
        const nextDiv = document.createElement('div');
        const nextDate = new Date(selectedYear, selectedMonth, (i));

        nextDiv.id = `${nextDate.getFullYear()}-${nextDate.getMonth() + 1}`;
        nextDiv.append(nextDate.getDate());
        nextDiv.className = "Calendar-Box-Days-NextPrev";
        daysElement.appendChild(nextDiv);
      }
    }
  }
}

selectDate.addEventListener('change', onChangeDate);
daysElement.addEventListener('click', onClickDate);
onLoad();