import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Home from './Components/HomeScreen';
import TestScreen from './Components/TestScreen';
function App() {

  const [homeClear,setHomeClear] = useState(false);
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState(null);	
  const [homeInfo, setHomeInfo] = useState(null);
  useEffect(() => {
    fetch('subjective_test_config.json')
        .then(response => response.json())
        .then(data => {
          setData(data)
          setQuestions(data.questions)
          setHomeInfo(data.homeInfo)
        })
        .catch(error => console.error(error));
  }, []);

  if (data === null) {
      return <div>Loading...</div>;
  }
  return (
    <div className="App flex items-center content-center justify-center pt-8">
      {homeClear? <TestScreen questions={questions}/>:  <Home setHomeClear={setHomeClear} homeInfo={homeInfo}/>}
    </div>
  );
}

export default App;
