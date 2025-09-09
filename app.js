const socket = io();

const peopleData = {
  maria: { isCheckedGift: false, isCheckedConvo: false },
  popuri: { isCheckedGift: false, isCheckedConvo: false },
  elli: { isCheckedGift: false, isCheckedConvo: false },
  ann: { isCheckedGift: false, isCheckedConvo: false },
  karen: { isCheckedGift: false, isCheckedConvo: false },
  harris: { isCheckedGift: false, isCheckedConvo: false },
  grey: { isCheckedGift: false, isCheckedConvo: false },
  jeff: { isCheckedGift: false, isCheckedConvo: false },
  cliff: { isCheckedGift: false, isCheckedConvo: false },
  kai: { isCheckedGift: false, isCheckedConvo: false },
  mayor: { isCheckedGift: false, isCheckedConvo: false },
  mayor_Wife: { isCheckedGift: false, isCheckedConvo: false },
  lillia: { isCheckedGift: false, isCheckedConvo: false },
  basil: { isCheckedGift: false, isCheckedConvo: false },
  ellen: { isCheckedGift: false, isCheckedConvo: false },
  doug: { isCheckedGift: false, isCheckedConvo: false },
  gotz: { isCheckedGift: false, isCheckedConvo: false },
  gotz_Wife: { isCheckedGift: false, isCheckedConvo: false },
  potion_man: { isCheckedGift: false, isCheckedConvo: false },
  kent: { isCheckedGift: false, isCheckedConvo: false },
  stu: { isCheckedGift: false, isCheckedConvo: false },
  midwife: { isCheckedGift: false, isCheckedConvo: false },
  may: { isCheckedGift: false, isCheckedConvo: false },
  rick: { isCheckedGift: false, isCheckedConvo: false },
  pastor: { isCheckedGift: false, isCheckedConvo: false },
  shipper: { isCheckedGift: false, isCheckedConvo: false },
  saibara: { isCheckedGift: false, isCheckedConvo: false },
  barmann: { isCheckedGift: false, isCheckedConvo: false },
  fischer: { isCheckedGift: false, isCheckedConvo: false },
  zimmermann1: { isCheckedGift: false, isCheckedConvo: false },
  zimmermann2: { isCheckedGift: false, isCheckedConvo: false },
  meister: { isCheckedGift: false, isCheckedConvo: false },
  waldvieh: { isCheckedGift: false, isCheckedConvo: false },
  oldman: { isCheckedGift: false, isCheckedConvo: false },
  oldwoman: { isCheckedGift: false, isCheckedConvo: false },
};

/**
 * 
      <div id="json-output-stats"></div>
      <div id="json-output-animals"></div>
      <div id="json-output-people"></div>
 */
socket.on("json-update", (jsonData) => {
  // console.log(jsonData);
  const formattedStats = formatStats(jsonData);
  const formattedAnimals = formatAnimals(jsonData);
  const formattedPeople = formatPeople(jsonData);
  document.getElementById("json-output-stats").innerHTML = formattedStats;
  document.getElementById("json-output-animals").innerHTML = formattedAnimals;
  document.getElementById("json-output-people").innerHTML = formattedPeople;
});

function formatStats(jsonData) {
  //const formattedTime = formatTime(jsonData.time);
  formatAnalogTime(jsonData.time);
  //const formattedStats = formatSection(jsonData.stats, "Stats");
  const formattedStats = formatStatsSectionWithBars(jsonData.stats, "Stats");
  return `<p>${formattedStats}</p>`;
}

function formatAnimals(jsonData) {
  // const formattedAnimals = formatSection(jsonData.animals, "Animals");
  const formattedAnimals = formatStatsSectionWithBars(
    jsonData.animals,
    "Animals"
  );
  return `<p>${formattedAnimals}</p>`;
}

function formatPeople(jsonData) {
  const formattedPeople = formatSectionWithBars(
    jsonData.people,
    jsonData.giftConvo,
    "People"
  );
  return `<p>${formattedPeople}</p>`;
}

function formatTime(time) {
  return `${time.hour}:${time.minutes}`;
}

