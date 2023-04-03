import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textOne, setTextOne] = useState('');
  const [textTwo, setTextTwo] = useState('');
  const [currentMeme, setCurrentMeme] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.imgflip.com/get_memes`
        );
        console.log(response.data)
        setMemes(response.data.data.memes);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMemes(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log();
    setTextOne('');
    setTextTwo('');
  }

  function handleChangeOne(event) {
    setTextOne(event.target.value);
  }
  function handleChangeTwo(event) {
    setTextTwo(event.target.value);
  }

  function onPrevious() {
    setCurrentMeme(prev => prev-1);
  }

  function onNext() {
    setCurrentMeme(prev => prev+1);
  }

  function onRandom() {
    setCurrentMeme(Math.floor(Math.random() * 100));
  }

  return (
    <div className="page-container">
      <h1>Meme Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label for='above'>Text above: </label>
          <input onChange={handleChangeOne} name='above' type='text' value={textOne}></input><span> Meme text: {textOne}</span>
        </div>
        <div>
        <label for='below'>Text below: </label>
        <input onChange={handleChangeTwo} name='below' type='text' value={textTwo}></input><span> Meme text: {textTwo}</span><br/>
        </div>
        <input type='submit' value='generate'></input>
      </form>
      <div>
        {loading && <span>Loading</span>}
        {memes[currentMeme] && <img src={memes[currentMeme].url} alt=""/>}
      </div>
      <div className='navigation'>
        <div>
          {currentMeme-1 !== -1 && <button onClick={onPrevious}>previous</button>}
          {currentMeme+1 !== 100 &&<button onClick={onNext}>next</button>}
        </div>
        <div>
          <button onClick={onRandom}>random</button>
        </div>
      </div>
    </div>
  );
}

export default App;


/*     {loading && <span>Loading ...</span>}*/