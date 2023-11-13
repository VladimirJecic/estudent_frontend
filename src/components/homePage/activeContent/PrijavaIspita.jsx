const PrijavaIspita = ({ prijavaIspitaViewModel }) => {
  return (
    <div>
      <h2 className="mb-4">Ispiti koje mogu da prijavim</h2>
      <p>
        sadrzi 2 sekcija prva sekcija sadrzi tabelu sa nepolozenim ispitima i to
        prva kolona bez naslova(svi polja su dugme prijavi),Naziv,ESPB,mozda
        nastavnik?
      </p>
      <h2 className="mb-4">Prijavljeni ispiti</h2>
      <p>
        tabela-ima slicnu/istu strukturu kao polozeni ispiti u slucaju da nije
        prijavljen nijedan ispit pise poruka sa znakom uzvika "Niste prijavili
        nijedan ispit."
      </p>
    </div>
  );
};
export default PrijavaIspita;
