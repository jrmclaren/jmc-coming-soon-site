/* text_contrast function sourced from https://gist.github.com/MadeByMike/8995759. All
credit and rights belong with the original author */
function text_contrast(hexcolor) {
    //parse hex
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexcolor);
    // Convert to RGB value between 0 and 1, and retrieve luminance
    // Alternative methods: (0.2126*R) + (0.7152*G) + (0.0722*B) or (0.299*R + 0.587*G + 0.114*B)
    var L = (0.3 * parseInt(rgb[1], 16)/255) + (0.59 * parseInt(rgb[2], 16)/255) + (0.11 * parseInt(rgb[3], 16)/255);
    return L > 0.5 ? "#000": "#FFF";
}

document.addEventListener('DOMContentLoaded', () => {

    class App  {
        constructor(){
             this.init = this.init.bind(this);
             this.palettes = [
                 {primary:'#0a8aaa', secondary:'#275a9e'},
                 {primary:'#b8c2d9', secondary:'#58575c'},
                 {primary:'#f5b5ee', secondary:'#8480ff'},
                 {primary:'#c0dfd9', secondary:'#e9ece5'},
                 {primary:'#c0dfd9', secondary:'#e9ece5'},
                 {primary:'#fae596', secondary:'#3fb0ac'},
                 {primary:'#b56969', secondary:'#22264b'},
                 {primary:'#daad86', secondary:'#98dafc'},
                 {primary:'#f2efe8', secondary:'#b0aac2'},
                 {primary:'#62bcfa', secondary:'#6534ff'},
                 {primary:'#fccdd3', secondary:'#bbc4ef'},
                 {primary:'#dbc3d0', secondary:'#5e0231'},
                 {primary:'#e6af4b', secondary:'#e05038'},
                 {primary:'#c43235', secondary:'#e6e6e8'},
                 {primary: '#fefefe', secondary: '#404040'}
                 ];
             this.getPalette = this.getPalette.bind(this);
             this.previousPalette = 1;
        }

        init() {
        const logoContainer = document.querySelector('.logo-container');
        const logoFill = document.querySelectorAll('.svg-fill--primary');
        const blurb = document.querySelector('.blurb');
        const social = document.querySelectorAll('.icon');
          this.interval = window.setInterval( () => {
              let nextColor;
              while(!nextColor){
                  nextColor = this.getPalette();
              }
              logoContainer.style.setProperty('--secondary-next', nextColor.secondary);
              logoFill.forEach( e => ( e.style.setProperty('--primary-next', nextColor.primary)));
              logoFill.forEach( e => ( e.classList.add('transition')));
              social.forEach( e => e.classList.add('transition'));
              blurb.style.color = text_contrast(nextColor.secondary);
              logoContainer.classList.add('transition');
          setTimeout( () => {
                // update --secondary-next to --secondary
                // let nextColor = logoContainer.style.properties["--secondary-next"];
                logoContainer.style.setProperty('--secondary', nextColor.secondary);
                logoFill.forEach( e => ( e.style.setProperty('--primary', nextColor.primary)));
                    // set new --secondary-next
                    // remove transition class
                logoContainer.classList.remove('transition');
                logoFill.forEach( e => e.classList.remove('transition'));
                social.forEach( e => e.classList.remove('transition'));
                }, 1200);
          }, 10000);
        }

        getPalette(){
            let randomNumber = Math.floor(Math.random() * this.palettes.length>>0);
            if( randomNumber !== this.previousPalette ){
                this.previousPalette = randomNumber;
                return this.palettes[randomNumber];
            } else {
                this.getPalette();
            }
        }
    }
    let app = new App;
    app.init();
});