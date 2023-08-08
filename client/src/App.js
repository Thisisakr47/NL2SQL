import './App.css';
import Form from './Components/Form';

import ListAll from "./Components/ListAll";
import ListAllTables from './Components/ListAllTables';

function App() {
  return (
    <div className="container">
        <ListAllTables/>
        <ListAll/>
        <Form/>
    </div>
  );
}

export default App;
