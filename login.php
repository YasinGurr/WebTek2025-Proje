<?php

// Oturum baslat
session_start();

// Form gonderildi mi kontrol et
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formdan gelen e-posta ve sifre bilgilerini al
    $eposta = $_POST["eposta"];
    $sifre = $_POST["sifre"];
    
    // E-posta adresinden kullanici adini cikar (@ isaretinden onceki kisim)
    $kullaniciAdi = explode('@', $eposta)[0];
    
    // Sifre, e-postanin bas kismiyla eslesiyor mu ve e-posta sakarya.edu.tr domain'ine sahip mi kontrol et
    if ($sifre === $kullaniciAdi && strpos($eposta, "@sakarya.edu.tr") !== false) {
        // Gecerli giris
        $_SESSION["kullanici"] = $eposta;
        $_SESSION["kullaniciAdi"] = $kullaniciAdi;
        
        // Hos geldin mesaji ile index.html sayfasina yonlendir
        header("Location: index.html?hosgeldin=" . $kullaniciAdi);
        exit();
    } else {
        // Gecersiz giris
        // Hata mesajiyla giris sayfasina geri yonlendir
        header("Location: login.html?hata=1");
        exit();
    }
} else {
    // Eger biri POST verisi olmadan bu sayfaya direkt erismeye calisirsa
    header("Location: login.html");
    exit();
}
?>