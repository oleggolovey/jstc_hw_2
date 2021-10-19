import changeBgColor from "./change_bgcolor.js";
import { clearAllInputs } from "./clear_inputs.js";


const requestUrl = "https://reqres.in/api/users";

const userWrap = document.getElementById("user-wrapper"),
    addBtn = document.getElementById("newUserBtn"),
    blackBtn = document.getElementById('btn-black'),
    whiteBtn = document.getElementById('btn-white');


const userId = document.getElementById("user-id"),
    userEmail = document.getElementById("user-email"),
    userName = document.getElementById("user-name"),
    userSurname = document.getElementById("user-surname"),
    userPic = document.getElementById("user-pic");


const usersCount = document.getElementById('user-count');


let users = [];
let btnDelete;

// Change bg-color
blackBtn.onclick = changeBgColor('black');
whiteBtn.onclick = changeBgColor('white');


const createTemplate = (data) => {
    return (`
        <div class="user" data-id=${data.id}>
          <div class="id">Id: ${data.id}</div>
          <div class="email">Email: ${data.email}</div>
          <div class="first-name">First Name: ${data.first_name}</div>
          <div class="last-name">Last Name: ${data.last_name}</div>
          <img src="${data.avatar}" class="pic" />
          <button class="delete-btn">Delete user</button>
        </div>
    `);
};


// Receiving data from server
const getUsers = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            users = json;
            if (users) {
                users.data
                    .filter((item) => {
                        return item.id <= 5;
                    })
                    .forEach((user) => {
                        userWrap.innerHTML += createTemplate(user);
                    });
                btnDelete = document.querySelectorAll(".delete-btn");
            }
        })
        .then(() => {
            btnDelete.forEach((item) => {
                item.addEventListener("click", (e) => {
                    let elemId = e.target.parentNode.dataset.id;
                    let currElem = e.target.parentNode;
                    deleteUser(requestUrl, elemId, currElem);
                });
            });
        })
        .catch(err => {
            alert(err);
        });
};

getUsers(requestUrl);

// Delete user from server (fake)
const deleteUser = (url, id, currElem) => {
    let answer = confirm('Are you sure?');
    if (answer) {
        fetch(url + "/" + id, {
            method: "DELETE",
        }).then((response) => {
            let status = response.status;
            if (status == 204) {
                currElem.style.display = "none";
            }
        });
    }
};

// Add a new user on server (fake)
const createUser = (url, id, email, name, surname, picture) => {

    const userObj = {
        id: id.value,
        first_name: name.value,
        last_name: surname.value,
        email: email.value,
        photo: picture.value
    };

    console.log(userObj)

    fetch(url, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
        .then((response) => response.status)
        .then((respStatus) => {
            if (respStatus == 201) {
                clearAllInputs();
                counter();
            }
        })
        .catch((err) => {
            alert(err);
        })
}


class User {

    constructor(id, email, firstName, lastName, photo) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
    }

    showInfo() {
        alert(`
        New User Info: 
        Id: ${this.id}  
        Name: ${this.firstName} 
        Surname: ${this.lastName}
        Email: ${this.email}
        Photo: ${this.photo}
        `);
    }
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (userId.value !== '' && userEmail.value !== '' && userName.value !== '' && userSurname.value !== '' && userPic.value !== '') {
        const newPerson = new User(userId.value, userEmail.value, userName.value, userSurname.value);
        newPerson.showInfo();
        createUser(requestUrl, userId, userEmail, userName, userSurname, userPic);
    }
})


// Counter
function makeCounter() {        // Lexical Enviroment: {count and function}
    let count = 0;

    return function () {    // Lexical Enviroment: {usersCount}
        usersCount.innerHTML = `Added users: ${count}`;
        count++;
    }
}

let counter = makeCounter();
counter();

