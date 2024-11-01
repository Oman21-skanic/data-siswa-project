document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-siswa');
    const dataTableBody = document.getElementById('data-table').querySelector('tbody');

    // Fungsi untuk mengambil data siswa
    function fetchData() {
        fetch('/siswa')
            .then(response => response.json())
            .then(data => {
                dataTableBody.innerHTML = '';
                data.datas.forEach(siswa => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${siswa.absen}</td>
                        <td>${siswa.nama}</td>
                        <td>${siswa.asalSekolah}</td>
                        <td>
                            <button onclick="editData('${siswa.absen}')">Edit</button>
                            <button onclick="deleteData('${siswa.absen}')">Hapus</button>
                        </td>
                    `;
                    dataTableBody.appendChild(row);
                });
            });
    }

    // Panggil fetchData untuk mengisi tabel
    fetchData();

    // Tambah data
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const absen = document.getElementById('absen').value;
        const nama = document.getElementById('nama').value;
        const asalSekolah = document.getElementById('asalSekolah').value;

        fetch('/siswa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ absen, nama, asalSekolah })
        })
        .then(response => response.json())
        .then(data => {
            if (data.isSuccess) {
                alert(data.message);
                fetchData(); // Refresh data
                form.reset(); // Reset form
            } else {
                alert(data.message);
                fetchData(); // Refresh data
                form.reset();
            }
        });
    });
});

// Fungsi untuk menghapus data
function deleteData(absen) {
    fetch(`/siswa/${absen}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchData(); // Refresh data
    });
}

// Fungsi untuk mengedit data
function editData(absen) {
    // Implementasikan logika untuk mengisi form dengan data siswa yang ingin diedit
    // Setelah mengisi form, panggil endpoint PUT untuk memperbarui data
}
