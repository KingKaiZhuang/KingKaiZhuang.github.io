window.addEventListener('load', () => {
<<<<<<< HEAD
  const { algolia } = GLOBAL_CONFIG
  const { appId, apiKey, indexName, hitsPerPage = 5, languages } = algolia

  if (!appId || !apiKey || !indexName) {
    return console.error('Algolia setting is invalid!')
  }

  const $searchMask = document.getElementById('search-mask')
  const $searchDialog = document.querySelector('#algolia-search .search-dialog')

  const animateElements = show => {
    const action = show ? 'animateIn' : 'animateOut'
    const maskAnimation = show ? 'to_show 0.5s' : 'to_hide 0.5s'
    const dialogAnimation = show ? 'titleScale 0.5s' : 'search_close .5s'
    btf[action]($searchMask, maskAnimation)
    btf[action]($searchDialog, dialogAnimation)
  }

  const fixSafariHeight = () => {
    if (window.innerWidth < 768) {
      $searchDialog.style.setProperty('--search-height', `${window.innerHeight}px`)
    }
  }

  const openSearch = () => {
    btf.overflowPaddingR.add()
    animateElements(true)
    setTimeout(() => { document.querySelector('#algolia-search .ais-SearchBox-input').focus() }, 100)

    const handleEscape = event => {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', handleEscape)
      }
    }

    document.addEventListener('keydown', handleEscape)
=======
  const $searchMask = document.getElementById('search-mask')
  const $searchDialog = document.querySelector('#algolia-search .search-dialog')

  const openSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    btf.animateIn($searchMask, 'to_show 0.5s')
    btf.animateIn($searchDialog, 'titleScale 0.5s')
    setTimeout(() => { document.querySelector('#algolia-search .ais-SearchBox-input').focus() }, 100)

    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })

>>>>>>> 1ebeeb5 (start)
    fixSafariHeight()
    window.addEventListener('resize', fixSafariHeight)
  }

  const closeSearch = () => {
<<<<<<< HEAD
    btf.overflowPaddingR.remove()
    animateElements(false)
    window.removeEventListener('resize', fixSafariHeight)
  }

=======
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
    btf.animateOut($searchDialog, 'search_close .5s')
    btf.animateOut($searchMask, 'to_hide 0.5s')
    window.removeEventListener('resize', fixSafariHeight)
  }

  // fix safari
  const fixSafariHeight = () => {
    if (window.innerWidth < 768) {
      $searchDialog.style.setProperty('--search-height', window.innerHeight + 'px')
    }
  }

>>>>>>> 1ebeeb5 (start)
  const searchClickFn = () => {
    btf.addEventListenerPjax(document.querySelector('#search-button > .search'), 'click', openSearch)
  }

  const searchFnOnce = () => {
    $searchMask.addEventListener('click', closeSearch)
    document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch)
  }

<<<<<<< HEAD
  const cutContent = (content) => {
    if (!content) return ''
    const firstOccur = content.indexOf('<mark>')
=======
  const cutContent = content => {
    if (content === '') return ''

    const firstOccur = content.indexOf('<mark>')

>>>>>>> 1ebeeb5 (start)
    let start = firstOccur - 30
    let end = firstOccur + 120
    let pre = ''
    let post = ''

    if (start <= 0) {
      start = 0
      end = 140
    } else {
      pre = '...'
    }

    if (end > content.length) {
      end = content.length
    } else {
      post = '...'
    }

<<<<<<< HEAD
    return `${pre}${content.substring(start, end)}${post}`
  }

  const disableDiv = [
    document.getElementById('algolia-hits'),
    document.getElementById('algolia-pagination'),
    document.querySelector('#algolia-info .algolia-stats')
  ]

  const search = instantsearch({
    indexName,
    searchClient: algoliasearch(appId, apiKey),
    searchFunction (helper) {
      disableDiv.forEach(item => {
        item.style.display = helper.state.query ? '' : 'none'
      })
      if (helper.state.query) helper.search()
    }
  })

  const widgets = [
    instantsearch.widgets.configure({ hitsPerPage }),
    instantsearch.widgets.searchBox({
      container: '#algolia-search-input',
      showReset: false,
      showSubmit: false,
      placeholder: languages.input_placeholder,
      showLoadingIndicator: true
    }),
    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item (data) {
          const link = data.permalink || (GLOBAL_CONFIG.root + data.path)
          const result = data._highlightResult
          const content = result.contentStripTruncate
            ? cutContent(result.contentStripTruncate.value)
            : result.contentStrip
              ? cutContent(result.contentStrip.value)
              : result.content
                ? cutContent(result.content.value)
                : ''
          return `
            <a href="${link}" class="algolia-hit-item-link">
              <span class="algolia-hits-item-title">${result.title.value || 'no-title'}</span>
              ${content ? `<div class="algolia-hit-item-content">${content}</div>` : ''}
            </a>`
        },
        empty (data) {
          return `<div id="algolia-hits-empty">${languages.hits_empty.replace(/\$\{query}/, data.query)}</div>`
        }
      }
    }),
    instantsearch.widgets.stats({
      container: '#algolia-info > .algolia-stats',
      templates: {
        text (data) {
          const stats = languages.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS)
          return `<hr>${stats}`
        }
      }
    }),
    instantsearch.widgets.poweredBy({
      container: '#algolia-info > .algolia-poweredBy'
    }),
    instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      totalPages: 5,
      templates: {
        first: '<i class="fas fa-angle-double-left"></i>',
        last: '<i class="fas fa-angle-double-right"></i>',
        previous: '<i class="fas fa-angle-left"></i>',
        next: '<i class="fas fa-angle-right"></i>'
      }
    })
  ]

  search.addWidgets(widgets)
  search.start()
