/**
 * Page d'accueil de l'application
 */
kiss.app.defineView({
    id: 'register',
    renderer: function (id) {
        return createBlock({
            id,
            items: [
                createTopBar(),

                // Titre de la page
                {
                    type: 'html',
                    html: 'Bienvenue sur Lock and Pass',
                    class: 'auth-title',
                },

                // Formulaire d'inscription
                {   id: 'create-account',
                    layout: 'vertical',
                    class: 'auth-form',
                    defaultConfig: {
                        fieldWidth : 300,
                        labelWidth: 200,
                        labelAlign: 'right',
                        fontSize: 15,
                    },
                    items: [
                        {
                            type: 'text',
                            id: 'register-username',
                            label: 'Nom d\'utilisateur',
                        },
                        {
                            type: 'password',
                            id: 'register-password',
                            label: 'Mot de passe',
                            password: true,
                        },
                        {
                            type: 'password',
                            id: 'register-password-confirmation',
                            label: 'Confirmer le mot de passe',
                            password: true,
                        }
                    ]
                },

                // Boutons de connexion et d'inscription
                {
                    layout: 'vertical',
                    class: 'auth-buttons',
                    defaultConfig: {
                        width : 300,
                        class: 'auth-button',
                    },
                    layout: 'horizontal',
                    items: [

                        // Bouton de connexion
                        {
                            type: 'button',
                            icon: 'fas fa-check',
                            text: 'Se connecter',
                            margin: 10,
                            action: () => {
                                kiss.router.navigateTo('login')
                                $("register-username").setValue('')
                                $("register-password").setValue('')
                                $("register-password-confirmation").setValue('')
                            }
                        },

                        // Bouton d'inscription
                        {
                            type: 'button',
                            icon: 'fas fa-sign-in-alt',
                            text: 'S\'inscrire',
                            margin: 10,
                            action: () => {
                                const username = $("register-username").getValue()
                                const password = $("register-password").getValue()
                                const passwordConfirmation = $("register-password-confirmation").getValue()
                                createUser(username, password, passwordConfirmation)
                                $("register-username").setValue('')
                                $("register-password").setValue('')
                                $("register-password-confirmation").setValue('')
                            }
                        }
                    ]
                }
            ]
        })
    }
})