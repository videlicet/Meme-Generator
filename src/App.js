import { useState, useEffect } from 'react';
import './App.css';
import domtoimage from 'dom-to-image';
import axios from 'axios';

//import { username, password } from './credentials';

function App() {
    const [memes, setMemes] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [text, setText] = useState({});
    const [currentMeme, setCurrentMeme] = useState(0);
    const [customMeme, setCustomMeme] = useState();

    const getData = async () => {
        try {
            const response = await axios.get(
                `https://api.imgflip.com/get_memes`
            );
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

    function textReplacer() {
        let replacer = {};
        for (let i = 0; i < Object.keys(text).length; i++) {
            replacer[i] = '';
        }
        setText(replacer);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let postOptions = {
            template_id: memes[currentMeme].id,
            username: process.env.REACT_APP_USERNAME, //|| username
            password: process.env.REACT_APP_PASSWORD, // || password
            font: 'impact',
        };
        for (let i = 0; i < Object.keys(text).length; i++) {
            postOptions[`text${i}`] = text[i];
        }
        textReplacer();
        axios
            .post('https://api.imgflip.com/caption_image', postOptions, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(function (response) {
                let { data } = JSON.parse(response.request.response);
                setCustomMeme(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleChange(index, event) {
        setText({ ...text, [index]: event.target.value.toUpperCase() });
    }

    function onPrevious() {
        getData();
        setCurrentMeme((prev) => prev - 1);
        setCustomMeme();
        textReplacer();
    }

    function onNext() {
        getData();
        setCurrentMeme((prev) => prev + 1);
        setCustomMeme();
        textReplacer();
    }

    function onRandom() {
        getData();
        setCurrentMeme(Math.floor(Math.random() * 100));
        setCustomMeme();
        textReplacer();
    }

    function onUpload() {
        if (document.getElementById('input').files[0]) {
            const fileURL = URL.createObjectURL(
                document.getElementById('input').files[0]
            );
            setMemes([{ url: fileURL, box_count: 2 }]);
        }
    }

    function onDownload() {
        domtoimage
            .toJpeg(document.getElementById('meme'), { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-meme.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

    function printBoxes(number) {
        let array = [];
        for (let i = 1; i <= number; i++) {
            array.push('box' + i);
        }
        return array;
    }

    if (memes)
        return (
            <div className="page-container">
                <h1>Meme Generator</h1>

                <form onSubmit={handleSubmit}>
                    {printBoxes(memes[currentMeme].box_count).map(
                        (element, index) => (
                            <div className="text-input">
                                <label htmlFor="above">
                                    Textbox {index + 1}:{' '}
                                </label>
                                <input
                                    onChange={(event) =>
                                        handleChange(index, event)
                                    }
                                    name="above"
                                    type="text"
                                    value={text[index]}></input>
                            </div>
                        )
                    )}
                    <input
                        type="submit"
                        value="generate"
                        style={{ width: '5rem' }}></input>
                </form>
                <div className="interaction-container">
                    <div className="interaction">
                        <div className="upload">
                            <label for="file-upload" class="custom-file-upload">
                                Upload your own template:
                                <br />
                                <br />
                                <input
                                    name="file-upload"
                                    type="file"
                                    id="input"
                                    multiple
                                />
                            </label>
                            <button onClick={onUpload}>upload</button>
                        </div>
                    </div>

                    <div className="interaction">
                        <div className="download">
                            <label
                                for="file-download"
                                class="custom-file-download">
                                Download your meme:
                                <br />
                                <br />
                                <button
                                    onClick={onDownload}
                                    name="file-download">
                                    download
                                </button>
                            </label>
                        </div>
                    </div>
                </div>

                {loading && <span>Loading</span>}
                {memes[currentMeme] && (
                    <div className="border">
                        <div className="meme" id="meme">
                            <img
                                src={customMeme?.url || memes[currentMeme].url}
                                alt=""
                            />
                            {memes[currentMeme].box_count === 2 && (
                                <div className="overlay">
                                    <span className="text">{text[0]}</span>
                                    <span className="text">{text[1]}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {memes[currentMeme + 1] && (
                    <div className="navigation">
                        <div>
                            {currentMeme - 1 !== -1 && (
                                <button onClick={onPrevious}>previous</button>
                            )}
                            {currentMeme + 1 !== 100 && (
                                <button onClick={onNext}>next</button>
                            )}
                        </div>
                        <div>
                            <button onClick={onRandom}>random</button>
                        </div>
                    </div>
                )}

                {!memes[currentMeme + 1] && (
                    <div className="navigation">
                        <div>
                            <a href="/">
                                <button>back</button>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        );
}

export default App;