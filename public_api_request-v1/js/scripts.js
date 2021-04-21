//****TECHDEGREE PROJECT 5****/
//Author: Marina Harrison

//DOM VARIABLES
const gallery = document.getElementById('gallery');


//FETCH FUNCTIONS
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    //.then(data => console.log(data)) ----> checked to make sure the API was fetching an array of 12 objects
    .then(data => {
        profileHTML(data.results);
        clickModal(data.results);
     }) 


//HTML FUNCTIONS
//***Below is the HTML for the individual profile cards**/
function profileHTML(data) {
    data.map(person => {

//Using a template literal with the provided markup in index.html to create the DOM elements for the Gallery        
      person = `<div class="card">
            <div class="card-img-container">
              <img class="card-img" src="${person.picture.medium}" alt="profile picture">
              </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
              <p class="card-text">${person.email}</p>
              <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
              </div>
              </div>`;
//method to concatenate to the DOM provided on Treehouse        
      gallery.insertAdjacentHTML('beforeend', person);
    });
  }


//CREATE MODAL
//**Below is the HTML for the modal**/
function modalHTML(personData){

//Below is the reformat for the DOB object in the profiles array
  let date = new Date(personData.dob.date);
  let month = date.getMonth();
  let day = date.getDay();
  let year = date.getFullYear();
  const dobFormat = `${month}/${day}/${year}`;   
    
//Using a template literal with the provided markup in index.html to create the DOM elements for the modal cards
   modal = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${personData.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${personData.name.first} ${personData.name.last}</h3>
            <p class="modal-text">${personData.email}</p>
            <p class="modal-text cap">${personData.location.city}</p>
            <hr>
            <p class="modal-text">${personData.phone}</p>
            <p class="modal-text">${personData.location.street.number} ${personData.location.street.name}, ${personData.location.city}, ${personData.location.state} ${personData.location.postcode}</p>
            <p class="modal-text">Birthday: ${dobFormat}</p>
        </div>
    </div>
</div>`;

//Method to concatenate to the DOM provided on Treehouse
gallery.insertAdjacentHTML('beforeend', modal)

//Event listener to close the modal window
const closeButton = document.getElementById('modal-close-btn');
const modalContainer = document.querySelector('.modal-container');

closeButton.addEventListener('click', e => {
    modalContainer.style.display = 'none';
    modalContainer.remove();
})
}

//MODAL FUNCTION
//**This will make the modals clickable**/
function clickModal(modalData){
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', e => {
            modalHTML(modalData[i]);
        })
    }
}