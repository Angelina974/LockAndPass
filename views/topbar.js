/**
 * Template pour créer la top bar
 */
function createTopBar() {
    return createBlock({
        class: 'topbar',
        items: [

            {
                type: 'spacer',
                flex: 1
            },
            // Titre de l'application
            {
                type: 'html',
                html: 'Lock and Pass',
                class: 'topbar-title',
            },
            // Logo de l'application
            {
                type: 'image',
                src: './ressources/cadenas.png',
                class: 'topbar-logo',
                events: {
                    mouseOver: function () {
                        this.setAnimation({
                            name: 'tada',
                            speed: 'slower',
                        })
                    }
                }
            },
            {
                type: 'spacer',
                flex: 1
            },

            // Bouton de déconnexion
            {
                type: "button",
                id: "logoutButton",
                icon: "fas fa-power-off",
                class: 'topbar-home-button',
                iconSize: 25,
                
                // Fonction qui permet de se déconnecter et retourner à la page de connexion
                action: () => kiss.router.navigateTo('login'),

                // Animation au survol
                events: {
                    mouseOver: function () {
                        this.setAnimation({
                            name: 'bounceIn',
                            speed: 'faster'
                        })
                    }
                }
            }
        ],

        subscriptions: {
            EVT_ROUTE_UPDATED: function(route) {
                if (route.ui == "login" || route.ui == "register") {
                    $("logoutButton").hide()
                } else {
                    $("logoutButton").show()
                }
            }
        }
    })
}
