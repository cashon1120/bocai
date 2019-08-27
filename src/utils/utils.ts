export function setBodyScroll(flag : boolean) {
  const styleTop = Math.abs(Number.parseInt(`${document.body.style.top}`))
  let scrollTop
  if (document.scrollingElement) {
    scrollTop = document.scrollingElement.scrollTop
  }
  const top : number | undefined = styleTop > 0
    ? styleTop
    : scrollTop
  if (flag) {
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    if (top) {
      document.body.style.top = -top + 'px'
    }
  } else {
    document.body.style.position = 'initial'
    document.body.style.height = 'auto'
    if(top && document.scrollingElement){
      document.scrollingElement.scrollTop = top
    }
    document.body.style.top = '0'
  }
}