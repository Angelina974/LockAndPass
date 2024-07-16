document.addEventListener('DOMContentLoaded', async () => {
    // Assurez-vous que kiss est disponible avant de charger app.js
    if (typeof kiss === 'undefined') {
        console.error('KissJS is not loaded');
        return;
    }

    // Initialise le routeur
    kiss.router.init()

    // Initialise l'observateur d'écran pour les redimensionnements
    kiss.screen.init()

    // Passer en mode hors ligne
    kiss.db.mode = "offline"

    // Définit le thème de l'application
    // kiss.theme.set({
    //     color: 'light',
    //     geometry: 'regular',
    // });

    // Add some localized texts
    kiss.app.defineTexts({
        "#warning delete docs": {
            en: "Do you really want to delete the selected documents?",
        }
    })

    // Navigue vers la vue 'app'
    kiss.router.navigateTo('login');
});