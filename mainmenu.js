
// mengidetifikasi cookies
function getUsernameFromCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('username=')) {
      return cookie.substring('username='.length);
    }
  }
  return null; // Return null if username cookie is not found
}

// Get username and update the HTML
const username = getUsernameFromCookie();
if (username) {
  document.getElementById('username').textContent = username;
}
// mengidetifikasi cookies (end)

// pencet tombol search
function search(event) {
  if (event) event.preventDefault();
    let query = document.getElementById("pencarian").value;
    let adress = `http://localhost:3000/search?q=${encodeURIComponent(query)}`
    console.log("Fetching from:", adress);
    fetch(adress,{
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log("Received data:", data);  // <-- Add this line
        const tbody = document.querySelector('#hasilPencarian tbody');
        tbody.innerHTML = '';
        data.forEach(row => {
          const date = new Date(row.calibrationexpire);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${row.id}</td><td>${row.itemdescription}</td><td>${formattedDate}</td><td>${row.posession}</td>`;
          tbody.appendChild(tr);
        });
        })
        
        .catch(err => {
          console.error("Fetch error:", err);
          alert("Error fetching data: " + err.message);
        });
  }
  // pencet tombol search (end)

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // pencet tombol otorisasi
  function transPos() {

    let pencarian = document.getElementById('pencarian').value;
    let pengguna = getCookie('username');

    console.log(`${pencarian},${pengguna}` );
    
    fetch('http://localhost:3000/otorisasi', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pencarian, posession: pengguna })
    })
    .then(async res => {
      const data = await res.json();
      
    })
    
    
  }
  // pencet tombol otorisasi (end)


// pencet tombol generasi expire list
function generasiexpire(event) {
  if (event) event.preventDefault();

    let adress = `http://localhost:3000/generation`
    console.log("Fetching from:", adress);
    fetch(adress,{
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log("Received data:", data);  // <-- Add this line
        const tbody = document.querySelector('#expirelist tbody');
        tbody.innerHTML = '';
        data.forEach(row => {
          const date = new Date(row.calibrationexpire);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${row.id}</td><td>${row.itemdescription}</td><td>${formattedDate}</td><td>${row.posession}</td>`;
          tbody.appendChild(tr);
        });
        })
        
        .catch(err => {
          console.error("Fetch error:", err);
          alert("Error fetching data: " + err.message);
        });
  }
  // pencet tombol generasi expire list (end)

//pencet tombol register device

document.getElementById("formregristrasi").addEventListener("submit", function (e) {
  e.preventDefault();

  let idNumber = document.getElementById("idNumber").value;
  let itemDescription = document.getElementById("itemDescription").value;
  let calibrationExpire = document.getElementById("calibrationExpire").value;

  fetch("http://localhost:3000/registerdevice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idNumber, itemDescription, calibrationExpire }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert('your device registered');
      location.reload();
    })
    .catch((err) => console.error("Error:", err));
    
});
//pencet tombol register device (end)


  // pencet tombol logout
  function loggingOut(){
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include' // important to include cookies
    }).then(response => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        window.location.href = "http://127.0.0.1:5500/"; // fallback
      }
    });
  }
  // document.getElementById('logoutBtn').addEventListener('click', function () {
    
  // });
  // pencet tombol logout (end)

  // pindah halaman
  function reftoreg(){
    window.location.href = "regdevice.html"; // to register device page
  }
  
  function reftomenu(){
    window.location.href = "mainmenu.html"; // to mainmenu page
  }

  function reftoreview(){
    window.location.href = "mgmtreview.html"; // to management review page
  }