import React from "react";
import { Link } from "react-router-dom";

import DM01Logo from "../images/logos/DM1Logo20x20.webp";
import DM02Logo from "../images/logos/DM2Logo20x20.webp";
import DM03Logo from "../images/logos/DM3Logo20x20.webp";
import DM04Logo from "../images/logos/DM4Logo20x20.webp";
import DM05Logo from "../images/logos/DM5Logo20x20.webp";
import DM06Logo from "../images/logos/DM6Logo20x20.webp";
import DM07Logo from "../images/logos/DM7Logo20x20.webp";
import DM08Logo from "../images/logos/DM8Logo20x20.webp";
import DM09Logo from "../images/logos/DM9Logo20x20.webp";
import DM10Logo from "../images/logos/DM10Logo20x20.webp";
import DM11Logo from "../images/logos/DM11Logo20x20.webp";
import DM12Logo from "../images/logos/DM12Logo20x20.webp";

const SetSelection = () => {
  const sets = [
    { id: "dm01", label: "DM - 01", logo: DM01Logo },
    { id: "dm02", label: "DM - 02", logo: DM02Logo },
    { id: "dm03", label: "DM - 03", logo: DM03Logo },
    { id: "dm04", label: "DM - 04", logo: DM04Logo },
    { id: "dm05", label: "DM - 05", logo: DM05Logo },
    { id: "dm06", label: "DM - 06", logo: DM06Logo },
    { id: "dm07", label: "DM - 07", logo: DM07Logo },
    { id: "dm08", label: "DM - 08", logo: DM08Logo },
    { id: "dm09", label: "DM - 09", logo: DM09Logo },
    { id: "dm10", label: "DM - 10", logo: DM10Logo },
    { id: "dm11", label: "DM - 11", logo: DM11Logo },
    { id: "dm12", label: "DM - 12", logo: DM12Logo },
  ];

  return (
    <main className="Main__container">
      <p className="Setselection__title">Set Selection</p>
      <div className="Setselection__sets_container">
        <ul className="Setselection__sets_ul">
          {sets.map((set) => (
            <li key={set.id} className="Setselection__sets_li">
              <Link to={`/${set.id}`} className="Link__settings">
                <p className="Setselection__sets_li_p">
                  {set.label}
                  <img
                    src={set.logo}
                    alt={`${set.label} logo`}
                    width="20"
                    height="20"
                    className="DM__set_img"
                  />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default SetSelection;
