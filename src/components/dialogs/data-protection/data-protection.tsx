import { DialogArticle } from "@atoms/dialog-article";

export const DataProtection = () => {
  const getCmpContent = () => {
    const cmpContainerTag = document.querySelector("#cmp");
    return cmpContainerTag ? cmpContainerTag.firstElementChild?.innerHTML || "CMP content is empty" : "No CMP content";
  };

  return (
    <DialogArticle>
      <div>
        <h1>Datenschutzerklärung</h1>
        <p>
          Wir freuen uns, dass Sie unsere Website besuchen. Der Schutz und die Sicherheit Ihrer persönlichen
          Informationen bei der Nutzung unserer Website ist für uns sehr wichtig. Wir möchten Sie daher an dieser Stelle
          darüber informieren, welche Ihrer personenbezogenen Daten wir beim Besuch unserer Website erfassen und für
          welche Zwecke diese verwendet werden.
        </p>
        <h2>Wer ist verantwortlich und wie erreiche ich Sie?</h2>
        <p>
          <b>
            Verantwortlicher für die Verarbeitung personenbezogener Daten im Sinne der EU-Datenschutz-Grundverordnung
            (DSGVO):{" "}
          </b>
        </p>
        <table>
          <tbody>
            <tr>
              <td>Name/Fa.:</td>
              <td>Mathias Voigt / Mathis Ruff Rechtsanwaltsgesellschaft mbH</td>
            </tr>
            <tr>
              <td>Straße Nr.:</td>
              <td>Sonnenallee 260/262</td>
            </tr>
            <tr>
              <td>PLZ, Ort, Land:</td>
              <td>12057, Berlin, Deutschland</td>
            </tr>
            <tr>
              <td>Handelsregister/Nr.:</td>
              <td>Amtsgericht Berlin-Charlottenburg, HRB 168224 B</td>
            </tr>
            <tr>
              <td>Telefonnummer:</td>
              <td>+49 (30) 20 898 12 12</td>
            </tr>
            <tr>
              <td>E-Mailadresse:</td>
              <td>
                <a data-tag="link" href="mailto:kanzlei@sos-verkehrsrecht.de">
                  kanzlei@sos-verkehrsrecht.de
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>
          <b>Datenschutzbeauftragte/r: </b>DataSolution LUD GmbH, bitte verwenden Sie die allgemeinen Kontaktdaten von
          oben.
        </p>
        <h2>Worum geht es?</h2>
        <p>
          Diese Datenschutzerklärung erfüllt die gesetzlichen Anforderungen an die Transparenz bei der Verarbeitung
          personenbezogener Daten. Dies sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
          natürliche Person beziehen. Hierzu gehören beispielsweise Informationen wie Ihr Name, Ihr Alter, Ihre
          Anschrift, Ihre Telefonnummer, Ihr Geburtsdatum, Ihre E-Mail-Adresse, Ihre IP-Adresse oder das Nutzerverhalten
          beim Besuch einer Website. Informationen, bei denen wir keinen (oder nur mit einem unverhältnismäßigen
          Aufwand) Bezug zu Ihrer Person herstellen können, z.B. durch Anonymisierung, sind keine personenbezogenen
          Daten. Die Verarbeitung von personenbezogenen Daten (bspw. das Erheben, das Abfragen, die Verwendung, die
          Speicherung oder die Übermittlung) bedarf immer einer gesetzlichen Grundlage und eines definierten Zwecks.
        </p>
        <p>
          Gespeicherte personenbezogene Daten werden gelöscht, sobald der Zweck der Verarbeitung erreicht wurde und es
          keine rechtmäßigen Gründe für eine weitere Aufbewahrung der Daten gibt. Wir informieren Sie in den einzelnen
          Verarbeitungsvorgängen über die konkreten Speicherfristen bzw. Kriterien für die Speicherung. Unabhängig
          davon, speichern wir Ihre personenbezogenen in Einzelfällen zur Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen und bei Vorliegen gesetzlicher Aufbewahrungspflichten.
        </p>
        <h2>Wer bekommt meine Daten?</h2>
        <p>
          Wir geben Ihre personenbezogenen Daten, die wir auf unserer Website verarbeiten nur dann an Dritte weiter,
          wenn dies für die Erfüllung der Zwecke erforderlich ist und im Einzelfall von der Rechtsgrundlage (z.B.
          Einwilligung oder Wahrung berechtigter Interessen) erfasst ist. Darüber hinaus geben wir im Einzelfall
          personenbezogene Daten an Dritte weiter, wenn dies der Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen dient. Mögliche Empfänger können dann z.B. Strafverfolgungsbehörden, Rechtsanwälte,
          Wirtschaftsprüfer, Gerichte usw. sein.
        </p>
        <p>
          Soweit wir für den Betrieb unserer Website Dienstleister einsetzen, die im Rahmen einer Auftragsverarbeitung
          in unserem Auftrag personenbezogene Daten gem. Art. 28 DSGVO verarbeiten, können diese Empfänger Ihrer
          personenbezogenen Daten sein. Nähere Informationen zum Einsatz von Auftragsverarbeitern sowie von Webdiensten
          erhalten Sie in der Übersicht der einzelnen Verarbeitungsvorgänge.
        </p>
        <p>
          Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen Union (EU) oder des Europäischen
          Wirtschaftsraums (EWR)) verarbeiten oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder
          Offenlegung, bzw. Übermittlung von Daten an Dritte geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer
          (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung oder
          auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich gesetzlicher oder vertraglicher
          Erlaubnisse, verarbeiten oder lassen wir die Daten in einem Drittland nur beim Vorliegen der besonderen
          Voraussetzungen der Art. 44 ff. DSGVO verarbeiten. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer
          Garantien, wie der offiziell anerkannten Feststellung eines der EU entsprechenden Datenschutzniveaus oder
          Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen (so genannte
          „Standardvertragsklauseln“).
        </p>
        <h2>Welche Rechte habe ich?</h2>
        <p>
          Unter den Voraussetzungen der gesetzlichen Vorschriften der Datenschutz-Grundverordnung (DSGVO) haben Sie als
          betroffene Person folgende Rechte:
        </p>
        <ul>
          <li>
            <b>Auskunft</b> gem. Art. 15 DSGVO über die zu Ihrer Person gespeicherten Daten in Form von aussagekräftigen
            Informationen zu den Einzelheiten der Verarbeitung sowie eine Kopie Ihrer Daten;
          </li>
          <li>
            <b>Berichtigung</b> gem. Art. 16 DSGVO von unrichtigen oder unvollständigen Daten, die bei uns gespeichert
            sind;
          </li>
          <li>
            <b>Löschung</b> gem. Art. 17 DSGVO der bei uns gespeicherten Daten, soweit die Verarbeitung nicht zur
            Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer rechtlichen
            Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung
            von Rechtsansprüchen erforderlich ist;
          </li>
          <li>
            <b>Einschränkung</b> der Verarbeitung gem. Art. 18 DSGVO, soweit die Richtigkeit der Daten bestritten wird,
            die Verarbeitung unrechtmäßig ist, wir die Daten nicht mehr benötigen und Sie deren Löschung ablehnen, weil
            Sie diese zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder Sie Widerspruch
            gegen die Verarbeitung gem. Art. 21 DSGVO erhoben haben.
          </li>
          <li>
            <b>Datenübertragbarkeit</b> gem. Art. 20 DSGVO, soweit Sie uns personenbezogene Daten im Rahmen einer
            Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO oder auf Grundlage eines Vertrages gem. Art. 6 Abs. 1 lit. b
            DSGVO bereitgestellt haben und diese durch uns mithilfe automatisierter Verfahren verarbeitet wurden. Sie
            erhalten Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format bzw. wir übermitteln die
            Daten direkt an einen anderen Verantwortlichen, soweit dies technisch machbar ist.
          </li>
          <li>
            <b>Widerspruch</b> gem. Art. 21 DSGVO gegen die Verarbeitung Ihrer personenbezogenen Daten, soweit diese auf
            Grundlage des Art. 6 Abs. 1 lit. e, f DSGVO erfolgt und dafür Gründe vorliegen, die sich aus Ihrer
            besonderen Situation ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Das Recht auf
            Widerspruch besteht nicht, wenn überwiegende, zwingende schutzwürdige Gründe für die Verarbeitung
            nachgewiesen werden oder die Verarbeitung zur Geltendmachung, Ausübung oder Verteidigung von
            Rechtsansprüchen erfolgt. Soweit das Recht auf Widerspruch bei einzelnen Verarbeitungsvorgängen nicht
            besteht, ist dies dort angegeben.
          </li>
          <li>
            <b>Widerruf</b> gem. Art. 7 Abs. 3 DSGVO Ihrer erteilten Einwilligung mit Wirkung für die Zukunft.
          </li>
          <li>
            <b>Beschwerde</b> gem. Art. 77 DSGVO bei einer Aufsichtsbehörde, wenn Sie der Ansicht sind, die Verarbeitung
            Ihrer personenbezogenen Daten verstößt gegen die DSGVO. In der Regel können Sie sich an die Aufsichtsbehörde
            Ihres üblichen Aufenthaltsortes, Ihres Arbeitsplatzes oder unseres Unternehmenssitzes wenden.
          </li>
        </ul>
        <h2>Sicherheit</h2>
        <p>
          Wir setzen technische und organisatorische Sicherheitsmaßnahmen gemäß Art. 32 DSGVO ein, um Ihre durch uns
          verwalteten Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder vor dem Zugriff
          unberechtigter Personen zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen
          Entwicklung fortlaufend verbessert. Der Zugriff darauf ist nur wenigen Befugten und zum besonderen Datenschutz
          verpflichteten Personen möglich, die mit der technischen, administrativen oder der redaktionellen Betreuung
          von Daten befasst sind.
        </p>
        <p>
          Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als
          Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie über
          diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der
          „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der Browserzeile.
        </p>
        <h2>Schutz von Minderjährigen</h2>
        <p>
          Dieser Service richtet sich hauptsächlich an Erwachsene. Wir vermarkten derzeit keine speziellen Bereiche für
          Kinder. Demzufolge sammeln wir weder wissentlich Informationen zur Altersbestimmung, noch sammeln wir
          wissentlich personenbezogene Daten von Kindern unter 16 Jahren. Wir weisen jedoch alle Besucher unserer
          Webseite unter 16 Jahren darauf hin, keine personenbezogenen Daten über unseren Service preiszugeben oder
          bereitzustellen. Für den Fall, dass wir feststellen, dass ein Kind unter 16 Jahren uns personenbezogene Daten
          zur Verfügung gestellt hat, werden wir die personenbezogenen Daten des Kindes aus unseren Dateien löschen,
          soweit dies technisch möglich ist.
        </p>
        <h2>Aktualisierung und Änderung</h2>
        <p>
          Wir behalten uns das Recht vor, diese Datenschutzhinweise jederzeit zu ändern, zu aktualisieren oder zu
          ergänzen. Jede überarbeitete Information zur Datenverarbeitung gilt nur für personenbezogene Daten, die nach
          dem Inkrafttreten erfasst oder geändert wurden.
        </p>
        <h2>Setzen wir Cookies ein?</h2>
        <p>
          Cookies sind kleine Textdateien, die im Rahmen Ihres Besuchs unserer Internetseiten von uns an den Browser
          Ihres Endgeräts gesendet und dort gespeichert werden. Alternativ zum Einsatz von Cookies können Informationen
          auch im lokalen Speicher (local storage) Ihres Browsers gespeichert werden. Einige Funktionen unserer
          Internetseite können ohne den Einsatz von Cookies bzw. local storage nicht angeboten werden (technisch
          notwendige Cookies). Andere Cookies ermöglichen uns hingegen verschiedene Analysen, sodass wir beispielsweise
          in der Lage sind, den von Ihnen verwendeten Browser bei einem erneuten Besuch unserer Webseite
          wiederzuerkennen und verschiedene Informationen an uns zu übermitteln (nicht notwendige Cookies). Mithilfe von
          Cookies können wir unter anderem unser Internetangebot für Sie nutzerfreundlicher und effektiver gestalten,
          indem wir etwa Ihre Nutzung unserer Website nachvollziehen und Ihre bevorzugten Einstellungen (bspw. Länder-
          und Spracheneinstellungen) feststellen. Sofern Dritte über Cookies Informationen verarbeiten, erheben diese
          die Informationen direkt über Ihren Browser. Cookies richten auf Ihrem Endgerät keinen Schaden an. Sie können
          keine Programme ausführen und keine Viren enthalten.
        </p>
        <p>
          Über die jeweiligen Dienste, für die wir Cookies einsetzen, informieren wir in den einzelnen
          Verarbeitungsvorgängen. Ausführliche Informationen zu den eingesetzten Cookies finden Sie in den
          Cookie-Einstellungen oder im Consent Manager dieser Website.
        </p>
        <h3>Wie werden meine Daten im Einzelnen verarbeitet?</h3>
        <p>
          Nachfolgend informieren wir Sie über die einzelnen Verarbeitungsvorgänge, den Umfang und den Zweck der
          Datenverarbeitung, die Rechtsgrundlage, die Pflicht zur Bereitstellung Ihrer Daten und die jeweilige
          Speicherdauer. Eine automatisierte Entscheidung im Einzelfall, einschließlich Profiling findet nicht statt.
        </p>
        <h2>Bereitstellung der Website</h2>
        <h3>Art und Umfang der Verarbeitung</h3>
        <p>
          Bei Aufruf und Nutzung unserer Website erheben wir die personenbezogenen Daten, die Ihr Browser automatisch an
          unseren Server übermittelt. Die folgenden Informationen werden temporär in einem sog. Logfile gespeichert:
        </p>
        <ul>
          <li>IP-Adresse des anfragenden Rechners</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Name und URL der abgerufenen Datei</li>
          <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
          <li>Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners, sowie der Name Ihres Access-Providers</li>
        </ul>
        <p>
          Unsere Website wird nicht von uns selbst gehostet, sondern bei einem Dienstleister, der für den Zweck der die
          zuvor genannten Daten in unserem Auftrag gem. Art. 28 DSGVO verarbeitet.
        </p>
        <h3>Zweck und Rechtsgrundlage</h3>
        <p>
          Die Verarbeitung erfolgt zur Wahrung unseres überwiegenden berechtigten Interesses zur Anzeige unserer Website
          und Gewährleistung der Sicherheit und Stabilität auf Grundlage des Art. 6 Abs. lit. f DSGVO. Die Erfassung der
          Daten und die Speicherung in Logfiles ist für den Betrieb der Website zwingend erforderlich. Ein
          Widerspruchsrecht gegen die Verarbeitung besteht aufgrund der Ausnahme nach Art. 21 Abs. 1 DSGVO nicht. Soweit
          die weitergehende Speicherung der Logfiles gesetzlich vorgeschrieben ist, erfolgt die Verarbeitung auf
          Grundlage des Art. 6 Abs. 1 lit. c DSGVO. Es besteht keine gesetzliche oder vertragliche Pflicht zur
          Bereitstellung der Daten, allerdings ist der Aufruf unserer Website ohne Bereitstellung der Daten technisch
          nicht möglich.
        </p>
        <h3>Speicherdauer</h3>
        <p>
          Die vorgenannten Daten werden für die Dauer der Anzeige der Website sowie aus technischen Gründen darüber
          hinaus für maximal 7 Tage gespeichert.
        </p>
        <h2>Kontaktformular</h2>
        <h3>Art und Umfang der Verarbeitung</h3>
        <p>
          Auf unserer Webseite bieten wir Ihnen an, über ein bereitgestelltes Formular mit uns in Kontakt zu treten. Die
          Informationen, die über Pflichtfelder erhoben werden, sind erforderlich um die Anfrage bearbeiten zu können.
          Darüber hinaus können Sie freiwillig zusätzliche Informationen bereitstellen, die aus Ihrer Sicht für die
          Bearbeitung der Kontaktanfrage notwendig sind.
        </p>
        <p>
          Bzgl. der Beantwortung von Kontaktanfragen verwenden wir verschiedene Systeme, die für die effektive
          Bearbeitung erforderlich sind. Dies ist ein CRM-System zur Speicherung der Kontaktdaten, ein Ticketsystem und
          Telefonsysteme zur Kommunikation mit den Anfragenden. Mit den Anbietern dieser Systeme sind entsprechende
          Vereinbarungen gem. Art. 28 DSGVO geschlossen. Wenn es sich um einen Anbieter aus einem Drittland handelt,
          wenden wir die Standardvertragsklauseln an.
        </p>
        <h3>Zweck und Rechtsgrundlage</h3>
        <p>
          Die Verarbeitung Ihrer Daten durch Nutzung unseres Kontaktformulars erfolgt zum Zweck der Kommunikation und
          Bearbeitung Ihrer Anfrage auf Grundlage unseres berechtigten Interesses an der Beantwortung der Kontaktanfrage
          gem. Art. 6 Abs. 1 lit f DSGVO. Soweit sich Ihre Anfrage auf ein bestehendes Vertragsverhältnis mit uns
          bezieht, erfolgt die Verarbeitung zum Zweck der Vertragserfüllung auf Grundlage des Art. 6 Abs. 1 lit. b
          DSGVO. Es besteht keine gesetzliche oder vertragliche Pflicht zur Bereitstellung Ihrer Daten, jedoch ist die
          Bearbeitung Ihrer Anfrage ohne die Bereitstellung der Informationen der Pflichtfelder nicht möglich. Soweit
          Sie diese Daten nicht bereitstellen möchten, kontaktieren Sie uns bitte mit anderen Mitteln.
        </p>
        <h3>Speicherdauer</h3>
        <p>
          Soweit Sie das Kontaktformular auf Grundlage Ihrer Einwilligung verwenden, speichern wir die erhobenen Daten
          jeder Anfrage für die Dauer von drei Jahren, beginnend mit der Erledigung Ihrer Anfrage oder bis zum Widerruf
          Ihrer Einwilligung.
        </p>
        <p>
          Sollten Sie das Kontaktformular im Rahmen einer vertraglichen Beziehung nutzen, speichern wir die erhobenen
          Daten jeder Anfrage für die Dauer von drei Jahren ab Ende des Vertragsverhältnisses.
        </p>
        <h2>Newsletter</h2>
        <h3>Art und Umfang der Verarbeitung</h3>
        <p>
          Sofern Sie sich zum Empfang unseres Newsletters anmelden, erheben wir Ihre E-Mail-Adresse sowie Ihren Namen
          und speichern diese Informationen zusammen mit dem Datum der Anmeldung und Ihrer IP-Adresse. Sie Erhalten den
          Newsletter nur nach Bestätigung der Korrektheit Ihrer Emailadresse und nachdem Sie sich für den Versand des
          Newsletters angemeldet haben (Double-Opt-in). Der Newsletter wird über einen auf Newsletterversand
          spezialisierten Anbieter versendet, der Ihre personenbezogenen Daten in unserem Auftrag gem. Art. 28 DSGVO zum
          Zweck des Newsletterversands verarbeitet. Dabei handelt es sich um einen Dienstleister aus einem Drittland.
          Mit dem Dienstleister wurden die Standardvertragsklauseln abgeschlossen.
        </p>
        <h3>Zweck und Rechtsgrundlage</h3>
        <p>
          Wir verarbeiten Ihre Daten zum Zweck des Newsletterversands auf Grundlage Ihrer Einwilligung gem. Art. 6 Abs.
          1 lit. a DSGVO. Durch Abmeldung vom Newsletter können Sie jederzeit mit Wirkung für die Zukunft Ihren Widerruf
          gem. Art. 7 Abs. 3 DSGVO erklären. Es besteht keine gesetzliche oder vertragliche Pflicht zur Bereitstellung
          Ihrer Daten, jedoch ist ein Versand des Newsletters ohne die Bereitstellung Ihrer Daten nicht möglich.
        </p>
        <h3>Speicherdauer</h3>
        <p>
          Nach Anmeldung zum Newsletter speichern wir die Daten bis zur Bestätigung der Anmeldung. Nach erfolgreicher
          Bestätigung speichern wir Ihre Daten bis zum Widerruf Ihrer Einwilligung (Abmeldung vom Newsletter) sowie aus
          technischen Gründen darüber hinaus maximal 7 Tage.
        </p>
        <h2>Präsenzen auf Social-Media-Plattformen</h2>
        <p>
          Wir unterhalten auf den unten genannten Netzwerken sog. Fan-Pages bzw. Accounts oder Kanäle, um Ihnen auch
          innerhalb von sozialen Netzwerken Informationen und Angebote bereitzustellen und Ihnen weitere Wege
          anzubieten, Kontakt zu uns aufzunehmen und sich über unsere Angebote zu informieren. Im Folgenden informieren
          wir Sie darüber, welche Daten wir bzw. das jeweilige soziale Netzwerk von Ihnen im Zusammenhang mit dem Aufruf
          und der Nutzung unserer Fan-Pages/Accounts von Ihnen verarbeiten. Die Benennung der einzelnen
          Social-Media-Plattformen, auf denen wir Seiten unterhalten finden Sie unter der Auflistung der Drittanbieter.
        </p>
        <h3>Daten, die wir von Ihnen verarbeiten</h3>
        <p>
          Wenn Sie per Messenger oder via Direct Message über das jeweilige sozialen Netzwerk Kontakt zu uns aufnehmen
          möchten, verarbeiten wir in der Regel Ihren Nutzernamen, über den Sie uns kontaktieren und speichern ggf.
          weitere von Ihnen mitgeteilte Daten soweit dies zur Bearbeitung/Beantwortung Ihres Anliegens erforderlich ist.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 Satz 1 f) DSGVO (Verarbeitung ist erforderlich zur Wahrung berechtigter
          Interessen des Verantwortlichen).
        </p>
        <h3>(Statische) Nutzungs-Daten, die wir von den sozialen Netzwerken erhalten</h3>
        <p>
          Wir erhalten über Insights-Funktionalitäten automatisiert bereitgestellte Statistiken betreffend unserer
          Accounts. Die Statistiken enthalten unter anderem die Gesamtanzahl von Seitenaufrufen, Gefällt mir-Angaben,
          Angaben zu Seitenaktivitäten und Beitragsinteraktionen, Reichweiten, Video-Aufrufe/Ansichten sowie Angaben zum
          Anteil Männer/Frauen unter unseren Fans/Followern.
        </p>
        <p>
          Die Statistiken enthalten lediglich aggregierte und nicht auf einzelne Personen beziehbare Daten. Sie sind für
          uns hierüber nicht identifizierbar.
        </p>
        <h3>Welche Daten die sozialen Netzwerke von Ihnen verarbeiten</h3>
        <p>
          Um die Inhalte unserer Fan-Pages bzw. Accounts betrachten zu können, müssen Sie nicht Mitglied des jeweiligen
          sozialen Netzwerks sein und ist insoweit kein Nutzerkonto für das jeweilige soziale Netzwerk erforderlich.
        </p>
        <p>
          Bitte beachten Sie aber, dass die sozialen Netzwerke bei Aufruf des jeweiligen sozialen Netzwerkes Daten auch
          von Website-Besuchern ohne Nutzerkonto erfassen und speichern (z.B. technische Daten, um Ihnen die Website
          anzeigen zu können) und Cookies und ähnliche Technologien einsetzen, worauf wir keinerlei Einfluss haben.
          Einzelheiten hierzu finden Sie in den Datenschutzbestimmungen des jeweiligen sozialen Netzwerks.
        </p>
        <p>
          Soweit Sie mit den Inhalten auf unseren Fan-Pages/Accounts interagieren wollen, z.B. unsere Postings/Beiträge
          kommentieren, teilen oder liken wollen und/oder über Messenger-Funktionen Kontakt zu uns aufnehmen möchten,
          ist eine vorherige Registrierung bei dem jeweiligen sozialen Netzwerk und die Angabe personenbezogener Daten
          erforderlich.
        </p>
        <p>
          Wir haben keinen Einfluss auf die Datenverarbeitung durch die sozialen Netzwerke im Rahmen der Nutzung durch
          Sie. Unserem Kenntnisstand nach werden Ihre Daten insbesondere im Zusammenhang mit der Zur-Verfügung-Stellung
          der Dienste des jeweiligen sozialen Netzwerks gespeichert und verarbeitet, ferner zur Analyse des
          Nutzungsverhaltens (unter Einsatz von Cookies, Pixel/Web Beacons und ähnlichen Technologien) auf deren Basis
          auf Ihren Interessen basierende Werbung sowohl innerhalb als auch außerhalb des jeweiligen sozialen Netzwerks
          ausgespielt wird. Es kann dabei nicht ausgeschlossen werden, dass Ihre Daten dabei von den sozialen Netzwerken
          auch außerhalb der EU/dem EWR gespeichert werden und an Dritte weitergegeben werden.
        </p>
        <p>
          Informationen unter anderem zum genauen Umfang und den Zwecken der Verarbeitung Ihrer personenbezogenen Daten,
          der Speicherdauer/Löschung sowie Richtlinien zum Einsatz von Cookies und ähnlichen Technologien im Rahmen der
          Registrierung und Nutzung der sozialen Netzwerke finden Sie in den Datenschutzbestimmungen/Cookie-Richtlinien
          der sozialen Netzwerke. Dort finden Sie auch Informationen zu Ihren Rechten und Widerspruchsmöglichkeiten.
        </p>
        <h2>Einsatz von Drittanbietern</h2>
        <p>
          Damit wir unsere Webseite für Sie als Nutzer so angenehm und komfortabel wie möglich gestalten können, setzen
          wir Dienste externer Dienstleister ein. Nachfolgend haben Sie die Möglichkeit, sich über die
          Datenschutzbestimmungen zum Einsatz und Verwendung der eingesetzten Dienste und Funktionen zu informieren, um
          eventuell auch bei diesen Dienstleistern Ihre Rechte wahrzunehmen.
        </p>
        <div className="cmp" dangerouslySetInnerHTML={{ __html: getCmpContent() }} />
      </div>
    </DialogArticle>
  );
};
