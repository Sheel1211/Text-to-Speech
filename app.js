//Initialisation of SpeechSynth API
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
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
const speak=()=>{
    //Check if speaking
    if(synth.speaking){
        console.error('Already speaking...');
        return;
    }

    if(textInput.value !== ''){
        //Get textbox text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end
        speakText.onend = e=>{
            console.log("Done Speaking");
        }

        //Speak error

        speakText.error = e=>{
            console.error("Something went wrong");
        }

        //Selected voice 
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop through voices

        voices.forEach(voice=>{
            if(voice.name===selectedVoice){
                speakText.voice = voice;
            }
        });

        //Setting pitch and rate
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

        //Speak
        synth.speak(speakText);

    }
};

//Setting event listeners

//text form submit

textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change

rate.addEventListener('change',e=>rateValue.textContent=rate.value);

//pitch value change

pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);

//Voice select change
voiceSelect.addEventListener('change',e=>speak());