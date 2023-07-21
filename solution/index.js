// Creating a user class which will represent a contact in our application
// The class should have First Name, Last Name,Phone Number,
//The Class Should have a constructor which will take the above parameters
// The class should have a method which will delete the contact
// The class should have a method which will update the contact


class User {
    // here are my data fields
     firstName;
     lastName;
     phoneNumber;
    // COnstructor
    constructor(firstName, lastName, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    
    deleteContact = ()=>{
        this.firstName = "";
        this.lastName = "";
        this.phoneNumber = "";
    }

    updateContact = (firstName, lastName, phoneNumber)=> {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    // A method that will return the user details as an object
    getUserDetails = ()=> {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber
        }

    }



}

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const phoneNumber = document.querySelector('#phoneNumber');
const tableBody = document.querySelector('.tableBody');

// Create an empty array to store the created contacts 

let contacts = JSON.parse(localStorage.getItem('users')) || []
const createUser = (user) => {
    contacts.push(user);
    console.log(contacts)
    // The array should then be stored in local storage
    localStorage.setItem('users', JSON.stringify(contacts)); 

}


    // A function that adds a user from the form inputs into the table as well store it in the local storage
    document.querySelector('.addContactBtn').addEventListener('click', (e)=> {
    e.preventDefault();
    if(firstName.value === "" || lastName.value === "" || phoneNumber.value === "") {
        throw new Error('Please fill all the fields');
    }else{
        const user = new User(firstName.value, lastName.value, phoneNumber.value);
        // The user object whould be passed into the empty array of contacts
        createUser(user);
        displayUsers()
        phoneNumber.value = "";
        firstName.value = "";
        lastName.value = "";
    }

})


// A function that will display the users in the table from the local storage
 const displayUsers = ()=> {
    tableBody.innerHTML = "";
    const users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    if(users) {
        users.forEach(user => {
           tableBody.innerHTML += `
            <tr>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.phoneNumber}</td>
            <td class="actionBtn">
            <button class="update">Update</button>
            <button class="delete">Delete</button>
            </td> 
            </tr>
            `;
        });
    }
}
// Initialize the Ui with the stored users
displayUsers();

// function to delete a contact and reflect that in the UI
const deleteContact = (e)=> {
    const users = JSON.parse(localStorage.getItem('users'));
    const userToDelete = e.target.parentElement.parentElement.children[0].textContent;
    // console.log(userToDelete);
    const newUsers = users.filter(user => user.firstName !== userToDelete);
    // console.log(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    e.target.parentElement.parentElement.remove();
    displayUsers();
}


// function to update a contact and reflect that in the UI
// For this you have to first fill the form and the click update button for your preferred contact
const updateContact = (e)=> {
    const users = JSON.parse(localStorage.getItem('users'));
    const userToUpdate = e.target.parentElement.parentElement.children[0].textContent;
    // console.log(userToUpdate);
    const newUsers = users.filter(user => user.firstName !== userToUpdate);
    // console.log(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    e.target.parentElement.parentElement.remove();
    displayUsers();

}

// Waiting for the buttons to be printed on the Ui before adding event listeners
setTimeout(()=> {
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', deleteContact);
    });
    const updateBtns = document.querySelectorAll('.update');
    updateBtns.forEach(btn => {
        btn.addEventListener('click', updateContact);
    });
},1000)

