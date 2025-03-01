import Route from "./route.js";
import { allRoutes, websiteName } from "./allRoutes.js";
import { isConnected, getRole, showAndHideElementsForRoles } from "./auth.js";  // Adjust path if needed

// Route 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

// Fonction pour récupérer une route en fonction de l'URL
const getRouteByUrl = (url) => {
  return allRoutes.find(route => route.url === url) || route404;
};

// Supprimer les anciens scripts pour éviter les doublons
const removeOldScript = () => {
  const oldScript = document.querySelector("#dynamic-script");
  if (oldScript) {
    oldScript.remove();
  }
};

// Charger la page actuelle
const LoadContentPage = async () => {
  const path = window.location.pathname;
  const actualRoute = getRouteByUrl(path);

  // Vérifier les droits d'accès
  const allRolesArray = actualRoute.authorize;
  if (allRolesArray.length > 0) {
    if (allRolesArray.includes("disconnected") && isConnected()) {
      window.location.replace("/");
      return;
    } else {
      const roleUser = getRole();
      if (!allRolesArray.includes(roleUser)) {
        window.location.replace("/");
        return;
      }
    }
  }

  // Charger le contenu HTML de la page
  const html = await fetch(actualRoute.pathHtml).then(res => res.text());
  document.getElementById("main-page").innerHTML = html;

  // Assurer un délai avant d'injecter le script
  setTimeout(() => {
    if (actualRoute.pathJS) {
      removeOldScript();
      var scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.setAttribute("src", actualRoute.pathJS);
      scriptTag.setAttribute("id", "dynamic-script");
      document.body.appendChild(scriptTag);
    }
  }, 50);

  // Mettre à jour le titre
  document.title = actualRoute.title + " - " + websiteName;

  // Afficher et masquer les éléments en fonction du rôle
  showAndHideElementsForRoles();

  // Activer la navigation interne
  setTimeout(enableInternalLinks, 100);
};

// Gestion des événements de navigation interne
const routeEvent = (event) => {
  event.preventDefault();
  const newUrl = event.currentTarget.href;
  window.history.pushState({}, "", newUrl);
  LoadContentPage();
};

// Attacher les événements aux liens internes
const enableInternalLinks = () => {
  document.querySelectorAll("a").forEach(link => {
    if (link.getAttribute("href").startsWith("/")) {
      link.addEventListener("click", routeEvent);
    }
  });
};

// Gérer le bouton retour du navigateur
window.onpopstate = LoadContentPage;

// Charger la première page au démarrage
LoadContentPage();
