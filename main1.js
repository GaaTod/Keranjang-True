const url = "https://fakestoreapi.com/products";
const cart = [];
const barang = [];


//----DATA FUNCTION----
const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();

  barang.push(data);

  const divProduk = document.getElementsByClassName("div-produk");
  
  data.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="tambah bg-sky-500  my-3 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
        </div>
        `;
      });
      
      //Untuk menghitung jumlah produk yang ada di dalam keranjang
      let totalkeranjang = document.getElementsByClassName("keranjang_count")[0]
      const btntambah = document.getElementsByClassName("tambah");
      
  Array.from(btntambah).forEach((tombol) => {
    tombol.addEventListener("click", function () {
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol.closest("div").querySelector(".description").innerText;

      cart.push({"title": title, "category":category, "description": description})
      totalkeranjang.innerText = cart.length
      console.log("hallo")

    });
  });
};

ambilData()

//-----MODAL FUNCTION----
const modalkeranjang = document.getElementsByClassName("modal")[0]
const btntutup = document.getElementsByClassName("btn-tutup")[0]
const btntampilkeranjang = document.getElementsByClassName("tampil-keranjang")[0]
const keranjang = document.getElementsByClassName("keranjang")[0]

btntutup.addEventListener("click", () => {
  modalkeranjang.classList.add("hidden")
})

btntampilkeranjang.addEventListener("click", () => {
  modalkeranjang.classList.remove("hidden")
  
  keranjang.innerHTML = ''
  cart.forEach( (item,index) => {
    keranjang.innerHTML += `
      <div class="bg-white rounded my-3 p-3">
        <span class="block font-bold">${item.title}</span>
        <span class="block font-semibold">${item.category}</span>
        <button class = "bg-red-700 my-3 px-3 py-1 rounded text-white" onclick="removeFromCart(${index})">Remove</button>
      </div>
        
      `
      }) 
    })
    
    //fungsi untuk membuang produk dikeranjang
    function removeFromCart(index) {
  
  // Hapus item pada indeks yang ditentukan dari array cart
    cart.splice(index, 1);
  
    // Hapus isi elemen HTML dengan class "keranjanganda"
    keranjang.innerHTML = '';
  
    //Setelah dihapus akan  mengulangi keranjang yang telah diperbarui dan ditampilkan setiap item di elemen "keranjanganda".
    cart.forEach((item, i) => {
      keranjang.innerHTML += `
      <div class="bg-white rounded my-3 p-3">
          <span class="block font-bold">${item.title}</span>
          <span class="block font-semibold">${item.category}</span>
          <button class="bg-red-700 my-3 px-3 py-1 rounded text-white" onclick="removeFromCart(${i})">Remove</button>
          </div>
      `;
    });
  
    // Perbarui jumlah keranjang di bilah navigasi
    const tampilKeranjangElement = document.querySelector(".tampil-keranjang span");
    tampilKeranjangElement.innerHTML = `${cart.length}`;
  
    // Periksa apakah keranjangnya kosong dan tutup modalnya jika kosong
    if (cart.length === 0) {
      modalkeranjang.classList.add("hidden");
    }
  }

  const searchBar = document.querySelector(".searchbar");
searchBar.addEventListener("keyup", (e) => {
  let namaBarang = e.target.value.toLowerCase();
  const hasilcari = barang[0].filter((item) => {
    return item.title.toLowerCase().includes(namaBarang);
  });
  const divProduk = document.getElementsByClassName("div-produk");
  divProduk[0].innerHTML = "";
  hasilcari.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
      `;
    });
});