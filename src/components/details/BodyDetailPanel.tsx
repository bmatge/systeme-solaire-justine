import { useSimulation } from '../../context/SimulationContext';
import { getCorpsParId } from '../../data/celestialBodies';

const typeLabels: Record<string, string> = {
  etoile: 'Étoile',
  planete: 'Planète',
  'planete-naine': 'Planète naine',
  satellite: 'Satellite naturel',
  ceinture: 'Ceinture d\'astéroïdes',
};

export default function BodyDetailPanel() {
  const { state, dispatch } = useSimulation();

  if (!state.corpsSelectionne) return null;

  const corps = getCorpsParId(state.corpsSelectionne);
  if (!corps) return null;

  const fermer = () => dispatch({ type: 'SELECTIONNER_CORPS', id: null });

  return (
    <div className="absolute bottom-0 left-0 right-0 md:left-auto md:right-0 md:top-12 md:bottom-0 md:w-96 bg-gray-900/95 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/10 shadow-2xl z-20 flex flex-col max-h-[65vh] md:max-h-[calc(100vh-3rem)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full shadow-lg"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${corps.couleurSecondaire || corps.couleur}, ${corps.couleur})`,
            }}
          />
          <div>
            <h2 className="text-lg font-semibold">{corps.nom}</h2>
            <p className="text-xs text-white/50">{typeLabels[corps.type]}</p>
          </div>
        </div>
        <button
          onClick={fermer}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Description */}
        <p className="text-sm text-white/80 leading-relaxed">{corps.description}</p>

        {/* Physical properties */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
            Caractéristiques physiques
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {corps.physique.rayon > 0 && (
              <InfoCard label="Rayon" value={formatRayon(corps.physique.rayon)} />
            )}
            <InfoCard label="Masse" value={corps.physique.masse} />
            {corps.physique.densite > 0 && (
              <InfoCard label="Densité" value={`${corps.physique.densite} g/cm³`} />
            )}
            {corps.physique.gravite > 0 && (
              <InfoCard label="Gravité" value={`${corps.physique.gravite} m/s²`} />
            )}
            <InfoCard label="Température" value={`${corps.physique.temperature}°C`} />
            {corps.orbite && corps.type === 'ceinture' ? (
              <InfoCard label="Étendue" value="2,1 à 3,3 UA du Soleil" />
            ) : corps.orbite ? (
              <>
                <InfoCard label="Distance au Soleil" value={`${corps.orbite.demiGrandAxe} UA`} />
                <InfoCard label="Période orbitale" value={formatPeriode(corps.orbite.periodeOrbitale)} />
              </>
            ) : null}
          </div>
        </div>

        {/* Composition */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
            Composition
          </h3>
          <p className="text-sm text-white/70">{corps.composition}</p>
        </div>

        {/* Fun facts */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
            Le savais-tu ?
          </h3>
          <ul className="space-y-2">
            {corps.curiosites.map((c, i) => (
              <li key={i} className="text-sm text-white/70 flex gap-2">
                <span className="text-blue-400 shrink-0">*</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-2">
      <div className="text-[10px] text-white/40 uppercase tracking-wider">{label}</div>
      <div className="text-sm font-medium mt-0.5">{value}</div>
    </div>
  );
}

function formatRayon(km: number): string {
  if (km >= 10000) return `${Math.round(km).toLocaleString('fr-FR')} km`;
  return `${km.toLocaleString('fr-FR')} km`;
}

function formatPeriode(jours: number): string {
  if (jours < 365) return `${Math.round(jours)} jours`;
  const annees = jours / 365.25;
  if (annees < 2) return `${Math.round(jours)} jours`;
  return `${annees.toFixed(1)} ans`;
}
