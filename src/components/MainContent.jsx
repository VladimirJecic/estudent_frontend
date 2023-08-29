import Header from "./Header";
import { useState, useEffect } from "react";

function MainContent({ handleSBCollapsing, sBarItem }) {
  const [content, setContent] = useState("null");
  useEffect(() => {
    switch (sBarItem) {
      case "rokovi":
        setContent(
          <div>
            <h2 className="mb-4">Rokovi</h2>
            <p>
              Ispitni rokovi, treba da zadrzi tabelu sa ispitnim rokovima koji
              jos trenutno traju ili tek treba da pocnu kao tabelu sa kolonama
              Rok,Prijava(pocetak,kraj),Trajanje(pocetak,kraj) i dugmice
              moji/svi moji-ispiti koji nisu polozeni kod mene(studenta)
              svi-lista svih ispita u tom roku
            </p>
          </div>
        );
        break;
      case "polozeni_ispiti":
        setContent(
          <div>
            <h2 className="mb-4">Polozeni ispiti</h2>
            <p>
              tabela sadrzi kolone r.br,naziv predmeta,ocena,espb,rok,datum
              polaganja,potpisao nastavnik i footer sa prosecnom ocenom i zbirom
              espb oba poravnata levo i boldovana
            </p>
          </div>
        );
        break;
      case "prijava_ispita":
        setContent(
          <div>
            <h2 className="mb-4">Ispiti koje mogu da prijavim</h2>
            <p>
              sadrzi 2 sekcija prva sekcija sadrzi tabelu sa nepolozenim
              ispitima i to prva kolona bez naslova(svi polja su dugme
              prijavi),Naziv,ESPB,mozda nastavnik?
            </p>
            <h2 className="mb-4">Prijavljeni ispiti</h2>
            <p>
              tabela-ima slicnu/istu strukturu kao polozeni ispiti u slucaju da
              nije prijavljen nijedan ispit pise poruka sa znakom uzvika "Niste
              prijavili nijedan ispit."
            </p>
          </div>
        );
        break;
      default:
        setContent(null);
    }
  }, [sBarItem]);

  return (
    <div id="content" className="p-4 p-md-5 content">
      <Header handleSBCollapsing={handleSBCollapsing} />
      {content}
    </div>
  );
}

export default MainContent;
