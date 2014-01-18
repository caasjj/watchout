var gameOptions = {
  height: 600,
  width: 1000,
  transitionTime: 1000
};

var enemyOptions = {
  num: 30,
  radius: 4
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};


var gameBoard = d3.select('body').append('svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);


var createEnemies = function() {
  return _.map(_.range(0, enemyOptions.num), function(i) {
    return { id: i,
              x: Math.random()*100,
              y: Math.random()*100
    };
  });
};

  var limitXPosition = function(x, r) {
    return Math.max(r, Math.min( gameOptions.width - r, x));
  };

  var limitYPosition = function(y, r) {
    return Math.max(r, Math.min( gameOptions.height - r, y));
  };



var render = function(enemy_data) {
var enemies = gameBoard.selectAll('circle.enemy');
  _.once( function() {enemies
    .data(enemy_data)
    .enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(enemy) { return limitXPosition( axes.x(enemy.x), enemyOptions.radius ); })
    .attr('cy', function(enemy) { return limitYPosition( axes.y(enemy.y), enemyOptions.radius ); })
    .attr('r', enemyOptions.radius); })();

  enemies
    .transition()
    .duration(gameOptions.transitionTime)
    .attr('cx', function(enemy) { return limitXPosition( axes.x(Math.random()*100), enemyOptions.radius);  } )
    .attr('cy', function(enemy) { return limitYPosition( axes.y(Math.random()*100), enemyOptions.radius ); } );
};


var enemyData = createEnemies();
setInterval( function() {
  render(enemyData);
}, gameOptions.transitionTime) ;