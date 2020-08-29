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

    overlay.style.position = "absolute";
    overlay.style.display = "block";
    overlay.style.zIndex = "300";
    overlay.style.lineHeight = "1.4";
    overlay.style.padding = "5px 5px";
    overlay.style.borderRadius = "5px";

    overlay.style.backgroundColor = "rgba(11,10,7,0.8)";
    overlay.style.color = "white";

    overlay.style.top = y + 10 + "px";
    overlay.style.left = x - 10 + "px";
    overlay.id = "overlay";

    overlay.innerText = "add as quote";
    overlay.style.cursor = "pointer";

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

        selection = getSelectionHTML();

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
