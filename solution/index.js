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



// Function to populate the form with user data for update
const populateFormForUpdate = (e) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userToUpdate = e.target.parentElement.parentElement.children[0].textContent;
    const user = users.find(user => user.firstName === userToUpdate);
  
    // Populate the form fields with user data
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    phoneNumber.value = user.phoneNumber;
  
    // Change the form submit button text to "Update"
    document.querySelector('.addContactBtn').textContent = 'Update';
    document.querySelector('.addContactBtn').classList.add('updateBtn');
  }
  
 
  
  // Update contact function
  const updateContact = (e) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userToUpdate = e.target.parentElement.parentElement.children[0].textContent;
    const userIndexToUpdate = users.findIndex(user => user.firstName === userToUpdate);
  
    if (userIndexToUpdate !== -1) {
      // Get the updated values from the form
      const updatedFirstName = firstName.value;
      const updatedLastName = lastName.value;
      const updatedPhoneNumber = phoneNumber.value;
  
      // Update the user data
      users[userIndexToUpdate].updateContact(updatedFirstName, updatedLastName, updatedPhoneNumber);
      localStorage.setItem('users', JSON.stringify(users));
  
      // Change the form submit button text back to "Add Contact"
      document.querySelector('.addContactBtn').textContent = 'Add Contact';
      document.querySelector('.addContactBtn').classList.remove('updateBtn');
  
      // Clear the form fields after updating
      firstName.value = '';
      lastName.value = '';
      phoneNumber.value = '';
  
      displayUsers();
    }
  }
  
  // Add event listener to the form submit button for update
  document.querySelector('.addContactBtn').addEventListener('click', (e) => {
    e.preventDefault();
  
    if (e.target.classList.contains('updateBtn')) {
      // If the form submit button has the "updateBtn" class, call the updateContact function
      updateContact(e);
    } else {
      // Otherwise, handle adding a new contact as before
      if (firstName.value === "" || lastName.value === "" || phoneNumber.value === "") {
        throw new Error('Please fill all the fields');
      } else {
        const user = new User(firstName.value, lastName.value, phoneNumber.value);
        createUser(user);
        displayUsers();
        phoneNumber.value = "";
        firstName.value = "";
        lastName.value = "";
      }
    }
  });
  

// Function to delete a contact and reflect that in the UI
const deleteContact = (e) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userToDelete = e.target.parentElement.parentElement.children[0].textContent;
    const newUsers = users.filter(user => user.firstName !== userToDelete);
    localStorage.setItem('users', JSON.stringify(newUsers));
    displayUsers();
  }
  
  // Add event listener to the tableBody to catch delete button clicks (event delegation)
  tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      deleteContact(e);
    }
       // Add event listener to the tableBody to catch update button clicks
    if (e.target.classList.contains('update')) {
        populateFormForUpdate(e);
      }
  });




