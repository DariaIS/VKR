import React from "react";

function Analyst() {

    return (
        <div className="analyst section container">
            <span className="analyst__title title title--medium">Вы вошли как аналитик</span>

            <div className="analyst__table">
                <span className="analyst__table-title title title--small">Все машины, присутствующие в базе данных</span>
                <table className="analyst__table-item">
                    <thead className="analyst__thead">
                        <tr className="analyst__tr">
                            <th className="analyst__th">Company</th>
                            <th className="analyst__th">Contact</th>
                            <th className="analyst__th">Country</th>
                            <th className="analyst__th">Country</th>
                        </tr>
                    </thead>
                    <tbody className="analyst__tbody">
                        <tr className="analyst__tr">
                            <td className="analyst__td">Alfreds Futterkiste</td>
                            <td className="analyst__td">Maria Anders</td>
                            <td className="analyst__td">Germany</td>
                            <td className="analyst__td">Germany</td>

                        </tr>
                        <tr className="analyst__tr">
                            <td className="analyst__td">Alfreds Futterkiste</td>
                            <td className="analyst__td">Maria Anders</td>
                            <td className="analyst__td">Germany</td>
                            <td className="analyst__td">Germany</td>
                        </tr>
                        <tr className="analyst__tr">
                            <td className="analyst__td">Alfreds Futterkiste</td>
                            <td className="analyst__td">Maria Anders</td>
                            <td className="analyst__td">Germany</td>
                            <td className="analyst__td">Germany</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Analyst;