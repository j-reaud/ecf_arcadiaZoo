export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}

/* différents accéssibilités en fonction de rôle utilisateur: 

-- [] -> tout le monde peut y accéder.

-- [disconnected] -> Réserver aux utilisateurs déconnecté. 

-- ["client"] réservé aux utilisateurs avec le rôle client. 

-- ["admin"] réservé aux utilisateurs avec le rôle admin. 

-- ["employe"] réservé aux utilisateurs avec le rôle employe. 

-- ["veterinaire"] réservié aux utilisateurs avec le rôle veterinaire. 

-- ["admin", "client",] -> réservé aux utilisateurs avec le rôle client ou admin. 

-- ["admin", "employée" "veterinaire"] -> réservé aux utilisateurs avec le rôle admin, employé, ou veterianaire. 

*/