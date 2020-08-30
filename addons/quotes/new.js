import textFieldEdit from "../../libraries/text-field-edit.js"; //used for editing the forum text box without messing with the edit history

export default async function ({ addon, global, console }) {
  document.addEventListener("contextmenu", (e) => {
    let words = window.getSelection().toString();
    if (
      window.getSelection().anchorNode.parentElement.classList.contains("post_body_html") &&
      !window.getSelection().toString() == ""
    ) {
      if (document.getElementById("add-quote")) {
        document.getElementById("add-quote").remove();
      }

      var button = document.createElement("div");
      button.className = "add-quote";

      button.innerText = "🗨 add quote";

      button.style.top = e.pageY + "px";
      button.style.left = e.pageX + "px";
      button.id = "add-quote";
      button.addEventListener("click", (event) => {
        textFieldEdit.insert(document.getElementById("id_body"), `[quote=person]${words}[/quote]`);
        document.getElementById("id_body").scrollTo();
      });
      e.preventDefault();
      document.body.appendChild(button);
    }
  });

  document.addEventListener("click", (e) => {
    if (document.getElementById("add-quote")) {
      document.getElementById("add-quote").remove();
    }
  });
}
