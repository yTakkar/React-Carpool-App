import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'

/** SHORTENS GIVEN STRING BY GIVEN LENGTH */
export const shortener = (elem, length) => {
  let parse = parseInt(length),
    len = elem.length
  if (!parse) {
    return
  }
  return len >= parse
    ? `${elem.substr(0, length - 2)}..`
    : len < parse ? elem : null
}

/** RETURNS UNIQUE STRING */
export const uniq = () =>
  Math.random()
    .toString(5)
    .slice(2)

/** FUNCTION FOR HUMAN-READABLE */
export const humanReadable = (value, text) => {
  let hr =
    value == 0 ? `No ${text}s` : value == 1 ? `1 ${text}` : `${value} ${text}s`
  return hr
}

/** FUNCTION TO TOGGLE */
export const toggle = el => {
  let style = el.style.display
  style === 'none' ? (el.style.display = 'block') : (el.style.display = 'none')
}

/* FUNCTION TO CAPITALIZE FIRST LETTER OF A WORD */
export const c_first = str => str.charAt(0).toUpperCase() + str.substr(1)

/** FOR REPLACING ILLEGAL CHARACTERS */
export const replacer = (elements, filter) => {
  let regex =
    filter == 'normal' ? /[^a-z0-9_.@$#]/i : filter == 'bio' ? /[<>]/i : null

  for (let el of elements) {
    el.on('keyup', () => {
      let value = el.val()
      el.val(value.replace(regex, ''))
    })
  }
}

/** FUNCTION FOR LOGIN AND SIGNUP */
export const commonLogin = options => {
  let { data, btn, url, done, defBtnValue } = options,
    overlay2 = $('.overlay-2')

  btn.attr('value', 'Please wait..').addClass('a_disabled')
  overlay2.show()

  post(url, data)
    .then(s => {
      let { data: { mssg, success } } = s
      if (success) {
        Notify({
          value: mssg,
          done: () => done()
        })
        btn.attr('value', 'Redirecting..')
      } else {
        Notify({
          value:
            typeof mssg == 'object' ? (mssg.length > 1 ? mssg[0] : mssg) : mssg
        })
        btn.attr('value', defBtnValue).removeClass('a_disabled')
      }

      overlay2.hide()
      btn.blur()
    })
    .catch(e => console.log(e))
}
