import Route from "./route.js";
import { allRoutes, websiteName } from "./allRoutes.js";
// import { isConnected, getRole, showAndHideElementsForRoles } from "./auth.js";  // Uncomment if needed

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

  console.log(`🚀 Trying to load: ${actualRoute.pathHtml}`);
  console.log(`Current URL: ${window.location.pathname}`);

  // Vérifier les droits d'accès
  if (actualRoute.authorize.length > 0) { 
    if (actualRoute.authorize.includes("disconnected") && isConnected()) {
      window.location.replace("/");
      return;
    } else {
      const roleUser = getRole();
      if (!actualRoute.authorize.includes(roleUser)) {
        window.location.replace("/");
        return;
      }
    }
  }

  // Charger le contenu HTML de la page
  try {
    const response = await fetch(actualRoute.pathHtml);
    if (!response.ok) throw new Error(`❌ Fetch failed: ${actualRoute.pathHtml}`);

    const html = await response.text();
    console.log(`✅ Fetched content for: ${actualRoute.pathHtml}`, html);
    document.getElementById("main-page").innerHTML = html;
  } catch (error) {
    console.error("❌ Error loading page:", error);
    document.getElementById("main-page").innerHTML = "<h2>Page not found</h2>";
  }

  // Assurer un délai avant d'injecter le script
  setTimeout(() => {
    if (actualRoute.pathJS) {
      removeOldScript();
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.setAttribute("src", actualRoute.pathJS);
      scriptTag.setAttribute("id", "dynamic-script");
      document.body.appendChild(scriptTag);
    }
  }, 50);

  // Mettre à jour le titre
  document.title = actualRoute.title + " - " + websiteName;

  // Afficher et masquer les éléments en fonction du rôle
  // showAndHideElementsForRoles();

  // Activer la navigation interne après le chargement
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
    if (link.getAttribute("href") && link.getAttribute("href").startsWith("/")) {
      link.addEventListener("click", routeEvent);
    }
  });
};

// Gérer le bouton retour du navigateur
window.onpopstate = LoadContentPage;

// Charger la première page au démarrage
document.addEventListener("DOMContentLoaded", LoadContentPage);

window.route = routeEvent;
console.log("✅ Routing is enabled!");

