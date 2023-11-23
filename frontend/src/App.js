// router
import {BrowserRouter, Routes, Route} from "react-router-dom";

//page list
import { TasksList } from "./components/TasksList";
import { TasksCreate } from "./components/TasksCreate";

// import the library
import { library } from '@fortawesome/fontawesome-svg-core'
// icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
function App() {
  return (
     <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/insert" element={<TasksCreate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
library.add(fab, fas, far)