<?php
class Rekening
{
    private float $saldo = 0;
    public function setSaldo(float $saldo): void
    {
        if ($saldo >= 0){
            $this -> saldo = $saldo;
        }
    }

    public function getSaldo (): float
    {
        return $this -> saldo;
    }
}
$rekening = new Rekening ();
$rekening->setSaldo(5000000);
echo $rekening -> getSaldo();