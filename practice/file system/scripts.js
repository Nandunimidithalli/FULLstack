//Prog to read file data and display the contents

const fs = require('fs');
fs.readFile('text.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});


                                    
//Prog to read file data synchronously and display the contents

try {
  const data = fs.readFileSync('text.txt', 'utf8');
  console.log(data); 
} catch (err) {
  console.error(err);
}

// prgm to read file data asynchronously nd displai the contect

const content = 'This is new content for the file.';
fs.writeFile('newfile.txt', content, err => {
  if (err) throw err;
  console.log('File has been saved!');
});
