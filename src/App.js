import { useState, useEffect } from 'react';
import './App.css';
import domtoimage from 'dom-to-image';
import axios from 'axios';

function App() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textOne, setTextOne] = useState('');
  const [textTwo, setTextTwo] = useState('');
  const [currentMeme, setCurrentMeme] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.imgflip.com/get_memes`
      );
      console.log(response.data)
      console.log(response.data.data.memes)
      setMemes(response.data.data.memes);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMemes(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log();
    axios.post(
			"https://api.imgflip.com/caption_image",
			{
				form: {
					template_id: '181913649',
					username: 'USERNAME',
					password: 'PASSWORD',
					text0: 'text0',
					text1: 'text1',
				},
			}
		)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setTextOne('');
    setTextTwo('');
  }

  function handleChangeOne(event) {
    setTextOne(event.target.value.toUpperCase());
  }

  function handleChangeTwo(event) {
    setTextTwo(event.target.value.toUpperCase());
  }

  function onPrevious() {
    getData();
    setCurrentMeme(prev => prev-1);
    setTextOne('');
    setTextTwo('');
  }

  function onNext() {
    getData();
    setCurrentMeme(prev => prev+1);
    setTextOne('');
    setTextTwo('');
  }

  function onRandom() {
    getData();
    setCurrentMeme(Math.floor(Math.random() * 100));
    setTextOne('');
    setTextTwo('');
  }

  function onUpload() {
    if(document.getElementById('input').files[0]) {
    const fileURL = URL.createObjectURL(document.getElementById('input').files[0]);
    console.log(fileURL);
    setMemes([{url: fileURL}]);
    }
  }

  function onDownload() {
    domtoimage.toJpeg(document.getElementById('meme'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-meme.jpeg';
        link.href = dataUrl;
        link.click();
    });
  }

  return (
    <div className="page-container">
      <h1>Meme Generator</h1>

      <form onSubmit={handleSubmit}>
        <div className='text-input'>
          <label htmlFor='above'>Text above: </label>
          <input onChange={handleChangeOne} name='above' type='text' value={textOne}></input>
        </div>
        <div className='text-input'>
         <label htmlFor='below'>Text below: </label>
          <input onChange={handleChangeTwo} name='below' type='text' value={textTwo}></input><br/>
        </div>
        <input type='submit' value='generate'></input>
      </form>

      <div className='interaction'>
        <div className='upload'>    
          <label for="file-upload" class="custom-file-upload" >
            Upload your own template:
            <br/>
            <input name='file-upload' type="file" id="input" multiple />
          </label>
          <button onClick={onUpload}>upload</button>
        </div>

        <div className='download'>
          <label for="file-download" class="custom-file-download" >
            Download your meme:
            <br/>
            <button  onClick={onDownload} name='file-download'>download</button>
          </label>    
        </div>
      </div>

      {loading && <span>Loading</span>}
        {memes[currentMeme] && <div className='border'>
        <div className='meme' id='meme'>
          <img src={memes[currentMeme].url} alt=''/>
          <div className='overlay'>
          <span className='text'>{textOne}</span>
          <span className='text'>{textTwo}</span>
          </div>
        </div>
        </div>}

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