// Form doğrulama işlemleri için gerekli elementleri seçelim
document.addEventListener('DOMContentLoaded', function() {
    // Butonları seçelim
    const jsValidateBtn = document.getElementById('jsValidateBtn');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.querySelector('input[type="reset"]');

    // JS ile doğrula butonuna tıklandığında
    if (jsValidateBtn) {
        jsValidateBtn.addEventListener('click', function() {
            validateWithJS();
        });
    }

    // Form reset edildiğinde gönder butonunu tekrar devre dışı bırak
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.remove('btn-success');
            }
        });
    }

    // JavaScript ile form doğrulama fonksiyonu
    function validateWithJS() {
        // Form elemanlarını al
        const adSoyad = document.getElementById('adi') ? document.getElementById('adi').value : '';
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const telefon = document.getElementById('telefon') ? document.getElementById('telefon').value : '';
        const konu = document.getElementById('konu') ? document.getElementById('konu').value : '';
        const mesaj = document.getElementById('mesaj') ? document.getElementById('mesaj').value : '';
        const veriOnay = document.getElementById('veriOnay') ? document.getElementById('veriOnay').checked : false;

        // Hata mesajlarını tutacak dizi
        let errors = [];

        // Ad Soyad kontrolü - geliştirilmiş
        if (!adSoyad.trim()) {
            errors.push('Ad Soyad alanı boş bırakılamaz');
        } else {
            // Türkçe karakterleri de içeren isim kontrolü
            const nameRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/;
            if (!nameRegex.test(adSoyad)) {
                errors.push('Ad Soyad alanı sadece harflerden oluşmalıdır');
            }
        }

        // Email kontrolü
        if (!email.trim()) {
            errors.push('E-posta alanı boş bırakılamaz');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Geçerli bir e-posta adresi giriniz');
            }
        }

        // Telefon kontrolü (opsiyonel olabilir) - geliştirilmiş
        if (telefon.trim() !== '') {
            // Telefon numarasındaki boşlukları kaldır
            const cleanPhone = telefon.replace(/\s/g, '');
            
            // Sadece rakamlardan oluşuyor mu?
            const onlyDigitsRegex = /^\d+$/;
            if (!onlyDigitsRegex.test(cleanPhone)) {
                errors.push('Telefon numarası sadece rakamlardan oluşmalıdır');
            }
            
            // Türkiye telefon numarası formatına uygun mu?
            const telefonRegex = /^(05)[0-9]{9}$/;
            if (!telefonRegex.test(cleanPhone)) {
                errors.push('Geçerli bir telefon numarası giriniz (Örn: 05XX XXX XX XX)');
            }
        }

        // Cinsiyet kontrolü (eğer seçim zorunluysa)
        const cinsiyetSecili = document.querySelector('input[name="cinsiyet"]:checked');
        if (!cinsiyetSecili) {
            errors.push('Lütfen cinsiyet seçiniz');
        }

        // Konu kontrolü
        if (!konu || konu === "") {
            errors.push('Lütfen bir konu seçiniz');
        }

        // Mesaj kontrolü
        if (!mesaj.trim()) {
            errors.push('Mesaj alanı boş bırakılamaz');
        } else if (mesaj.trim().length < 10) {
            errors.push('Mesajınız en az 10 karakter olmalıdır');
        } else if (mesaj.trim().length > 500) {
            errors.push('Mesajınız 500 karakterden fazla olamaz');
        }

        // Veri onayı kontrolü
        if (!veriOnay) {
            errors.push('Kişisel verilerinizin işlenmesine izin vermeniz gerekmektedir');
        }

        // Hata kontrol
        if (errors.length > 0) {
            alert('Lütfen aşağıdaki hataları düzeltiniz:\n\n' + errors.join('\n'));
            return false;
        } else {
            // Doğrulama başarılı, gönder butonunu etkinleştir
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.add('btn-success');
            }
            alert('Form doğrulaması başarılı! Artık gönderebilirsiniz.');
            return true;
        }
    }
});