function formatAnalogTime(time) {
  const hours = time.hour;
  const minutes = time.minutes;
  const canvas = document.getElementById("analogClock");
  const context = canvas.getContext("2d");
  const radius = canvas.width / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw clock face
  context.beginPath();
  context.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
  context.fillStyle = "#fff";
  context.fill();
  context.strokeStyle = "#333";
  context.lineWidth = 5;
  context.stroke();
  // Draw hour hand
  const hourAngle = ((hours % 12) * 30 + (minutes / 60) * 30) * (Math.PI / 180);
  drawHand(context, radius * 0.5, hourAngle, 8, "#333");

  // Draw minute hand
  const minuteAngle = minutes * 6 * (Math.PI / 180);
  drawHand(context, radius * 0.7, minuteAngle, 4, "#333");

  for (let i = 1; i <= 12; i++) {
    const angle = i * 30 * (Math.PI / 180);
    const x = radius + radius * 0.8 * Math.sin(angle);
    const y = radius - radius * 0.8 * Math.cos(angle);

    context.fillStyle = "#333";
    context.font = "bold 16px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(i.toString(), x, y);
  }
}

function formatSection(section, title) {
  const keys = Object.keys(section);
  const formattedSection = keys
    .map((key) => `<li class="${title}">${key}: ${section[key]}</li>`)
    .join("");
  return `<strong>${title}:</strong><ul>${formattedSection}</ul>`;
}

function formatStatsSectionWithBars(section1, title) {
  const keys = Object.keys(section1);
  let formattedSection = `<strong>${title}:</strong><ul class="stats-list">`;
  // keys.splice(keys.indexOf("money"), 1);
  // keys.splice(keys.indexOf("money3"), 1);
  console.log(keys);
  keys.forEach((key, index) => {
    const value = section1[key];
    let progressBar = createProgressBar(value);
    if (String(key).includes("money")) {
      progressBar = `<div class="money" > ${value} </div>`;
      key = "money";
    }

    if (index % 4 === 0 && index !== 0) {
      formattedSection += '</ul><ul class="stats-list">';
    }
    formattedSection += `<li class="stats">${key}: ${progressBar}</li>`;
  });

  formattedSection += "</ul>";
  return formattedSection;
}

