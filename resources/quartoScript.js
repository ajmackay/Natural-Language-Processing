 // # TODO animate showhide transitions

let content;
let header;
let reportBody;
let navList;
let navItems;
let sections;
let hidetoggles;
let tabGroups = [];
let usingToc;

document.addEventListener("DOMContentLoaded", function() {
loaded();
});

function loaded(){

sections = document.getElementsByClassName("level1");
content = document.getElementById("content");

header = document.getElementById("myheader");

navItems = document.getElementsByClassName("tab");
hidetoggles = document.getElementsByClassName("showhide");

usingToc = document.getElementById("TOC") != null;

let navDiv = document.getElementById("myNav");

let navList = document.createElement("UL");
  navList.id = "navList";

for(let i = 0; i < sections.length; i++){

    let sectionName = sections[i].children[0].innerHTML;
    let listItem = document.createElement("LI");
    let navText = document.createElement("A");

    navText.classList.add("tab");
  navText.innerHTML = sectionName;
navText.setAttribute("section-id",sections[i].id)

  if(i > 0){
    sections[i].classList.add("invisible");
if(usingToc){
    document.getElementById("toc-".concat(sections[i].id)).parentElement.classList.add("invisible");

}
  }else{
    navText.classList.add("active");
  }
  listItem.appendChild(navText);
  navList.appendChild(listItem);
}
navDiv.appendChild(navList);


for(let i = 0; i < navItems.length; i++){
  navItems[i].addEventListener("click",function(){

   let selectedSection = this.innerHTML;
let tocLinks = document.getElementsByClassName("navLink");

      for(let j = 0; j < navItems.length; j++){
        navItems[j].classList.remove("active");
        document.getElementById("toc-".concat(navItems[j].getAttribute("section-id"))).parentElement.classList.add("invisible");
      }
      for(let j = 0; j < sections.length; j++){sections[j].classList.add("invisible");}
   //   for(let j = 0; j < tocLinks.length; j++){tocLinks[j].classList.add("invisible");}


      this.classList.add("active");
      document.getElementById(this.getAttribute("section-id")).classList.remove("invisible");
      document.getElementById("toc-".concat(this.getAttribute("section-id"))).parentElement.classList.remove("invisible");
      for(let item of document.getElementsByClassName("collapse")){item.classList.remove("collapse")}
      window.dispatchEvent(new Event('resize'));
    })

}

if(usingToc){
let tocLevels = ["level1", "level2", "level3"]
for(let i = 0; i < tocLevels.length; i++){

let targetSections = document.getElementsByClassName(tocLevels[i]);

for(let j = 0; j < targetSections.length; j++){
let currentToc = "toc-".concat(targetSections[j].id);
document.getElementById(currentToc).setAttribute("toc-level", i);
document.getElementById(currentToc).classList.add("navLink");
}

}
}

for(let nav1 of document.querySelectorAll("li[toc-level='1']")){nav1.classList.add("collapsed")}

for(let item of document.getElementsByClassName("navLink")){
  item.parentElement.classList.add("navListItem")
  item.parentElement.setAttribute("toc-level", item.getAttribute("toc-level"))

  item.addEventListener("click",function(){


    for(let item2 of document.getElementsByClassName("navLink")){
      item2.classList.remove("activeToc")

      if(item2.getAttribute("toc-level") === this.getAttribute("toc-level")){
        item2.parentElement.classList.add("collapsed")
      }
    }
    this.classList.add("activeToc");
    this.parentElement.classList.remove("collapsed");
  })



if(item.getAttribute("toc-level") === "0"){
targetChildren = item.parentElement.querySelector("[toc-level='1']");

if(targetChildren != null){
targetChildren.classList.add("activeToc");
targetChildren.classList.remove("collapsed");
}
}

}

for(let nav1 of document.querySelectorAll("li[toc-level='1']")){nav1.classList.add("collapsed")}

for(let topNav of document.querySelectorAll("li[toc-level='0']")){
  targetNav = topNav.querySelector("[toc-level='1']");
  if(targetNav != null){
  targetNav.classList.remove("collapsed");

  }
}
for(let section of document.querySelectorAll(".level2")){
  section.addEventListener("mouseenter", function(){

for(let otherNavs of document.querySelectorAll(".navLink")){otherNavs.classList.remove("activeToc")}
    document.getElementById("toc-".concat(this.id)).classList.add("activeToc");

  })

}
//for(let nav1 of document.querySelectorAll("[toc-level='1']")){nav1}

for(let i = 0; i < hidetoggles.length; i++){

  let currentToggle = hidetoggles[i];
  let state = currentToggle.getAttribute("data-state");

  if (state == "show"){
     currentToggle.innerHTML = "hide &#x25BC;";
     currentToggle.setAttribute("data-state", "hide");
   }else{
     currentToggle.innerHTML = "show &#x25B2;";
     currentToggle.setAttribute("data-state", "show");
   }

  let forToggling = currentToggle.parentElement.parentElement.children;

    for(let j = 0; j < forToggling.length; j++){
      if(!forToggling[j].classList.contains("titlediv")){
        if(state == "hide"){
          forToggling[j].classList.add("minimised");
        }else{
          forToggling[j].classList.remove("minimised");
        }

      }

    }

  currentToggle.addEventListener("click", function(ev){
    let forToggling = this.parentElement.parentElement;
    let currentState = this.getAttribute("data-state");

        if(currentState == "hide"){
          forToggling.classList.add("minimised");
        }else{
          forToggling.classList.remove("minimised");
        }




   if (currentState == "show"){
     this.innerHTML = "hide &#x25BC;";
     this.setAttribute("data-state", "hide");

   }else{
     this.innerHTML = "show &#x25B2;";
     this.setAttribute("data-state", "show");
   }




  })
}




setupTabGroups();


let mainDiv = document.createElement("div");

mainDiv.id = "mainDiv";
document.getElementById("content").after(mainDiv);

mainDiv.appendChild(document.getElementById("content"));
//mainDiv.appendChild(document.getElementById("TOC"));

reportBody = document.getElementById("mainDiv");

let height = (header.offsetHeight).toString().concat("px");
reportBody.style.top = height;

if(usingToc){
document.getElementById("TOC").style.top = height;
}

window.dispatchEvent(new Event('resize'));
}



