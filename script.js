// tangkap element absensi_form dan root
let absensi_form = document.getElementById('absensi_form');
let root = document.getElementById('root');

// kita buat array untuk menampung data absensi
let absensi_data = [];

// tambahkan event listener submit ke element absensi_form
absensi_form.addEventListener('submit', (event) => {
  // mencegah form dari reload page
  event.preventDefault();

  let fullname = event.target.fullname.value;

  // validasi mini
  if (fullname == '') {
    alert('Silakan masukan nama lengkap');
    return;
  }

  // push data ke dalam array absensi data
  absensi_data.push({
    nama_lengkap: fullname,
    waktu: new Date().toLocaleTimeString(),
    tanggal: new Date().toLocaleDateString(),
  });

  // reset input field
  event.target.fullname.value = '';

  // panggil function render to html
  renderToHtml();
});

//function untuk render data array ke div root
function renderToHtml() {
  // reset element div root
  root.innerHTML = '';

  // mapping array to html element
  absensi_data.forEach((e, i) => {
    root.innerHTML += `
    <div class="card" draggable="true" ondragend="handleDelete(${i})">  
      <span>  ${i + 1}. &nbsp; ${e.nama_lengkap} </span>
      <span>  ${e.waktu} ${e.tanggal} </span>
      <div class="btn_group">
      <button id="btn_edit" onclick="handleEdit(${i})"><span class="material-symbols-rounded">
      edit
      </span> Edit </button>
      <button id="btn_delete" onclick="handleDelete(${i})"><span class="material-symbols-rounded">
      delete
      </span> Delete </button></div>
     
    </div>
    `;
  });
}

// delete function
function handleDelete(index) {
  // delete 1 data dari array
  absensi_data.splice(index, 1);

  // render kembali data dalam array ke html
  renderToHtml();
}

// edit function
function handleEdit(index) {
  let editVal = prompt('Masukkan Nama Anda : ');
  absensi_data[index].nama_lengkap = editVal;
  renderToHtml();
}
