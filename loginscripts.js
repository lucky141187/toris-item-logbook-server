
        let nameInput = document.getElementById('nameInput');
        let passInput = document.getElementById('passInput');
        let masuk = document.getElementById('masuk');
        let batal = document.getElementById('batal');
        let tidakadaakun = document.getElementById('tidakadaakun');

        let daftar = document.getElementById('daftar');
    
        let ngetes = document.getElementById('ngetes');

        //initial condition
        
        daftarnama.style.display = "none";
        daftarpassword.style.display = "none";
        daftar.style.display = "none";
        batal.style.display = "none";

        // pencet tombol login
        document.getElementById('logininput').addEventListener('submit', async function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('nameInput').value;
            const passInput = document.getElementById('passInput').value;
      
            const res = await fetch('http://localhost:3000/akundblogin', {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nameInput, passInput })
            });
      
            const data = await res.json();
      
            if (res.ok) {
              document.cookie = `username=${nameInput}; path=/; SameSite=Lax`; //ini penting banget anying
              window.location.href = "mainmenu.html"; // Redirect to main menu
            } else {
              document.getElementById('message').innerText = data.message;
            }
          });

        // function login() {

        //     if (nameInput.value == localStorage.nama && passInput.value == localStorage.password) {
        //         console.log('login berhasil');
        //         window.location.href="mainmenu.html";
                        
        
        //     } else {
        //         console.log('login gagal, periksa kembali password dan username anda');
        //     }
        
        
        // }
        // function login() {
        //     console.log('nameinput' + ' ' + 'passInput');
        // }
        // pencet tombol login


        //pencet tombol tidak punya akun
        function noAccount() {
            console.log('No have account');

            nameInput.style.display = "none";
            passInput.style.display = "none";
            masuk.style.display = "none";
            tidakadaakun.style.display = "none";
            daftarnama.style.display = "block";
            daftarpassword.style.display = "block";
            daftar.style.display = "block";
            batal.style.display = "block";
        }

        //pencet tombol register

        document.getElementById("registrasi").addEventListener("submit", function (e) {
            e.preventDefault();
        
            let daftarnama = document.getElementById("daftarnama").value;
            let daftarpassword = document.getElementById("daftarpassword").value;
        
            fetch("http://localhost:3000/akundbpost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ daftarnama, daftarpassword }),
            })
              .then((res) => res.json())
              .then((data) => {
                alert('your account registered');
                location.reload();
              })
              .catch((err) => console.error("Error:", err));
              
          });

        // function register() {

        //   if (!daftarnama || !daftarpassword) {
        //     return res.status(400).json({ error: 'Username and password are required' });
        //   }
        //     console.log('your account registered')
        //     alert('your account registered');
        //     location.reload();
        // }

        //pencet tombol cancel
        function cancel() {

            location.reload();
        }




        //testing cara panggil dari local storage
        function test() {

            let ngetes = localStorage.getItem('nama');
            console.log(ngetes);
           
        }



        