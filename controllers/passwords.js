/**
 * Add a new password
 */
function addPassword() {
    createPanel({
        id: "new-password-window",
        title: "Nouveau mot de passe",
        icon: "fas fa-key",
        width: 600,
        align: "center",
        verticalAlign: "center",
        draggable: true,
        modal: true,
        closable: true,
        headerBackgroundColor: '#88b8ff',
        layout: "vertical",
        items: [{
                id: "target",
                type: "text",
                label: "Application / Site",
                labelPosition: "top"
            },
            {
                id: "username",
                type: "text",
                label: "Nom d'utilisateur",
                labelPosition: "top"
            },
            {
                layout: "horizontal",
                items: [
                    {
                        id: "password",
                        type: "text",
                        label: "Mot de passe",
                        labelPosition: "top",
                        width: "100%"
                    },
                    {
                        type: "button",
                        icon: "fas fa-key",
                        text: "Générer un mot de passe",
                        margin: "20px 0 0 0",
                        action: () => {
                            const newPassword = generatePassword(12)
                            $("password").setValue(newPassword)
                        }
                    },
                    {
                        type: "button",
                        icon: "fas fa-check",
                        text: "Vérifier le mot de passe",
                        margin: "20px 0 0 0",
                        action: () => {
                            const password = $("password").getValue() 
                            const strength = evaluatePassword(password) 

                            // Affiche la force du mot de passe
                            if (strength === "faible") {
                                createNotification(`Force du mot de passe: ${strength}`, { color: "red" })
                            } else if (strength === "moyen") {
                                createNotification(`Force du mot de passe: ${strength}`, { color: "orange" })
                            } else if (strength === "fort") {
                                createNotification(`Force du mot de passe: ${strength}`, { color: "green" })
                            }
                        }
                    }
                ]
            },
            {
                type: "button",
                icon: "fas fa-save",
                text: "Sauver le mot de passe",
                margin: "20px 0 0 0",
                action: async () => {
                    const target = $("target").getValue()
                    const password = $("password").getValue()
                    const encryptedPassword = await encrypt(password, "secret")

                    const newPassword = kiss.app.models.password.create({
                        username: kiss.global.user,
                        target,
                        password: encryptedPassword
                    })

                    await newPassword.save()
                    $("list-of-passwords").load()
                    $("new-password-window").close()
                }
            }
        ]
    }).render()
}

/**
 * View a password
 * 
 * @param {Object} record
 */
async function showPassword(record) {
    const decryptedPassword = await decrypt(record.password, "secret")
    createDialog(decryptedPassword)
    kiss.tools.copyTextToClipboard(decryptedPassword)
    createNotification("Mot de passe copié dans le presse-papiers")
}