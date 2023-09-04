export const prerender = true
export const load = ({ url }) => {
    const { pathname } = url
    const path = pathname.slice(1) == "" ? "accueil" : pathname.slice(1)
    let name : string
    switch (path) {
      case("accueil")  : { name = "Bienvenue 🙂"   ; break}
      case("map")      : { name = "Carte Beaulieu" ; break}
      case("settings") : { name = "Paramètres"     ; break}
      case("salle") : { name = "Planning"     ; break}
    }
    return { pathname:path,name:name }
  }