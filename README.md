# Meme Generator (Study Project)

A meme generator that let's you put your own text on classic memes.

## How to Use
1. Type your text into the corresponding textbox inputs.
2. Click <b>download</b> to download the image as previewed (best for meme formats with two text boxes in the iconic top-bottom pattern, see Caveats). 
    
    Or: 
    
    Click <b>generate</b> to generate a meme according to its respective text-box-pattern (see Caveats).
3. Click <b>upload</b> to upload your own meme template and repeat steps 1 and 2 (this will only work well with meme formats with two text boxes in the iconic top-bottom pattern).  

## Caveats

Due to limitations of the Meme Generator API, this meme generator only provides a preview for memes with two text boxes in the iconic top-bottom pattern.

For memes with more than two text boxes or two with off-pattern placement, please use the <b>generate button</b> to see an accurate (but static) result. 
    
(Two-text box images with off-placement will have a preview with off-placed text boxes.)

## Ho to Set Up

Make sure to provide the username and password from your own <a href= https://imgflip.com/api> imgflip account</a> to a `credentials.js` file as shown in the `credentials (example).js` file if you want to use the generate button function.

## Acknowledgements

Built with:
* JavaScript, HTML5, CSS3
* <a href="https://imgflip.com/api" target="_blank">Meme Generator API</a>
