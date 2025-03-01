import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html",[], "js/auth/home.js"),
    new Route("/habitats", "Habitas", "/pages/habitats.html",[] ),
    new Route("/savane", "Savane", "/pages/savane/savane.html",[] ),

    // routes pour Jungle
    new Route("/jungle", "Jungle", "/pages/jungle/jungle.html",[] ),
    new Route("/monkey", "Monkey", "/pages/jungle/monkey.html",[] ),
    new Route("/perroquets", "Perroquet", "/pages/jungle/perroquets.html",[] ),
    new Route("/crocodile", "Crocodile", "/pages/jungle/crocodile.html",[] ),
    new Route("/serpent", "Serpent", "/pages/jungle/serpent.html",[] ),
    new Route("/lezard", "Lezard", "/pages/jungle/lezard.html",[] ),
    new Route("/lemuriens", "Lémuriens", "/pages/jungle/lemuriens.html",[] ),

    //routes pour marias
    new Route("/marais", "Marais", "/pages/marais/marais.html",[]),
    new Route("/flamant", "Flamant", "/pages/marais/flamant.html",[]),
    new Route("/cygne", "Cygne", "/pages/marais/cygne.html",[]),
    new Route("/aligator", "Aligator", "/pages/marais/aligator.html",[]),
    new Route("/grenouille", "Grenouille", "/pages/marais/grenouille.html",[]),

    
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";

//["client", "admin"]