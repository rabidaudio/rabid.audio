window.addEventListener('DOMContentLoaded', () => {
  // if page contains latex, load mathjax script, and re-write code blocks
  if (document.querySelectorAll('.language-latex').length == 0) {
    return
  }

  window.MathJax = {
    startup: {
      // only render blocks with class "mathjax"
      elements: ['.mathjax'],
      ready() {
        // lib loaded
        let elements = []
        document.querySelectorAll('.language-latex').forEach(el => {
          const newEl = document.createElement("div")
          newEl.textContent = el.textContent
          newEl.classList.add("mathjax")
          newEl.style.display = "none"
          el.after(newEl)
          elements.push({ el, newEl })
        })
        // lib initialized
        MathJax.startup.defaultReady()
        MathJax.startup.promise.then(() => {
          // replacements run
          for (const { el, newEl } of elements) {
            el.style.display = "none"
            newEl.style.display = "block"
          }
        })
      }
    }
  }

  const script = document.createElement('script')
  script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js')
  document.head.appendChild(script)
})
