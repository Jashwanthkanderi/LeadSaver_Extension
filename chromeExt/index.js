let myLeads = JSON.parse(localStorage.getItem("myLeads")) || [];

const inputEl = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
const ulel = document.getElementById("ul-el");
const delbtn = document.getElementById("delete-btn");
const tabbtn = document.getElementById("save-btn");
const leadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsfromLocalStorage) {
  myLeads = leadsfromLocalStorage;
  render(myLeads);
}
 
tabbtn.addEventListener("click",function(){

  chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads  ) )
    render(myLeads)
  })
  //console.log(tabs[0].url)
})


function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
                  <a target='_blank' href='${leads[i]}'> 
                  ${leads[i]} 
                  </a>
                  </li>`;
  }

  ulel.innerHTML = listItems;
}

inputbtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

delbtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

/*
con.innerHTML = "<button onclick='buy()'>Buy Now</button>";
function buy() {
  con.innerHTML += "<p>'Hello Thanks For Buying , Great Choice!'</p>";
}


// Another method for innerHtml is by Uisng the CreateElement
const anoth = Document.createElement("li");
anoth.textContent = myLeads[i];
ulel.append(anoth)
*/

/*Here we convert the 
 string to array and arr to string array again because we cant
 push an element directly into the strings
myLeads = `["hello.com"]`
myLeads=JSON.parse(myLeads)
myLeads.push("Heellloo.com")
myLeads=JSON.stringify(myLeads)
 */
