const container = $('#game1');
const moon = $('<img>');
$(moon).attr({
  id: 'moon',
  src: 'img/moon.png',
});
$(moon).addClass('planet');
const mars = $('<img>');
$(mars).attr({
  id: 'mars',
  src: 'img/mars.png',
});
$(mars).addClass('planet');
const sat = $('<img>');
$(sat).attr({
  id: 'sat',
  src: 'img/sat.png',
});
$(sat).addClass('planet');
$(container).append(moon, mars, sat);

const stars = ['img/star1.png', 'img/star2.png'];

for (let x = 0; x < 200; x += 1) {
  setTimeout(() => {
    const newStar = $('<img>');
    $(newStar).attr('src', stars[Math.floor(Math.random() * stars.length)]);
    $(newStar).css({
      position: 'absolute',
      'z-index': '-2',
      width: `${(Math.floor(Math.random() * 10))}px`,
      heigth: `${(Math.floor(Math.random() * 10))}px`,
      left: `${(Math.floor(Math.random() * 100))}%`,
      top: `${(Math.floor(Math.random() * 100))}%`,
    });
    $(newStar).fadeOut(0);
    $(container).append(newStar);
    $(newStar).fadeIn('fast');
  }, x * 50);
}
