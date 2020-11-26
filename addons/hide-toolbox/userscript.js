export default async function ({ addon, global, console }) {
  const vm = addon.tab.traps.onceValues.vm;

  var hidden = false;

  var toolbox;
  var scrollbar;

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == "h") {
      e.preventDefault();
      if (hidden) {
        show();
      } else {
        hide();
      }
    }
  });

  function show() {
    console.log("show");
    toolbox.style.display = "block";
    scrollbar.style.display = "block";
    hidden = false;
  }

  function hide() {
    console.log("hide");
    toolbox.style.display = "none";
    scrollbar.style.display = "none";
    hidden = true;
  }

  while (true) {
    hidden = false;

    toolbox = await addon.tab.waitForElement(".blocklyFlyout", { markAsSeen: true });
    scrollbar = await addon.tab.waitForElement(".blocklyFlyoutScrollbar", { markAsSeen: true });
    let menu = document.querySelector(".blocklyToolboxDiv");

    console.log(toolbox, scrollbar, menu);

    /*         menu.addEventListener('mouseenter', e => {
            console.log(e)
            if(hidden) show()
        })

        menu.addEventListener('mouseleave', e => {
            console.log(e)
            if (!hidden) hide()
        }) */
  }
}
