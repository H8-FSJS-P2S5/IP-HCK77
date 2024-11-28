# SERVER ERROR (AUTHENTICATION BECOME GLOBAL)

    solution, because the server already have ssl and cloudflare already set ssl/tls to full
    soo when to access API, NEED TO BE HTTPS other wise the error will appear.

# SERVER ERROR (GENRES DON'T HAVE RELATION)

    solution, we are using wrong database, soo just switch it

# SERVER ERROR (CAN'T ACCESS GOOGLE AUTH ENDPOINT)

    because in routes google auth endpoint is commented, so there no route to there,
    soo to fix it uncomment and update ecosystem.config.js with google client id and google secret