function formatSectionWithBars(section1, section2, title) {
  for (const group in section2) {
    const value = section2[group];

    // Hier setzt du die Checkboxen basierend auf den Werten
    // Anmerkung: Du musst die genauen Bedingungen anpassen
    switch (group) {
      case "First":
        const { composition: composition, inputValues: inputValues } =
          findComposition(
            value & 0x0f,
            new Map([
              [0x02, false],
              [0x04, false],
            ])
          );
        peopleData["maria"].isCheckedConvo = inputValues.get(0x02);
        peopleData["maria"].isCheckedGift = inputValues.get(0x04);

        break;
      case "Second":
        const { composition: composition2, inputValues: inputValues2 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x20, false],
            ])
          );
        peopleData["zimmermann1"].isCheckedConvo = inputValues2.get(0x01);
        peopleData["meister"].isCheckedConvo = inputValues2.get(0x02);
        peopleData["waldvieh"].isCheckedConvo = inputValues2.get(0x04);
        peopleData["oldwoman"].isCheckedConvo = inputValues2.get(0x08);
        peopleData["oldman"].isCheckedConvo = inputValues2.get(0x10);
        peopleData["fischer"].isCheckedConvo = inputValues2.get(0x20);
        break;

      case "Third":
        const { composition: composition3, inputValues: inputValues3 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x20, false],
              [0x40, false],
              [0x80, false],
            ])
          );
        peopleData["rick"].isCheckedConvo = inputValues3.get(0x01);
        peopleData["saibara"].isCheckedConvo = inputValues3.get(0x02);
        peopleData["potion_man"].isCheckedConvo = inputValues3.get(0x04);
        peopleData["kent"].isCheckedConvo = inputValues3.get(0x08);
        peopleData["stu"].isCheckedConvo = inputValues3.get(0x10);
        peopleData["midwife"].isCheckedConvo = inputValues3.get(0x20);
        peopleData["may"].isCheckedConvo = inputValues3.get(0x40);
        peopleData["zimmermann2"].isCheckedConvo = inputValues3.get(0x80);
        break;

      case "Fourth":
        const { composition: composition4, inputValues: inputValues4 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x20, false],
              [0x40, false],
              [0x80, false],
            ])
          );
        peopleData["cliff"].isCheckedConvo = inputValues4.get(0x01);
        peopleData["popuri"].isCheckedConvo = inputValues4.get(0x02);
        peopleData["mayor"].isCheckedConvo = inputValues4.get(0x04);
        peopleData["mayor_Wife"].isCheckedConvo = inputValues4.get(0x08);
        peopleData["lillia"].isCheckedConvo = inputValues4.get(0x10);
        peopleData["basil"].isCheckedConvo = inputValues4.get(0x20);
        peopleData["ellen"].isCheckedConvo = inputValues4.get(0x40);
        peopleData["pastor"].isCheckedConvo = inputValues4.get(0x80);
        break;

      case "Fifth":
        const { composition: composition5, inputValues: inputValues5 } =
          findComposition(
            value,
            new Map([
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x20, false],
              [0x40, false],
              [0x80, false],
            ])
          );
        peopleData["popuri"].isCheckedConvo = inputValues5.get(0x02);
        peopleData["elli"].isCheckedConvo = inputValues5.get(0x04);
        peopleData["ann"].isCheckedConvo = inputValues5.get(0x08);
        peopleData["karen"].isCheckedConvo = inputValues5.get(0x10);
        peopleData["harris"].isCheckedConvo = inputValues5.get(0x20);
        peopleData["grey"].isCheckedConvo = inputValues5.get(0x40);
        peopleData["jeff"].isCheckedConvo = inputValues5.get(0x80);
        break;

      case "Sixth":
        const { composition: composition6, inputValues: inputValues6 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x20, false],
              [0x80, false],
            ])
          );
        peopleData["kent"].isCheckedGift = inputValues6.get(0x01);
        peopleData["stu"].isCheckedGift = inputValues6.get(0x02);
        peopleData["midwife"].isCheckedGift = inputValues6.get(0x04);
        peopleData["may"].isCheckedGift = inputValues6.get(0x08);
        peopleData["zimmermann1"].isCheckedGift = inputValues6.get(0x10);
        peopleData["zimmermann2"].isCheckedGift = inputValues6.get(0x20);
        peopleData["waldvieh"].isCheckedGift = inputValues6.get(0x80);
        break;

      case "Seventh":
        const { composition: composition7, inputValues: inputValues7 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x20, false],
              [0x40, false],
            ])
          );
        peopleData["mayor_Wife"].isCheckedGift = inputValues7.get(0x01);
        peopleData["lillia"].isCheckedGift = inputValues7.get(0x02);
        peopleData["basil"].isCheckedGift = inputValues7.get(0x04);
        peopleData["ellen"].isCheckedGift = inputValues7.get(0x08);
        peopleData["pastor"].isCheckedGift = inputValues7.get(0x10);
        peopleData["rick"].isCheckedGift = inputValues7.get(0x20);
        peopleData["saibara"].isCheckedGift = inputValues7.get(0x40);
        break;

      case "Eighth":
        const { composition: composition8, inputValues: inputValues8 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x20, false],
              [0x40, false],
              [0x80, false],
            ])
          );
        peopleData["ann"].isCheckedGift = inputValues8.get(0x01);
        peopleData["karen"].isCheckedGift = inputValues8.get(0x02);
        peopleData["harris"].isCheckedGift = inputValues8.get(0x04);
        peopleData["grey"].isCheckedGift = inputValues8.get(0x08);
        peopleData["jeff"].isCheckedGift = inputValues8.get(0x10);
        peopleData["cliff"].isCheckedGift = inputValues8.get(0x20);
        peopleData["kai"].isCheckedGift = inputValues8.get(0x40);
        peopleData["mayor"].isCheckedGift = inputValues8.get(0x80);
        break;

      case "Nineth":
        const { composition: composition9, inputValues: inputValues9 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x08, false],
              [0x10, false],
              [0x40, false],
              [0x80, false],
            ])
          );
        peopleData["doug"].isCheckedConvo = inputValues9.get(0x01);
        peopleData["gotz"].isCheckedConvo = inputValues9.get(0x02);
        peopleData["gotz_Wife"].isCheckedConvo = inputValues9.get(0x04);
        peopleData["shipper"].isCheckedConvo = inputValues9.get(0x08);
        peopleData["barmann"].isCheckedConvo = inputValues9.get(0x10);
        peopleData["popuri"].isCheckedGift = inputValues9.get(0x40);
        peopleData["elli"].isCheckedGift = inputValues9.get(0x80);
        break;

      case "Tenth":
        const { composition: composition10, inputValues: inputValues10 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
            ])
          );
        peopleData["shipper"].isCheckedGift = inputValues10.get(0x01);
        peopleData["barmann"].isCheckedGift = inputValues10.get(0x02);
        break;

      case "Nineth":
        const { composition: composition11, inputValues: inputValues11 } =
          findComposition(
            value,
            new Map([
              [0x01, false],
              [0x02, false],
              [0x04, false],
              [0x20, false],
              [0x40, false],
              [0x80, false],
            ])
          );
        peopleData["oldwoman"].isCheckedGift = inputValues11.get(0x01);
        peopleData["oldman"].isCheckedGift = inputValues11.get(0x02);
        peopleData["fischer"].isCheckedGift = inputValues11.get(0x04);
        peopleData["doug"].isCheckedGift = inputValues11.get(0x20);
        peopleData["gotz"].isCheckedGift = inputValues11.get(0x40);
        peopleData["gotz_Wife"].isCheckedGift = inputValues11.get(0x80);
        break;

      default:
        break;
    }
    //if (value === bestimmterWert1) {
    // peopleData[person].isCheckedGift = true;
    //} else if (value === bestimmterWert2) {
    // peopleData[person].isCheckedConvo = true;
    //}
    // Weitere Bedingungen für andere Werte ...
  }

  const keys = Object.keys(section1);
  let formattedSection = `<strong>${title}:</strong><ul class="people-list">`;

  keys.forEach((key, index) => {
    const value = section1[key];
    const progressBar = createProgressBar(value);

    if (index % 6 === 0 && index !== 0) {
      formattedSection += '</ul><ul class="people-list">';
    }
    // console.log(key);
    formattedSection += `<li class="people"><img src="./img/pic/${key}.png" />${key}: ${progressBar} Gift ${createCheckBox(
      `giftCheckbox_${key}`,
      peopleData[key].isCheckedGift
    )} Convo ${createCheckBox(
      `convoCheckbox_${key} lol `,
      peopleData[key].isCheckedConvo
    )}</li>`;
  });

  formattedSection += "</ul>";
  return formattedSection;
}

