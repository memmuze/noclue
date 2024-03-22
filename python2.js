var jatekosok = localStorage.getItem("jatekosok").split(",");

var nyomok = [
  "Plum",
  "White",
  "Scarlet",
  "Green",
  "Mustard",
  "Peacock",
  "Rope",
  "Dagger",
  "Wrench",
  "Pistol",
  "Candlestick",
  "Lead Pipe",
  "Courtyard",
  "Game Room",
  "Study",
  "Dining Room",
  "Garage",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
];

var fejlec = ["Card", ...jatekosok, "Leftover", "Possible"];

var jatekosokkartya = localStorage.getItem("jatekosokkartya");

var mutatott = [0].concat(Array(jatekosok.length).fill(0), Array(2).fill(0));
var maxmutatott = [0].concat(
  jatekosokkartya.split(",").map(Number),
  parseInt(localStorage.getItem("Poolcardcount")),
  0
);
var indexek = Array(fejlec.length).fill(1);

var adatok = [];

nyomok.forEach(function (nyom) {
  var row = [nyom].concat(Array(fejlec.length - 2).fill("")).concat([true]);
  adatok.push(row);
});

var maxindex = fejlec.length - 3;
var enindex = fejlec.indexOf("You");

var bemenetek = JSON.parse(localStorage.getItem("clueList"));

function bemenetsplit(bemenet) {
  if (bemenet.includes(" | ")) {
    var temp = [];
    bemenet.split(" | ").forEach(function (b) {
      temp.push(b.split(","));
    });
    return temp;
  } else {
    return bemenet.split(",");
  }
}

modifyClueList();

function xiro(bemenet) {
  var kerdezo = fejlec.indexOf(bemenet[0]);
  var mutato = fejlec.indexOf(bemenet[4]);
  var sorok = bemenet.slice(1, 4);

  for (var k = 0; k < sorok.length; k++) {
    var sor = nyomok.indexOf(sorok[k]);
    if (sor[fejlec.length - 1] !== false) {
      if (kerdezo == mutato) {
        for (var i = 1; i < mutato; i++) {
          adatok[sor][i] = "x";
        }

        for (var j = kerdezo + 1; j <= maxindex; j++) {
          adatok[sor][j] = "x";
        }
      }

      if (kerdezo === maxindex) {
        for (var i = 1; i < mutato; i++) {
          adatok[sor][i] = "x";
        }
      }

      if (kerdezo < maxindex && (mutato < kerdezo || kerdezo === mutato)) {
        for (var i = 1; i < mutato; i++) {
          adatok[sor][i] = "x";
        }

        for (var j = kerdezo + 1; j <= maxindex; j++) {
          adatok[sor][j] = "x";
        }
      }

      if (kerdezo < mutato) {
        for (var i = kerdezo + 1; i < mutato; i++) {
          adatok[sor][i] = "x";
        }
      }
    }
  }
}

function enadat() {
  var oszlop = fejlec.indexOf("You");
  var sorok = localStorage.getItem("AlapYOU").split(",");

  for (var k = 0; k < sorok.length; k++) {
    var sor = nyomok.indexOf(sorok[k]);
    adatok[sor][oszlop] = "o";
    adatok[sor][fejlec.length - 1] = false;
    mutatott[oszlop] += 1;
  }
}

function medenceadat() {
  if (localStorage.getItem("Poolcardcount") !== "0") {
    var oszlop = fejlec.indexOf("Leftover");
    var sorok = JSON.parse(localStorage.getItem("AlapPOOL"));
    console.log(sorok);
    for (var k = 0; k < sorok.length; k++) {
      var sor = nyomok.indexOf(sorok[k]);
      adatok[sor][oszlop] = "o";
      adatok[sor][fejlec.length - 1] = false;
      mutatott[oszlop] += 1;
    }
  } else {
    var oszlop = fejlec.indexOf("Leftover");
    for (var j = 0; j < adatok.length; j++) {
      adatok[j][oszlop] = "x";
    }
  }
}

function xsor() {
  for (var adat of adatok) {
    if (adat[fejlec.length - 1] === false) {
      var oszlop = adat.indexOf("o");

      for (var i = 1; i < fejlec.length - 1; i++) {
        adat[i] = "x";
      }

      adat[oszlop] = "o";
    }
  }
}

function xoszlop() {
  for (var i = 0; i < maxmutatott.length; i++) {
    if (maxmutatott[i] !== 0 && mutatott[i] === maxmutatott[i]) {
      for (var j = 0; j < adatok.length; j++) {
        if (adatok[j][i] !== "o") {
          adatok[j][i] = "x";
        }
      }
    }
  }
}

