//Initialisation of SpeechSynth API
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('pitch');
const pitchValue = document.querySelector('#pitch-value');


//Init voices array

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    //Loop through voices and filling select listStyle: 
    voices.forEach(voice=>{
        const option = document.createElement('option');

        //filling options with voice and languge

        option.textContent = voice.name + '('+voice.lang+')';

        //Setting needed option attributes

        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);

        voiceSelect.appendChild(option);

    })

}

getVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//Speak function initialisation