=======
    const matchContent = pre + content.substring(start, end) + post
    return matchContent
  }

  const algolia = GLOBAL_CONFIG.algolia
  const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
  if (!isAlgoliaValid) {
    return console.error('Algolia setting is invalid!')
  }

  const search = instantsearch({
    indexName: algolia.indexName,
    /* global algoliasearch */
    searchClient: algoliasearch(algolia.appId, algolia.apiKey),
    searchFunction (helper) {
      helper.state.query && helper.search()
    }
  })

  const configure = instantsearch.widgets.configure({
    hitsPerPage: 5
  })

  const searchBox = instantsearch.widgets.searchBox({
    container: '#algolia-search-input',
    showReset: false,
    showSubmit: false,
    placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder,
    showLoadingIndicator: true
  })

  const hits = instantsearch.widgets.hits({
    container: '#algolia-hits',
    templates: {
      item (data) {
        const link = data.permalink ? data.permalink : (GLOBAL_CONFIG.root + data.path)
        const result = data._highlightResult
        const content = result.contentStripTruncate
          ? cutContent(result.contentStripTruncate.value)
          : result.contentStrip
            ? cutContent(result.contentStrip.value)
            : result.content
              ? cutContent(result.content.value)
              : ''
        return `
          <a href="${link}" class="algolia-hit-item-link">
          <span class="algolia-hits-item-title">${result.title.value || 'no-title'}</span>
          <p class="algolia-hit-item-content">${content}</p>
          </a>`
      },
      empty: function (data) {
        return (
          '<div id="algolia-hits-empty">' +
          GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
          '</div>'
        )
      }
    }
  })

  const stats = instantsearch.widgets.stats({
    container: '#algolia-info > .algolia-stats',
    templates: {
      text: function (data) {
        const stats = GLOBAL_CONFIG.algolia.languages.hits_stats
          .replace(/\$\{hits}/, data.nbHits)
          .replace(/\$\{time}/, data.processingTimeMS)
        return (
          `<hr>${stats}`
        )
      }
    }
  })

  const powerBy = instantsearch.widgets.poweredBy({
    container: '#algolia-info > .algolia-poweredBy'
  })

  const pagination = instantsearch.widgets.pagination({
    container: '#algolia-pagination',
    totalPages: 5,
    templates: {
      first: '<i class="fas fa-angle-double-left"></i>',
      last: '<i class="fas fa-angle-double-right"></i>',
      previous: '<i class="fas fa-angle-left"></i>',
      next: '<i class="fas fa-angle-right"></i>'
    }
  })

  search.addWidgets([configure, searchBox, hits, stats, powerBy, pagination]) // add the widgets to the instantsearch instance

  search.start()

>>>>>>> 1ebeeb5 (start)
  searchClickFn()
  searchFnOnce()

  window.addEventListener('pjax:complete', () => {
<<<<<<< HEAD
    if (!btf.isHidden($searchMask)) closeSearch()
    searchClickFn()
  })

  if (window.pjax) {
    search.on('render', () => {
      window.pjax.refresh(document.getElementById('algolia-hits'))
    })
  }
=======
    !btf.isHidden($searchMask) && closeSearch()
    searchClickFn()
  })

  window.pjax && search.on('render', () => {
    window.pjax.refresh(document.getElementById('algolia-hits'))
  })
>>>>>>> 1ebeeb5 (start)
})
