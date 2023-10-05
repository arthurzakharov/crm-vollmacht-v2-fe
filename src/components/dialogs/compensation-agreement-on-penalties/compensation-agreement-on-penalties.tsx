import { DialogArticle } from "@atoms/dialog-article";
import { selectDialogCompensationAgreementOnPenaltiesData } from "@redux/selectors";
import { useAppSelector } from "@redux/store";

export const CompensationAgreementOnPenalties = () => {
  const {
    firstName,
    lastName,
    birthName,
    birthDate,
    street,
    houseNumber,
    postCode,
    city,
    charge,
    total,
    switchTotal,
    latestSentPoaType,
  } = useAppSelector(selectDialogCompensationAgreementOnPenaltiesData);

  const getTotal = () => (total ? `${total},00 €` : `${switchTotal},00 €`);

  const P1 = () => {
    switch (latestSentPoaType) {
      case "withoutRsv400Court":
      case "RA400":
        return (
          <p>
            Die Vereinbarung betrifft die gerichtliche Vertretung für einen Hauptverhandlungstermin im
            Ordnungswidrigkeitenverfahren. Die Kanzlei erhält für die gerichtliche Vertretung in der Angelegenheit:
          </p>
        );
      case "alcohol1000":
      case "RA1000":
        return (
          <p>
            Die Vereinbarung umfasst die Vertretung im strafrechtlichen Ermittlungsverfahren einschließlich der
            Vertretung im Falle der Anklageerhebung und Eröffnung des Hauptverfahrens in der 1. Instanz. Die Kanzlei
            erhält für die Vertretung in der Angelegenheit:
          </p>
        );
      case "RA700":
        return (
          <p>
            Die Vereinbarung betrifft das Ordnungswidrigkeitsverfahren vom behördlichen Ermittlungsverfahren, des
            Zwischenverfahrens (Abgabe an die Staatsanwaltschaft) und die gerichtliche Vertretung für einen
            Hauptverhandlungstermin. Die Kanzlei erhält für die außergerichtliche und gerichtliche Vertretung in der
            Angelegenheit:
          </p>
        );
      default:
        return (
          <p>
            Die Vereinbarung betrifft nur das behördliche Ordnungswidrigkeitenverfahren einschließlich des
            Zwischenverfahrens vor der Staatsanwaltschaft. Die Kanzlei erhält für die außergerichtliche Vertretung in
            der Angelegenheit:
          </p>
        );
    }
  };

  const P2 = () => {
    switch (latestSentPoaType) {
      case "withoutRsv400Court":
      case "RA400":
      case "RA700":
        return (
          <p>
            Die Vergütung gilt losgelöst vom tatsächlichen Zeitaufwand als vereinbarte Vergütung. § 628 Abs. 1 S. 1 BGB
            wird ausgeschlossen. Diese Gebühr umfasst einen Hauptverhandlungstermin. Für jeden weiteren Termin richten
            sich die Gebühren sodann nach den gesetzlichen Vorschriften des Rechtsanwaltsvergütungsgesetzes (RVG).
          </p>
        );
      case "alcohol1000":
      case "RA1000":
        return (
          <p>
            Die Vergütung gilt losgelöst vom tatsächlichen Zeitaufwand als vereinbarte Vergütung. § 628 Abs. 1 S. 1 BGB
            wird ausgeschlossen. Diese Gebühr umfasst einen Hauptverhandlungstermin. Für jeden weiteren
            Hauptverhandlungstermin erhält die Kanzlei eine weitere pauschale Vergütung in Höhe von 300,00 EUR inkl.
            USt..
          </p>
        );
      default:
        return (
          <p>
            Die Vergütung gilt losgelöst vom tatsächlichen Zeitaufwand als vereinbarte Vergütung. § 628 Abs. 1 S. 1 BGB
            wird ausgeschlossen. Für die Vertretung im Falle eines gerichtlichen Verfahrens richtet sich die Vergütung
            sodann nach den gesetzlichen Vorschriften des Rechtsanwaltsvergütungsgesetzes (RVG) oder einer gesondert
            abzuschließenden Vergütungsvereinbarung.
          </p>
        );
    }
  };

  const P3 = () => {
    switch (latestSentPoaType) {
      case "alcohol1000":
      case "RA1000":
        return (
          <p>
            Der angemessene Vorschuss für die Tätigkeit bis zum ersten Hauptverhandlungstag beträgt{" "}
            <strong>700,00 EUR inkl. USt.</strong> und ist sofort mit der Mandatserteilung fällig. Der Restbetrag wird
            nach Abschluss des Verfahrens fällig.
          </p>
        );
      case "RA700":
        return (
          <p>
            Der angemessene Vorschuss für die Tätigkeit bis zum ersten Hauptverhandlungstag beträgt{" "}
            <strong>400,00 EUR inkl. USt.</strong> und ist sofort mit der Mandatserteilung fällig. Der Restbetrag wird
            nach Abschluss des Verfahrens fällig.
          </p>
        );
      default:
        return (
          <p>
            Der Gesamtbetrag von <strong>{getTotal()} EUR inkl. USt.</strong> ist sofort mit der Mandatserteilung
            fällig.
          </p>
        );
    }
  };

  return (
    <DialogArticle>
      <div>
        <h1>Vergütungsvereinbarung in Bußgeld- und Strafsachen</h1>
        <p>Zwischen</p>
        <p>
          <strong>
            {firstName} {lastName} {birthName || birthName}
          </strong>
          <br />
          geboren am {birthDate}, wohnhaft in {street} {houseNumber}, {postCode} {city},
        </p>
        <cite style={{ textAlign: "right", display: "block" }}>
          - nachfolgend <strong>Auftraggeber</strong> genannt -
        </cite>
        <p>und</p>
        <p>
          der <strong>Mathis Ruff Rechtsanwaltsgesellschaft mbH</strong>,<br />
          Sonnenallee 260/262, 12057 Berlin,
        </p>
        <p>
          Rechtsanwälte Mathis Ruff, Mathias Voigt, Francisca Brauns, Ulrike Gehrke, Vessela Nitcheva, Gina Schulz,
          Helmuth Karsten Braun, Oliver Kessler, Mark Lutze, Alexander Schaub, Andre Schey, Robert Spank, Johannes
          Strunz und Stefan Zimmermann.
        </p>
        <cite style={{ textAlign: "right", display: "block" }}>
          - nachfolgend <strong>Kanzlei</strong> genannt -
        </cite>
        <h4>1. Mandatsumfang und Vergütung</h4>
        <P1 />
        <ul>
          <li>Tatvorwurf: {charge}</li>
        </ul>
        <p>eine pauschale Vergütung in Höhe von:</p>
        <ul>
          <li>{getTotal()} EUR inkl. USt.</li>
        </ul>
        <P2 />
        <h4>2. Hinweise</h4>
        <p>
          Der Auftraggeber wird darauf hingewiesen, dass sich die gesetzlichen Gebühren nach dem
          Rechtsanwaltsvergütungsgesetz (RVG) richten. Sollte die vereinbarte Vergütung die gesetzliche Vergütung nach
          dem RVG übersteigen, richten sich im Falle des Obsiegens etwaige Erstattungen durch Dritte (z.B. der
          Staatskasse) nach der gesetzlich vorgesehenen Anwaltsvergütung und nicht nach der vereinbarten Vergütung. Die
          vereinbarte Vergütung wird daher unter Umständen von Dritten nicht vollständig übernommen.
        </p>
        <h4>3. Anrechnungsausschluss</h4>
        <p>
          Eine Anrechnung der vereinbarten Vergütung auf eventuell später entstehende Anwaltsgebühren wird
          ausgeschlossen.
        </p>
        <h4>4. Fälligkeit</h4>
        <P3 />
        <h4>5. Hinweis zum Verbraucherstreitbeilegungsgesetz</h4>
        <p>
          Für vermögensrechtliche Streitigkeiten aus dem Mandatsverhältnis ist die Schlichtungsstelle der
          Rechtsanwaltschaft, Rauchstraße 26, 10787 Berlin, www.s-d-r.org, zuständig. Die Kanzlei ist nicht bereit und
          verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </DialogArticle>
  );
};
