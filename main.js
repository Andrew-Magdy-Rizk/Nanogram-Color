// The Level Game
let level = 1;

// Count The Boxs Game
let CountBoxsRowOrColum = 5;

// Count The Live
let CountLive = 3;

//
let currntOptionCol = "";

// Class List Of The Color Boxs
let listColor = ["black", "orange", "transparent"];

// Get The Box Game
let boxsGame = document.querySelector(".boxs-game");

// Get The Header Name Level
let levelName = document.querySelector("header .level-name");

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

//
let realyColor = [];

CheckLevelGame();

eventClick();

function CheckLevelGame() {
  // Create Count Color in Row and Colums
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

      // Set Rondom Class On The All Boxs
      boxGame.setAttribute(
        "data-color",
        listColor[Math.floor(Math.random() * listColor.length)]
      );

      // let data = boxGame.getAttribute("data-color");
      // boxGame.style.backgroundColor = data;

      //
      AllColorBoxs.push(boxGame.getAttribute("data-color"));

      // Insert Boxs in the Boxs Game
      boxsGame.appendChild(boxGame);
    }
  }

  // Distance Colors Of Array
  realyColor = AllColorBoxs.filter(
    (value, index, array) =>
      array.indexOf(value) === index && value !== "transparent"
  );
  // console.log(realyColor);

  // Create Element For All Distance Colors
  realyColor.forEach((color) => {
    let colorSpan = document.createElement("span");

    colorSpan.style.backgroundColor = color;

    colorSpan.setAttribute("option-color", color);

    choseColor.appendChild(colorSpan);

    // Check Active Color
    choseColor.firstChild.classList.add("active");
  });

  // Play The Function
  rowsOrColsCountCol("row", "rows", "width");
  rowsOrColsCountCol("colum", "colums", "height");
}

// Function Count Rows And Colums Colors
function rowsOrColsCountCol(rowOrColum, RowsOrColums, widthOrheight) {
  // Get The All Boxs
  let allBoxs = Array.from(document.querySelectorAll(".boxs-game > div"));

  // Loop for Check All Row
  for (let i = 1; i <= CountBoxsRowOrColum; i++) {
    // Get All Box In The Currnt Row
    let currntRowBoxs = allBoxs.filter((row) =>
      row.classList.contains(`${rowOrColum}-${i}`)
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

          if (widthOrheight === "width") {
            lastSpanPlus.style.width = `${lastSpanPlus.clientWidth + 15}px`;
          } else if (widthOrheight === "height") {
            lastSpanPlus.style.height = `${lastSpanPlus.clientHeight + 15}px`;
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
let alloptionColor = Array.from(choseColor.children);

alloptionColor.forEach((chose, index) => {
  chose.addEventListener("click", () => {
    alloptionColor.forEach((element) => {
      element.classList.remove("active");
    });
    alloptionColor[index].classList.add("active");
    eventClick();
  });
});

// Function When Click On Box
function eventClick() {
  //
  currntOptionCol = document
    .querySelector(".chose-color span.active")
    .getAttribute("option-color");
  console.log(currntOptionCol);

  // Get The All Boxs
  let allBoxs = Array.from(document.querySelectorAll(".boxs-game > div"));

  allBoxs.forEach((box, index) => {
    box.addEventListener("click", (box) => {
      let currntAttrib = allBoxs[index].getAttribute("data-color");

      if (currntOptionCol === currntAttrib) {
        allBoxs[index].style.backgroundColor = currntAttrib;
        // console.log("yes");
      } else {
        allBoxs[index].classList.add("wrong");
        // console.log("no");
        CountLive--;
        if (CountLive > 0) {
          document
            .querySelectorAll("header i")
            .forEach((e) => e.classList.remove("active"));

          for (let i = 1; i <= CountLive; i++) {
            document
              .querySelector("header")
              .children[i].classList.add("active");
            // console.log(CountLive);
          }
        } else {
          document
            .querySelectorAll("header i")
            .forEach((e) => e.classList.remove("active"));
          console.log("Game Over");
          document.querySelector(".boxs-game").disabled = true;
          console.log(contianer);
        }
      }
    });
  });
}
