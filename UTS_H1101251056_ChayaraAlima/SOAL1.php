<?php 
class Mahasiswa
{
    public string $nama;
    public string $nim;

    public function __construct(string $nama, string $nim)
    {
        $this -> nama = $nama;
        $this -> nim = $nim;
    }

    public function tampil(): void
    {
        echo "Nama: {$this -> nama} <br>";
        echo "NIM: {$this -> nim}";
    }
}
$mhs= new Mahasiswa ("Chayaea", "H1101251056");
$mhs->tampil();