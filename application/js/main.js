new WOW().init();

import { CountUp } from './countup.js';

$(document).ready(function() {
  var countUp; // 建立 CountUp 實例
  var flag1 = 0;
  var flag2 = 0;
  var flag3 = 0;
  var flag4 = 0;
  // 當使用者滾動到特定標籤時觸發
$(window).scroll(function() {
  var elementInView1 = isElementInViewport('#target1');
  var elementInView2 = isElementInViewport('#target2');
  var elementInView3 = isElementInViewport('#target3');
  var elementInView4 = isElementInViewport('#target4');

  if ((elementInView1) && !countUp && flag1 == 0) {
    countUp = new CountUp('target1', 80, { suffix: '%' });
    countUp.start();
    flag1 = 1;
    countUp = undefined;
  }
  if ((elementInView2) && !countUp && flag2 == 0) {
    countUp = new CountUp('target2', 65, { suffix: '%' });
    countUp.start();
    flag2 = 1;
    countUp = undefined;
  }
  if ((elementInView3) && !countUp && flag3 == 0) {
    countUp = new CountUp('target3', 70, { suffix: '%' });
    countUp.start();
    flag3 = 1;
    countUp = undefined;
  }
  if ((elementInView4) && !countUp && flag4 == 0) {
    countUp = new CountUp('target4', 60, { suffix: '%' });
    countUp.start();
    flag4 = 1;
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

  
  


  

  

