//****TECHDEGREE PROJECT 5****/
//Author: Marina Harrison

//variables
const gallery = document.getElementById('gallery');
const closeButton = document.getElementById('modal-close-btn');
const modalContainer = document.querySelector('.modal-container');

//FETCH FUNCTIONS
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    //.then(data => console.log(data)) ----> checked to make sure the API was fetching an array of 12 objects
    .then(data => {
        profileHTML(data.results);
        clickModal(data.results);
     }) 


//HTML FUNCTIONS
//***Below is the HTML for the individual profiles**/
function profileHTML(data) {
    data.map(person => {
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
      ////method to concatenate to the DOM provided on Treehouse        
      gallery.insertAdjacentHTML('beforeend', person);
    });
  }

//CREATE MODAL
//**Below is the HTML for the modal**/
function modalHTML(personData){
    
  //Using a template literal with the provided markup in index.html to create the DOM elements 
   modal = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${personData.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${personData.name.first}</h3>
            <p class="modal-text">${personData.email}</p>
            <p class="modal-text cap">${personData.location.city}</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>
</div>`;

//method to concatenate to the DOM provided on Treehouse
gallery.insertAdjacentHTML('beforeend', modal)

//**Remove the modal button */
closeButton.addEventListener('click', e => {
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

//**Remove the modal button */
closeButton.addEventListener('click', e => {
    modalContainer.remove();
})
