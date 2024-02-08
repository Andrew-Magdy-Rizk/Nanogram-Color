// The Level Game
let level = 1;

// Count The Boxs Game
let CountBoxsRowOrColum = 5;

// Count The Live
let CountLive = 3;

//
let currntOptionCol = "";

// Class List Of The Color Boxs
let listColorLow = [
  "rgb(3, 169, 244)",
  "rgb(3, 169, 244)",
  "orange",
  "orange",
  "orange",
  "orange",
  "transparent",
];
let listColorMedium = [
  "rgb(3, 169, 244)",
  "rgb(3, 169, 244)",
  "orange",
  "orange",
  "rgb(244, 67, 54)",
  "transparent",
];
let listColorHard = [
  "rgb(3, 169, 244)",
  "rgb(3, 169, 244)",
  "orange",
  "orange",
  "rgb(76, 175, 80)",
  "rgb(76, 175, 80)",
  "rgb(63, 81, 181)",
  "rgb(63, 81, 181)",
  "rgb(244, 67, 54)",
  "rgb(244, 67, 54)",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
];

// Get The Box Game
let boxsGame = document.querySelector(".boxs-game");

// Get The Header Name Level
let levelName = document.querySelector("header .level-name");

localStorage.setItem("Level", level);

// Set value Level
levelName.textContent = `Level ${level}`;

// Get The Contianer Colum Color
let columColor = document.querySelector(".contianer-game .colums");

// Get The Contianer Colum Color
let contianerGame = document.querySelector(".contianer-game");

// Get The Contianer Row Color
let rowColor = document.querySelector(".contianer-game .rows");

// Get Chose Color zone
let choseColor = document.querySelector(".contianer-game .chose-color");

// Get Massage
let massage = document.querySelector(".massage");

// Get Massage header
let massageheader = document.querySelector(".massage h2");

// Get Massage Buttom
let massageButtom = document.querySelector(".massage a");

//
let realyColor = [];

CheckLevelGame();

// Get The All Boxs
let allBoxs = Array.from(document.querySelectorAll(".boxs-game > div"));

function CheckLevelGame() {
  if (level > 10) {
    CountBoxsRowOrColum = 10;
  }
  document
    .querySelectorAll("header i")
    .forEach((e) => e.classList.add("active"));

  // Create List Of The Option Color
  AllColorBoxs = [];

  // Create Count Boxs For Game
  for (let i = 1; i <= CountBoxsRowOrColum; i++) {
    // Create Rows And Colums Contianer Color
    let countColorColum = document.createElement("div");
    let countColorRow = document.createElement("div");

    countColorColum.classList.add(`colum-${i}`);
    countColorRow.classList.add(`row-${i}`);

    columColor.appendChild(countColorColum);
    rowColor.appendChild(countColorRow);

    for (let j = 1; j <= CountBoxsRowOrColum; j++) {
      let boxGame = document.createElement("div");

      // Create Class Position Row And Colum
      boxGame.className = `row-${i}`;
      boxGame.classList.add(`colum-${j}`);

      if (level > 10) {
        boxGame.classList.add(`plus`);
        boxsGame.classList.add(`game-plus`);
        columColor.classList.add(`colums-plus`);
        rowColor.classList.add(`rows-plus`);
      }

      if (level <= 1) {
        // Set Rondom Class On The All Boxs
        boxGame.setAttribute(
          "data-color",
          listColorLow[Math.floor(Math.random() * listColorLow.length)]
        );
      } else if (level <= 50) {
        // Set Rondom Class On The All Boxs
        boxGame.setAttribute(
          "data-color",
          listColorMedium[Math.floor(Math.random() * listColorMedium.length)]
        );
      } else if (level <= 100000) {
        // Set Rondom Class On The All Boxs
        boxGame.setAttribute(
          "data-color",
          listColorHard[Math.floor(Math.random() * listColorHard.length)]
        );
      }

      // let data = boxGame.getAttribute("data-color");
      // boxGame.style.backgroundColor = data;

      //
      AllColorBoxs.push(boxGame.getAttribute("data-color"));

      // Insert Boxs in the Boxs Game
      boxsGame.appendChild(boxGame);

      boxGame.addEventListener("click", () => {
        eventClick(boxGame);
      });
    }
  }

  // Distance Colors Of Array
  realyColor = AllColorBoxs.filter(
    (value, index, array) =>
      array.indexOf(value) === index && value !== "transparent"
  );

  // Create Element For All Distance Colors
  realyColor.forEach((color) => {
    let colorSpan = document.createElement("span");

    colorSpan.style.backgroundColor = color;

    colorSpan.setAttribute("option-color", color);

    choseColor.appendChild(colorSpan);

    // Check Active Color
    choseColor.firstChild.classList.add("active");

    colorSpan.addEventListener("click", () => {
      onClickColor();
      colorSpan.classList.add("active");
      // eventClick();
    });
  });

  // Play The Function
  rowsOrColsCountCol("row", "rows", "width");
  rowsOrColsCountCol("colum", "colums", "height");
  // eventClick();
}

