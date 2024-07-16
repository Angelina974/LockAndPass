function isMainPage() {
    if (kiss.router.currentPage === 'login' || kiss.router.currentPage === 'register') {
        return false
    }
}

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
    let password = ""
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset[randomIndex]
    }
    return password
}

function evaluatePassword(password) {
    let strength = 0;

    // Critères de force du mot de passe
    const lengthCriteria = password.length >= 8;
    const lowerCaseCriteria = /[a-z]/.test(password);
    const upperCaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Vérification de chaque critère
    if (lengthCriteria) strength++;
    if (lowerCaseCriteria) strength++;
    if (upperCaseCriteria) strength++;
    if (numberCriteria) strength++;
    if (specialCharCriteria) strength++;

    // Détermination de la force du mot de passe
    if (strength <= 2) {
        return "faible"
    } else if (strength === 3 || strength === 4) {
        return "moyen"
    } else {
        return "fort"
    }
}