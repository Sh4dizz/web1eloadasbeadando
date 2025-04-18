const { useState } = React;

// Calculator Component
function Calculator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (val) => {
        if (val === "C") {
            setInput("");
            setResult("");
        } else if (val === "=") {
            try {
                // eslint-disable-next-line no-eval
                const res = eval(input);
                setResult(res);
            } catch {
                setResult("Hiba");
            }
        } else {
            setInput(input + val);
        }
    };

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "C", "+",
        "="
    ];

    return (
        <div className="container py-4">
            <h2>Számológép</h2>
            <div className="card p-3 mx-auto" style={{ maxWidth: 320 }}>
                <input className="form-control mb-2 text-end" value={input} readOnly />
                <input className="form-control mb-3 text-end" value={result} readOnly placeholder="Eredmény" />
                <div className="row g-2">
                    {buttons.map((b, i) => (
                        <div className="col-3" key={i}>
                            <button
                                className={`btn ${b === "=" ? "btn-success" : b === "C" ? "btn-danger" : "btn-secondary"} w-100`}
                                onClick={() => handleClick(b)}
                            >{b}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// TicTacToe Component
function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function winner(sq) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let [a, b, c] of lines) {
            if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
        }
        return null;
    }

    const win = winner(squares);
    const draw = !win && squares.every(Boolean);

    function handleClick(i) {
        if (squares[i] || win) return;
        const next = squares.slice();
        next[i] = xIsNext ? "X" : "O";
        setSquares(next);
        setXIsNext(!xIsNext);
    }

    function reset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    return (
        <div className="container py-4">
            <h2>Tic-Tac-Toe</h2>
            <div className="card p-3 mx-auto" style={{ maxWidth: 320 }}>
                <div className="mb-3 text-center">
                    {win ? <b>Győztes: {win}</b> : draw ? <b>Döntetlen!</b> : <span>Következő: {xIsNext ? "X" : "O"}</span>}
                </div>
                <div className="d-flex flex-wrap" style={{ width: 180 }}>
                    {squares.map((sq, i) => (
                        <button key={i} className="btn btn-outline-primary m-1"
                            style={{ width: 56, height: 56, fontSize: 24 }}
                            onClick={() => handleClick(i)}
                        >{sq}</button>
                    ))}
                </div>
                <button className="btn btn-secondary mt-3 w-100" onClick={reset}>Új játék</button>
            </div>
        </div>
    );
}

// SPA App
function App() {
    const [page, setPage] = useState("calc");
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "nav",
            { className: "navbar navbar-expand navbar-dark bg-primary" },
            React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement("span", { className: "navbar-brand" }, "React SPA"),
                React.createElement(
                    "ul",
                    { className: "navbar-nav flex-row" },
                    React.createElement(
                        "li",
                        { className: "nav-item me-2" },
                        React.createElement(
                            "button",
                            {
                                className: `nav-link btn btn-link${page === "calc" ? " active" : ""}`,
                                onClick: () => setPage("calc")
                            },
                            "Számológép"
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: "nav-item" },
                        React.createElement(
                            "button",
                            {
                                className: `nav-link btn btn-link${page === "ttt" ? " active" : ""}`,
                                onClick: () => setPage("ttt")
                            },
                            "Tic-Tac-Toe"
                        )
                    )
                )
            )
        ),
        page === "calc"
            ? React.createElement(Calculator, null)
            : React.createElement(TicTacToe, null)
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