// Function Count Rows And Colums Colors
function rowsOrColsCountCol(rowOrColum, RowsOrColums, widthOrheight) {
  // Get The All Boxs
  let allBoxs = Array.from(document.querySelectorAll(".boxs-game > div"));

  // Loop for Check All Row
  for (let i = 1; i <= CountBoxsRowOrColum; i++) {
    // Get All Box In The Currnt Row
    let currntRowBoxs = allBoxs.filter((ROrC) =>
      ROrC.classList.contains(`${rowOrColum}-${i}`)
    );
    // Get The currnt Row Contianer Color
    let currntRow = document.querySelector(
      `.${RowsOrColums}  .${rowOrColum}-${i}`
    );

    // Loop for Check All boxs In The Currnt Row
    for (let j = 0; j < CountBoxsRowOrColum; j++) {
      let currntAttrib = currntRowBoxs[j].getAttribute("data-color");

      let createSpan = document.createElement("span");

      let contentSpan = document.createTextNode(1);

      createSpan.style.backgroundColor = currntAttrib;

      // Check The Color Box  If color Transparent Skip
      if (currntAttrib === "transparent") {
        continue;
      }
      // If The Box not First In Currnt Row Create Span Color
      else if (j !== 0) {
        let prevAttrib = currntRowBoxs[j - 1].getAttribute("data-color");

        // If The Color Box The Same Last Span Add 1 In The Last span
        if (currntAttrib === prevAttrib) {
          let lastSpanPlus = document.querySelector(
            `.${RowsOrColums}  .${rowOrColum}-${i} span:last-child`
          );

          let addPlus = parseInt(lastSpanPlus.textContent) + 1;

          if (level > 10) {
            if (widthOrheight === "width") {
              lastSpanPlus.style.width = `${lastSpanPlus.clientWidth + 4}px`;
            } else if (widthOrheight === "height") {
              lastSpanPlus.style.height = `${lastSpanPlus.clientHeight + 4}px`;
            }
          } else {
            if (widthOrheight === "width") {
              lastSpanPlus.style.width = `${lastSpanPlus.clientWidth + 10}px`;
            } else if (widthOrheight === "height") {
              lastSpanPlus.style.height = `${lastSpanPlus.clientHeight + 10}px`;
            }
          }

          lastSpanPlus.textContent = addPlus;
        }
        // If The Color Box not The Same Last Span Add New Span Color
        else {
          createSpan.appendChild(contentSpan);

          currntRow.appendChild(createSpan);
        }
      }
      // If The Box Is First In Currnt Row Create Span Color
      else {
        createSpan.appendChild(contentSpan);

        currntRow.appendChild(createSpan);
      }
    }
  }
}

