"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* text_contrast function sourced from https://gist.github.com/MadeByMike/8995759. All
credit and rights belong with the original author */
function text_contrast(hexcolor) {
    //parse hex
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexcolor);
    // Convert to RGB value between 0 and 1, and retrieve luminance
    // Alternative methods: (0.2126*R) + (0.7152*G) + (0.0722*B) or (0.299*R + 0.587*G + 0.114*B)
    var L = 0.3 * parseInt(rgb[1], 16) / 255 + 0.59 * parseInt(rgb[2], 16) / 255 + 0.11 * parseInt(rgb[3], 16) / 255;
    console.log(L);
    return L > 0.5 ? "#000" : "#FFF";
}

document.addEventListener('DOMContentLoaded', function () {
    var App = function () {
        function App() {
            _classCallCheck(this, App);

            this.init = this.init.bind(this);
            this.palettes = [{ primary: '#0a8aaa', secondary: '#275a9e', body: 'light' }, { primary: '#b8c2d9', secondary: '#58575c', body: 'light' }, { primary: '#f5b5ee', secondary: '#8480ff', body: 'light' }, { primary: '#c0dfd9', secondary: '#e9ece5', body: 'light' }, { primary: '#c0dfd9', secondary: '#e9ece5', body: 'light' }, { primary: '#fae596', secondary: '#3fb0ac', body: 'light' }, { primary: '#b56969', secondary: '#22264b', body: 'light' }, { primary: '#daad86', secondary: '#98dafc', body: 'light' }, { primary: '#f2efe8', secondary: '#b0aac2', body: 'light' }, { primary: '#62bcfa', secondary: '#6534ff', body: 'light' }, { primary: '#fccdd3', secondary: '#bbc4ef', body: 'light' }, { primary: '#dbc3d0', secondary: '#5e0231', body: 'light' }, { primary: '#e6af4b', secondary: '#e05038', body: 'light' }, { primary: '#c43235', secondary: '#e6e6e8', body: 'light' }];
            this.getPalette = this.getPalette.bind(this);
            this.previousPalette = 1;
        }

        _createClass(App, [{
            key: "init",
            value: function init() {
                var _this = this;

                var logoContainer = document.querySelector('.logo-container');
                var logoFill = document.querySelectorAll('.svg-fill--primary');
                var blurb = document.querySelector('.blurb');
                var social = document.querySelectorAll('.icon');
                this.interval = window.setInterval(function () {
                    var nextColor = void 0;
                    while (!nextColor) {
                        nextColor = _this.getPalette();
                    }
                    logoContainer.style.setProperty('--secondary-next', nextColor.secondary);
                    logoFill.forEach(function (e) {
                        return e.style.setProperty('--primary-next', nextColor.primary);
                    });
                    logoFill.forEach(function (e) {
                        return e.classList.add('transition');
                    });
                    social.forEach(function (e) {
                        return e.classList.add('transition');
                    });
                    blurb.style.color = text_contrast(nextColor.secondary);
                    logoContainer.classList.add('transition');
                    setTimeout(function () {
                        // update --secondary-next to --secondary
                        // let nextColor = logoContainer.style.properties["--secondary-next"];
                        logoContainer.style.setProperty('--secondary', nextColor.secondary);
                        logoFill.forEach(function (e) {
                            return e.style.setProperty('--primary', nextColor.primary);
                        });
                        // set new --secondary-next
                        // remove transition class
                        logoContainer.classList.remove('transition');
                        logoFill.forEach(function (e) {
                            return e.classList.remove('transition');
                        });
                        social.forEach(function (e) {
                            return e.classList.remove('transition');
                        });
                    }, 1200);
                }, 8000);
            }
        }, {
            key: "getPalette",
            value: function getPalette() {
                var randomNumber = Math.floor(Math.random() * this.palettes.length >> 0);
                console.log("previous palette " + this.previousPalette);
                if (randomNumber !== this.previousPalette) {
                    this.previousPalette = randomNumber;
                    return this.palettes[randomNumber];
                } else {
                    this.getPalette();
                }
            }
        }]);

        return App;
    }();

    var app = new App();
    app.init();
});

//# sourceMappingURL=script.js.map