function tablazat() {
  var table = document.createElement("table");
  table.id = "tablazat";

  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");

  fejlec.forEach(function (column) {
    var th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  adatok.forEach(function (rowData) {
    var row = document.createElement("tr");

    rowData.forEach(function (cellData) {
      var cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  var tableContainer = document.getElementById("table-container");

  // Append the table to the table container
  tableContainer.appendChild(table);
}

function elocheck(bemenet) {
  var nyomok = bemenet.slice(1, 4);
  var mutato = fejlec.indexOf(bemenet[4]);
  var temp = [];

  for (var i = 0; i < adatok.length; i++) {
    var adat = adatok[i];
    if (nyomok.includes(adat[0])) {
      temp.push(adat[mutato]);
    }
  }
  return !temp.includes("o");
}

function szamiro(bemenet) {
  if (bemenet.length == 5) {
    var nyomok = bemenet.slice(1, 4);
    var mutato = fejlec.indexOf(bemenet[4]);
    var mutatoi = indexek[mutato];

    if (elocheck(bemenet)) {
      for (var i = 0; i < adatok.length; i++) {
        var adat = adatok[i];
        if (
          nyomok.includes(adat[0]) &&
          adat[mutato] !== "x" &&
          adat[mutato] !== "o"
        ) {
          adat[mutato] = adat[mutato] + " " + mutatoi;
        }
      }

      indexek[mutato]++;
    }
  }
}
console.log(indexek);
function vanneki(bemenet) {
  if (bemenet.length == 6) {
    var mutato = fejlec.indexOf(bemenet[4]);
    var nyom = bemenet[5];

    for (var i = 0; i < adatok.length; i++) {
      var adat = adatok[i];

      if (adat[0] === nyom) {
        if (adat[mutato] !== " ") {
          var temp = adat[mutato].split(" ");

          adat[mutato] = "o";
          adat[adat.length - 1] = false;
          mutatott[mutato] += 1;

          for (var j = 0; j < temp.length; j++) {
            for (var k = 0; k < adatok.length; k++) {
              if (adatok[k][mutato].split(" ").includes(temp[j])) {
                adatok[k][mutato] = adatok[k][mutato].replace(temp[j], "");
              }
            }
          }
        }
      }
    }
  }
}

function szamirto() {
  for (let jatekos = 1; jatekos <= maxindex; jatekos++) {
    let lista = [];
    let halmaz = [];

    for (let adat of adatok) {
      if (
        adat[jatekos] !== "x" &&
        adat[jatekos] !== " " &&
        adat[jatekos] != "o"
      ) {
        lista.push(...adat[jatekos].split(" "));
      }
      lista = lista.filter((elem) => elem !== "");
      lista.sort();
      halmaz = [...new Set(lista)];
    }

    for (let h of halmaz) {
      if (lista.filter((elem) => elem === h).length == 1) {
        for (let adat of adatok) {
          if (adat[jatekos].includes(h)) {
            adat[jatekos] = "o";
            adat[fejlec.length - 1] = false;
            mutatott[jatekos]++;
          }
        }
      }
    }
  }
}

function modifyClueList() {
  var existingClueList = localStorage.getItem("clueList");

  var existingClueListArray = existingClueList
    ? JSON.parse(existingClueList)
    : [];

  for (var i = 0; i < existingClueListArray.length; i++) {
    var subarray = existingClueListArray[i];

    if (subarray[4] === "noone") {
      subarray[4] = subarray[0];
      subarray.length = 5;
    }
  }

  var modifiedClueListString = JSON.stringify(existingClueListArray);
  localStorage.setItem("clueList", modifiedClueListString);
}

function advancedoszlop() {
  for (let jatekos = 1; jatekos <= maxindex; jatekos++) {
    let lista = [];
    for (var j = 0; j < adatok.length; j++) {
      var adat2 = adatok[j];
      lista.push(adat2[jatekos]);
    }

    if (
      lista.filter((elem) => elem == "x").length ==
      nyomok.length - maxmutatott[jatekos]
    ) {
      for (var i = 0; i < adatok.length; i++) {
        var adat = adatok[i];
        if (adat[jatekos] != "x" && adat[jatekos] != "o") {
          adat[jatekos] = "o";
          adat[fejlec.length - 1] = false;
          mutatott[jatekos]++;
        }
      }
    }
  }
}

console.log(mutatott);
console.log(maxmutatott);
bemenetek2 = JSON.parse(localStorage.getItem("clueList"));

function generateTable() {
  const table = document.getElementById("tablazat3");
  bemenetek2.forEach((subarray) => {
    const row = document.createElement("tr");
    for (let i = 0; i < 5; i++) {
      const cell = document.createElement("td");
      if (subarray.length === 6 && subarray[i] == subarray[5]) {
        cell.textContent = subarray[i];
        cell.style.textDecoration = "underline";
      } else {
        cell.textContent = subarray[i];
      }
      if (subarray[0] == subarray[4] && i == 4) {
        cell.textContent = "No One";
      } else {
        cell.textContent = subarray[i];
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  });
}
