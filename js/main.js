<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
=======
document.addEventListener('DOMContentLoaded', function () {
>>>>>>> 1ebeeb5 (start)
  let headerContentWidth, $nav
  let mobileSidebarOpen = false

  const adjustMenu = init => {
<<<<<<< HEAD
    const getAllWidth = ele => Array.from(ele).reduce((width, i) => width + i.offsetWidth, 0)
=======
    const getAllWidth = ele => {
      return Array.from(ele).reduce((width, i) => width + i.offsetWidth, 0)
    }
>>>>>>> 1ebeeb5 (start)

    if (init) {
      const blogInfoWidth = getAllWidth(document.querySelector('#blog-info > a').children)
      const menusWidth = getAllWidth(document.getElementById('menus').children)
      headerContentWidth = blogInfoWidth + menusWidth
      $nav = document.getElementById('nav')
    }

    const hideMenuIndex = window.innerWidth <= 768 || headerContentWidth > $nav.offsetWidth - 120
    $nav.classList.toggle('hide-menu', hideMenuIndex)
  }

  // 初始化header
  const initAdjust = () => {
    adjustMenu(true)
    $nav.classList.add('show')
  }

  // sidebar menus
  const sidebarFn = {
    open: () => {
<<<<<<< HEAD
      btf.overflowPaddingR.add()
=======
      btf.sidebarPaddingR()
      document.body.style.overflow = 'hidden'
>>>>>>> 1ebeeb5 (start)
      btf.animateIn(document.getElementById('menu-mask'), 'to_show 0.5s')
      document.getElementById('sidebar-menus').classList.add('open')
      mobileSidebarOpen = true
    },
    close: () => {
<<<<<<< HEAD
      btf.overflowPaddingR.remove()
=======
      const $body = document.body
      $body.style.overflow = ''
      $body.style.paddingRight = ''
>>>>>>> 1ebeeb5 (start)
      btf.animateOut(document.getElementById('menu-mask'), 'to_hide 0.5s')
      document.getElementById('sidebar-menus').classList.remove('open')
      mobileSidebarOpen = false
    }
  }

  /**
   * 首頁top_img底下的箭頭
   */
  const scrollDownInIndex = () => {
    const handleScrollToDest = () => {
      btf.scrollToDest(document.getElementById('content-inner').offsetTop, 300)
    }

    const $scrollDownEle = document.getElementById('scroll-down')
    $scrollDownEle && btf.addEventListenerPjax($scrollDownEle, 'click', handleScrollToDest)
  }

  /**
   * 代碼
   * 只適用於Hexo默認的代碼渲染
   */
  const addHighlightTool = () => {
    const highLight = GLOBAL_CONFIG.highlight
    if (!highLight) return

<<<<<<< HEAD
    const { highlightCopy, highlightLang, highlightHeightLimit, highlightFullpage, highlightMacStyle, plugin } = highLight
    const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink
    const isShowTool = highlightCopy || highlightLang || isHighlightShrink !== undefined || highlightFullpage || highlightMacStyle
=======
    const { highlightCopy, highlightLang, highlightHeightLimit, plugin } = highLight
    const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink
    const isShowTool = highlightCopy || highlightLang || isHighlightShrink !== undefined
>>>>>>> 1ebeeb5 (start)
    const $figureHighlight = plugin === 'highlight.js' ? document.querySelectorAll('figure.highlight') : document.querySelectorAll('pre[class*="language-"]')

    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return

    const isPrismjs = plugin === 'prismjs'
    const highlightShrinkClass = isHighlightShrink === true ? 'closed' : ''
    const highlightShrinkEle = isHighlightShrink !== undefined ? '<i class="fas fa-angle-down expand"></i>' : ''
    const highlightCopyEle = highlightCopy ? '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>' : ''
<<<<<<< HEAD
    const highlightMacStyleEle = '<div class="macStyle"><div class="mac-close"></div><div class="mac-minimize"></div><div class="mac-maximize"></div></div>'
    const highlightFullpageEle = highlightFullpage ? '<i class="fa-solid fa-up-right-and-down-left-from-center fullpage-button"></i>' : ''
=======
>>>>>>> 1ebeeb5 (start)

    const alertInfo = (ele, text) => {
      if (GLOBAL_CONFIG.Snackbar !== undefined) {
        btf.snackbarShow(text)
      } else {
<<<<<<< HEAD
        ele.textContent = text
        ele.style.opacity = 1
        setTimeout(() => { ele.style.opacity = 0 }, 800)
=======
        const prevEle = ele.previousElementSibling
        prevEle.textContent = text
        prevEle.style.opacity = 1
        setTimeout(() => { prevEle.style.opacity = 0 }, 800)
>>>>>>> 1ebeeb5 (start)
      }
    }

    const copy = ctx => {
      if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        document.execCommand('copy')
        alertInfo(ctx, GLOBAL_CONFIG.copy.success)
      } else {
        alertInfo(ctx, GLOBAL_CONFIG.copy.noSupport)
      }
    }

    // click events
<<<<<<< HEAD
    const highlightCopyFn = (ele, clickEle) => {
=======
    const highlightCopyFn = ele => {
>>>>>>> 1ebeeb5 (start)
      const $buttonParent = ele.parentNode
      $buttonParent.classList.add('copy-true')
      const selection = window.getSelection()
      const range = document.createRange()
      const preCodeSelector = isPrismjs ? 'pre code' : 'table .code pre'
<<<<<<< HEAD
      range.selectNodeContents($buttonParent.querySelector(`${preCodeSelector}`))
      selection.removeAllRanges()
      selection.addRange(range)
      copy(clickEle.previousElementSibling)
=======
      range.selectNodeContents($buttonParent.querySelectorAll(`${preCodeSelector}`)[0])
      selection.removeAllRanges()
      selection.addRange(range)
      copy(ele.lastChild)
>>>>>>> 1ebeeb5 (start)
      selection.removeAllRanges()
      $buttonParent.classList.remove('copy-true')
    }

<<<<<<< HEAD
    const highlightShrinkFn = ele => ele.classList.toggle('closed')

    const codeFullpage = (item, clickEle) => {
      const wrapEle = item.closest('figure.highlight')
      const isFullpage = wrapEle.classList.toggle('code-fullpage')

      document.body.style.overflow = isFullpage ? 'hidden' : ''
      clickEle.classList.toggle('fa-down-left-and-up-right-to-center', isFullpage)
      clickEle.classList.toggle('fa-up-right-and-down-left-from-center', !isFullpage)
    }

    const highlightToolsFn = e => {
      const $target = e.target.classList
      const currentElement = e.currentTarget
      if ($target.contains('expand')) highlightShrinkFn(currentElement)
      else if ($target.contains('copy-button')) highlightCopyFn(currentElement, e.target)
      else if ($target.contains('fullpage-button')) codeFullpage(currentElement, e.target)
    }

    const expandCode = e => e.currentTarget.classList.toggle('expand-done')

    // 獲取隱藏狀態下元素的真實高度
    const getActualHeight = item => {
      const hiddenElements = new Map()

      const fix = () => {
        let current = item
        while (current !== document.body && current != null) {
          if (window.getComputedStyle(current).display === 'none') {
            hiddenElements.set(current, current.getAttribute('style') || '')
          }
          current = current.parentNode
        }

        const style = 'visibility: hidden !important; display: block !important;'
        hiddenElements.forEach((originalStyle, elem) => {
          elem.setAttribute('style', originalStyle ? originalStyle + ';' + style : style)
        })
      }

      const restore = () => {
        hiddenElements.forEach((originalStyle, elem) => {
          if (originalStyle === '') elem.removeAttribute('style')
          else elem.setAttribute('style', originalStyle)
        })
      }

      fix()
      const height = item.offsetHeight
      restore()
      return height
    }

    const createEle = (lang, item) => {
=======
    const highlightShrinkFn = ele => {
      ele.classList.toggle('closed')
    }

    const highlightToolsFn = function (e) {
      const $target = e.target.classList
      if ($target.contains('expand')) highlightShrinkFn(this)
      else if ($target.contains('copy-button')) highlightCopyFn(this)
    }

    const expandCode = function () {
      this.classList.toggle('expand-done')
    }

    const createEle = (lang, item, service) => {
>>>>>>> 1ebeeb5 (start)
      const fragment = document.createDocumentFragment()

      if (isShowTool) {
        const hlTools = document.createElement('div')
        hlTools.className = `highlight-tools ${highlightShrinkClass}`
<<<<<<< HEAD
        hlTools.innerHTML = highlightMacStyleEle + highlightShrinkEle + lang + highlightCopyEle + highlightFullpageEle
=======
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle
>>>>>>> 1ebeeb5 (start)
        btf.addEventListenerPjax(hlTools, 'click', highlightToolsFn)
        fragment.appendChild(hlTools)
      }

<<<<<<< HEAD
      if (highlightHeightLimit && getActualHeight(item) > highlightHeightLimit + 30) {
=======
      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
>>>>>>> 1ebeeb5 (start)
        const ele = document.createElement('div')
        ele.className = 'code-expand-btn'
        ele.innerHTML = '<i class="fas fa-angle-double-down"></i>'
        btf.addEventListenerPjax(ele, 'click', expandCode)
        fragment.appendChild(ele)
      }

<<<<<<< HEAD
      isPrismjs ? item.parentNode.insertBefore(fragment, item) : item.insertBefore(fragment, item.firstChild)
    }

    $figureHighlight.forEach(item => {
      let langName = ''
      if (isPrismjs) btf.wrap(item, 'figure', { class: 'highlight' })

      if (!highlightLang) {
        createEle('', item)
        return
      }

      if (isPrismjs) {
        langName = item.getAttribute('data-language') || 'Code'
      } else {
        langName = item.getAttribute('class').split(' ')[1]
        if (langName === 'plain' || langName === undefined) langName = 'Code'
      }
      createEle(`<div class="code-lang">${langName}</div>`, item)
    })
=======
      if (service === 'hl') {
        item.insertBefore(fragment, item.firstChild)
      } else {
        item.parentNode.insertBefore(fragment, item)
      }
    }

    if (isPrismjs) {
      $figureHighlight.forEach(item => {
        if (highlightLang) {
          const langName = item.getAttribute('data-language') || 'Code'
          const highlightLangEle = `<div class="code-lang">${langName}</div>`
          btf.wrap(item, 'figure', { class: 'highlight' })
          createEle(highlightLangEle, item)
        } else {
          btf.wrap(item, 'figure', { class: 'highlight' })
          createEle('', item)
        }
      })
    } else {
      $figureHighlight.forEach(item => {
        if (highlightLang) {
          let langName = item.getAttribute('class').split(' ')[1]
          if (langName === 'plain' || langName === undefined) langName = 'Code'
          const highlightLangEle = `<div class="code-lang">${langName}</div>`
          createEle(highlightLangEle, item, 'hl')
        } else {
          createEle('', item, 'hl')
        }
      })
    }
>>>>>>> 1ebeeb5 (start)
  }

  /**
   * PhotoFigcaption
   */
  const addPhotoFigcaption = () => {
<<<<<<< HEAD
    if (!GLOBAL_CONFIG.isPhotoFigcaption) return
=======
>>>>>>> 1ebeeb5 (start)
    document.querySelectorAll('#article-container img').forEach(item => {
      const altValue = item.title || item.alt
      if (!altValue) return
      const ele = document.createElement('div')
      ele.className = 'img-alt is-center'
      ele.textContent = altValue
      item.insertAdjacentElement('afterend', ele)
    })
  }

  /**
   * Lightbox
   */
  const runLightbox = () => {
    btf.loadLightbox(document.querySelectorAll('#article-container img:not(.no-lightbox)'))
  }

  /**
   * justified-gallery 圖庫排版
   */

<<<<<<< HEAD
  const fetchUrl = async url => {
=======
  const fetchUrl = async (url) => {
>>>>>>> 1ebeeb5 (start)
    const response = await fetch(url)
    return await response.json()
  }

  const runJustifiedGallery = (item, data, isButton = false, tabs) => {
    const dataLength = data.length

    const ig = new InfiniteGrid.JustifiedInfiniteGrid(item, {
      gap: 5,
      isConstantSize: true,
      sizeRange: [150, 600],
      useResizeObserver: true,
      observeChildren: true,
      useTransform: true
      // useRecycle: false
    })

<<<<<<< HEAD
=======
    if (tabs) {
      btf.addGlobalFn('igOfTabs', () => { ig.destroy() }, false, tabs)
    }

>>>>>>> 1ebeeb5 (start)
    const replaceDq = str => str.replace(/"/g, '&quot;') // replace double quotes to &quot;

    const getItems = (nextGroupKey, count) => {
      const nextItems = []
      const startCount = (nextGroupKey - 1) * count

      for (let i = 0; i < count; ++i) {
        const num = startCount + i
        if (num >= dataLength) {
          break
        }

        const item = data[num]
        const alt = item.alt ? `alt="${replaceDq(item.alt)}"` : ''
        const title = item.title ? `title="${replaceDq(item.title)}"` : ''

<<<<<<< HEAD
        nextItems.push(`<div class="item">
=======
        nextItems.push(`<div class="item ">
>>>>>>> 1ebeeb5 (start)
            <img src="${item.url}" data-grid-maintained-target="true" ${alt + title} />
          </div>`)
      }
      return nextItems
    }

    const buttonText = GLOBAL_CONFIG.infinitegrid.buttonText
    const addButton = item => {
      const button = document.createElement('button')
<<<<<<< HEAD
      button.innerHTML = buttonText + '<i class="fa-solid fa-arrow-down"></i>'

      button.addEventListener('click', e => {
        e.target.closest('button').remove()
        btf.setLoading.add(item)
        appendItem(ig.getGroups().length + 1, 10)
      }, { once: true })

=======
      button.textContent = buttonText

      const buttonFn = e => {
        e.target.removeEventListener('click', buttonFn)
        e.target.remove()
        btf.setLoading.add(item)
        appendItem(ig.getGroups().length + 1, 10)
      }

      button.addEventListener('click', buttonFn)
>>>>>>> 1ebeeb5 (start)
      item.insertAdjacentElement('afterend', button)
    }

    const appendItem = (nextGroupKey, count) => {
      ig.append(getItems(nextGroupKey, count), nextGroupKey)
    }

    const maxGroupKey = Math.ceil(dataLength / 10)
<<<<<<< HEAD
    let isLayoutHidden = false

    const completeFn = e => {
      if (tabs) {
        const parentNode = item.parentNode

        if (isLayoutHidden) {
          parentNode.style.visibility = 'visible'
        }

        if (item.offsetHeight === 0) {
          parentNode.style.visibility = 'hidden'
          isLayoutHidden = true
        }
      }

=======

    const completeFn = e => {
>>>>>>> 1ebeeb5 (start)
      const { updated, isResize, mounted } = e
      if (!updated.length || !mounted.length || isResize) {
        return
      }

      btf.loadLightbox(item.querySelectorAll('img:not(.medium-zoom-image)'))

      if (ig.getGroups().length === maxGroupKey) {
        btf.setLoading.remove(item)
<<<<<<< HEAD
        !tabs && ig.off('renderComplete', completeFn)
=======
        ig.off('renderComplete', completeFn)
>>>>>>> 1ebeeb5 (start)
        return
      }

      if (isButton) {
        btf.setLoading.remove(item)
        addButton(item)
      }
    }

    const requestAppendFn = btf.debounce(e => {
      const nextGroupKey = (+e.groupKey || 0) + 1
      appendItem(nextGroupKey, 10)

      if (nextGroupKey === maxGroupKey) {
        ig.off('requestAppend', requestAppendFn)
      }
    }, 300)

    btf.setLoading.add(item)
    ig.on('renderComplete', completeFn)

    if (isButton) {
      appendItem(1, 10)
    } else {
      ig.on('requestAppend', requestAppendFn)
      ig.renderItems()
    }

<<<<<<< HEAD
    btf.addGlobalFn('pjaxSendOnce', () => { ig.destroy() })
=======
    btf.addGlobalFn('justifiedGallery', () => { ig.destroy() })
>>>>>>> 1ebeeb5 (start)
  }

  const addJustifiedGallery = async (ele, tabs = false) => {
    const init = async () => {
      for (const item of ele) {
<<<<<<< HEAD
        if (btf.isHidden(item) || item.classList.contains('loaded')) continue

        const isButton = item.getAttribute('data-button') === 'true'
        const children = item.firstElementChild
        const text = children.textContent
        children.textContent = ''
        item.classList.add('loaded')
        try {
          const content = item.getAttribute('data-type') === 'url' ? await fetchUrl(text) : JSON.parse(text)
          runJustifiedGallery(children, content, isButton, tabs)
        } catch (e) {
          console.error('Gallery data parsing failed:', e)
        }
      }
    }

    if (!ele.length) return

    if (typeof InfiniteGrid === 'function') {
      init()
    } else {
      await btf.getScript(`${GLOBAL_CONFIG.infinitegrid.js}`)
=======
        if (btf.isHidden(item)) continue
        if (tabs && item.classList.contains('loaded')) {
          item.querySelector('.gallery-items').innerHTML = ''
          const button = item.querySelector(':scope > button')
          const loadingContainer = item.querySelector(':scope > .loading-container')
          button && button.remove()
          loadingContainer && loadingContainer.remove()
        }

        const isButton = item.getAttribute('data-button') === 'true'
        const text = item.firstElementChild.textContent
        item.classList.add('loaded')
        const content = item.getAttribute('data-type') === 'url' ? await fetchUrl(text) : JSON.parse(text)
        runJustifiedGallery(item.lastElementChild, content, isButton, tabs)
      }
    }

    if (typeof InfiniteGrid === 'function') {
      init()
    } else {
      await getScript(`${GLOBAL_CONFIG.infinitegrid.js}`)
>>>>>>> 1ebeeb5 (start)
      init()
    }
  }

  /**
   * rightside scroll percent
   */
  const rightsideScrollPercent = currentTop => {
    const scrollPercent = btf.getScrollPercent(currentTop, document.body)
    const goUpElement = document.getElementById('go-up')

    if (scrollPercent < 95) {
      goUpElement.classList.add('show-percent')
      goUpElement.querySelector('.scroll-percent').textContent = scrollPercent
    } else {
      goUpElement.classList.remove('show-percent')
    }
  }

  /**
   * 滾動處理
   */
  const scrollFn = () => {
    const $rightside = document.getElementById('rightside')
    const innerHeight = window.innerHeight + 56
    let initTop = 0
    const $header = document.getElementById('page-header')
    const isChatBtn = typeof chatBtn !== 'undefined'
    const isShowPercent = GLOBAL_CONFIG.percent.rightside

<<<<<<< HEAD
    // 檢查文檔高度是否小於視窗高度
    const checkDocumentHeight = () => {
      if (document.body.scrollHeight <= innerHeight) {
        $rightside.classList.add('rightside-show')
        return true
      }
      return false
    }

    // 如果文檔高度小於視窗高度,直接返回
    if (checkDocumentHeight()) return

=======
    // 當滾動條小于 56 的時候
    if (document.body.scrollHeight <= innerHeight) {
      $rightside.classList.add('rightside-show')
      return
    }

>>>>>>> 1ebeeb5 (start)
    // find the scroll direction
    const scrollDirection = currentTop => {
      const result = currentTop > initTop // true is down & false is up
      initTop = currentTop
      return result
    }

    let flag = ''
    const scrollTask = btf.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop
      const isDown = scrollDirection(currentTop)
      if (currentTop > 56) {
        if (flag === '') {
          $header.classList.add('nav-fixed')
          $rightside.classList.add('rightside-show')
        }

        if (isDown) {
          if (flag !== 'down') {
            $header.classList.remove('nav-visible')
            isChatBtn && window.chatBtn.hide()
            flag = 'down'
          }
        } else {
          if (flag !== 'up') {
            $header.classList.add('nav-visible')
            isChatBtn && window.chatBtn.show()
            flag = 'up'
          }
        }
      } else {
        flag = ''
        if (currentTop === 0) {
          $header.classList.remove('nav-fixed', 'nav-visible')
        }
        $rightside.classList.remove('rightside-show')
      }

      isShowPercent && rightsideScrollPercent(currentTop)
<<<<<<< HEAD
      checkDocumentHeight()
=======

      if (document.body.scrollHeight <= innerHeight) {
        $rightside.classList.add('rightside-show')
      }
>>>>>>> 1ebeeb5 (start)
    }, 300)

    btf.addEventListenerPjax(window, 'scroll', scrollTask, { passive: true })
  }

  /**
  * toc,anchor
  */
  const scrollFnToDo = () => {
    const isToc = GLOBAL_CONFIG_SITE.isToc
    const isAnchor = GLOBAL_CONFIG.isAnchor
    const $article = document.getElementById('article-container')

    if (!($article && (isToc || isAnchor))) return

    let $tocLink, $cardToc, autoScrollToc, $tocPercentage, isExpand

    if (isToc) {
      const $cardTocLayout = document.getElementById('card-toc')
      $cardToc = $cardTocLayout.querySelector('.toc-content')
      $tocLink = $cardToc.querySelectorAll('.toc-link')
      $tocPercentage = $cardTocLayout.querySelector('.toc-percentage')
      isExpand = $cardToc.classList.contains('is-expand')

      // toc元素點擊
      const tocItemClickFn = e => {
        const target = e.target.closest('.toc-link')
        if (!target) return

        e.preventDefault()
        btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI(target.getAttribute('href')).replace('#', ''))), 300)
        if (window.innerWidth < 900) {
          $cardTocLayout.classList.remove('open')
        }
      }

      btf.addEventListenerPjax($cardToc, 'click', tocItemClickFn)

      autoScrollToc = item => {
<<<<<<< HEAD
        const sidebarHeight = $cardToc.clientHeight
        const itemOffsetTop = item.offsetTop
        const itemHeight = item.clientHeight
        const scrollTop = $cardToc.scrollTop
        const offset = itemOffsetTop - scrollTop
        const middlePosition = (sidebarHeight - itemHeight) / 2

        if (offset !== middlePosition) {
          $cardToc.scrollTop = scrollTop + (offset - middlePosition)
        }
      }

      // 處理 hexo-blog-encrypt 事件
      $cardToc.style.display = 'block'
=======
        const activePosition = item.getBoundingClientRect().top
        const sidebarScrollTop = $cardToc.scrollTop
        if (activePosition > (document.documentElement.clientHeight - 100)) {
          $cardToc.scrollTop = sidebarScrollTop + 150
        }
        if (activePosition < 100) {
          $cardToc.scrollTop = sidebarScrollTop - 150
        }
      }
>>>>>>> 1ebeeb5 (start)
    }

    // find head position & add active class
    const $articleList = $article.querySelectorAll('h1,h2,h3,h4,h5,h6')
    let detectItem = ''
<<<<<<< HEAD

    const findHeadPosition = top => {
      if (top === 0) return false
=======
    const findHeadPosition = top => {
      if (top === 0) {
        return false
      }
>>>>>>> 1ebeeb5 (start)

      let currentId = ''
      let currentIndex = ''

<<<<<<< HEAD
      for (let i = 0; i < $articleList.length; i++) {
        const ele = $articleList[i]
        if (top > btf.getEleTop(ele) - 80) {
          const id = ele.id
          currentId = id ? '#' + encodeURI(id) : ''
          currentIndex = i
        } else {
          break
        }
      }
=======
      $articleList.forEach((ele, index) => {
        if (top > btf.getEleTop(ele) - 80) {
          const id = ele.id
          currentId = id ? '#' + encodeURI(id) : ''
          currentIndex = index
        }
      })
>>>>>>> 1ebeeb5 (start)

      if (detectItem === currentIndex) return

      if (isAnchor) btf.updateAnchor(currentId)

      detectItem = currentIndex

      if (isToc) {
<<<<<<< HEAD
        $cardToc.querySelectorAll('.active').forEach(i => i.classList.remove('active'))

        if (currentId) {
          const currentActive = $tocLink[currentIndex]
          currentActive.classList.add('active')

          setTimeout(() => autoScrollToc(currentActive), 0)

          if (!isExpand) {
            let parent = currentActive.parentNode
            while (!parent.matches('.toc')) {
              if (parent.matches('li')) parent.classList.add('active')
              parent = parent.parentNode
            }
          }
=======
        $cardToc.querySelectorAll('.active').forEach(i => { i.classList.remove('active') })

        if (currentId === '') {
          return
        }

        const currentActive = $tocLink[currentIndex]
        currentActive.classList.add('active')

        setTimeout(() => {
          autoScrollToc(currentActive)
        }, 0)

        if (isExpand) return
        let parent = currentActive.parentNode

        for (; !parent.matches('.toc'); parent = parent.parentNode) {
          if (parent.matches('li')) parent.classList.add('active')
>>>>>>> 1ebeeb5 (start)
        }
      }
    }

    // main of scroll
    const tocScrollFn = btf.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop
      if (isToc && GLOBAL_CONFIG.percent.toc) {
        $tocPercentage.textContent = btf.getScrollPercent(currentTop, $article)
      }
      findHeadPosition(currentTop)
    }, 100)

    btf.addEventListenerPjax(window, 'scroll', tocScrollFn, { passive: true })
  }

  const handleThemeChange = mode => {
    const globalFn = window.globalFn || {}
    const themeChange = globalFn.themeChange || {}
    if (!themeChange) {
      return
    }

    Object.keys(themeChange).forEach(key => {
      const themeChangeFn = themeChange[key]
      if (['disqus', 'disqusjs'].includes(key)) {
        setTimeout(() => themeChangeFn(mode), 300)
      } else {
        themeChangeFn(mode)
      }
    })
  }

  /**
   * Rightside
   */
  const rightSideFn = {
    readmode: () => { // read mode
      const $body = document.body
      $body.classList.add('read-mode')
      const newEle = document.createElement('button')
      newEle.type = 'button'
      newEle.className = 'fas fa-sign-out-alt exit-readmode'
      $body.appendChild(newEle)

      const clickFn = () => {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
      }

      newEle.addEventListener('click', clickFn)
    },
    darkmode: () => { // switch between light and dark mode
      const willChangeMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      if (willChangeMode === 'dark') {
<<<<<<< HEAD
        btf.activateDarkMode()
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
      } else {
        btf.activateLightMode()
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
      }
      btf.saveToLocal.set('theme', willChangeMode, 2)
=======
        activateDarkMode()
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
      } else {
        activateLightMode()
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
      }
      saveToLocal.set('theme', willChangeMode, 2)
>>>>>>> 1ebeeb5 (start)
      handleThemeChange(willChangeMode)
    },
    'rightside-config': item => { // Show or hide rightside-hide-btn
      const hideLayout = item.firstElementChild
      if (hideLayout.classList.contains('show')) {
        hideLayout.classList.add('status')
        setTimeout(() => {
          hideLayout.classList.remove('status')
        }, 300)
      }

      hideLayout.classList.toggle('show')
    },
    'go-up': () => { // Back to top
      btf.scrollToDest(0, 500)
    },
    'hide-aside-btn': () => { // Hide aside
      const $htmlDom = document.documentElement.classList
      const saveStatus = $htmlDom.contains('hide-aside') ? 'show' : 'hide'
<<<<<<< HEAD
      btf.saveToLocal.set('aside-status', saveStatus, 2)
      $htmlDom.toggle('hide-aside')
    },
    'mobile-toc-button': (p, item) => { // Show mobile toc
      const tocEle = document.getElementById('card-toc')
      tocEle.style.transition = 'transform 0.3s ease-in-out'

      const tocEleHeight = tocEle.clientHeight
      const btData = item.getBoundingClientRect()

      const tocEleBottom = window.innerHeight - btData.bottom - 30
      if (tocEleHeight > tocEleBottom) {
        tocEle.style.transformOrigin = `right ${tocEleHeight - tocEleBottom - btData.height / 2}px`
      }

      tocEle.classList.toggle('open')
      tocEle.addEventListener('transitionend', () => {
        tocEle.style.cssText = ''
=======
      saveToLocal.set('aside-status', saveStatus, 2)
      $htmlDom.toggle('hide-aside')
    },
    'mobile-toc-button': item => { // Show mobile toc
      const tocEle = document.getElementById('card-toc')
      tocEle.style.transition = 'transform 0.3s ease-in-out'
      tocEle.classList.toggle('open')
      tocEle.addEventListener('transitionend', () => {
        tocEle.style.transition = ''
>>>>>>> 1ebeeb5 (start)
      }, { once: true })
    },
    'chat-btn': () => { // Show chat
      window.chatBtnFn()
    },
    translateLink: () => { // switch between traditional and simplified chinese
      window.translateFn.translatePage()
    }
  }

<<<<<<< HEAD
  document.getElementById('rightside').addEventListener('click', e => {
    const $target = e.target.closest('[id]')
    if ($target && rightSideFn[$target.id]) {
      rightSideFn[$target.id](e.currentTarget, $target)
=======
  document.getElementById('rightside').addEventListener('click', function (e) {
    const $target = e.target.closest('[id]')
    if ($target && rightSideFn[$target.id]) {
      rightSideFn[$target.id](this)
>>>>>>> 1ebeeb5 (start)
    }
  })

  /**
   * menu
   * 側邊欄sub-menu 展開/收縮
   */
  const clickFnOfSubMenu = () => {
    const handleClickOfSubMenu = e => {
      const target = e.target.closest('.site-page.group')
      if (!target) return
      target.classList.toggle('hide')
    }

<<<<<<< HEAD
    const menusItems = document.querySelector('#sidebar-menus .menus_items')
    menusItems && menusItems.addEventListener('click', handleClickOfSubMenu)
=======
    document.querySelector('#sidebar-menus .menus_items').addEventListener('click', handleClickOfSubMenu)
>>>>>>> 1ebeeb5 (start)
  }

  /**
   * 手机端目录点击
   */
  const openMobileMenu = () => {
<<<<<<< HEAD
    const toggleMenu = document.getElementById('toggle-menu')
    if (!toggleMenu) return
    btf.addEventListenerPjax(toggleMenu, 'click', () => { sidebarFn.open() })
=======
    const handleClick = () => { sidebarFn.open() }
    btf.addEventListenerPjax(document.getElementById('toggle-menu'), 'click', handleClick)
>>>>>>> 1ebeeb5 (start)
  }

  /**
 * 複製時加上版權信息
 */
  const addCopyright = () => {
    const { limitCount, languages } = GLOBAL_CONFIG.copyright

    const handleCopy = (e) => {
      e.preventDefault()
      const copyFont = window.getSelection(0).toString()
      let textFont = copyFont
      if (copyFont.length > limitCount) {
        textFont = `${copyFont}\n\n\n${languages.author}\n${languages.link}${window.location.href}\n${languages.source}\n${languages.info}`
      }
      if (e.clipboardData) {
        return e.clipboardData.setData('text', textFont)
      } else {
        return window.clipboardData.setData('text', textFont)
      }
    }

    document.body.addEventListener('copy', handleCopy)
  }

  /**
   * 網頁運行時間
   */
  const addRuntime = () => {
    const $runtimeCount = document.getElementById('runtimeshow')
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute('data-publishDate')
      $runtimeCount.textContent = `${btf.diffDate(publishDate)} ${GLOBAL_CONFIG.runtime}`
    }
  }

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById('last-push-date')
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute('data-lastPushDate')
      $lastPushDateItem.textContent = btf.diffDate(lastPushDate, true)
    }
  }

  /**
   * table overflow
   */
  const addTableWrap = () => {
    const $table = document.querySelectorAll('#article-container table')
    if (!$table.length) return

    $table.forEach(item => {
      if (!item.closest('.highlight')) {
        btf.wrap(item, 'div', { class: 'table-wrap' })
      }
    })
  }

  /**
   * tag-hide
   */
  const clickFnOfTagHide = () => {
    const hideButtons = document.querySelectorAll('#article-container .hide-button')
    if (!hideButtons.length) return
<<<<<<< HEAD
    hideButtons.forEach(item => item.addEventListener('click', e => {
      const currentTarget = e.currentTarget
      currentTarget.classList.add('open')
      addJustifiedGallery(currentTarget.nextElementSibling.querySelectorAll('.gallery-container'))
    }, { once: true }))
  }

  const tabsFn = () => {
    const navTabsElements = document.querySelectorAll('#article-container .tabs')
    if (!navTabsElements.length) return

    const setActiveClass = (elements, activeIndex) => {
      elements.forEach((el, index) => {
        el.classList.toggle('active', index === activeIndex)
      })
    }

    const handleNavClick = e => {
      const target = e.target.closest('button')
      if (!target || target.classList.contains('active')) return

      const navItems = [...e.currentTarget.children]
      const tabContents = [...e.currentTarget.nextElementSibling.children]
      const indexOfButton = navItems.indexOf(target)
      setActiveClass(navItems, indexOfButton)
      e.currentTarget.classList.remove('no-default')
      setActiveClass(tabContents, indexOfButton)
      addJustifiedGallery(tabContents[indexOfButton].querySelectorAll('.gallery-container'), true)
    }

    const handleToTopClick = tabElement => e => {
      if (e.target.closest('button')) {
        btf.scrollToDest(btf.getEleTop(tabElement), 300)
      }
    }

    navTabsElements.forEach(tabElement => {
      btf.addEventListenerPjax(tabElement.firstElementChild, 'click', handleNavClick)
      btf.addEventListenerPjax(tabElement.lastElementChild, 'click', handleToTopClick(tabElement))
=======
    const handleClick = function (e) {
      const $this = this
      $this.classList.add('open')
      const $fjGallery = $this.nextElementSibling.querySelectorAll('.gallery-container')
      $fjGallery.length && addJustifiedGallery($fjGallery)
    }

    hideButtons.forEach(item => {
      item.addEventListener('click', handleClick, { once: true })
    })
  }

  const tabsFn = () => {
    const navTabsElement = document.querySelectorAll('#article-container .tabs')
    if (!navTabsElement.length) return

    const removeAndAddActiveClass = (elements, detect) => {
      Array.from(elements).forEach(element => {
        element.classList.remove('active')
        if (element === detect || element.id === detect) {
          element.classList.add('active')
        }
      })
    }

    const addTabNavEventListener = (item, isJustifiedGallery) => {
      const navClickHandler = function (e) {
        const target = e.target.closest('button')
        if (target.classList.contains('active')) return
        removeAndAddActiveClass(this.children, target)
        this.classList.remove('no-default')
        const tabId = target.getAttribute('data-href')
        const tabContent = this.nextElementSibling
        removeAndAddActiveClass(tabContent.children, tabId)
        if (isJustifiedGallery) {
          btf.removeGlobalFnEvent('igOfTabs', this)
          const justifiedGalleryItems = tabContent.querySelectorAll(`:scope > #${tabId} .gallery-container`)
          justifiedGalleryItems.length && addJustifiedGallery(justifiedGalleryItems, this)
        }
      }
      btf.addEventListenerPjax(item.firstElementChild, 'click', navClickHandler)
    }

    const addTabToTopEventListener = item => {
      const btnClickHandler = (e) => {
        const target = e.target.closest('button')
        if (!target) return
        btf.scrollToDest(btf.getEleTop(item), 300)
      }
      btf.addEventListenerPjax(item.lastElementChild, 'click', btnClickHandler)
    }

    navTabsElement.forEach(item => {
      const isJustifiedGallery = !!item.querySelectorAll('.gallery-container')
      addTabNavEventListener(item, isJustifiedGallery)
      addTabToTopEventListener(item)
>>>>>>> 1ebeeb5 (start)
    })
  }

  const toggleCardCategory = () => {
    const cardCategory = document.querySelector('#aside-cat-list.expandBtn')
    if (!cardCategory) return

<<<<<<< HEAD
    const handleToggleBtn = e => {
=======
    const handleToggleBtn = (e) => {
>>>>>>> 1ebeeb5 (start)
      const target = e.target
      if (target.nodeName === 'I') {
        e.preventDefault()
        target.parentNode.classList.toggle('expand')
      }
    }
    btf.addEventListenerPjax(cardCategory, 'click', handleToggleBtn, true)
  }

  const switchComments = () => {
    const switchBtn = document.getElementById('switch-btn')
    if (!switchBtn) return
<<<<<<< HEAD

    let switchDone = false
    const handleSwitchBtn = () => {
      document.getElementById('post-comment').classList.toggle('move')
=======
    let switchDone = false
    const commentContainer = document.getElementById('post-comment')
    const handleSwitchBtn = () => {
      commentContainer.classList.toggle('move')
>>>>>>> 1ebeeb5 (start)
      if (!switchDone && typeof loadOtherComment === 'function') {
        switchDone = true
        loadOtherComment()
      }
    }
    btf.addEventListenerPjax(switchBtn, 'click', handleSwitchBtn)
  }

  const addPostOutdateNotice = () => {
    const { limitDay, messagePrev, messageNext, position } = GLOBAL_CONFIG.noticeOutdate
    const diffDay = btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate)
    if (diffDay >= limitDay) {
      const ele = document.createElement('div')
      ele.className = 'post-outdate-notice'
      ele.textContent = `${messagePrev} ${diffDay} ${messageNext}`
      const $targetEle = document.getElementById('article-container')
      if (position === 'top') {
        $targetEle.insertBefore(ele, $targetEle.firstChild)
      } else {
        $targetEle.appendChild(ele)
      }
    }
  }

  const lazyloadImg = () => {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: 'img',
      threshold: 0,
      data_src: 'lazy-src'
    })
<<<<<<< HEAD

    btf.addGlobalFn('pjaxComplete', () => {
      window.lazyLoadInstance.update()
    }, 'lazyload')
  }

  const relativeDate = selector => {
    selector.forEach(item => {
      item.textContent = btf.diffDate(item.getAttribute('datetime'), true)
=======
  }

  const relativeDate = function (selector) {
    selector.forEach(item => {
      const timeVal = item.getAttribute('datetime')
      item.textContent = btf.diffDate(timeVal, true)
>>>>>>> 1ebeeb5 (start)
      item.style.display = 'inline'
    })
  }

<<<<<<< HEAD
  const justifiedIndexPostUI = () => {
    const recentPostsElement = document.getElementById('recent-posts')
    if (!(recentPostsElement && recentPostsElement.classList.contains('masonry'))) return

    const init = () => {
      const masonryItem = new InfiniteGrid.MasonryInfiniteGrid('.recent-post-items', {
        gap: { horizontal: 10, vertical: 20 },
        useTransform: true,
        useResizeObserver: true
      })
      masonryItem.renderItems()
      btf.addGlobalFn('pjaxCompleteOnce', () => { masonryItem.destroy() }, 'removeJustifiedIndexPostUI')
    }

    typeof InfiniteGrid === 'function' ? init() : btf.getScript(`${GLOBAL_CONFIG.infinitegrid.js}`).then(init)
  }

  const unRefreshFn = () => {
=======
  const unRefreshFn = function () {
>>>>>>> 1ebeeb5 (start)
    window.addEventListener('resize', () => {
      adjustMenu(false)
      mobileSidebarOpen && btf.isHidden(document.getElementById('toggle-menu')) && sidebarFn.close()
    })

<<<<<<< HEAD
    const menuMask = document.getElementById('menu-mask')
    menuMask && menuMask.addEventListener('click', () => { sidebarFn.close() })
=======
    document.getElementById('menu-mask').addEventListener('click', e => { sidebarFn.close() })
>>>>>>> 1ebeeb5 (start)

    clickFnOfSubMenu()
    GLOBAL_CONFIG.islazyload && lazyloadImg()
    GLOBAL_CONFIG.copyright !== undefined && addCopyright()

    if (GLOBAL_CONFIG.autoDarkmode) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
<<<<<<< HEAD
        if (btf.saveToLocal.get('theme') !== undefined) return
=======
        if (saveToLocal.get('theme') !== undefined) return
>>>>>>> 1ebeeb5 (start)
        e.matches ? handleThemeChange('dark') : handleThemeChange('light')
      })
    }
  }

<<<<<<< HEAD
  const forPostFn = () => {
    addHighlightTool()
    addPhotoFigcaption()
    addJustifiedGallery(document.querySelectorAll('#article-container .gallery-container'))
    runLightbox()
    scrollFnToDo()
    addTableWrap()
    clickFnOfTagHide()
    tabsFn()
  }

  const refreshFn = () => {
    initAdjust()
    justifiedIndexPostUI()
=======
  window.refreshFn = function () {
    initAdjust()
>>>>>>> 1ebeeb5 (start)

    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice()
      GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll('#post-meta time'))
    } else {
      GLOBAL_CONFIG.relativeDate.homepage && relativeDate(document.querySelectorAll('#recent-posts time'))
      GLOBAL_CONFIG.runtime && addRuntime()
      addLastPushDate()
      toggleCardCategory()
    }

<<<<<<< HEAD
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex()
    scrollFn()

    forPostFn()
=======
    scrollFnToDo()
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex()
    addHighlightTool()
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption()
    scrollFn()

    btf.removeGlobalFnEvent('justifiedGallery')
    const galleryContainer = document.querySelectorAll('#article-container .gallery-container')
    galleryContainer.length && addJustifiedGallery(galleryContainer)

    runLightbox()
    addTableWrap()
    clickFnOfTagHide()
    tabsFn()
>>>>>>> 1ebeeb5 (start)
    switchComments()
    openMobileMenu()
  }

<<<<<<< HEAD
  btf.addGlobalFn('pjaxComplete', refreshFn, 'refreshFn')
  refreshFn()
  unRefreshFn()

  // 處理 hexo-blog-encrypt 事件
  window.addEventListener('hexo-blog-decrypt', e => {
    forPostFn()
    window.translateFn.translateInitialization()
    Object.values(window.globalFn.encrypt).forEach(fn => {
      fn()
    })
  })
=======
  refreshFn()
  unRefreshFn()
>>>>>>> 1ebeeb5 (start)
})
