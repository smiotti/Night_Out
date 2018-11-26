
//js code for City word animation, credit to: https://codyhouse.co/demo/animated-headlines/index.html

var animationDelay = 2500;

animateHeadline($('.cd-headline'));

function animateHeadline($headlines) {
   $headlines.each(function(){
      var headline = $(this);
      //trigger animation
      setTimeout(function(){ hideWord( headline.find('.is-visible') ) }, animationDelay);
      //other checks here ...
   });
}

function hideWord($word) {
    var nextWord = takeNext($word);
    switchWord($word, nextWord);
    setTimeout(function(){ hideWord(nextWord) }, animationDelay);
 }
 
 function takeNext($word) {
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
 }
 
 function switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
 }



// Text drawing animation - https://stackoverflow.com/questions/29911143/how-can-i-animate-the-drawing-of-text-on-a-web-page

var s = Snap('svg');
var text = 'Night Out'
var len = text.length;
var array = [];
for (var x = 0; x < len; x++) {
  var t = text[x]
  array.push(t);
}
var txt = s.text(0, 52, array)
$('tspan').css({
  'font-size': 70,
  fill: 'none',
  stroke: 'white',
  'stroke-dasharray': 300,
  'stroke-dashoffset': 300
})

$('tspan').each(function(index) {
  $(this).stop(true, true).delay(400 * index).animate({
    'stroke-dashoffset': 0,
  }, 400, function() {
    $(this).css('fill', 'silver')
  })
})

