import { render } from "solid-js/web";
import "./index.css";
import App from "./app";

const rootElement = document.getElementById("root");
if (rootElement) {
  render(() => <App />, rootElement);
} else {
  throw new Error("Root element not found");
}
