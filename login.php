
<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form verilerini al
    $email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $password = isset($_POST["password"]) ? trim($_POST["password"]) : "";
    $errors = [];

    // Boş alan kontrolü
    if (empty($email)) {
        $errors[] = "E-posta alanı boş bırakılamaz.";
    }
    
    if (empty($password)) {
        $errors[] = "Şifre alanı boş bırakılamaz.";
    }

    // E-posta formatı kontrolü (boş değilse)
    if (!empty($email)) {
        // E-posta içinde @ işareti var mı?
        if (strpos($email, '@') === false) {
            $errors[] = "Geçersiz e-posta adresi. '@' işareti eksik.";
        } else {
            // Sakarya Üniversitesi e-posta formatı kontrolü
            // Format: b1234567890@sakarya.edu.tr
            if (!preg_match('/^[b][0-9]{10}@sakarya\.edu\.tr$/', $email)) {
                $errors[] = "E-posta hatası";
            }
        }
    }

    // Şifre format kontrolü (boş değilse)
    if (!empty($password)) {
        // Şifre, e-posta adresinden @ öncesindeki kısımla aynı olmalı
        $username_part = strstr($email, '@', true); // @ işaretinden önceki kısmı al
        
        if ($username_part && $password !== $username_part) {
            $errors[] = "Şifre hatası";
        }
    }

    // Hata yoksa giriş başarılı
    if (empty($errors)) {
        // Giriş başarılı, oturum bilgilerini ayarla
        $_SESSION["user_email"] = $email;
        $_SESSION["logged_in"] = true;
        
        // Ana sayfaya yönlendir
        header("Location: index.php");
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.9">
    <title>Giriş Yap</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    <!-- Özel CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="login-page">
    <div class="login-container">
        
        <!-- Title -->
        <h4 class="login-title">Kullanıcı Girişi</h4>
        
        <?php if (isset($errors) && !empty($errors)): ?>
            <div class="alert alert-danger" role="alert">
                <ul class="mb-0">
                    <?php foreach ($errors as $error): ?>
                        <li><?php echo htmlspecialchars($error); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <!-- Login Form -->
        <form id="loginForm" action="login.php" method="POST">
            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-person"></i></span>
                    <input type="text" class="form-control" id="email" name="email" 
                           placeholder="E-posta Adresiniz (örn: b1234567890@sakarya.edu.tr)" 
                           value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>">
                </div>
            </div>
            
            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-lock"></i></span>
                    <input type="password" class="form-control" id="password" name="password" 
                           placeholder="Şifreniz (örn: b1234567890)">
                </div>
            </div>
            
            <button type="submit" class="btn btn-login">Giriş</button>
        </form>
    </div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>