const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/assets/face.png')
    .pipe(new PNG())
    .on('parsed', function () {
        let transparentPixels = 0;
        let opaquePixels = 0;
        let checkerboardPixels = 0;

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                const r = this.data[idx];
                const g = this.data[idx + 1];
                const b = this.data[idx + 2];
                const a = this.data[idx + 3];

                if (a < 255) {
                    transparentPixels++;
                } else {
                    opaquePixels++;
                    // Check for grey/white checkerboard colors
                    // Often 204 (0xCC) or 255 (0xFF)
                    if ((r === 204 && g === 204 && b === 204) ||
                        (r === 255 && g === 255 && b === 255)) {
                        checkerboardPixels++;
                    }
                }
            }
        }

        console.log(`Total pixels: ${this.width * this.height}`);
        console.log(`Transparent pixels (alpha < 255): ${transparentPixels}`);
        console.log(`Opaque pixels: ${opaquePixels}`);
        console.log(`Potential checkerboard pixels: ${checkerboardPixels}`);

        if (transparentPixels === 0) {
            console.log("CONCLUSION: Image has NO transparency.");
        } else {
            console.log("CONCLUSION: Image HAS transparency.");
        }
    });
