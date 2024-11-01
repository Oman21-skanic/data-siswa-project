const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');

app.use(bodyParser.json());
app.use(express.static('public')); // Menyediakan file statis di folder "public"

// Rute untuk mengambil semua data
app.get('/siswa', (req, res) => {
    const sql = 'SELECT * FROM x_pplg_2';
    db.query(sql, (err, result) => {
        if (err) return response(500, null, "Error retrieving data", res);
        response(200, result, "Data retrieved successfully", res);
    });
});

// Rute untuk menambah data
app.post('/siswa', (req, res) => {
    const { absen, nama, asalSekolah } = req.body;
    const sql = 'INSERT INTO x_pplg_2 (absen, nama, asalSekolah) VALUES (?, ?, ?)';
    db.query(sql, [absen, nama, asalSekolah], (err, result) => {
        if (err) return response(500, null, "Data gagal ditambahkan", res);
        response(200, { isSuccess: true }, "Data berhasil ditambahkan", res);
    });
});

// Rute untuk mengupdate data
// Endpoint untuk mengupdate data siswa
app.put('/siswa/:absen', (req, res) => {
    const absen = req.params.absen;
    const { nama, asalSekolah } = req.body;

    const sql = `UPDATE x_pplg_2 SET nama = ?, asalSekolah = ? WHERE absen = ?`;
    db.query(sql, [nama, asalSekolah, absen], (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return response(500, null, "Data gagal diperbarui", res);
        }

        if (result && result.affectedRows > 0) {
            return response(200, null, "Data berhasil diperbarui", res);
        } else {
            return response(404, null, "Data tidak ditemukan", res);
        }
    });
});


// Rute untuk menghapus data
app.delete('/siswa/:absen', (req, res) => {
    const absen = req.params.absen;
    const sql = 'DELETE FROM x_pplg_2 WHERE absen = ?';
    db.query(sql, [absen], (err, result) => {
        if (err) return response(500, null, "Data gagal dihapus", res);
        response(200, { isSuccess: true }, "Data berhasil dihapus", res);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
