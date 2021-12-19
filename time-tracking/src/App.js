import React, { useState, useEffect, useContext, useRef } from "react";
import { data } from "./data.js";

// css
import "./App.css";

const AppCtx = React.createContext();

function App() {
  const [currentRoutine, setCurrentRoutine] = useState("Weekly");

  return (
    <AppCtx.Provider value={{ currentRoutine, setCurrentRoutine }}>
      <main>
        <Profile />
        <div className="cards-ctn">
          {data.map((content) => {
            return <Card content={content} />;
          })}
        </div>
      </main>
    </AppCtx.Provider>
  );
}

function Profile() {
  return (
    <section className="profile">
      <div className="person-info">
        <img
          className="profile-image"
          src={require("./images/image-jeremy.png")}
          alt="profile"
        />
        <p className="report">Report for</p>
        <p className="name">Jeremy Robson</p>
      </div>
      <div className="routine">
        <Routine name="Daily" />
        <Routine name="Weekly" />
        <Routine name="Monthly" />
      </div>
    </section>
  );
}

function Routine(props) {
  const ctx = useContext(AppCtx);
  const button = useRef(null);
  const { name } = props;

  useEffect(() => {
    if (name == ctx.currentRoutine)
      button.current.classList.add("routine-active");
    else button.current.classList.remove("routine-active");
  }, [ctx.currentRoutine]);

  return (
    <button
      ref={button}
      className={`${name.toLowerCase()} routine-button`}
      onClick={() => {
        ctx.setCurrentRoutine(name);
      }}
    >
      {name}
    </button>
  );
}

function Card(props) {
  const content = props.content;
  const ctx = useContext(AppCtx);
  const [timeframe, setTimeFrame] = useState(content.timeframes["weekly"]);
  const [previousText, setPreviousText] = useState("Last Week");
  const Icon = content.icon;

  useEffect(() => {
    const routine = ctx.currentRoutine.toLowerCase();
    const time = content.timeframes[routine];
    setTimeFrame(time);

    switch (routine) {
      case "weekly":
        setPreviousText("Last Week");
        break;
      case "monthly":
        setPreviousText("Last Month");
        break;
      case "daily":
        setPreviousText("Last Day");
        break;
      default:
        break;
    }
  }, [ctx.currentRoutine]);

  return (
    // self care card inline background doesn't work without the ternary operator
    <div className="card">
      {content.title !== "Self Care" ? (
        <div
          className="icon-wrapper"
          style={{ background: `var(--color-${content.title.toLowerCase()})` }}
        >
          <Icon />
        </div>
      ) : (
        <div
          className="icon-wrapper"
          style={{ background: "var(--color-self-care)" }}
        >
          <Icon />
        </div>
      )}
      <div className="card-content">
        <h5 className="card-title">{content.title}</h5>
        <p className="dots">...</p>
        <p className="hours">{`${timeframe.current}hrs`}</p>
        <p className="previous">{`${previousText} - ${timeframe.previous}hrs`}</p>
      </div>
    </div>
  );
}

export default App;
