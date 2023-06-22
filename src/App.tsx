import { Container } from "./components";
import "./style.scss";
import githubMark from "./assets/github-mark.svg";


function App() {
    return (
        <>
            <div className="flex">
                <h1>Simple Logo Generator</h1>
            </div>
            <Container />
            <div className="contribution flex">
                <div>
                    <span className="small">
                        If you've found any defects, please report it at
                    </span>
                    <br />
                    <span className="small">
                        If you're willing to contribute this project, visit
                    </span>
                </div>
                <a
                    href="https://github.com/KaoruNishikawa/SimpleLogoGenerator"
                    target="_blank"
                >
                    <img className="git-link" src={githubMark} />
                </a>
            </div>
        </>
    );
}

export { App as default };
