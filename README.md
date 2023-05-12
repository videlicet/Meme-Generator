# Meme Generator (Study Project)

A meme generator that let's you put your own text on classic memes.

[![Netlify Status](https://api.netlify.com/api/v1/badges/073620b0-e979-41b7-9fb6-15b8192a002f/deploy-status)](https://app.netlify.com/sites/meme-generator-videlicet/deploys)

Site down? Let me know it!

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

Make sure to provide the username and password from your own <a href= https://imgflip.com/api> imgflip account</a> to a `.env` file as shown in the `.env (example)` file if you want to use the generate button function.

## Acknowledgements

Built with:
* JavaScript, HTML5, CSS3
* <a href="https://imgflip.com/api" target="_blank">Meme Generator API</a>
