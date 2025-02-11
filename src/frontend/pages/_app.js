import '../styles/globals.css';
import BottomNavigation from '../components/BottomNavigation';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <BottomNavigation />
    </div>
  );
}

export default MyApp;
