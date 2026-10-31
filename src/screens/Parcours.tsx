import { matieres } from '../content'
import type { Fiche } from '../content/types'
import { aller } from '../lib/route'
import { ficheVisible, maitrise } from '../lib/srs'
import { useEtat } from '../lib/store'
import { Entete, Icone, Jauge } from './ui'

const fichesDuBloc = (bloc: (typeof matieres)[number]['blocs'][number]) => bloc.chapitres.flatMap((c) => c.fiches)

export function Parcours() {
  const etat = useEtat()
  return (
    <div className="page">
      <Entete titre="Parcours" surTitre="Selon le référentiel" />
      {matieres.map((m) => (
        <section key={m.id} className="matiere" style={{ '--accent': m.couleur } as React.CSSProperties}>
          <h2 className="titre-section">{m.titre}</h2>
          {m.blocs.length === 0 ? (
            <div className="bloc-vide">Arrive bientôt.</div>
          ) : (
            <div className="liste-blocs">
              {m.blocs.map((b) => {
                const fiches = fichesDuBloc(b).filter((f) => ficheVisible(f, etat.classe, etat.toutVoir))
                const vide = b.chapitres.length === 0
                const lues = fiches.filter((f) => etat.fichesLues[f.id]).length
                const contenu = (
                  <>
                    <div className="haut">
                      <p className="titre">{b.titre}</p>
                      {b.epreuve && <p className="epreuve">{b.epreuve}</p>}
                    </div>
                    {b.sousTitre && <p className="sous-titre">{b.sousTitre}</p>}
                    {vide ? (
                      <p className="meta">Contenu à venir</p>
                    ) : (
                      <>
                        <Jauge valeur={fiches.length ? lues / fiches.length : 0} label={`Fiches lues dans ${b.titre}`} />
                        <p className="meta">
                          {lues}/{fiches.length} fiches lues
                        </p>
                      </>
                    )}
                  </>
                )
                return vide ? (
                  <div key={b.id} className="carte-bloc inactif">
                    {contenu}
                  </div>
                ) : (
                  <a key={b.id} className="carte-bloc" href={`#/bloc/${m.id}/${b.id}`}>
                    {contenu}
                  </a>
                )
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

function LigneFiche({ fiche }: { fiche: Fiche }) {
  const etat = useEtat()
  const lue = !!etat.fichesLues[fiche.id]
  const m = maitrise(fiche)
  return (
    <a className="ligne-fiche" href={`#/fiche/${fiche.id}`}>
      <span className={lue ? 'pastille lue' : 'pastille'} aria-label={lue ? 'Lue' : 'Pas encore lue'}>
        {lue && <Icone nom="check" taille={14} />}
      </span>
      <div>
        <p className="titre">{fiche.titre}</p>
        <p className="meta">
          {fiche.domaine}
          {lue && ` · ${Math.round(m * 100)} % acquis`}
          {!fiche.verifiee && ' · à vérifier'}
        </p>
      </div>
      <Icone nom="fleche" />
    </a>
  )
}

export function BlocEcran({ matiereId, blocId }: { matiereId?: string; blocId?: string }) {
  const etat = useEtat()
  const m = matieres.find((x) => x.id === matiereId)
  const b = m?.blocs.find((x) => x.id === blocId)
  if (!m || !b) return <Entete titre="Introuvable" retour={() => aller('/parcours')} />
  return (
    <div className="page">
      <Entete titre={b.titre} surTitre={b.epreuve} retour={() => aller('/parcours')} />
      {b.sousTitre && <p className="intitule-officiel">{b.sousTitre}</p>}
      {b.chapitres.map((c) => {
        const fiches = c.fiches.filter((f) => ficheVisible(f, etat.classe, etat.toutVoir))
        if (fiches.length === 0) return null
        return (
          <section key={c.id}>
            <h2 className="titre-section">
              {c.code && <span className="code">{c.code}</span>}
              {c.titre}
            </h2>
            <div className="liste">
              {fiches.map((f) => (
                <LigneFiche key={f.id} fiche={f} />
              ))}
            </div>
          </section>
        )
      })}
      {!etat.toutVoir && (
        <p className="petit-texte centre">
          Seules les fiches de ta classe sont affichées. <a href="#/reglages">Tout afficher</a>
        </p>
      )}
    </div>
  )
}
