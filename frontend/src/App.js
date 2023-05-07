import {Routes, Route} from 'react-router-dom'
import {LoginPage} from './pages/Login'
import {SignUpPage} from './pages/Signup'
import {HomePage} from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>
    // <div className="App">
    //   <h1>Welcome, User</h1>
    //   <h4>Your Tasks</h4>

    //   <div className="todos">
    //     <div className="todo">
    //       <div className="checkbox"></div>
    //       <div className="text">Go to bed</div>
    //       <div className="delete-todo">X</div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
