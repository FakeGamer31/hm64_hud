var previousValue = 0;
var count = 0;
while (true) {
  checkValueChange();
}

function writeData() {
  //var name = "test" + mem.u8[0x8017027F] + ".json"
  var name = "test.json";
  var fd = fs.open(name, "wb+");
  var json = {
    time: {
      hour: "",
      minute: "",
    },
    stats: {
      stamina: "",
      fatigue: "",
      alcohol: "",
      money1: "",
      money2: "",
      money3: "",
    },
    animals: {
      horse: "",
      dog: "",
    },
    people: {
      Maria: "",
      Popuri: "",
      Elli: "",
      Ann: "",
      Karen: "",
      "Postbote Harris": "",
      Grey: "",
      Jeff: "",
      Cliff: "",
      Kai: "",
      Mayor: "",
      "Mayor Wife": "",
      Lillia: "",
      Basil: "",
      Ellen: "",
      Doug: "",
      Gotz: "",
      "Gotz Wife": "",
      "Potion man": "",
      Kent: "",
      Stu: "",
      Midwife: "",
      May: "",
      Rick: "",
      Pastor: "",
      Shipper: "",
      Saibara: "",
      Barmann: "",
      Fischer: "",
      "Zimmermann 1": "",
      "Zimmermann 2": "",
      Meister: "",
      Waldvieh: "",
      Oldman: "",
      Oldwoman: "",
    },
    giftConvo: {
      First: "",
      Second: "",
      Third: "",
      Fourth: "",
      Fifth: "",
      Sixth: "",
      Seventh: "",
      Eighth: "",
      Nineth: "",
      Tenth: "",
      Eleventh: "",
    },
  };
  json.time.hour = mem.u8[0x801fb5ca];
  json.time.minute = mem.u8[0x8017027f];
  json.animals.horse = mem.u8[0x8016fdd0];
  json.animals.dog = mem.u8[0x801886b0];
  json.stats.stamina = mem.u8[0x80189060];
  json.stats.fatigue = mem.u8[0x801890d1];
  json.stats.alcohol = mem.u8[0x80189e52];
  json.stats.money1 = mem.u16[0x801fd60d];
  json.stats.money2 = mem.u16[0x801fd60e];
  json.stats.money3 = mem.u16[0x801fd60f];
  json.people.Maria = mem.u8[0x801c3f90];
  json.people.Popuri = mem.u8[0x801c3f91];
  json.people.Elli = mem.u8[0x801c3f92];
  json.people.Ann = mem.u8[0x801c3f93];
  json.people.Karen = mem.u8[0x801c3f94];
  json.people["Postbote Harris"] = mem.u8[0x801c3f96];
  json.people.Grey = mem.u8[0x801c3f97];
  json.people.Jeff = mem.u8[0x801c3f98];
  json.people.Cliff = mem.u8[0x801c3f99];
  json.people.Kai = mem.u8[0x801c3f9a];
  json.people.Mayor = mem.u8[0x801c3f9b];
  json.people["Mayor Wife"] = mem.u8[0x801c3f9c];
  json.people.Lillia = mem.u8[0x801c3f9d];
  json.people.Basil = mem.u8[0x801c3f9e];
  json.people.Ellen = mem.u8[0x801c3f9f];
  json.people.Doug = mem.u8[0x801c3fa0];
  json.people.Gotz = mem.u8[0x801c3fa1];
  json.people["Gotz Wife"] = mem.u8[0x801c3fa2];
  json.people["Potion man"] = mem.u8[0x801c3fa3];
  json.people.Kent = mem.u8[0x801c3fa4];
  json.people.Stu = mem.u8[0x801c3fa5];
  json.people.Midwife = mem.u8[0x801c3fa6];
  json.people.May = mem.u8[0x801c3fa7];
  json.people.Rick = mem.u8[0x801c3fa8];
  json.people.Pastor = mem.u8[0x801c3fa9];
  json.people.Shipper = mem.u8[0x801c3faa];
  json.people.Saibara = mem.u8[0x801c3fab];
  json.people.Barmann = mem.u8[0x801c3fac];
  json.people.Fischer = mem.u8[0x801c3fad];
  json.people["Zimmermann 1"] = mem.u8[0x801c3fae];
  json.people["Zimmermann 2"] = mem.u8[0x801c3faf];
  json.people.Meister = mem.u8[0x801c3fb0];
  json.people.Waldvieh = mem.u8[0x801c3fb1];
  json.people.Oldman = mem.u8[0x801c3fb4];
  json.people.Oldwoman = mem.u8[0x801c3fb5];
  json.giftConvo.First = mem.u8[0x8016f8b3];
  json.giftConvo.Second = mem.u8[0x8016f8cc];
  json.giftConvo.Third = mem.u8[0x8016f8cd];
  json.giftConvo.Fourth = mem.u8[0x8016f8ce];
  json.giftConvo.Fifth = mem.u8[0x8016f8cf];
  json.giftConvo.Sixth = mem.u8[0x8016f8d0];
  json.giftConvo.Seventh = mem.u8[0x8016f8d1];
  json.giftConvo.Eighth = mem.u8[0x8016f8d2];
  json.giftConvo.Nineth = mem.u8[0x8016f8d3];
  json.giftConvo.Tenth = mem.u8[0x8016f8d6];
  json.giftConvo.Eleventh = mem.u8[0x8016f8d7];

  //console.log(JSON.stringify(json));

  //var jsonString = `{\"time\":{\"hour\":\"${val1}\",\"minute\":\"${val2}\"},\"stats\":{\"stamina\":\"${val3}\",\"fatigue\":\"${val4}\",\"alcohol\":\"${val5}\"},\"animals\":{\"horse\":\"${val6}\",\"dog\":\"${val7}\"},\"people\":{\"Maria\":\"${val8}\",\"Popuri\":\"${val9}\",\"Elli\":\"${val10}\",\"Ann\":\"${val11}\",\"Karen\":\"${val12}\",\"PostboteHarris\":\"${val13}\",\"Grey\":\"${val14}\",\"Jeff\":\"${val15}\",\"Cliff\":\"${val16}\",\"Kai\":\"${val17}\",\"Mayor\":\"${val18}\",\"MayorWife\":\"${val19}\",\"Lillia\":\"${val20}\",\"Basil\":\"${val21}\",\"Ellen\":\"${val22}\",\"Doug\":\"${val23}\",\"Gotz\":\"${val24}\",\"GotzWife\":\"${val25}\",\"Potionman\":\"${val26}\",\"Kent\":\"${val27}\",\"Stu\":\"${val28}\",\"Midwife\":\"${val29}\",\"May\":\"${val30}\",\"Rick\":\"${val31}\",\"Pastor\":\"${val32}\",\"Shipper\":\"${val33}\",\"Saibara\":\"${val34}\",\"Barmann\":\"${val35}\",\"Fischer\":\"${val36}\",\"Zimmermann1\":\"${val37}\",\"Zimmermann2\":\"${val38}\",\"Meister\":\"${val39}\",\"Waldvieh\":\"${val40}\",\"Oldman\":\"${val41}\",\"Oldwoman\":\"${val42}\"}}`

  fs.write(fd, JSON.stringify(json));
  fs.close(fd);
  //console.log('file written', JSON.stringify(json));
}

function checkValueChange() {
  //const currentValue = mem.u8[0x8017027F]; // Hier ebenfalls die Funktion ersetzen
  const currentValue = mem.u8[0x80313ad3];
  if (currentValue !== previousValue) {
    // Der Wert hat sich geändert, führe deine Funktion aus
    console.log("Wert hat sich geändert. Neuer Wert:", currentValue);
    // Hier rufst du deine Funktion auf
    writeData();
    // Aktualisiere den vorherigen Wert
    previousValue = currentValue;
  }
}
