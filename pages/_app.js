import "../styles/globals.css";
import { PlayerProvider } from "../PlayerProvider";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <Component {...pageProps} />
    </PlayerProvider>
  );
}

export default MyApp;
