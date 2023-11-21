const socket = io();

const peopleData = {
  Maria: { isCheckedGift: false, isCheckedConvo: false },
  Popuri: { isCheckedGift: false, isCheckedConvo: false },
  Elli: { isCheckedGift: false, isCheckedConvo: false },
  Ann: { isCheckedGift: false, isCheckedConvo: false },
  Karen: { isCheckedGift: false, isCheckedConvo: false },
  "Postbote Harris": { isCheckedGift: false, isCheckedConvo: false },
  Grey: { isCheckedGift: false, isCheckedConvo: false },
  Jeff: { isCheckedGift: false, isCheckedConvo: false },
  Cliff: { isCheckedGift: false, isCheckedConvo: false },
  Kai: { isCheckedGift: false, isCheckedConvo: false },
  Mayor: { isCheckedGift: false, isCheckedConvo: false },
  "Mayor Wife": { isCheckedGift: false, isCheckedConvo: false },
  Lillia: { isCheckedGift: false, isCheckedConvo: false },
  Basil: { isCheckedGift: false, isCheckedConvo: false },
  Ellen: { isCheckedGift: false, isCheckedConvo: false },
  Doug: { isCheckedGift: false, isCheckedConvo: false },
  Gotz: { isCheckedGift: false, isCheckedConvo: false },
  "Gotz Wife": { isCheckedGift: false, isCheckedConvo: false },
  "Potion man": { isCheckedGift: false, isCheckedConvo: false },
  Kent: { isCheckedGift: false, isCheckedConvo: false },
  Stu: { isCheckedGift: false, isCheckedConvo: false },
  Midwife: { isCheckedGift: false, isCheckedConvo: false },
  May: { isCheckedGift: false, isCheckedConvo: false },
  Rick: { isCheckedGift: false, isCheckedConvo: false },
  Pastor: { isCheckedGift: false, isCheckedConvo: false },
  Shipper: { isCheckedGift: false, isCheckedConvo: false },
  Saibara: { isCheckedGift: false, isCheckedConvo: false },
  Barmann: { isCheckedGift: false, isCheckedConvo: false },
  Fischer: { isCheckedGift: false, isCheckedConvo: false },
  "Zimmermann 1": { isCheckedGift: false, isCheckedConvo: false },
  "Zimmermann 2": { isCheckedGift: false, isCheckedConvo: false },
  Meister: { isCheckedGift: false, isCheckedConvo: false },
  Waldvieh: { isCheckedGift: false, isCheckedConvo: false },
  Oldman: { isCheckedGift: false, isCheckedConvo: false },
  Oldwoman: { isCheckedGift: false, isCheckedConvo: false },
};

/**
 * 
      <div id="json-output-stats"></div>
      <div id="json-output-animals"></div>
      <div id="json-output-people"></div>
 */
