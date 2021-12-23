import "./App.css";
import {
  useEffect,
  useState,
  useReducer,
  useContext,
  createContext,
} from "react";
import { ReactComponent as DollarSVG } from "./images/icon-dollar.svg";
import { ReactComponent as PersonSVG } from "./images/icon-person.svg";

const initialState = {
  currentTip: {
    elem: null,
    value: null,
  },
  numOfPeople: 0,
  bill: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "tip":
      return { ...state, currentTip: action.payload };
    case "bill":
      return { ...state, bill: action.payload };
    case "numOfPeople":
      return { ...state, numOfPeople: action.payload };
    case "reset": {
      if (state.currentTip.elem) {
        state.currentTip.elem.classList.remove("tip-btn-clicked");
        state.currentTip.value = null;
      }
      return { ...state, numOfPeople: 0, bill: 0 };
    }
    default:
      break;
  }
};

const TipCtx = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [calc, setCalc] = useState({
    tipAmount: 0,
    total: 0,
  });

  const moveInputCursor = (e) => {
    const len = e.target.value.length;
    e.target.setSelectionRange(len - 1, len - 1);
  };

  const setTip = (e, text) => {
    if (state.currentTip.elem !== null) {
      state.currentTip.elem.classList.remove("tip-btn-clicked");
    }
    dispatch({
      type: "tip",
      payload: {
        elem: e.target,
        value: parseInt(text) / 100,
      },
    });
    e.target.classList.add("tip-btn-clicked");
  };

  useEffect(() => {
    if (
      state.currentTip.value !== null &&
      state.bill !== 0 &&
      state.numOfPeople !== 0
    ) {
      const tip = state.bill * state.currentTip.value;
      const total = (state.bill + tip) / state.numOfPeople;
      setCalc({
        tipAmount: tip / state.numOfPeople,
        total: total,
      });
    }
  }, [state]);

  return (
    <TipCtx.Provider value={{ state, dispatch }}>
      <header>
        spli<br></br>tter
      </header>
      <main className="page-ctn">
        <section className="spliter">
          <AppInput name="Bill" Icon={DollarSVG} type="bill" />
          <article className="tip-ctn">
            <h5 className="tip-title">Select Tip %</h5>
            <div className="btns-ctn">
              {[5, 10, 15, 25, 50].map((tip) => {
                return (
                  <button
                    onClick={(e) => setTip(e, e.target.textContent)}
                    className="tip-btn"
                  >
                    {tip}%
                  </button>
                );
              })}
              <input
                onBlur={(e) => {
                  if (isNaN(parseInt(e.target.value))) e.target.value = "0%";
                  setTip(e, e.target.value);
                }}
                onFocus={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "%";
                  }
                  setTip(e, e.target.value);
                  moveInputCursor(e);
                }}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value <= 100) {
                    e.target.value = value + "%";
                  } else if (isNaN(value)) e.target.value = "%";
                  else e.target.value = "100%";
                  setTip(e, e.target.value);
                  moveInputCursor(e);
                }}
                placeholder="Custom"
                className="tip-btn-input"
              />
            </div>
          </article>
          <AppInput
            name="Number of People"
            Icon={PersonSVG}
            type="numOfPeople"
          />
        </section>
        <section className="result">
          <Price title="Tip Amount" value={calc.tipAmount} />
          <Price title="Total" value={calc.total} />
          <button
            onClick={() => {
              dispatch({ type: "reset" });
              const inputs = document.getElementsByTagName("input");
              const prices = document.querySelectorAll(".price");
              [...inputs].forEach((input) => {
                input.value = "";
              });
	      // price bug
            }}
            className="reset"
          >
            reset
          </button>
        </section>
      </main>
    </TipCtx.Provider>
  );
}

function AppInput(props) {
  const { name, Icon, type } = props;
  const { state, dispatch } = useContext(TipCtx);

  return (
    <div className="input-wrapper">
      <label className="input-text">{name}</label>
      <Icon />
      <input
        className="app-input"
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) {
            e.target.value = name === "Bill" ? state.bill : state.numOfPeople;
          } else dispatch({ type: type, payload: Number(e.target.value) });
        }}
        type="text"
        maxLength="10"
      />
    </div>
  );
}

function Price({ title, value }) {
  return (
    <div className="price-wrapper">
      <h5 className="title">
        {title}
        <p className="person"> / person</p>
      </h5>
      <h3 className="price">${value.toFixed(2)}</h3>
    </div>
  );
}

export default App;
