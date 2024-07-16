/**
 * Page d'accueil de l'application
 */
kiss.app.defineView({
    id: 'main',
    renderer: function (id) {
        return createBlock({
            id,
            layout: "vertical",

            items: [
                createTopBar(),

                // Block pour insérer la table des mots de passe
                {
                    id: "datatable-container",
                    flex: 1
                }
            ],

            methods: {
                async load() {

                    // Construit la table des mots de passe
                    const datatable = createDatatable({
                        id: "list-of-passwords",
                        collection: kiss.app.collections.password,

                        // Options d'affichage
                        height: () => kiss.screen.getHeightMinus(110),
                        iconAction: "fas fa-eye",
                        color: '#88b8ff',
                        canCreateRecord: true,
                        canSelect: true,
                        canSelectFields: false,
                        showActions: true,
                        autoSize: true,
                        canFilter: false,
                        canSort: false,
                        canRefresh: false,

                        // Actions: ici, seulement une action pour supprimer les documents sélectionnés
                        actions: [
                        {
                            text: "Supprimer les mots de passe sélectionnés",
                            icon: "fas fa-trash",
                            iconColor: "var(--red)",
                            action: () => kiss.selection.deleteSelectedRecords()
                        },
                    ],

                        // Méthodes natives de la table
                        methods: {
                            // Methode appelée quand on clique sur le bouton pour ajouter un mot de passe
                            createRecord: () => addPassword(),

                            // Methode appelée quand on clique sur l'icone au début de la ligne de la table
                            selectRecord: (record) => showPassword(record)
                        }
                    })

                    const items = [
                        datatable
                    ]

                    $("datatable-container").setItems(items)
                }
            }
        })
    }
})