socket.on("json-update", (jsonData) => {
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
  const formattedAnimals = formatSection(jsonData.animals, "Animals");
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
  return `${time.hour}:${time.minute}`;
}

function formatAnalogTime(time) {
  const hours = time.hour;
  const minutes = time.minute;
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
  keys.splice(keys.indexOf("money1"), 1);
  keys.splice(keys.indexOf("money3"), 1);
  console.log(keys);
  keys.forEach((key, index) => {
    const value = section1[key];
    let progressBar = createProgressBar(value);
    if (String(key).includes("money2")) {
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
        peopleData["Maria"].isCheckedConvo = inputValues.get(0x02);
        peopleData["Maria"].isCheckedGift = inputValues.get(0x04);

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
        peopleData["Zimmermann 1"].isCheckedConvo = inputValues2.get(0x01);
        peopleData["Meister"].isCheckedConvo = inputValues2.get(0x02);
        peopleData["Waldvieh"].isCheckedConvo = inputValues2.get(0x04);
        peopleData["Oldwoman"].isCheckedConvo = inputValues2.get(0x08);
        peopleData["Oldman"].isCheckedConvo = inputValues2.get(0x10);
        peopleData["Fischer"].isCheckedConvo = inputValues2.get(0x20);
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
        peopleData["Rick"].isCheckedConvo = inputValues3.get(0x01);
        peopleData["Saibara"].isCheckedConvo = inputValues3.get(0x02);
        peopleData["Potion man"].isCheckedConvo = inputValues3.get(0x04);
        peopleData["Kent"].isCheckedConvo = inputValues3.get(0x08);
        peopleData["Stu"].isCheckedConvo = inputValues3.get(0x10);
        peopleData["Midwife"].isCheckedConvo = inputValues3.get(0x20);
        peopleData["May"].isCheckedConvo = inputValues3.get(0x40);
        peopleData["Zimmermann 2"].isCheckedConvo = inputValues3.get(0x80);
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
        peopleData["Cliff"].isCheckedConvo = inputValues4.get(0x01);
        peopleData["Popuri"].isCheckedConvo = inputValues4.get(0x02);
        peopleData["Mayor"].isCheckedConvo = inputValues4.get(0x04);
        peopleData["Mayor Wife"].isCheckedConvo = inputValues4.get(0x08);
        peopleData["Lillia"].isCheckedConvo = inputValues4.get(0x10);
        peopleData["Basil"].isCheckedConvo = inputValues4.get(0x20);
        peopleData["Ellen"].isCheckedConvo = inputValues4.get(0x40);
        peopleData["Pastor"].isCheckedConvo = inputValues4.get(0x80);
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
        peopleData["Popuri"].isCheckedConvo = inputValues5.get(0x02);
        peopleData["Elli"].isCheckedConvo = inputValues5.get(0x04);
        peopleData["Ann"].isCheckedConvo = inputValues5.get(0x08);
        peopleData["Karen"].isCheckedConvo = inputValues5.get(0x10);
        peopleData["Postbote Harris"].isCheckedConvo = inputValues5.get(0x20);
        peopleData["Grey"].isCheckedConvo = inputValues5.get(0x40);
        peopleData["Jeff"].isCheckedConvo = inputValues5.get(0x80);
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
        peopleData["Kent"].isCheckedGift = inputValues6.get(0x01);
        peopleData["Stu"].isCheckedGift = inputValues6.get(0x02);
        peopleData["Midwife"].isCheckedGift = inputValues6.get(0x04);
        peopleData["May"].isCheckedGift = inputValues6.get(0x08);
        peopleData["Zimmermann 1"].isCheckedGift = inputValues6.get(0x10);
        peopleData["Zimmermann 2"].isCheckedGift = inputValues6.get(0x20);
        peopleData["Waldvieh"].isCheckedGift = inputValues6.get(0x80);
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
        peopleData["Mayor Wife"].isCheckedGift = inputValues7.get(0x01);
        peopleData["Lillia"].isCheckedGift = inputValues7.get(0x02);
        peopleData["Basil"].isCheckedGift = inputValues7.get(0x04);
        peopleData["Ellen"].isCheckedGift = inputValues7.get(0x08);
        peopleData["Pastor"].isCheckedGift = inputValues7.get(0x10);
        peopleData["Rick"].isCheckedGift = inputValues7.get(0x20);
        peopleData["Saibara"].isCheckedGift = inputValues7.get(0x40);
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
        peopleData["Ann"].isCheckedGift = inputValues8.get(0x01);
        peopleData["Karen"].isCheckedGift = inputValues8.get(0x02);
        peopleData["Postbote Harris"].isCheckedGift = inputValues8.get(0x04);
        peopleData["Grey"].isCheckedGift = inputValues8.get(0x08);
        peopleData["Jeff"].isCheckedGift = inputValues8.get(0x10);
        peopleData["Cliff"].isCheckedGift = inputValues8.get(0x20);
        peopleData["Kai"].isCheckedGift = inputValues8.get(0x40);
        peopleData["Mayor"].isCheckedGift = inputValues8.get(0x80);
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
        peopleData["Doug"].isCheckedConvo = inputValues9.get(0x01);
        peopleData["Gotz"].isCheckedConvo = inputValues9.get(0x02);
        peopleData["Gotz Wife"].isCheckedConvo = inputValues9.get(0x04);
        peopleData["Shipper"].isCheckedConvo = inputValues9.get(0x08);
        peopleData["Barmann"].isCheckedConvo = inputValues9.get(0x10);
        peopleData["Popuri"].isCheckedGift = inputValues9.get(0x40);
        peopleData["Elli"].isCheckedGift = inputValues9.get(0x80);
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
        peopleData["Shipper"].isCheckedGift = inputValues10.get(0x01);
        peopleData["Barmann"].isCheckedGift = inputValues10.get(0x02);
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
        peopleData["Oldwoman"].isCheckedGift = inputValues11.get(0x01);
        peopleData["Oldman"].isCheckedGift = inputValues11.get(0x02);
        peopleData["Fischer"].isCheckedGift = inputValues11.get(0x04);
        peopleData["Doug"].isCheckedGift = inputValues11.get(0x20);
        peopleData["Gotz"].isCheckedGift = inputValues11.get(0x40);
        peopleData["Gotz Wife"].isCheckedGift = inputValues11.get(0x80);
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
    console.log(key);
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
