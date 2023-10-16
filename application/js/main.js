new WOW().init();

import { CountUp } from './countup.js';

$(document).ready(function() {
  var countUp; // 建立 CountUp 實例

  // 當使用者滾動到特定標籤時觸發
  $(window).scroll(function() {
    var elementInView = isElementInViewport('#target');

    if (elementInView && !countUp) {
      countUp = new CountUp('target', 2000);
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

  
  


  

  

