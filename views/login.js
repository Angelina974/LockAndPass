/**
 * Page d'accueil de l'application
 */
kiss.app.defineView({
    id: 'login',
    renderer: function (id) {
        return createBlock({
            id,
            items: [
                createTopBar(),

                // Titre de la page
                {
                    type: 'html',
                    html: 'Se connecter',
                    class: 'auth-title',
                },

                // Formulaire de connexion
                {
                    id: 'auth-form',
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
                            id: 'login-username',
                            label: 'Nom d\'utilisateur',
                        },
                        {
                            type: 'password',
                            id: 'login-password',
                            label: 'Mot de passe',
                            password: true,
                            events: {
                                keyDown: function (e) {
                                    if (e.key === 'Enter') {
                                        const username = $("login-username").getValue()
                                        const password = $("login-password").getValue()
                                        login(username, password)
                                    }
                                }
                            }
                        },
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
                                const username = $("login-username").getValue()
                                const password = $("login-password").getValue()
                                login(username, password)
                                $("login-username").setValue('')
                                $("login-password").setValue('')
                            }
                        },

                        // Bouton d'inscription
                        {
                            type: 'button',
                            icon: 'fas fa-sign-in-alt',
                            text: 'S\'inscrire',
                            margin: 10,
                            action: () => { 
                                kiss.router.navigateTo("register")
                                $("login-username").setValue('')
                                $("login-password").setValue('')
                            }

                        }
                    ]
                }
            ]
        })
    }
})