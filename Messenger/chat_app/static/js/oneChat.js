const form = document.querySelector(".messageForm")
const chatGroupPk = document.getElementById("backBtn").value
console.log(chatGroupPk)
// Вказуємо адресу websocket, щоб сервер розумів куди ми хочемо підключитися
const socketUrl = `ws://${window.location.host}/chats/chat/${chatGroupPk}/`
// Створюємо об'єкт класу "WebSocket" при його створенні відбувається надсилання запиту підключення на сервер
const socket = new WebSocket(socketUrl)
let backBtn = document.querySelector("#backBtn")
let messages = document.querySelector(".mainGroup")


function scrollToBottom(element) {
    element.scrollTo(0, element.scrollHeight)
}
document.querySelector(`.chat${window.location.href.split("/")[window.location.href.split("/").length - 2]}`).style.backgroundColor = "#E9E5EE"



backBtn.addEventListener("click", () => {
    window.location.href = "/chats/"
})
if (document.querySelector(".friends-tracker").textContent == "0") {
    document.querySelector(".friends-tracker").style.display = "none"
}

socket.addEventListener("message", function (event) {
    const messageObject = JSON.parse(event.data)
    const messageElem = document.createElement("div")
    messageElem.classList = "fullMessage"
    let dateTime = new Date(messageObject['date_time'])
    let dateTimeLocal = dateTime.toLocaleString()
    if (messageObject["first_name"] == document.querySelector(".authorId").id) {

        if (messageObject["atteched_image"]) {
            messageElem.innerHTML = `<div class="fullMessage">
            <div class="messagesDateWrapperDiv">
            <p id="date{{message.id}}" class="hidden messagesDateWrapper">${dateTimeLocal}</p>
            </div>
            <div class="messageFromMe message" id="message{{message.id}}" value="${dateTimeLocal}">
            <div class="nonAvatarFromMe">
            <div class="usernameAndTextcontent">
            
            <img src="${messageObject["atteched_image"]}" class="messageImage">
            
            <p class="messageContent">${messageObject["message"]}</p>
            </div>
            <p class="datetime" id="datetimeFromMe">${dateTimeLocal.split(",")[1].split(":")[0]}:${dateTimeLocal.split(",")[1].split(":")[1]}</p>
            </div>
            </div>
            </div>`
        } else {
            messageElem.innerHTML = `<div class="fullMessage">
                <div class="messagesDateWrapperDiv">
                    <p id="date{{message.id}}" class="hidden messagesDateWrapper">${dateTimeLocal}</p>
                </div>
                <div class="messageFromMe message" id="message{{message.id}}" value="${dateTimeLocal}">
                    <div class="nonAvatarFromMe">
                        <div class="usernameAndTextcontent">
                     
                          
                            <p class="messageContent">${messageObject["message"]}</p>
                        </div>
                        <p class="datetime" id="datetimeFromMe">${dateTimeLocal.split(",")[1].split(":")[0]}:${dateTimeLocal.split(",")[1].split(":")[1]}</p>
                    </div>
                </div>
            </div>`
        }
    } else {

        if (messageObject["atteched_image"]) {
            messageElem.innerHTML = `<div class="fullMessage">
                <div class="messagesDateWrapperDiv">
                    <p id="date{{message.id}}" class="hidden messagesDateWrapper">${dateTime}/p>
                </div>
                <div class="message" id="message{{message.id}}" value="{{message.sent_at}}">
                    <img src="${messageObject["user_avatar"]}" class="avatarMessage">
                    <div class="nonAvatar">
                        <div class="usernameAndTextcontent">
                            <p class="authorUsename">${messageObject["first_name"]} ${messageObject["last_name"]}
                            </p>
                            <img src="${messageObject["atteched_image"]}" class="messageImage">
                            <p class="messageContent">${messageObject["message"]}</p>

                        </div>

                        <p class="datetime">${dateTimeLocal.split(",")[1].split(":")[0]}:${dateTimeLocal.split(",")[1].split(":")[1]}</p>
                    </div>
                </div>
            </div>`
        } else {
            messageElem.innerHTML = `<div class="message">
            <img src="${messageObject["user_avatar"]}" class="avatarMessage">
                <div class="nonAvatar">
                    <div class = "usernameAndTextcontent">
                        <p class="authorUsename">${messageObject["first_name"]} ${messageObject["last_name"]}</p>
                        <p class="messageContent">${messageObject["message"]}</p>
                    </div>
                    <p class="datetime">${dateTimeLocal.split(",")[1].split(":")[0]}:${dateTimeLocal.split(",")[1].split(":")[1]}</p >
                </div >
            </div > `
        }

    }
    messages.insertBefore(messageElem, document.querySelectorAll(".fullMessage")[0])
    const datesAndTimes = document.querySelectorAll('.datetime')[document.querySelectorAll('.datetime').length - 1]
    // Перебираємо отримані HTML-елементи з датами та часом

    // Створюємо новий об'єкт класу "Date" з даними дати у фоматі iso
    let dateAndTime = new Date(datesAndTimes.textContent)
    // переробляємо час у локальний час користувача
    let dateAndTimeLocal = dateAndTime.toLocaleString()
    // вказуємо час повідомлення
    datesAndTimes.textContent = `${dateTimeLocal.split(",")[1].split(":")[0]}:${dateTimeLocal.split(",")[1].split(":")[1]}`

    scrollToBottom(messages)
    // window.location.reload()

})

