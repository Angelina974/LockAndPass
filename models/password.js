kiss.app.defineModel({
    id: "password",
    name: "password",
    namePlural: "passwords",
    icon: "fas fa-key",
    color: "#00aaee",
    mode: "offline",

    items: [
        {
            id: "createdAt",
            type: "date",
            label: "Date de création",
        },
        {
            id: "username",
            type: "text",
            label: "Nom d'utilisateur",
        },
        {
            id: "target",
            type: "text",
            label: "Applicaton / Site",
            width: 300
        },
        {
            id: "password",
            type: "text",
            label: "Mot de passe",
            hidden: true
        }
    ]
})