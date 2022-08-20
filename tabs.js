const tabList= document.querySelector('[role="tablist"]'); // we are giving a role here if someone needs the tablist in some other page and re-enforces that accessibility
const tabs= tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) =>{ // for each tab inside...
    tab.addEventListener('click', changeTabPanel);
});




let tabFocus= 0;
function changeTabFocus(e){
    // console.log(e.keyCode);
    const keydownleft= 37;
    const keydownright= 39;

    // change the tabindex of the current tab to -1
    if(e.keyCode === keydownleft || e.keyCode === keydownright){
        // console.log('test');
        // console.log(tabs[tabFocus]);
        tabs[tabFocus].setAttribute("tabindex", -1);
        // if the right key is pushed, move to the next tab on the right
        if (e.keyCode === keydownright){
            tabFocus++;
            if (tabFocus >= tabs.length){
                tabFocus=0;
            }
            // console.log(tabFocus);

        }

        // if the left key is pushed, move to the next tab on the left
        else if(e.keyCode === keydownleft){
            tabFocus--;
            if (tabFocus < 0){
                tabFocus=tabs.length-1;
            }
            // console.log(tabFocus);

        }
        tabs[tabFocus].setAttribute("tabindex", 0); // this ensures that when the right arrow is clicked
        // that particular tab can be something that can focused on but won't focus it immediately.
        tabs[tabFocus].focus(); // This will focus the tab that is ready to be focused on because of the previous line
    }
}


function changeTabPanel(e){ // hide everything and turn on only the one we need.
    const targetTab= e.target; // gets our target tab
    // console.log(e.target);

    const targetPanel= targetTab.getAttribute("aria-controls"); //gives the name of the panel we want to activate
    // console.log(targetPanel);

    const targetImage= targetTab.getAttribute("data-image"); // gives the name of the image we want

    const tabContainer= targetTab.parentNode; // shows the entire tab list
    // console.log(tabContainer);

    const mainContainer= tabContainer.parentNode; // gives the parent node of tabContainer, which here is, the <main> element.
    //console.log(mainContainer);

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
    // mainContainer.querySelectorAll('[role="tabpanel"]')
        // .forEach((panel) => panel
        // .setAttribute("hidden", true));
        // To set the article hidden when we switch to that particular tab

    //mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden");
    // here above what we need to do is select the target panel that gives us the name of the panel that we want to activate,
    // hence to do that we use attribute selector "#$" and then specify the variable and then remove the attribute hidden.

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
    // mainContainer.querySelectorAll('picture')
        // .forEach((picture)=> picture
        // .setAttribute("hidden", true));

    //mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden");
}


function hideContent(parent, content){
    parent.querySelectorAll(content).forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content){
    parent.querySelector(content).removeAttribute("hidden");
}