setupTabGroups = function(){

let  groups = document.getElementsByClassName("tabgroup");


  for(let i = 0; i < groups.length; i++){
var currentGroup = groups[i];
var section = currentGroup.closest(".level1").id;
var sectionSidebar = document.getElementById(section.concat("Sidebar"))

if(sectionSidebar == null){

sectionSidebar = document.createElement("div");
sectionSidebar.classList.add("sideBar");
sectionSidebar.id = section.concat("Sidebar");

document.getElementById(section).appendChild(sectionSidebar);

}


var newTabName = currentGroup.getAttribute("dataname");

if(!tabGroups.includes(newTabName)){

var newSideTab = document.createElement("div");
newSideTab.classList = "SideTab";

newSideTab.innerHTML = newTabName
newSideTab.addEventListener("click", sideTabClicked);
sectionSidebar.appendChild(newSideTab);

tabGroups.push(newTabName);

if(i == 0){newSideTab.click();}


}


  }


}

sideTabClicked = function(tab){


var clicked = tab.target;

var siblingTabs = clicked.parentElement.children;
var tabGroups = clicked.parentElement.parentElement.getElementsByClassName("tabgroup");


for(let i = 0; i < siblingTabs.length; i++){

if(siblingTabs[i].innerHTML == clicked.innerHTML){
  siblingTabs[i].classList.add("active");
}else{
  siblingTabs[i].classList.remove("active");
}


}

for(let i = 0; i < tabGroups.length; i++){
  if(tabGroups[i].getAttribute("dataName") == clicked.innerHTML){
   tabGroups[i].classList.remove("invisible");
  }else{
     tabGroups[i].classList.add("invisible");
  }




}








}

window.onresize =function(){
let height = (header.offsetHeight/2).toString().concat("px");
reportBody.style.top = height;
}



document.addEventListener("keydown", function (event) {

if(event.ctrlKey && event.altKey && event.key == "i" ){
    document.getElementById("session-info").classList.toggle("invisible");
  }

});



