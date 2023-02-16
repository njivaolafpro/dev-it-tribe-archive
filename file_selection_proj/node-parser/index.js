const path = require('node:path');
const folderPath = path.resolve('../web/ranges_hrc_images_partielles/ranges hrc images partielles/');

const fs = require('fs');

fs.readdir(folderPath, (err, files) => {
    if (err){
        throw err;
    }
    console.log(files);
    fs.writeFile('../web/images.generated.json', JSON.stringify(files), 'utf8', ()=>{});
});

  