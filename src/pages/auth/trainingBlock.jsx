import React from "react";
import logo_alt from "../../assets/logo_alt.svg";

export default function Block() {
  return (
    <div
      className="block"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        style={{
          width: "280px",
          height: "150px",
        }}
        src={logo_alt}
        alt="logo_alt"
      />
      <h2 style={{ color: "var(--primary)", textAlign: "center",}}>
        You have picked the maximum amount of trainings! <br /> please contact
        your local branch adminstrator for more information.
      </h2>
    </div>
  );
}
