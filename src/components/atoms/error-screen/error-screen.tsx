import "./error-screen.css";

export const ErrorScreen = () => (
  <section className="error-screen">
    <h1 className="error-screen__h1">Entschuldigung, da ist wohl etwas schief gelaufen!</h1>
    <h2 className="error-screen__h2">Fehler 404</h2>
    <h3 className="error-screen__h3">Bitte kontaktieren Sie uns doch per:</h3>
    <table className="error-screen__table">
      <tbody>
        <tr>
          <th className="error-screen__th">E-Mail:</th>
          <td className="error-screen__td">kanzlei@sos-verkehrsrecht.de</td>
        </tr>
        <tr>
          <th className="error-screen__th">Telefon:</th>
          <td className="error-screen__td">030 20 898 12 11</td>
        </tr>
        <tr>
          <th className="error-screen__th">Fax:</th>
          <td className="error-screen__td">030 20 898 12 13</td>
        </tr>
        <tr>
          <th className="error-screen__th">Post:</th>
          <td className="error-screen__td">
            Mathis Ruff Rechtsanwaltsgesellschaft mbH
            <br />
            Sonnenallee 260/262
            <br />
            12057 Berlin
          </td>
        </tr>
      </tbody>
    </table>
  </section>
);
