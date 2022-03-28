import './App.css';
import { firebaseapp } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import Form from './components/common/Form'
function App() {
  return (
    <div className="App">
      <Form/>
    </div>
  );
}

export default App;
