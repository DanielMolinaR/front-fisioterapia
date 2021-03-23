//import { register } from "register-service-worker";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(reg => {
              console.log('Registration succeeded. Scope is ' + reg.scope);
          })
          .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
          });
  });
}

/*if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      // console.log("Service worker is active.");
    },
    registered(registration) {
      // console.log("Service worker has been registered.");

      // Routinely check for app updates by testing for a new service worker.
      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60); // hourly checks
    },
    cached() {
      // console.log("Content has been cached for offline use.");
    },
    updatefound() {
      // console.log("New content is downloading.");
    },
    updated(registration) {
      //console.log("New content is available; please refresh.");

      // Add a custom event and dispatch it.
      // Used to display of a 'refresh' banner following a service worker update.
      // Set the event payload to the service worker registration object.
      document.dispatchEvent(
        new CustomEvent("swUpdated", { detail: registration })
      );
    },
    offline() {
      // console.log("No internet connection found. App is running in offline mode.");
    },
    error() {
      // console.error("Error during service worker registration:", error);
    },
  });
}*/