scrollToBottom(messages)

const datesAndTimes = document.querySelectorAll('.datetime')
// Перебираємо отримані HTML-елементи з датами та часом
for (let dt of datesAndTimes) {
    // Створюємо новий об'єкт класу "Date" з даними дати у фоматі iso
    let dateAndTime = new Date(dt.textContent)
    let dateAndTimeLocal = dateAndTime.toLocaleString()
    if (dateAndTimeLocal != "Invalid Date") {
        dt.textContent = `${dateAndTimeLocal.split(",")[1].split(":")[0]}:${dateAndTimeLocal.split(",")[1].split(":")[1]}`
    }
}


let groupCreateFirst = document.querySelector(".group-create")
let groupCreateSecond = document.querySelector(".group-create-2-step")

let skipBtn = document.querySelector(".skipBtn")
let nextBtn = document.querySelector(".next")

let imageInput = document.querySelector(".ImageInput")
let imagesDiv = document.querySelector(".GroupAvatarDiv")

let createChat = document.querySelector(".create-chat-btn")
let cancelBgBlur = document.querySelectorAll("#cancel-bg-blur")
let backgroundBlur = document.querySelector(".background-blur")

let goToBack = document.querySelector(".skipBtn-2-step")

let createGroupForm = document.querySelector("#create_group")

let groupList = document.querySelectorAll(".profiles-text")



groupList.forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = `/chats/chat/${element.id}`
    })
})

goToBack.addEventListener("click", () => {
    groupCreateFirst.style.display = "flex"
    groupCreateSecond.style.display = "none"
})


createChat.addEventListener("click", () => {
    backgroundBlur.style.display = "flex"
})

cancelBgBlur.forEach(element => {
    element.addEventListener("click", () => {
        backgroundBlur.style.display = "none"
    })
})

skipBtn.addEventListener("click", () => {
    groupCreateFirst.style.display = "none"
    groupCreateSecond.style.display = "flex"
})

nextBtn.addEventListener("click", () => {
    groupCreateFirst.style.display = "none"
    groupCreateSecond.style.display = "flex"
})


function displayImage(input, div, filesList) {
    div.innerHTML = ''

    let file = filesList[0]
    let createImage = document.createElement("img")
    createImage.classList.add("GroupAvatar")
    createImage.id = "imageForPost"
    if (file) {
        createImage.setAttribute('src', URL.createObjectURL(file))
        div.appendChild(createImage)
    }

}

let listFiles = []
let listFilesRedact = []

function updateDeleteButtons() {
    let deleteBtnsArray = document.querySelector(".deleteBtn")
    deleteBtnsArray.addEventListener("click", () => {
        listFiles = []
        document.querySelector(".divImageDelete").remove()
        document.querySelector(".inputAndImages").style.backgroundColor = "#FFFFFF"
    })

}

function displayImageAbsolute(input, div, filesList) {
    div.innerHTML = ''
    let len = filesList.length

    let file = input.files[0]
    let divImage = document.createElement("div")
    divImage.classList.add("divImageDelete")
    let createImage = document.createElement("img")
    createImage.classList.add("MessageImage")
    createImage.id = "MessageImage"
    let deleteBtn = document.createElement("img")
    deleteBtn.src = "/static/images/delete.png"
    deleteBtn.classList.add("deleteBtn")
    deleteBtn.id = "delete" + (0 + len)
    divImage.id = (0 + len)
    filesList = input.files[0]
    createImage.id = "imageForPost"
    listFiles = input.files[0]
    if (file) {
        createImage.setAttribute('src', URL.createObjectURL(file));
        divImage.appendChild(createImage)
        divImage.appendChild(deleteBtn)
        div.appendChild(divImage)
    }
    updateDeleteButtons();
    console.log(listFiles)
}


imageInput.addEventListener('change', function (event) {
    displayImage(imageInput, imagesDiv, imageInput.files)
})

document.querySelector(".sendImg2").addEventListener("change", () => {
    document.querySelector(".inputAndImages").style.backgroundColor = "#E9E5EE"
    displayImageAbsolute(document.querySelector(".sendImg2"), document.querySelector(".imagesMessageDiv"), listFiles)
})

async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    })
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const fileInput = document.querySelector(".sendImg2")
    try {
        let dt = new DataTransfer();
        Array(listFiles).forEach(f => dt.items.add(f));
        fileInput.files = dt.files;
    } catch {

        listFiles = []
        let dt = new DataTransfer();
        fileInput.files = dt.files
    }








    const message = document.getElementById("id_message").value.trim()

    if (!message) return

    let imageData = null
    if (fileInput.files.length > 0) {

        try {
            document.querySelector(".divImageDelete").remove()
            document.querySelector(".inputAndImages").style.backgroundColor = "#FFFFFF"
        }
        catch {
            console.log("")
        }
        try {
            imageData = await fileToBase64(fileInput.files[0])
        } catch (error) {
            console.error("File conversion error:", error)
            return
        }
    }

    socket.send(JSON.stringify({
        message: message,
        images: imageData
    }))

    form.reset()
})

