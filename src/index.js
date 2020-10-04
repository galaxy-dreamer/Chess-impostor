let positions = document.querySelectorAll("[data-number]");
let PlayerWin = document.querySelector("[data-winner]");
let Seeredimpostor = document.querySelector("[data-SeeRedimpostor]");
let Seeblueimpostor = document.querySelector("[data-SeeBlueimpostor]");
let Showredimpostor = document.querySelector("[data-ShowRedimpostor]");
let Showblueimpostor = document.querySelector("[data-ShowBlueimpostor]");
let hoverIMG = document.querySelector("[data-hoverIMG]");
let info = document.querySelector("[data-info]");
let restartButton = document.querySelector("[data-restart]");

let turn = 1;
let orderOfClick = 0;
let xPos = 8,
  ypos = 8;
let TheWinner = 0;

let xKnight = [2, 2, -2, -2, 1, 1, -1, -1];
let yKnight = [1, -1, 1, -1, 2, -2, 2, -2];
let xKing = [1, 1, -1, -1, 1, 0, -1, 0];
let yKing = [1, -1, 1, -1, 0, -1, 0, 1];
let impostorpos = [
  [1, 100],
  [6, 100],
];

let impostorCanSayHi = [0, 0];
let impostorDied = [0, 0];
let onOffClickImpostor = [0, 0];

function setupNormalColor() {
  positions.forEach((button) => {
    if (button.getAttribute("data-color") === "1") {
      button.setAttribute("style", "background-color: white;");
    } else button.setAttribute("style", "background-color: #FF9966;");
  });
}

function DataNum(x, y) {
  return y * 8 + x;
}

function addReloadFunction() {
  restartButton.addEventListener("click", () => {
    window.location.reload()
  });
}


positions.forEach((button) => {
  button.addEventListener("mouseout", () => {
    if (TheWinner !== 0) return;
    if (
      turn.toString() === button.getAttribute("data-landOfPlayer") &&
      DataNum(xPos, yPos).toString() !== button.getAttribute("data-number")
    ) {
      if (button.getAttribute("data-color") === "1") {
        button.setAttribute("style", "background-color: white;");
      } else button.setAttribute("style", "background-color: #FF9966;");
    }
  });

  button.addEventListener("mouseover", () => {
    if (TheWinner !== 0) return;
    if (button.getAttribute("data-landOfPlayer") !== "0") {
      if (button.getAttribute("data-chessman") === "PAWN") {
        if (button.getAttribute("data-landOfPlayer") === "1")
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/pawnred.png">'),
            (info.innerHTML = "Tốt đỏ");
        else
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/pawnblue.png">'),
            (info.innerHTML = "Tốt xanh");
      }
      if (button.getAttribute("data-chessman") === "ROOK") {
        if (button.getAttribute("data-landOfPlayer") === "1")
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/rookred.png">'),
            (info.innerHTML = "Xe đỏ");
        else
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/rookblue.png">'),
            (info.innerHTML = "Xe xanh");
      }
      if (button.getAttribute("data-chessman") === "KNIGHT") {
        if (button.getAttribute("data-landOfPlayer") === "1")
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/knightred.png">'),
            (info.innerHTML = "Mã đỏ");
        else
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/knightblue.png">'),
            (info.innerHTML = "Mã xanh");
      }
      if (button.getAttribute("data-chessman") === "BISHOP") {
        if (button.getAttribute("data-landOfPlayer") === "1")
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/bishopred.png">'),
            (info.innerHTML = "Tượng đỏ");
        else
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/bishopblue.png">'),
            (info.innerHTML = "Tượng xanh");
      }
      if (button.getAttribute("data-chessman") === "QUEEN") {
        if (button.getAttribute("data-landOfPlayer") === "1")
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/queenred.png">'),
            (info.innerHTML = "Hậu đỏ");
        else
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/queenblue.png">'),
            (info.innerHTML = "Hậu xanh");
      }
      if (button.getAttribute("data-chessman") === "KING") {
        if (button.getAttribute("data-landOfPlayer") === "1")
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/kingred.png">'),
            (info.innerHTML = "Vua đỏ");
        else
          (hoverIMG.innerHTML =
            '<img class="imgHover" src="photoforchess/kingblue.png">'),
            (info.innerHTML = "Vua xanh");
      }
    }
    if (DataNum(xPos, yPos).toString() !== button.getAttribute("data-number")) {
      if (turn.toString() === button.getAttribute("data-landOfPlayer")) {
        button.setAttribute("style", "background-color: yellow;");
      }
    }
  });
});

