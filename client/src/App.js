import './App.css';
import Form from './Components/Form';

import ListAll from "./Components/ListAll";
import ListAllTables from './Components/ListAllTables';
import Details from './Components/Details';

function App() {

  return (
    <div className="container">
        <ListAllTables/>
        <ListAll/>
        <Form/>
        <Details/>
    </div>
  );
}

export default App;
