# Image Transitions with D3 + Primitive

[D3.js](https://d3js.org/) does magic with svgs, and [Primitive](https://github.com/fogleman/primitive) transforms images into svgs. Put them together and you can turn Kevin Bacon into Francis Bacon:

![Sample Image Transition](https://raw.githubusercontent.com/duhaime/d3-image-transitions/master/readme/image-transitions.gif)

This repo contains a simple Python utility that transforms each image in a directory to an svg, and then transforms each of those svg's into json. It also contains a basic index.html and visualization script so others can create transitions between images like the one shown above.

## Dependencies

To use this code, you'll need to have the Go programming language (aka 'golang') and [Primitive](https://github.com/fogleman/primitive) installed on your machine. If you're on OSX, you can test if they're installed by typing: `which primitive` into a terminal. If that command returns and displays a path in your terminal, you should be good to go.

### Usage

To transform each of the included sample images to svg elements and then to json for consumption by d3, you can run:

```
python get-image-json.py 'input-images/*'
```

This will create one svg and one json file in the `output` directory for each input image in `input-images`.

Then you only need to verify that the `inputs` variable in `draw.js` contains each of the images you want to include in the transition:

```
var inputs = [
  'output/kevin-bacon.json',
  'output/francis-bacon.json'
]
```

Once that's set, just start a webserver on port 7000:

```
# if you have Python 3 installed
python -m http.server 7000 

# if you have Python 2 installed
python -m SimpleHTTPServer 7000
```

Then open a browser to `localhost:7000`. If you click on the page, you should see the images transition. Voila!