function addEventListenerToBoard() {
  positions.forEach((button) => {
    button.addEventListener("click", () => {
      if (TheWinner != 0) return;
      if (orderOfClick === 1) {
        let number = button.getAttribute("data-number");
        let colorOfbutton = button.getAttribute("style");
        if (
          colorOfbutton !== "background-color: red;" &&
          colorOfbutton !== "background-color: aquamarine;"
        ) {
          if (button.getAttribute("data-landOfPlayer") === turn.toString()) {
            orderOfClick = 0;
          }
        } else {
          if (button.getAttribute("data-chessman") === "KING") {
            if (turn === 1)
              (TheWinner = 1), (PlayerWin.innerText = "Player 1 Win!");
            if (turn === 2)
              (TheWinner = 2), (PlayerWin.innerText = "Player 2 Win!");
          }
          if (
            number % 8 === impostorpos[0][0] &&
            (number - (number % 8)) / 8 === impostorpos[0][1]
          )
            impostorDied[0] = 1;
          if (
            number % 8 === impostorpos[1][0] &&
            (number - (number % 8)) / 8 === impostorpos[1][1]
          )
            impostorDied[1] = 1;
          button.setAttribute(
            "data-chessman",
            positions[DataNum(xPos, yPos)].getAttribute("data-chessman")
          );
          positions[DataNum(xPos, yPos)].setAttribute("data-chessman", "");
          button.innerHTML = positions[DataNum(xPos, yPos)].innerHTML;
          positions[DataNum(xPos, yPos)].innerHTML = "";
          button.setAttribute(
            "data-landOfPlayer",
            positions[DataNum(xPos, yPos)].getAttribute("data-landOfPlayer")
          );
          positions[DataNum(xPos, yPos)].setAttribute("data-landOfPlayer", "0");
          setupNormalColor();
          if (
            number % 8 === 7 &&
            button.getAttribute("data-chessman") === "PAWN"
          ) {
            button.setAttribute("data-chessman", "QUEEN");
            button.innerHTML =
              '<img src="photoforchess/queenred.png" width="80px" height="80px">';
          }
          if (
            number % 8 === 0 &&
            button.getAttribute("data-chessman") === "PAWN"
          ) {
            button.setAttribute("data-chessman", "QUEEN");
            button.innerHTML =
              '<img src="photoforchess/queenblue.png" width="80px" height="80px">';
          }
          if (xPos === impostorpos[0][0] && yPos === impostorpos[0][1]) {
            impostorpos[0][0] = number % 8;
            impostorpos[0][1] = (number - impostorpos[0][0]) / 8;
            impostorCanSayHi[0] = 1;
          }
          if (xPos === impostorpos[1][0] && yPos === impostorpos[1][1]) {
            impostorpos[1][0] = number % 8;
            impostorpos[1][1] = (number - impostorpos[1][0]) / 8;
            impostorCanSayHi[1] = 1;
          }
          turn = 3 - turn;
          if (turn === 1 && TheWinner === 0)
            (PlayerWin.innerText = "Turn of PlayerRed"),
              PlayerWin.setAttribute("style", "color: red;");
          if (turn === 2 && TheWinner === 0)
            (PlayerWin.innerText = "Turn of PlayerBlue"),
              PlayerWin.setAttribute("style", "color: blue;");
        }
      }
      if (orderOfClick === 0) {
        if (turn.toString() !== button.getAttribute("data-landOfPlayer")) return;
        let number = button.getAttribute("data-number");
        xPos = number % 8;
        yPos = (number - xPos) / 8;
        setupNormalColor();
        orderOfClick = 1;
        button.setAttribute("style", "background-color: greenyellow;");
        if (button.getAttribute("data-chessman") === "PAWN") {
          if (turn === 1) {
            if (xPos === 1) {
              if (
                positions[DataNum(xPos + 1, yPos)].getAttribute(
                  "data-landOfPlayer"
                ) === "0"
              ) {
                positions[DataNum(xPos + 1, yPos)].setAttribute(
                  "style",
                  "background-color: aquamarine;"
                );
                if (
                  positions[DataNum(xPos + 2, yPos)].getAttribute(
                    "data-landOfPlayer"
                  ) === "0"
                )
                  positions[DataNum(xPos + 2, yPos)].setAttribute(
                    "style",
                    "background-color: aquamarine;"
                  );
              }
            } else {
              if (
                positions[DataNum(xPos + 1, yPos)].getAttribute(
                  "data-landOfPlayer"
                ) === "0"
              )
                positions[DataNum(xPos + 1, yPos)].setAttribute(
                  "style",
                  "background-color: aquamarine;"
                );
            }
            if (
              yPos - 1 >= 0 &&
              positions[DataNum(xPos + 1, yPos - 1)].getAttribute(
                "data-landOfPlayer"
              ) === (3 - turn).toString()
            )
              positions[DataNum(xPos + 1, yPos - 1)].setAttribute(
                "style",
                "background-color: red;"
              );
            if (
              yPos + 1 <= 7 &&
              positions[DataNum(xPos + 1, yPos + 1)].getAttribute(
                "data-landOfPlayer"
              ) === (3 - turn).toString()
            )
              positions[DataNum(xPos + 1, yPos + 1)].setAttribute(
                "style",
                "background-color: red;"
              );
          } else {
            if (xPos === 6) {
              if (
                positions[DataNum(xPos - 1, yPos)].getAttribute(
                  "data-landOfPlayer"
                ) === "0"
              ) {
                positions[DataNum(xPos - 1, yPos)].setAttribute(
                  "style",
                  "background-color: aquamarine;"
                );
                if (
                  positions[DataNum(xPos - 2, yPos)].getAttribute(
                    "data-landOfPlayer"
                  ) === "0"
                )
                  positions[DataNum(xPos - 2, yPos)].setAttribute(
                    "style",
                    "background-color: aquamarine;"
                  );
              }
            } else {
              if (
                positions[DataNum(xPos - 1, yPos)].getAttribute(
                  "data-landOfPlayer"
                ) === "0"
              )
                positions[DataNum(xPos - 1, yPos)].setAttribute(
                  "style",
                  "background-color: aquamarine;"
                );
            }
            if (
              yPos - 1 >= 0 &&
              positions[DataNum(xPos - 1, yPos - 1)].getAttribute(
                "data-landOfPlayer"
              ) === (3 - turn).toString()
            )
              positions[DataNum(xPos - 1, yPos - 1)].setAttribute(
                "style",
                "background-color: red;"
              );
            if (
              yPos + 1 <= 7 &&
              positions[DataNum(xPos - 1, yPos + 1)].getAttribute(
                "data-landOfPlayer"
              ) === (3 - turn).toString()
            )
              positions[DataNum(xPos - 1, yPos + 1)].setAttribute(
                "style",
                "background-color: red;"
              );
          }
        }
        if (
          button.getAttribute("data-chessman") === "ROOK" ||
          button.getAttribute("data-chessman") === "QUEEN"
        ) {
          for (let i = xPos + 1; i <= 7; ++i) {
            let used = positions[DataNum(i, yPos)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(i, yPos)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(i, yPos)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
          for (let i = xPos - 1; i >= 0; --i) {
            let used = positions[DataNum(i, yPos)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(i, yPos)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(i, yPos)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
          for (let j = yPos + 1; j <= 7; ++j) {
            let used = positions[DataNum(xPos, j)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(xPos, j)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(xPos, j)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
          for (let j = yPos - 1; j >= 0; --j) {
            let used = positions[DataNum(xPos, j)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(xPos, j)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(xPos, j)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
        }
        if (
          button.getAttribute("data-chessman") === "BISHOP" ||
          button.getAttribute("data-chessman") === "QUEEN"
        ) {
          for (let i = 1; i <= 7; ++i) {
            if (xPos + i > 7 || yPos + i > 7) break;
            let used = positions[DataNum(xPos + i, yPos + i)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(xPos + i, yPos + i)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(xPos + i, yPos + i)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
          for (let i = 1; i <= 7; ++i) {
            if (xPos - i < 0 || yPos - i < 0) break;
            let used = positions[DataNum(xPos - i, yPos - i)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(xPos - i, yPos - i)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(xPos - i, yPos - i)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
          for (let i = 1; i <= 7; ++i) {
            if (xPos - i < 0 || yPos + i > 7) break;
            let used = positions[DataNum(xPos - i, yPos + i)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(xPos - i, yPos + i)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(xPos - i, yPos + i)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
          for (let i = 1; i <= 7; ++i) {
            if (xPos + i > 7 || yPos - i < 0) break;
            let used = positions[DataNum(xPos + i, yPos - i)].getAttribute(
              "data-landOfPlayer"
            );
            if (used !== "0") {
              if (used !== turn.toString())
                positions[DataNum(xPos + i, yPos - i)].setAttribute(
                  "style",
                  "background-color: red;"
                );
              break;
            }
            positions[DataNum(xPos + i, yPos - i)].setAttribute(
              "style",
              "background-color: aquamarine;"
            );
          }
        }
        if (button.getAttribute("data-chessman") === "KNIGHT") {
          for (let i = 0; i <= 7; ++i) {
            if (
              xPos + xKnight[i] <= 7 &&
              yPos + yKnight[i] <= 7 &&
              xPos + xKnight[i] >= 0 &&
              yPos + yKnight[i] >= 0
            ) {
              let used = positions[
                DataNum(xPos + xKnight[i], yPos + yKnight[i])
              ].getAttribute("data-landOfPlayer");
              if (used !== "0") {
                if (used !== turn.toString())
                  positions[
                    DataNum(xPos + xKnight[i], yPos + yKnight[i])
                  ].setAttribute("style", "background-color: red;");
                continue;
              }
              positions[
                DataNum(xPos + xKnight[i], yPos + yKnight[i])
              ].setAttribute("style", "background-color: aquamarine;");
            }
          }
        }
        if (button.getAttribute("data-chessman") === "KING") {
          for (let i = 0; i <= 7; ++i) {
            if (
              xPos + xKing[i] <= 7 &&
              yPos + yKing[i] <= 7 &&
              xPos + xKing[i] >= 0 &&
              yPos + yKing[i] >= 0
            ) {
              let used = positions[
                DataNum(xPos + xKing[i], yPos + yKing[i])
              ].getAttribute("data-landOfPlayer");
              if (used !== "0") {
                if (used !== turn.toString())
                  positions[
                    DataNum(xPos + xKing[i], yPos + yKing[i])
                  ].setAttribute("style", "background-color: red;");
                continue;
              }
              positions[DataNum(xPos + xKing[i], yPos + yKing[i])].setAttribute(
                "style",
                "background-color: aquamarine;"
              );
            }
          }
        }
      }
    });
  });
}

function randomImpostor() {
  impostorpos[0][1] = Math.floor(Math.random() * 8);
  impostorpos[1][1] = Math.floor(Math.random() * 8);
}

function notShowImpostor(x) {
  onOffClickImpostor[x] = 0;
  if (
    positions[DataNum(impostorpos[x][0], impostorpos[x][1])].getAttribute(
      "data-color"
    ) === "1"
  )
    positions[DataNum(impostorpos[x][0], impostorpos[x][1])].setAttribute(
      "style",
      "background-color: white;"
    );
  else
    positions[DataNum(impostorpos[x][0], impostorpos[x][1])].setAttribute(
      "style",
      "background-color: #FF9966;"
    );
}

function addEventListenerToImpostor() {
  Seeredimpostor.addEventListener("click", () => {
    if (impostorDied[0] === 1) return;
    if (onOffClickImpostor[0] === 0) {
      positions[DataNum(impostorpos[0][0], impostorpos[0][1])].setAttribute(
        "style",
        "background-color: black;"
      );
      onOffClickImpostor[0] = 1;
      window.setTimeout(notShowImpostor, 1500, 0);
    }
  });
  Seeblueimpostor.addEventListener("click", () => {
    if (impostorDied[1] === 1) return;
    if (onOffClickImpostor[1] === 0) {
      positions[DataNum(impostorpos[1][0], impostorpos[1][1])].setAttribute(
        "style",
        "background-color: black;"
      );
      window.setTimeout(notShowImpostor, 1500, 1);
      onOffClickImpostor[1] = 1;
    }
  });
  Showredimpostor.addEventListener("click", () => {
    if (impostorDied[0] === 1) return;
    if (impostorCanSayHi[0] === 1) {
      positions[DataNum(impostorpos[0][0], impostorpos[0][1])].setAttribute(
        "style",
        "background-color: black;"
      );
      positions[DataNum(impostorpos[0][0], impostorpos[0][1])].setAttribute(
        "data-landOfPlayer",
        "2"
      );
      window.setTimeout(notShowImpostor, 1500, 0);
      window.setTimeout(() => {
        if (
          positions[DataNum(impostorpos[0][0], impostorpos[0][1])].getAttribute(
            "data-chessman"
          ) === "PAWN"
        )
          positions[DataNum(impostorpos[0][0], impostorpos[0][1])].innerHTML =
            '<img src="photoforchess/pawnblue.png" width="80px" height="80px">';
        else
          positions[DataNum(impostorpos[0][0], impostorpos[0][1])].innerHTML =
            '<img src="photoforchess/queenblue.png" width="80px" height="80px">';
      }, 1500);
    }
  });
  Showblueimpostor.addEventListener("click", () => {
    if (impostorDied[1] === 1) return;
    if (impostorCanSayHi[1] === 1) {
      positions[DataNum(impostorpos[1][0], impostorpos[1][1])].setAttribute(
        "data-landOfPlayer",
        "1"
      );
      positions[DataNum(impostorpos[1][0], impostorpos[1][1])].setAttribute(
        "style",
        "background-color: black;"
      );
      window.setTimeout(notShowImpostor, 1500, 1);
      window.setTimeout(() => {
        if (
          positions[DataNum(impostorpos[1][0], impostorpos[1][1])].getAttribute(
            "data-chessman"
          ) === "PAWN"
        )
          positions[DataNum(impostorpos[1][0], impostorpos[1][1])].innerHTML =
            '<img src="photoforchess/pawnred.png" width="80px" height="80px">';
        else
          positions[DataNum(impostorpos[1][0], impostorpos[1][1])].innerHTML =
            '<img src="photoforchess/queenred.png" width="80px" height="80px">';
      }, 1500);
    }
  });
}

randomImpostor()
addReloadFunction()
addEventListenerToBoard()
addEventListenerToImpostor()