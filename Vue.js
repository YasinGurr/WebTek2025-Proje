// Vue uygulaması
new Vue({
    el: '#iletisimBil',
    data: {
        formData: {
            adSoyad: '',
            email: '',
            telefon: '',
            cinsiyet: '',
            konu: '',
            mesaj: '',
            veriOnay: false
        },
        isFormValid: false
    },
    methods: {
        validateWithVue() {
            // Form elemanlarını al (DOM'dan değil Vue modelinden)
            const adSoyad = document.getElementById('adi').value;
            const email = document.getElementById('email').value;
            const telefon = document.getElementById('telefon').value;
            const konu = document.getElementById('konu').value;
            const mesaj = document.getElementById('mesaj').value;
            const veriOnay = document.getElementById('veriOnay').checked;

            // Hata mesajlarını tutacak dizi
            let errors = [];

            // Ad Soyad kontrolü - sadece harfler ve boşluk kabul et
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
            
            // Telefon kontrolü - sadece sayılar ve 05 ile başlama kontrolü
            if (telefon.trim() !== '') {
                // Boşlukları temizle
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

            // Konu kontrolü
            if (!konu) {
                errors.push('Lütfen bir konu seçiniz');
            }

            // Mesaj kontrolü
            if (!mesaj.trim()) {
                errors.push('Mesaj alanı boş bırakılamaz');
            } else if (mesaj.trim().length < 10) {
                errors.push('Mesajınız en az 10 karakter olmalıdır');
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
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.disabled = false;
                submitBtn.classList.add('btn-success');
                alert('Vue ile form doğrulaması başarılı! Artık gönderebilirsiniz.');
                return true;
            }
        }
    },
    mounted() {
        // Vue.js ile doğrula butonuna tıklandığında
        const vueValidateBtn = document.getElementById('vueValidateBtn');
        if (vueValidateBtn) {
            vueValidateBtn.addEventListener('click', () => {
                this.validateWithVue();
            });
        }

        // Form reset edildiğinde gönder butonunu tekrar devre dışı bırak
        const resetBtn = document.querySelector('input[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.classList.remove('btn-success');
                }
            });
        }
    }
});