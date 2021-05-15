let bug = document.querySelector("#bug");
let navbar = document.querySelector(".navbar");
let left_nav = document.querySelector("#left_nav");
let right_nav = document.querySelector("#right_nav");
bug.addEventListener("click", function(){
    left_nav.classList.toggle("v_opa");
    right_nav.classList.toggle("v_opa");
    navbar.classList.toggle("h_nav");
});
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");

    let notes = localStorage.getItem("notes");
    let impValues = localStorage.getItem("impValues");
    if(impValues == null)
        impArr = [];
    else
        impArr = JSON.parse(impValues);
    if (notes == null)
        nodeArr = [];
    else
        nodeArr = JSON.parse(notes);
    nodeArr.push(addTxt.value);
    impArr.push("FALSE");
    localStorage.setItem("notes", JSON.stringify(nodeArr));
    localStorage.setItem("impValues", JSON.stringify(impArr));
    addTxt.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    let impValues = localStorage.getItem("impValues");
    if(impValues == null)
        impArr = [];
    else
        impArr = JSON.parse(impValues);
    if (notes == null)
        nodeArr = [];
    else
        nodeArr = JSON.parse(notes);

    let html = "";
    nodeArr.forEach(function (element, index) {
        html += `
                <div class="AllCards">
                    <p class="N bold">Note ${index+1}:</p>
                    <div id="card">
                    <p>${element}</p>
                    <button id="${index}" onclick="delNote(this.id)" class="btn note">Delete Note</button>
                    <button class="btn note" id="${index}" onclick="IMPNote(this.id)">Add to IMP</button>
                   </div>
                </div>
                `;
    });
    let el = document.getElementById("addThis");
    if(nodeArr.length != 0)
        el.innerHTML = html;
    else
        el.innerHTML = `Nothing to Show! Use "Add a Note" section above to add notes`;
    let i = 0;
    let all = document.getElementsByClassName("AllCards");
    Array.from(all).forEach(function(element){
        if(impArr[i] == "TRUE")
        {
            element.style.border = "2px solid red";
            element.getElementsByTagName("button")[1].innerText = "Remove from IMP";
        }
        else
        {
            element.style.border = "1px solid gray";
            element.getElementsByTagName("button")[1].innerText = "Add to IMP";
        }
        i += 1;
    })
}

function delNote(index)
{
    window.confirm("You sure, you wanna delete?");
    let notes = localStorage.getItem("notes");
    let impValues = localStorage.getItem("impValues");
    if(impValues == null)
        impArr = [];
    else
        impArr = JSON.parse(impValues);
    if (notes == null)
        nodeArr = [];
    else
        nodeArr = JSON.parse(notes);
    // Delete one item from Array 
    nodeArr.splice(index, 1);
    impArr.splice(index, 1);
    // Update the localStorage
    localStorage.setItem("notes", JSON.stringify(nodeArr));
    localStorage.setItem("impValues", JSON.stringify(impArr));
    showNotes();

}
function IMPNote(index)
{
    let impValues = localStorage.getItem("impValues");
    if(impValues == null)
        impArr = [];
    else
        impArr = JSON.parse(impValues);
    
    let all = document.getElementsByClassName("AllCards");
    Array.from(all).forEach(function(element, i){
        if(impArr[index] == "FALSE" && i == index)
            impArr[index] = "TRUE";
        else if(impArr[index] == "TRUE" && i == index) 
            impArr[index] = "FALSE";
    })
    localStorage.setItem("impValues", JSON.stringify(impArr));
    showNotes();

}
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function(e){
    
    let inputValue = searchTxt.value.toLowerCase();
    console.log(inputValue)
    let all = document.getElementsByClassName("AllCards");
    Array.from(all).forEach(function(element){
        let text = element.getElementsByTagName("p")[1].innerText;
        if(text.includes(inputValue))
            element.style.display = "block";
        else
            element.style.display = "none";
    })
});
