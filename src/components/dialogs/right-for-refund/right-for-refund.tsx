import { DialogArticle } from "@atoms/dialog-article";
import { selectDialogRightForRefundData } from "@redux/selectors";
import { useAppSelector } from "@redux/store";

export const RightForRefund = () => {
  const { caseGroupLawyerNames } = useAppSelector(selectDialogRightForRefundData);

  return (
    <DialogArticle>
      <div>
        <h1>Widerrufsbelehrung</h1>
        <h4>Widerrufsrecht</h4>
        <p>
          Sie haben das Recht, binnen 14 Tagen ohne Angaben von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist
          beträgt vierzehn Tage ab dem Tag des Vertragsschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
          (Mathis Ruff Rechtsanwaltsgesellschaft mbH, SOS-Verkehrsrecht, Sonnenallee 260/262, 12057 Berlin, Tel.: 030/20
          898 12 12, Fax: 030/20 898 12 13, E-Mail: widerruf@sos-verkehrsrecht.de) mittels einer eindeutigen Erklärung
          (z.B. ein mit der Post versandter Brief, Telefax oder E-Mail) über Ihren Entschluss, diesen Vertrag zu
          widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
          vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung
          des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
        </p>
        <h4>Folgen des Widerrufs</h4>
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
          einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
          andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich
          und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über den Widerrufs
          dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie
          bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
          vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
        </p>
        <p>
          Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen soll, so haben Sie uns einen
          angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des
          Widerrufsrechts hinsichtlich dieses Vertrages unterrichten, bereits erbrachten Dienstleistungen im Vergleich
          zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
        </p>
        <h4>Muster-Widerrufsformulars</h4>
        <p>
          Nur im Falle eines Widerrufs senden Sie uns dieses Formular ausgefüllt und unterschrieben per Fax, Post, oder
          per E-Mail an: widerruf@sos-verkehrsrecht.de
        </p>
        <p>Sehr geehrte Damen und Herren,</p>
        <p>
          hiermit widerrufe ich den von mir geschlossenen Vertrag mit den Rechtsanwälten {caseGroupLawyerNames}, Mathis
          Ruff Rechtsanwaltsgesellschaft mbH, Sonnenallee 260/262, 12057 Berlin, über die Erbringung der folgenden
          Dienstleistung:
        </p>
        <ul>
          <li>Vertretung in Bußgeld – und Strafsachen in dem Fall %reference%</li>
        </ul>
        <p>Bitte vollständig und in Druckschrift ausfüllen:</p>
        <ul>
          <li>Vorname</li>
          <li>Nachname</li>
          <li>Anschrift</li>
        </ul>
        <p>Grund für den Widerruf (optional):</p>
        <p>Ort, Datum und Unterschrift des Mandanten</p>
      </div>
    </DialogArticle>
  );
};
