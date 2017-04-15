from bs4 import BeautifulSoup
import json, sys, os, glob, subprocess, shlex

def img_to_svg(img):
  '''Read in the path to an image and use tfogelman/primitive
  to transform that image into an svg'''
  basename = os.path.basename(img)
  new_name = os.path.splitext(basename)[0] + '.svg'
  out_file = os.path.join(output_directory, new_name)
  call =  'primitive -i ' + img 
  call += ' -o ' + out_file
  call += ' -r ' + str(size)
  call += ' -s ' + str(size)
  call += ' -n 300' 
  call += ' -m 4'

  print(' * running', call)
  subprocess.call(shlex.split(call))
  return out_file

def svg_to_json(svg):
  '''Read in the path to an svg and write json for that svg to disk'''
  filename = os.path.basename(svg)
  data = {
    'svg': {},
    'group': {},
    'rect': {},
    'points': [],
    'name': filename
  }

  with open(svg) as f:
    f = f.read()
    soup = BeautifulSoup(f, 'lxml')

    svg_elem = soup.find('svg')
    data['svg'] = {
      'width': svg_elem['width'],
      'height': svg_elem['height']
    }

    group = soup.find('g')
    data['group'] = {
      'transform': group['transform']
    } 

    rect = soup.find('rect')
    data['rect'] = {
      'x': rect['x'],
      'y': rect['y'],
      'width': rect['width'],
      'height': rect['height'],
      'fill': rect['fill']
    }

    point_attributes = ['fill', 'fill-opacity', 'cx', 'cy', 'rx', 'ry']
    points = soup.find_all('ellipse')
    for i in points:
      observation = {}
      for a in point_attributes:
        observation[a] = i[a]
      data['points'].append(observation)

  output_filename = filename.replace('.svg', '.json')
  outfile = os.path.join(output_directory, output_filename)
  with open(outfile, 'w') as out:
    json.dump(data, out)

if __name__ == '__main__':
  output_directory = 'output'
  size = 700
  svgs = []
  input_images = glob.glob(sys.argv[1])

  for i in input_images:
    svgs.append(img_to_svg(i))

  for i in svgs:
    print(' * creating json for', i)
    svg_to_json(i)
