/**
 * Encrypts a text using a secret password
 * 
 * @param {string} text The text to encrypt
 * @param {string} password The secret password to use
 * @returns {Promise<{iv: number[], encrypted: number[]}>} The encrypted text
 */
async function encrypt(text, password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    )
    const derivedKey = await crypto.subtle.deriveKey({
            name: 'PBKDF2',
            salt: encoder.encode('salt'),
            iterations: 100000,
            hash: 'SHA-256'
        },
        key, {
            name: 'AES-GCM',
            length: 256
        },
        true,
        ['encrypt']
    )
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({
            name: 'AES-GCM',
            iv: iv
        },
        derivedKey,
        data
    )
    return {
        iv: Array.from(iv),
        encrypted: Array.from(new Uint8Array(encrypted))
    }
}

/**
 * Decrypts an encrypted text using a secret password
 * 
 * @param {{iv: number[], encrypted: number[]}} encryptedData The encrypted text
 * @param {string} password The secret password to use
 * @returns {Promise<string>} The decrypted text
 */
async function decrypt(encryptedData, password) {
    const {
        iv,
        encrypted
    } = encryptedData
    const decoder = new TextDecoder();
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    )
    const derivedKey = await crypto.subtle.deriveKey({
            name: 'PBKDF2',
            salt: new TextEncoder().encode('salt'),
            iterations: 100000,
            hash: 'SHA-256'
        },
        key, {
            name: 'AES-GCM',
            length: 256
        },
        true,
        ['decrypt']
    )
    const decrypted = await crypto.subtle.decrypt({
            name: 'AES-GCM',
            iv: new Uint8Array(iv)
        },
        derivedKey,
        new Uint8Array(encrypted)
    )
    return decoder.decode(decrypted);
}

/**
 * Creates a new user
 * 
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 * @param {string} passwordConfirmation The confirmation of the password
 */
async function createUser(username, password, passwordConfirmation) {
    if(!username || !password || !passwordConfirmation) {
        createNotification('Veuillez remplir tous les champs')
        return
    }

    if (password !== passwordConfirmation) {
        createNotification('Les mots de passe ne correspondent pas')
        return
    }

    const encryptedPassword = await encrypt(password, "secret")
    const newUser = kiss.app.models.user.create({
        username,
        password: encryptedPassword
      })
    createNotification('Utilisateur créé avec succès')
    newUser.save()
    kiss.router.navigateTo("login")
}

/**
 * Logs in a user
 *  
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 */
async function login(username, password) {
    if(!username || !password) {
        createNotification('Veuillez remplir tous les champs')
        return
    }

    const users = await kiss.db.find("user", {
        filterSyntax: "mongo",
        filter: {
            username
        }
    })

    if (users.length > 0) {
        const user = users[0]
        const decryptedPassword = await decrypt(user.password, "secret")

        if (decryptedPassword === password) {
            kiss.global.user = user.username
            kiss.router.navigateTo({
                ui: "main",
                modelId: "password",
                viewId: "list-of-passwords"
            })
        }
        else {
            createNotification('Nom d\'utilisateur ou mot de passe incorrect')
        }

    } else {
        createNotification('Nom d\'utilisateur ou mot de passe incorrect')
    }
}