let addedCheckbox = document.querySelectorAll(".addedCheckbox")
let arrayOfUsers = ""
let create_group = document.querySelector("#create_group")

let group_id = document.querySelector(".group_id").value

let choosedUsers = document.querySelector(".choosedUsers")


let profilesList = document.querySelectorAll(".profile")

console.log(profilesList)

profilesList.forEach(element => {
    element.addEventListener("click", () => {
        console.log(element.id)

        window.location.href = `/chats/create_chat/${element.id}/`
    })

})



let allMessageDates = []

let messageDates = document.querySelectorAll(".message")

messageDates.forEach(element => {
    allMessageDates.push(element.getAttribute("value"))
});

let listOfMonths = ["січеня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"]

let count = 0
console.log("wpmhnwoler")
allMessageDates.forEach(element => {
    // if (allMessageDates[count].value.split(", ")[0].split(" ")[1] > allMessageDates[count + 1].value.split(", ")[0].split(" ")[1] && ) {

    // }

    try {
        console.log(allMessageDates[count].split(",")[0].split(" ")[1] < allMessageDates[count - 1].split(",")[0].split(" ")[1])

        if (allMessageDates[count].split(", ")[0].split(" ")[1] < allMessageDates[count - 1].split(", ")[0].split(" ")[1]) {
            document.querySelector(`#date${messageDates[count - 1].id.split("message")[1]}`).classList.remove("hidden")

            let dateAndTime = new Date(document.querySelector(`#date${messageDates[count - 1].id.split("message")[1]}`).textContent)
            let dateAndTimeLocal = dateAndTime.toLocaleString()
            if (dateAndTimeLocal != "Invalid Date") {
                document.querySelector(`#date${messageDates[count - 1].id.split("message")[1]}`).textContent = `${parseInt(dateAndTimeLocal.split(".")[0])} ${listOfMonths[parseInt(dateAndTimeLocal.split(".")[1] - 1)]} ${parseInt(dateAndTimeLocal.split(",")[0].split(".")[2])}`
            }
        }
    } catch {
        console.log("error")
    }




    count++
});


document.querySelectorAll(".profiles-all-div .profiles-div .profles").forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = `/chats/chat/${element.id}/`
    })
})


let dotsMenu = document.querySelector(".dotsDiv")
let editBtns = document.querySelector(".edit")
let deleteBtns = document.querySelector(".delete")
dotsMenu.addEventListener("click", () => {
    if (dotsMenu.style.width == "200px") {
        dotsMenu.style.width = "0"
        dotsMenu.style.height = "30px"
        editBtns.style.display = "none"
        deleteBtns.style.display = "none"
    } else {
        dotsMenu.style.width = "200px"
        dotsMenu.style.height = "75px"
        dotsMenu.style.backgroundColor = "white"
        editBtns.style.display = "flex"
        deleteBtns.style.display = "flex"
    }
})

deleteBtns.addEventListener("click", () => {
    window.location.href = `/chats/delete_group/${deleteBtns.id}`
})

async function addFileToInput(filePath, inputElement) {
    try {
        let response = await fetch(filePath)
        let blob = await response.blob()
        let file = new File([blob], 'filename.txt', { type: blob.type })

        let dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        inputElement.files = dataTransfer.files
    } catch (error) {
        console.error('Error adding file to input:', error)
    }
}


editBtns.addEventListener("click", () => {
    backgroundBlur.style.display = "flex"
    document.querySelector(".formType").setAttribute("value", "redact")
    document.querySelectorAll(".addedCheckbox").forEach(element => {
        let string_of_members = document.querySelector(".list_of_members").getAttribute("value")
        let listOfMembers = string_of_members.split("_")
        listOfMembers.pop()
        console.log(listOfMembers, element.value)
        if (listOfMembers.includes(element.value)) {
            element.setAttribute("checked", true)
        }
    })
    document.querySelector("#nameInput").setAttribute("value", document.querySelector(".groupName").textContent)
    document.querySelector(".GroupAvatar").setAttribute("src", document.querySelector(".avatarGroup").src)
    let inputFile = document.querySelector("#inputAvatarGroup")
    addFileToInput(document.querySelector(".avatarGroup").src, inputFile)
    document.querySelector(".NameTitle").textContent = "Редагування групи"
    document.querySelector(".NameTitle").textContent = "Редагування групи"
})


create_group.addEventListener("submit", (event) => {
    addedCheckbox.forEach(element => {
        if (element.checked) {
            choosedUsers.value += `${element.value}_`
        }
    })

    let input_find = document.querySelector(".input_find").value

    $.ajax({
        url: `add/${arrayOfUsers}/${group_id}`,
        type: 'POST',
        data: {
            'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
            "group_name": input_find
        },
        success: function (response) {
            console.log(response)
        }
    })
})