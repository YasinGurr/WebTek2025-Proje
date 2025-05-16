// JavaScript form doğrulama
document.addEventListener('DOMContentLoaded', function() {
    const jsValidateBtn = document.getElementById('validateJS');
    const vueValidateBtn = document.getElementById('validateVue');
    const submitFormBtn = document.getElementById('submitForm');
    const clearFormBtn = document.getElementById('clearForm');

    jsValidateBtn.addEventListener('click', validateWithJS);
    vueValidateBtn.addEventListener('click', validateWithVue);
    submitFormBtn.addEventListener('click', submitForm);
    clearFormBtn.addEventListener('click', clearForm);

    // Form temizleme işlemi
    function clearForm() {
        document.getElementById('contactForm').reset();
        clearErrors();
    }

    // Form gönderme işlemi
    function submitForm() {
        if (validateWithJS(true)) {
            // Form verilerini topla
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('subject').value,
                contactPreference: document.querySelector('input[name="contactPreference"]:checked')?.value || '',
                interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el => el.value),
                message: document.getElementById('message').value.trim(),
                agreement: document.getElementById('agreement').checked
            };

            // Form verilerini localStorage'a kaydet
            localStorage.setItem('contactFormData', JSON.stringify(formData));
            
            // contact-image.html sayfasına yönlendir
            window.location.href = 'contact-image.html';
        }
    }

    function validateWithJS(silent = false) {
        // Tüm hata mesajlarını temizle
        clearErrors();

        let isValid = true;
        
        // Ad Soyad kontrolü
        const fullName = document.getElementById('fullName').value.trim();
        if (fullName === '') {
            if (!silent) displayError('fullNameError', 'Ad Soyad alanı boş bırakılamaz.');
            isValid = false;
        }

        // E-posta kontrolü
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            displayError('emailError', 'E-posta alanı boş bırakılamaz.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            displayError('emailError', 'Geçerli bir e-posta adresi giriniz.');
            isValid = false;
        }

        // Telefon kontrolü
        const phone = document.getElementById('phone').value.trim();
        if (phone === '') {
            displayError('phoneError', 'Telefon alanı boş bırakılamaz.');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            displayError('phoneError', 'Telefon numarası sadece rakamlardan oluşmalıdır.');
            isValid = false;
        }

        // Konu kontrolü
        const subject = document.getElementById('subject').value;
        if (subject === '') {
            displayError('subjectError', 'Lütfen bir konu seçiniz.');
            isValid = false;
        }

        // İletişim tercihi kontrolü
        const contactPreference = document.querySelector('input[name="contactPreference"]:checked');
        if (!contactPreference) {
            displayError('preferenceError', 'Lütfen bir iletişim tercihi seçiniz.');
            isValid = false;
        }

        // Mesaj kontrolü
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            displayError('messageError', 'Mesaj alanı boş bırakılamaz.');
            isValid = false;
        } else if (message.length < 10) {
            displayError('messageError', 'Mesaj en az 10 karakter olmalıdır.');
            isValid = false;
        }

        // Anlaşma kontrolü
        const agreement = document.getElementById('agreement').checked;
        if (!agreement) {
            displayError('agreementError', 'Kişisel verilerin işlenmesini kabul etmelisiniz.');
            isValid = false;
        }

        if (isValid && !silent) {
            alert('Form başarıyla doğrulandı! Veriler gönderilmeye hazır.');
        }
        
        return isValid;
    }

    function validateWithVue() {
        // Vue.js form alanını göster, standart formu gizle
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('vueApp').style.display = 'block';
    }

    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(function(element) {
            element.textContent = '';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[0-9]+$/;
        return phoneRegex.test(phone);
    }
});

// Vue.js ile form doğrulama
new Vue({
    el: '#vueApp',
    data: {
        formData: {
            fullName: '',
            email: '',
            phone: '',
            subject: '',
            contactPreference: '',
            interests: [],
            message: '',
            agreement: false
        },
        errors: {}
    },
    methods: {
        validateForm() {
            this.errors = {};
            let isValid = true;

            // Ad Soyad kontrolü
            if (!this.formData.fullName.trim()) {
                this.errors.fullName = 'Ad Soyad alanı boş bırakılamaz.';
                isValid = false;
            }

            // E-posta kontrolü
            if (!this.formData.email.trim()) {
                this.errors.email = 'E-posta alanı boş bırakılamaz.';
                isValid = false;
            } else if (!this.isValidEmail(this.formData.email)) {
                this.errors.email = 'Geçerli bir e-posta adresi giriniz.';
                isValid = false;
            }

            // Telefon kontrolü
            if (!this.formData.phone.trim()) {
                this.errors.phone = 'Telefon alanı boş bırakılamaz.';
                isValid = false;
            } else if (!this.isValidPhone(this.formData.phone)) {
                this.errors.phone = 'Telefon numarası sadece rakamlardan oluşmalıdır.';
                isValid = false;
            }

            // Konu kontrolü
            if (!this.formData.subject) {
                this.errors.subject = 'Lütfen bir konu seçiniz.';
                isValid = false;
            }

            // İletişim tercihi kontrolü
            if (!this.formData.contactPreference) {
                this.errors.contactPreference = 'Lütfen bir iletişim tercihi seçiniz.';
                isValid = false;
            }

            // Mesaj kontrolü
            if (!this.formData.message.trim()) {
                this.errors.message = 'Mesaj alanı boş bırakılamaz.';
                isValid = false;
            } else if (this.formData.message.length < 10) {
                this.errors.message = 'Mesaj en az 10 karakter olmalıdır.';
                isValid = false;
            }

            // Anlaşma kontrolü
            if (!this.formData.agreement) {
                this.errors.agreement = 'Kişisel verilerin işlenmesini kabul etmelisiniz.';
                isValid = false;
            }

            if (isValid) {
                alert('Form başarıyla doğrulandı! Veriler gönderilmeye hazır.');
                // Form verilerini konsola yazdıralım
                console.log('Form verileri:', this.formData);
            }
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        isValidPhone(phone) {
            const phoneRegex = /^[0-9]+$/;
            return phoneRegex.test(phone);
        }
    }
});