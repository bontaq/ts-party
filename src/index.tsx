import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from './App';

const rootEl = document.getElementById("root");
ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootEl
)

if (module.hot) {
    console.log("hot!");
    module.hot.accept('./App', () => {
        console.log('doing an accept')
        const NextApp = require<RequireImport>('./App').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        )
    });
}
