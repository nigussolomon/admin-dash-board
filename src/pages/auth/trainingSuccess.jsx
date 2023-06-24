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
        You have succesfuly submitted training titles as per your interest <br /> we will contact you soon with the details, thank you!
      </h2>
      <h3>-Talent Development Directorate</h3>
    </div>
  );
}