// On Click The Chose Color
function onClickColor() {
  let alloptionColor = Array.from(choseColor.children);
  alloptionColor.forEach((element) => {
    element.classList.remove("active");
  });
}

// Function When Click On Box
function eventClick(boxGame) {
  // Get Choseing Color Active
  currntOptionCol = document
    .querySelector(".chose-color span.active")
    .getAttribute("option-color");

  let currntAttrib = boxGame.dataset.color;

  if (currntOptionCol === currntAttrib) {
    boxGame.style.backgroundColor = currntAttrib;
    boxGame.style.pointerEvents = "none";
    checkAddColor(boxGame);
    winGame(boxGame);
  } else {
    CountLive--;
    boxGame.classList.add("wrong");

    if (currntAttrib === "transparent") {
      setTimeout(() => {
        boxGame.classList.remove("wrong");

        boxGame.classList.add("transparent");
      }, 600);
    } else {
      setTimeout(() => {
        boxGame.style.backgroundColor = currntAttrib;
        boxGame.style.pointerEvents = "none";
        checkAddColor(boxGame);
      }, 600);
    }

    document
      .querySelectorAll("header i")
      .forEach((e) => e.classList.remove("active"));

    if (CountLive > 0) {
      for (let i = 0; i < CountLive; i++) {
        document.querySelectorAll("header i")[i].classList.add("active");
      }
    } else {
      console.log("Game Over");
      EndGameMassage("Out Of Lives!", "Restart Level");
    }
  }
}

// Function Massage
function EndGameMassage(massage, textButtom) {
  // Creata Massage
  let divMassage = document.createElement("div");

  let Massage = document.createElement("div");

  let header = document.createElement("h2");

  let buttom = document.createElement("a");

  divMassage.classList.add("control-massage");

  Massage.classList.add("massage");

  header.textContent = massage;

  buttom.text = textButtom;

  divMassage.append(Massage);

  Massage.append(header);

  Massage.append(buttom);

  document.body.appendChild(divMassage);

  // Start New Game
  buttom.addEventListener("click", () => location.reload());
}

//
function checkAddColor(boxGame) {
  let classcurrntBox = boxGame.className.split(" ");

  let RowBoxs = document.querySelectorAll(
    `.boxs-game > div.${classcurrntBox[0]}:not([data-color = "transparent"])`
  );
  let columBoxs = document.querySelectorAll(
    `.boxs-game > div.${classcurrntBox[1]}:not([data-color = "transparent"])`
  );

  counterRow = 0;

  RowBoxs.forEach((rowBox) => {
    if (rowBox.dataset.color === rowBox.style.backgroundColor) {
      counterRow++;
    }
  });
  console.log(RowBoxs);

  if (counterRow == RowBoxs.length) {
    let transBox = document.querySelectorAll(
      `.boxs-game > div.${classcurrntBox[0]}[data-color = "transparent"]`
    );
    transBox.forEach((transBox) => transBox.classList.add("transparent"));
  }

  counterColum = 0;

  columBoxs.forEach((columBox) => {
    if (columBox.dataset.color === columBox.style.backgroundColor) {
      counterColum++;
    }
  });

  if (counterColum == columBoxs.length) {
    let transBox = document.querySelectorAll(
      `.boxs-game > div.${classcurrntBox[1]}[data-color = "transparent"]`
    );
    transBox.forEach((transBox) => transBox.classList.add("transparent"));
  }
}

function winGame() {
  let allBoxs = document.querySelectorAll(
    `.boxs-game > div:not([data-color = "transparent"])`
  );

  let counter = 0;

  allBoxs.forEach((box) => {
    if (box.dataset.color == box.style.backgroundColor) {
      counter++;
    }
    if (counter === allBoxs.length) {
      EndGameMassage("Level Completer!", "Next Level");
      level++;
      localStorage.setItem("Level", level);
    }
  });
}
