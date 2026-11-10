<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil Saya</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="header">
        <img
            src="chay.jpg"
            alt="Foto Profil Chayara Alima"
            class="foto-profil"
        >
        <h1>Chayara Alima</h1>
        <p>Mahasiswi Sistem Informasi, Universitas Tanjungpura</p>
    </header>

    <nav class="nav">
        <a href="#tentang">Tentang</a>
        <a href="#jadwal">Jadwal</a>
        <a href="#hobi">Hobi</a>
        <a href="#kontak">Kontak</a>
    </nav>

    <main class="konten">

        <section id="tentang">
            <h2>Tentang Saya</h2>
            <p>Halo semuanya! perkenalkan saya Chayara Alima, seorang mahasiswi Sistem Informasi semester 3 di Universitas Tanjungpura dengan NIM H1101251056. Saat ini saya sedang mengikuti mata kuliah Praktikum Pemrograman Web Dasar, dan saat ini saya sudah berhasil menyelesaikan web sederhana. <br> <br> "I wanna be defined by the things that I love, not the things I hate." -Taylor Swift </p>
        </section>

        <section id="jadwal">
            <h2>Jadwal Mata Kuliah Favorit</h2>
            <table>
                <tr>
                    <th>Hari</th>
                    <th>Mata Kuliah</th>
                    <th>Jam</th>
                </tr>
                <tr>
                    <td>Senin</td>
                    <td>Pemrograman Web</td>
                    <td>07.00 – 09.30</td>
                </tr>
                <tr>
                    <td>Selasa</td>
                    <td>Manajemen Proyek SI</td>
                    <td>07.30 – 09.10</td>
                </tr>
                <tr>
                    <td>Rabu</td>
                    <td>Aplikasi Multimedia</td>
                    <td>10.20 – 12.50</td>
                </tr>
                <tr>
                    <td>Kamis</td>
                    <td>Pemrograman Berorientasi Objek</td>
                    <td>10.20 – 12.00</td>
                </tr>
                <tr>
                    <td>Jumat</td>
                    <td>Manajemen Rantai Pasok</td>
                    <td>07.30 – 10.00</td>
                </tr>
            </table>
        </section>

        <section id="hobi">
            <h2>Daftar Hobi</h2>
            <table>
                <tr>
                    <th>No</th>
                    <th>Hobi</th>
                    <th>Keterangan</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Berenang</td>
                    <td>Menjaga kesehatan tubuh dan menyegarkan pikiran</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Tidur</td>
                    <td>Memulihkan energi dan mengurangi stres</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Menyanyi</td>
                    <td>Menghibur diri dan mengekspresikan emosi</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Playing Chess</td>
                    <td>Melatih fokus dan kemampuan berpikir strategis</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Makeup</td>
                    <td>Meningkatkan kepercayaan diri dan mengekspresikan kreativitas</td>
                </tr>
            </table>
        </section>

        <section id="kontak">
            <h2>Formulir Kontak</h2>
            <form>
                <label for="nama">Nama</label>
                <input type="text" id="nama" placeholder="Tulis nama Anda">

                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Tulis email Anda">

                <label for="pesan">Pesan</label>
                <textarea id="pesan" rows="4" placeholder="Tulis pesan..."></textarea>

                <button type="submit">Kirim Pesan</button>
            </form>
        </section>

    </main>

    <footer class="footer">
        <p>&copy; 2026 Chayara Alima. Dibuat dengan HTML &amp; CSS.</p>
    </footer>

</body>
</html>