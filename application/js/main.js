new WOW().init();

import { CountUp } from './countup.js';

$(document).ready(function() {
  var countUp; // 建立 CountUp 實例

  // 當使用者滾動到特定標籤時觸發
$(window).scroll(function() {
  var elementInView1 = isElementInViewport('#target1');
  var elementInView2 = isElementInViewport('#target2');
  var elementInView3 = isElementInViewport('#target3');
  var elementInView4 = isElementInViewport('#target4');

  if ((elementInView1) && !countUp) {
    countUp = new CountUp('target1', 80, { suffix: '%' });
    countUp.start();
    countUp = undefined;
  }
  if ((elementInView2) && !countUp) {
    countUp = new CountUp('target2', 65, { suffix: '%' });
    countUp.start();
    countUp = undefined;
  }
  if ((elementInView3) && !countUp) {
    countUp = new CountUp('target3', 70, { suffix: '%' });
    countUp.start();
    countUp = undefined;
  }
  if ((elementInView4) && !countUp) {
    countUp = new CountUp('target4', 60, { suffix: '%' });
    countUp.start();
  }
});


  // 檢查元素是否在視口中
  function isElementInViewport(selector) {
    var element = $(selector);
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    var elementTop = element.offset().top;

    return elementTop <= viewportBottom;
  }
});

  
  


  

  

