let mylead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadFromLocalStorage = JSON.parse(localStorage.getItem("mylead"))
console.log(leadFromLocalStorage)

if (leadFromLocalStorage) {
    mylead = leadFromLocalStorage
    render(mylead)
}


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        mylead.push(tabs[0].url)
        localStorage.setItem("mylead", JSON.stringify(mylead))
        render(mylead)
    })
})




function render(lead) {
    let listItems = ""
    for (let i = 0; i < lead.length; i++) {

        listItems +=
            `<li>
        <a href=" ${lead[i]} " target='_blank'> ${lead[i]} </a>
        </li>`
        /* its the same but simple than before...

        listItems += `
        <li>
            <a target='_blank' href='${mylead[i]}'>
                ${mylead[i]}
            </a>
        </li>
        `
        */
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    mylead = []
    render(mylead)

})


inputBtn.addEventListener("click", function () {
    mylead.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("mylead", JSON.stringify(mylead))

    render(mylead)


})

