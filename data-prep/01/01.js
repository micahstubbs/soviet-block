var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');

var inputFile = "cshapes.geojson"
var data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

//console.log(data);
var type = data['type'];

var sample = data['features'][0]['properties'];

var sovietBlocCountries = [
	"Albania",
	"Bulgaria",
	"Czechoslovakia",
	"East Germany",
	"Hungary",
	"Poland",
	"Romania",
	"Soviet Union"
]

var sovietUnionCountries = [
	"Armenia",
	"Azerbaijan",
	"Belarus",
	"Estonia",
	"Georgia",
	"Kazakhstan",
	"Kyrgyzstan",
	"Latvia",
	"Lithuania",
	"Moldova",
	"Russia",
	"Tajikstan",
	"Turkmenistan",
	"Ukraine",
	"Uzebekistan"
]

var COWSovietBlocCountries = [
	"Albania",
	"Bulgaria",
	"Czech Republic",
  "Czechoslovakia",
  "German Democratic Republic",
  "Germany",
  "Hungary",
  "Poland",
  "Romania",
  "Union of Soviet Socialist Republics",
  "Armenia",
	"Azerbaijan",
	"Belarus",
	"Estonia",
	"Georgia",
	"Kazakhstan",
	"Kyrgyzstan",
	"Latvia",
	"Lithuania",
	"Moldova",
	"Russian Federation",
	"Tajikistan",
	"Turkmenistan",
	"Ukraine",
	"Uzbekistan"
]

data['features'] = data['features'].filter(function(d) {
	return COWSovietBlocCountries.indexOf(d['properties']['ISONAME']) !== -1;
})


data['features'] = data['features'].filter(function(d) {
	return d['properties']['COWSYEAR'] <= 1959 && 
				 d['properties']['COWEYEAR'] >= 1959;
})


var countries = data['features'].map(function(d,i){
	return {
		"ISONAME": d['properties']['ISONAME'],
		"ISO1NUM": d['properties']['ISO1NUM'],
  	"ISO1AL2": d['properties']['ISO1AL2'],
  	"ISO1AL3": d['properties']['ISO1AL3']
	}
})

var uniqueCountries = _.uniq(countries.map(function(d) { return d['ISONAME'] }))
uniqueCountries = uniqueCountries.sort();
//console.log(data);

var outputData = data;
var outputFile = "sovietBloc.geojson";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, outputData, function (err) {
  console.error(err)
})
