var fs = require('fs');
module.exports = {

registerBand: function (name, genre, callback) {
	if(name == "" || name == " ") return callback(2)
	if(genre == "" || genre == " ") return callback(3);
	var flag = 0;
	fs.readFile('./log.txt', function read(err, data){
		if(err) throw err;
		verifyName(data.toString(), name, function(e){
			if(e==0){
				fs.appendFile("log.txt", "\n" + name + "," + genre);
				return callback(0);
			}else{
				return callback(1);
			}
		});
	});
	return;
}

};

function verifyName(file, word, callback) {
	var flag = false;
	for(var i = 0; i < file.length; i++){
		if(file[i] == "\n" && (i+1) < file.length){
			flag = true;
			continue;
		}
		if(flag){
			var j = i;
			var test ="";
			while(j<file.length && file[j]!= ","){
				test+=file[j];
				j++;
			}
			flag = false;
			// console.log("Parameter Passed:");
			// console.log(typeof(word));
			// console.log("File Passed:");
			// console.log((typeof(test)));
			if(test === word){
				// console.log(word + " == " + test);
				return callback(55);
				// return;
			}else{
				// console.log(word + " != " + test);
			}
		}
	}
	return callback(0);
}



