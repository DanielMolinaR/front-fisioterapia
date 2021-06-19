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

