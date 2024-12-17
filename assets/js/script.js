$(document).ready(function () {
  $(".service-slide").slick({
    dots: true,
    arrows: false,
    adaptiveHeight: true,
  })
})
;(function () {
  //burger menu>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  var button = document.querySelector(".btn-menu")
  var menu = document.querySelector(".header-menu__ul")

  button.addEventListener("click", function () {
    menu.classList.toggle("active")
  })

  //плавный скролл меню>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  var smoothScroll = function (targetEl, duration) {
    //var headerElHeight = document.querySelector('#header').clientHeight; // класс хедера
    var navHeight = document.querySelector(".header-menu__nav").clientHeight // класс хедера

    var target = document.querySelector(targetEl)
    var targetPosition = target.getBoundingClientRect().top - navHeight //вычитаем размер меню
    var startPosition = window.pageYOffset
    var startTime = null

    var ease = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    var animation = function (currentTime) {
      if (startTime === null) startTime = currentTime
      var timeElapsed = currentTime - startTime
      var run = ease(timeElapsed, startPosition, targetPosition, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }
    requestAnimationFrame(animation)
  }

  var scrollTo = function () {
    var headerNav = document.querySelector(".header-menu__ul")
    //var links = document.querySelectorAll('.js-scroll'); //добавляем классы к линкам
    var links = document.querySelectorAll(".header-menu__ul li a") //добавляем классы к линкам

    links.forEach((each) => {
      each.addEventListener("click", function () {
        var currentTarget = this.getAttribute("href")
        smoothScroll(currentTarget, 1000)
        //выход из мобильного меню
        headerNav.classList.remove("active")
      })
    })
  }
  scrollTo()

  //scroll top >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  var intervalId = 0 // Needed to cancel the scrolling when we're at the top of the page
  var scrollButton = document.querySelector(".to-top") // Reference to our scroll button
  var header = document.querySelector("#header")
  var headerHeight = header.clientHeight

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > headerHeight) scrollButton.style.display = "block"
    else scrollButton.style.display = "none"
  })

  function scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId)
    }
    window.scroll(0, window.pageYOffset - 50)
  }

  function scrollToTop() {
    intervalId = setInterval(scrollStep, 7)
  }

  scrollButton.addEventListener("click", scrollToTop)
})()

//faq
function toggleAccordion(element) {
  const parent = element.parentElement
  const isActive = parent.classList.contains("active")

  // Close all other accordion items
  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Toggle the clicked item
  if (!isActive) {
    parent.classList.add("active")
  }
}
