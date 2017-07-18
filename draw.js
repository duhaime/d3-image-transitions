(function() {
  var inputs = [
    'output/kevin-bacon.json',
    'output/francis-bacon.json'
  ]

  var inputIndex = 0,
      width = 700,
      height = 700;

  var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height);

  svg.append('rect')
      .attr('class', 'rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 0)
      .attr('height', 0)
      .attr('fill', '#fff');

  svg.append('g')
      .attr('class', 'points-container');

  var initialize = function() {
    d3.json(inputs[inputIndex], function(error, data) {
      if (error) throw error;

      svg.selectAll('.dot')
          .data(data.points)
        .enter().append('ellipse')
          .attr('class', 'dot')
          .attr('rx', 0.5)
          .attr('ry', 0.5)
          .attr('cx', function() {return Math.random() * width})
          .attr('cy', function() {return Math.random() * height})
          .style('fill', '#fff')
    });

    transition();
  }

  var changeScene = function() {
    inputIndex = (inputIndex + 1) % inputs.length;
    transition()
  }

  var transition = function() {
    d3.json(inputs[inputIndex], function(error, data) {
      if (error) throw error;

      d3.select('svg')
        .transition()
        .duration(1000)
          .attr('width', data.svg.width)
          .attr('height', data.svg.height)

      d3.select('rect')
        .transition()
        .duration(1000)
          .attr('width', data.rect.width)
          .attr('height', data.rect.height)
          .attr('fill', data.rect.fill)

      d3.select('.points-container')
        .attr('transform', data.group.transform)

      d3.select('body').selectAll('.dot')
          .data(data.points)
        .transition()
          .duration(1000)
          .delay(function(d, i) {return i*3})
          .attr('rx', function(d) { return d.rx })
          .attr('ry', function(d) { return d.ry })
          .attr('cx', function(d) { return d.cx })
          .attr('cy', function(d) { return d.cy })
          .style('fill', function(d) { return d.fill })
          .style('fill-opacity', function(d) { return d['fill-opacity'] });
    });
  }

  document.querySelector('body').addEventListener('click', changeScene)
  initialize();
})()