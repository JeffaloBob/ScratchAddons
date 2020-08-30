import textFieldEdit from "../../libraries/text-field-edit.js"; //used for editing the forum text box without messing with the edit history

export default async function ({ addon, global, console }) {
  var x = 0;
  var y = 0;

  function debounce(fn, delay) {
    let timer = null;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  function addQuoteButton(selection, username) {
    removeQuoteButton();

    var overlay = document.createElement("div");

    overlay.className = "add-quote";

    overlay.style.top = y + 10 + "px";
    overlay.style.left = x + "px";
    overlay.id = "overlay";

    overlay.innerText = "add as quote";

    overlay.addEventListener("click", (e) => {
      document.getElementById("id_body").scrollTo();
      textFieldEdit.insert(document.getElementById("id_body"), `[quote=${username}]${selection}[/quote]`);
    });

    document.body.appendChild(overlay);
  }

  function removeQuoteButton() {
    if (document.getElementById("overlay")) {
      document.getElementById("overlay").remove();
    }
  }

  var contents = document.querySelectorAll("div > div.box-content > div.postright > div > div");

  document.addEventListener(
    "selectionchange",
    debounce(function (event) {
      removeQuoteButton();
      if (document.getSelection().focusNode.parentElement.className == "post_body_html") {
        let selection = document.getSelection
          ? document.getSelection().toString()
          : document.selection.createRange().toString();
        console.log(selection);

        selection = getSelectionHTML(); //todo, replace this junk with copy_paste() from scratch itself

        var username = "a person";

        if (selection == "") {
          //
        } else {
          if (
            document.getSelection().focusNode.parentElement.parentElement.parentElement.parentElement.parentElement
              .children[1]
          ) {
            username = document.getSelection().focusNode.parentElement.parentElement.parentElement.parentElement
              .parentElement.children[1].children[0].children[0].children[0].innerText;
          }
          addQuoteButton(selection, username);
        }
      }
    }, 250)
  );

  document.addEventListener("mousemove", (e) => {
    x = e.pageX;
    y = e.pageY;
  });

  function getSelectionHTML() {
    var userSelection;
    if (window.getSelection) {
      // W3C Ranges
      userSelection = window.getSelection();
      // Get the range:
      if (userSelection.getRangeAt) var range = userSelection.getRangeAt(0);
      else {
        var range = document.createRange();
        range.setStart(userSelection.anchorNode, userSelection.anchorOffset);
        range.setEnd(userSelection.focusNode, userSelection.focusOffset);
      }
      // And the HTML:
      var clonedSelection = range.cloneContents();
      var div = document.createElement("div");
      div.appendChild(clonedSelection);
      return div.innerHTML;
    } else if (document.selection) {
      // Explorer selection, return the HTML
      userSelection = document.selection.createRange();
      return userSelection.htmlText;
    } else {
      return "";
    }
  }
}

import textFieldEdit from "../../libraries/text-field-edit.js"; //used for editing the forum text box without messing with the edit history

export default async function ({ addon, global, console }) {
  var x = 100; //where it goes
  var y = 100; //where, does the button go?

  var mouseIsOver = false;

  var quoteButton = document.createElement("div");

  quoteButton.className = "add-quote";

  quoteButton.style.top = y + 10 + "px";
  quoteButton.style.left = x + "px";
  quoteButton.style.display = "none";

  quoteButton.id = "add-quote";
  quoteButton.dataset.username = "a person";
  quoteButton.dataset.words = "blah blah";

  quoteButton.innerText = "🗨";

  quoteButton.addEventListener("click", (e) => {
    document.getElementById("id_body").scrollTo();
    textFieldEdit.insert(
      document.getElementById("id_body"),
      `[quote=${quoteButton.dataset.username}]${quoteButton.dataset.words}[/quote]`
    );
  });

  quoteButton.addEventListener("mouseover", (e) => {
    mouseIsOver = true;
    console.log(mouseIsOver);
  });

  quoteButton.addEventListener("mouseout", (e) => {
    mouseIsOver = false;
    console.log(mouseIsOver);
  });

  document.body.appendChild(quoteButton);

  function moveButton(newX, newY, username, words) {
    console.log(newX, newY, username, words);
    showButton();
    quoteButton.style.left = newX + "px";
    quoteButton.style.top = newY + 15 + "px";
    quoteButton.dataset.username = username;
    quoteButton.dataset.words = words;
  }

  function showButton() {
    quoteButton.style.display = "block";
  }

  function hideButton() {
    quoteButton.style.display = "none";
  }

  document.addEventListener("selectionchange", () => {
    //console.log(document.getSelection());
    console.log(getSelection().toString());
    if (getSelection().toString() == "") {
      if (mouseIsOver) return;
      console.log("unselect");
      hideButton();
      return;
    }
    showButton();

    moveButton(x, y, "person", document.getSelection().toString());
  });

  document.addEventListener("mousemove", (e) => {
    x = e.pageX;

    y = e.pageY;
  });
}
