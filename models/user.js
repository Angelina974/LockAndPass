kiss.app.defineModel({
    id: "user",
    name: "user",
    namePlural: "users",
    icon: "fas fa-user",
    color: "#00aaee",
    mode: "offline",

    items: [
        {
            id: "username",
            type: "text",
            label: "Username",
        },
        {
            id: "password",
            type: "text",
            label: "Password"
        }
    ]
})