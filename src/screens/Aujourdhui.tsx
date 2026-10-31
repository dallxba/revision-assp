import { toutesLesFiches } from '../content'
import { aller } from '../lib/route'
import { ficheVisible, revisionDuJour } from '../lib/srs'
import { aujourdhui, serie, useEtat } from '../lib/store'
import { Icone } from './ui'

const nomClasse = { '2de': 'seconde', '1re': 'première', Tle: 'terminale' } as const

const estInstallee = () =>
  window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true

export function Aujourdhui() {
  const etat = useEtat()
  const { dues, nouvelles } = revisionDuJour()
  const total = dues.length + nouvelles.length
  const s = serie(etat.jours)
  const faitAujourdhui = etat.jours.includes(aujourdhui())
  const visibles = toutesLesFiches.filter((r) => ficheVisible(r.fiche, etat.classe, etat.toutVoir))
  const aLire = visibles.filter((r) => !etat.fichesLues[r.fiche.id])
  const lues = visibles.length - aLire.length
  const prochaine = aLire[0]

  const joursDepuisSauvegarde = etat.derniereSauvegarde
    ? (Date.now() - new Date(etat.derniereSauvegarde).getTime()) / 86400000
    : Infinity
  const rappelSauvegarde = Object.keys(etat.cartes).length >= 20 && joursDepuisSauvegarde > 14

  return (
    <div className="page">
      <header className="entete-jour">
        <p className="sur-titre">Classe de {nomClasse[etat.classe!]}</p>
        <h1>Aujourd'hui</h1>
        <div className={s > 0 ? 'serie active' : 'serie'}>
          <Icone nom="flamme" taille={18} />
          {s > 0 ? `${s} jour${s > 1 ? 's' : ''} d'affilée` : 'Pas encore de série'}
        </div>
      </header>

      {!estInstallee() && (
        <section className="encart">
          <p>
            <strong>Installe l'appli</strong> pour l'utiliser hors connexion : dans Safari, touche <em>Partager</em> puis{' '}
            <em>Sur l'écran d'accueil</em>.
          </p>
        </section>
      )}

      <section className="bloc-principal">
        {total > 0 ? (
          <>
            <p className="gros-chiffre">{total}</p>
            <p className="legende">
              carte{total > 1 ? 's' : ''} à réviser
              {nouvelles.length > 0 && dues.length > 0 && ` · dont ${nouvelles.length} nouvelle${nouvelles.length > 1 ? 's' : ''}`}
              {nouvelles.length > 0 && dues.length === 0 && ` · toutes nouvelles`}
            </p>
            <button className="btn principal large" onClick={() => aller('/cartes/jour')}>
              Commencer · environ {Math.max(1, Math.round(total * 0.25))} min
            </button>
          </>
        ) : faitAujourdhui ? (
          <>
            <p className="gros-titre">C'est fait pour aujourd'hui.</p>
            <p className="legende">Les cartes reviendront quand il sera temps de les revoir. Tu peux lire une nouvelle fiche pour en débloquer d'autres.</p>
          </>
        ) : (
          <>
            <p className="gros-titre">Rien à réviser pour l'instant.</p>
            <p className="legende">Lis une fiche : ses cartes arriveront ici dès que tu l'auras terminée.</p>
          </>
        )}
      </section>

      {prochaine && (
        <section>
          <h2 className="titre-section">À lire ensuite</h2>
          <a className="ligne-fiche grande" href={`#/fiche/${prochaine.fiche.id}`}>
            <div>
              <p className="sur-titre">{prochaine.blocTitre}</p>
              <p className="titre">{prochaine.fiche.titre}</p>
              <p className="meta">
                {prochaine.fiche.lecon
                  ? `${prochaine.fiche.lecon.chapitreTitre}, cours ${prochaine.fiche.lecon.cours.n} · ${prochaine.fiche.lecon.cours.ex.length} exercices`
                  : `${prochaine.fiche.cartes.length} cartes · ${prochaine.fiche.quiz.length} questions de quiz`}
              </p>
            </div>
            <Icone nom="fleche" />
          </a>
        </section>
      )}

      <section>
        <h2 className="titre-section">Où tu en es</h2>
        <div className="stats">
          <div>
            <p className="chiffre">
              {lues}/{visibles.length}
            </p>
            <p className="legende">fiches lues</p>
          </div>
          <div>
            <p className="chiffre">{Object.keys(etat.cartes).length}</p>
            <p className="legende">cartes commencées</p>
          </div>
          <div>
            <p className="chiffre">{Object.keys(etat.quiz).length}</p>
            <p className="legende">quiz faits</p>
          </div>
        </div>
      </section>

      {rappelSauvegarde && (
        <section className="encart alerte">
          <p>
            <strong>Pense à sauvegarder ta progression.</strong> Si Safari efface les données, tu pourras la restaurer.
          </p>
          <a className="btn petit" href="#/reglages">
            Sauvegarder
          </a>
        </section>
      )}
    </div>
  )
}
