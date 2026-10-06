<?php
class Kendaraan
{
    protected string $merk;
    public function __construct(string $merk)
    {
        $this -> merk = $merk;
    }

    public function jalan(): void
    {
        echo "{$this->merk} sedang berjalan";
    }

    class Mobil extends Kendaraan
    {
        public function klakson(): void
        {
            echo "telolet";
        }
    }
}
$mobil = new Mobil("Mazda");
$mobil->jalan();
$mobil->klakson();

