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

        overlay.className = 'add-quote'

    overlay.style.backgroundColor = "rgba(11,10,7,0.8)";
    overlay.style.color = "white";

        overlay.style.top = y + 10 + 'px'
        overlay.style.left = x + 'px'
        overlay.id = 'overlay'

        overlay.innerText = 'add as quote'

        overlay.addEventListener('click', e => {
            document.getElementById('id_body').scrollTo()
            textFieldEdit.insert(document.getElementById('id_body'), `[quote=${username}]${selection}[/quote]\n`)
        })

    document.body.appendChild(overlay);
  }

  function removeQuoteButton() {
    if (document.getElementById("overlay")) {
      document.getElementById("overlay").remove();
    }
  }
  //?
  var contents = document.querySelectorAll("div > div.box-content > div.postright > div > div");

    document.addEventListener("selectionchange", debounce(function (event) {
        removeQuoteButton()
        console.log(document.getSelection())
        if (document.getSelection().anchorNode.parentElement.className == 'post_body_html') { //todo check if anchor node is the same as focus node
            //let selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
            //console.log(selection);

            //let selection = htmlToBBCode(getSelectionHTML()) //needs some work

            let selection = getSelectionHTML()

        var username = "a person";

            if (selection == '') {
                //
            } else {
                if (document.getSelection().anchorNode.parentElement.parentElement.parentElement.parentElement.parentElement.children[1]) {
                    username = document.getSelection().anchorNode.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0].innerText
                }
                addQuoteButton(selection, username)
            }
        }

    }, 250));

    document.addEventListener('mousemove', e => {
        x = e.pageX
        y = e.pageY
    })

    function getSelectionHTML() {
        var userSelection;
        if (window.getSelection) {
            // W3C Ranges
            userSelection = window.getSelection();
            // Get the range:
            if (userSelection.getRangeAt)
                var range = userSelection.getRangeAt(0);
            else {
                var range = document.createRange();
                range.setStart(userSelection.anchorNode, userSelection.anchorOffset);
                range.setEnd(userSelection.focusNode, userSelection.focusOffset);
            }
            // And the HTML:
            var clonedSelection = range.cloneContents();
            var div = document.createElement('div');
            div.appendChild(clonedSelection);
            return div.innerHTML;
        } else if (document.selection) {
            // Explorer selection, return the HTML
            userSelection = document.selection.createRange();
            return userSelection.htmlText;
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

    function htmlToBBCode(html) {

        html = html.replace(/<pre(.*?)>(.*?)<\/pre>/gmi, "[code]$2[/code]");
      
          html = html.replace(/<h[1-7](.*?)>(.*?)<\/h[1-7]>/, "\n[h]$2[/h]\n");
      
          //paragraph handling:
          //- if a paragraph opens on the same line as another one closes, insert an extra blank line
          //- opening tag becomes two line breaks
          //- closing tags are just removed
          // html += html.replace(/<\/p><p/<\/p>\n<p/gi;
          // html += html.replace(/<p[^>]*>/\n\n/gi;
          // html += html.replace(/<\/p>//gi;
      
          html = html.replace(/<br(.*?)>/gi, "\n");
          html = html.replace(/<textarea(.*?)>(.*?)<\/textarea>/gmi, "\[code]$2\[\/code]");
          html = html.replace(/<b>/gi, "[b]");
          html = html.replace(/<i>/gi, "[i]");
          html = html.replace(/<u>/gi, "[u]");
          html = html.replace(/<\/b>/gi, "[/b]");
          html = html.replace(/<\/i>/gi, "[/i]");
          html = html.replace(/<\/u>/gi, "[/u]");
          html = html.replace(/<em>/gi, "[b]");
          html = html.replace(/<\/em>/gi, "[/b]");
          html = html.replace(/<strong>/gi, "[b]");
          html = html.replace(/<\/strong>/gi, "[/b]");
          html = html.replace(/<cite>/gi, "[i]");
          html = html.replace(/<\/cite>/gi, "[/i]");
          html = html.replace(/<font color="(.*?)">(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
          html = html.replace(/<font color=(.*?)>(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
          html = html.replace(/<link(.*?)>/gi, "");
          html = html.replace(/<li(.*?)>(.*?)<\/li>/gi, "[*]$2");
          html = html.replace(/<ul(.*?)>/gi, "[list]");
          html = html.replace(/<\/ul>/gi, "[/list]");
          html = html.replace(/<div>/gi, "\n");
          html = html.replace(/<\/div>/gi, "\n");
          html = html.replace(/<td(.*?)>/gi, " ");
          html = html.replace(/<tr(.*?)>/gi, "\n");
      
          html = html.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, "[img]$2[/img]");
          html = html.replace(/<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/gi, "[url=$2]$4[/url]");
      
          html = html.replace(/<head>(.*?)<\/head>/gmi, "");
          html = html.replace(/<object>(.*?)<\/object>/gmi, "");
          html = html.replace(/<script(.*?)>(.*?)<\/script>/gmi, "");
          html = html.replace(/<style(.*?)>(.*?)<\/style>/gmi, "");
          html = html.replace(/<title>(.*?)<\/title>/gmi, "");
          html = html.replace(/<!--(.*?)-->/gmi, "\n");
      
          html = html.replace(/\/\//gi, "/");
          html = html.replace(/http:\//gi, "http://");
      
          html = html.replace(/<(?:[^>'"]*|(['"]).*?\1)*>/gmi, "");
          html = html.replace(/\r\r/gi, ""); 
          html = html.replace(/\[img]\//gi, "[img]");
          html = html.replace(/\[url=\//gi, "[url=");
      
          html = html.replace(/(\S)\n/gi, "$1 ");
      
          return html;
      }
}
