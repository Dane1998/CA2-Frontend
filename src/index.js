import "./style.css"
import "bootstrap/dist/css/bootstrap.css"


document.getElementById("all-content").style.display = "block"

// Er metoden som viser den side som der skal vises ud fra ID //
function hideAllShowOne(idToShow) {
  document.getElementById("home_html").style = "display:none"
  document.getElementById("groupMembers_html").style = "display:none"
  document.getElementById("allEndPoints_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}
// Metoden slutter her //


// Er metoden som tager id på den side der skal vises og kalder den forrige //
function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "home": hideAllShowOne("home_html"); break
    case "groupMembers": hideAllShowOne("groupMembers_html"); break
    case "allEndPoints": hideAllShowOne("allEndPoints_html"); break
    default: hideAllShowOne("home_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("home_html");

// Metoden slutter her //



// Starten af search og map metoden //
  const baseUrl = "https://jsonplaceholder.typicode.com/users/" // Det endpoint som der bliver hentet fra
  const resultBox = document.getElementById('result'); 


  const mapMembersToHtml = (members) => {
    const html = members.map(({id, name, username, email, address, phone, company}) => (
      `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${username}</td>
        <td>${email}</td>
        <td>${address.street}</td>
        <td>${address.city}</td>
        <td>${address.zipcode}</td>
        <td>${phone}</td>
        <td>${company.name}</td>
      </tr>`
    )).join('');

    resultBox.innerHTML = 
            ` <table border= "2"> 
                  <thead> 
                      <tr> 
                          <td>Person-ID</td> 
                          <td>Name</td> 
                          <td>Username</td> 
                          <td>Email</td> 
                          <td>Address</td> 
                          <td>City</td> 
                          <td>Zipcode</td> 
                          <td>Phone number</td>
                          <td>Hobby</td>
                      </tr> 
                  </thead> 
                  <tbody> 
                      ${html} 
                  </tbody> 
                </table> `; 
  }         
  
  const searchInMembers = (query) => {
    if (query.length === 0) {
      return
    }
//Matcher basis værdi med den nye værdi, dette gør expansion langt nemmere.
    const matchValues = [
      (element) => element.name,
      (element) => element.phone,
      (element) => element.address.street,
      (element) => element.address.city,
      (element) => element.email
    ]

    const queryValue = query.toLowerCase()
    fetch(baseUrl)
      .then(response => response.json())
      .then(elements => {
        const filtered = elements.filter(element => {
          for (let matchValue of matchValues) {
            const comparableValue = matchValue(element).toLowerCase()
            if (queryValue === comparableValue || comparableValue.includes(queryValue)) {
              return true
            }
          }
          return false
        })
      mapMembersToHtml(filtered)
      })
  } 
  document.getElementById('findButton').addEventListener('click', function(event) {
      event.preventDefault();
      searchInMembers(document.getElementById('searchField').value)
  });
