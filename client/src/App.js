import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Todo from './components/Todo';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <div className="Todo-header">
          <h1>TODO : </h1>
        </div>
        
        <div className="Todo-content">
          <Todo></Todo>
        </div>
      </header>
    </div>
  );
}

export default App;