function createProgressBar(value) {
  const max = 255;
  const percentage = (value / max) * 100;
  let barColorClass;

  if (value >= 0 && value <= 51) {
    barColorClass = "bar-white";
  } else if (value >= 52 && value <= 102) {
    barColorClass = "bar-blue";
  } else if (value >= 103 && value <= 153) {
    barColorClass = "bar-green";
  } else if (value >= 154 && value <= 204) {
    barColorClass = "bar-yellow";
  } else {
    barColorClass = "bar-pink";
  }

  return `
            <div class="bar-container">
                <div class="bar ${barColorClass}" style="width:${percentage}%;"><div class="bar-value">${value}</div></div>
            </div>
        `;
}

function createCheckBox(id, isChecked) {
  const checkboxClass = isChecked ? "checked" : "empty";
  return `<div class="checkbox-container">
                    <div id="${id}" class="checkbox ${checkboxClass}"></div>
                </div>`;
}

function findComposition(value, inputValues) {
  const composition = [];
  for (const [inputValue, isSet] of inputValues.entries()) {
    if ((value & parseInt(inputValue)) !== 0) {
      composition.push("0x" + inputValue.toString(16));
      inputValues.set(inputValue, true);
    }
  }

  return { composition, inputValues };
}

function drawHand(context, length, angle, width, color) {
  const centerX = context.canvas.width / 2;
  const centerY = context.canvas.height / 2;
  const x = centerX + length * Math.sin(angle);
  const y = centerY - length * Math.cos(angle);

  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(x, y);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.stroke();
}
