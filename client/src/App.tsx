
import './App.css';
import Footer from './components/footer/footer';
import NavBar from './components/navBar/navBar';
import AppRouter from './routes/appRouter';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
