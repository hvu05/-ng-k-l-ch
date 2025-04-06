import './App.css';
import { database } from './firebase'; // ✅ đúng đường dẫn
import { ref, child, get } from "firebase/database";

function App() {
  const dbRef = ref(database);
  get(child(dbRef, `user`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Firebase connected!</p>
      </header>
    </div>
  );
}

export default App;
