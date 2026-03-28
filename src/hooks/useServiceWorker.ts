import { useEffect, useState } from 'react';

export function useServiceWorker() {
  const [miseAJourDispo, setMiseAJourDispo] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register(import.meta.env.BASE_URL + 'sw.js')
      .then((registration) => {
        // Vérifier les MAJ régulièrement (toutes les 60s)
        setInterval(() => registration.update(), 60_000);

        const onUpdateFound = () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            // Un nouveau SW est prêt et attend d'être activé
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setMiseAJourDispo(true);
            }
          });
        };

        registration.addEventListener('updatefound', onUpdateFound);

        // Cas où un SW en attente existe déjà au chargement
        if (registration.waiting && navigator.serviceWorker.controller) {
          setWaitingWorker(registration.waiting);
          setMiseAJourDispo(true);
        }
      });

    // Recharger quand le nouveau SW prend le contrôle
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  const appliquerMiseAJour = () => {
    waitingWorker?.postMessage('SKIP_WAITING');
  };

  return { miseAJourDispo, appliquerMiseAJour };
}
