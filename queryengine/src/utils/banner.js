const cf = require('cfonts')
const package = require('../../package.json')
const gradient = require('gradient-string');
const pad = require("pad")
const os = require("os")
const vars = require("../config/config")


const _default = {
	font: 'chrome',              // define the font face
	align: 'left',              // define text alignment
	colors: ['#ff3838', 'green'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 0,           // define letter spacing
	lineHeight: 0.1,              // define the line height
	space: false,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	gradient: ['#a29bfe', '#B33771', '#e17055'],            // define your two gradient colors
	independentGradient: false, // define if you want to recalculate the gradient for each new line
	transitionGradient: true,  // define if this is a transition between colors directly
	env: 'node'                 // define the environment CFonts is being executed in
}

const tiny = {
	font: 'tiny',              // define the font face
	align: 'left',              // define text alignment
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,           // define letter spacing
	lineHeight: 1,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	gradient: ['#a29bfe', '#B33771', '#e17055'],            // define your two gradient colors
	independentGradient: false, // define if you want to recalculate the gradient for each new line
	transitionGradient: true,  // define if this is a transition between colors directly
	env: 'node'                 // define the environment CFonts is being executed in
}

const g = gradient([
	'#a29bfe',
	'#B33771',
	'#e17055',
]);

const showBanner = () => {
	cf.say(`==================================`, _default)
	cf.say(` ${package.name}  ${package.version}`, tiny);
	cf.say(`==================================`, _default)
	console.log(g(`${pad('About :', 18)}${package.description}`));
	console.log(g(`${pad('Author :', 18)}${package.author}`));
	console.log(g(`${pad('License :', 18)}${package.license}`));
	console.log(g(`${pad('Node :', 18)}v${process.versions.node}`));
	console.log(g(`${pad('Host:', 18)}${os.hostname()}`));
	console.log(g(`${pad('Environment:', 18)}${vars.env}`));
	console.log(g(`${pad('MongoDB URL:', 18)}${vars.mongoose.url}`));
	console.log(g(`${pad('Listener Port:', 18)}${vars.port}`));
	cf.say(`==================================`, _default)

}
module.exports = showBanner