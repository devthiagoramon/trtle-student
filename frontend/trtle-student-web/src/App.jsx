import "./App.css";
import Layout from "./components/Layout";
import ListGrid from "./components/ListGrid";
import { ListProvider } from "./context/listContext";

function App() {
  return (
    <>
      <ListProvider>
        <Layout>
          <ListGrid />
        </Layout>
      </ListProvider>
    </>
  );
}

export default App;
