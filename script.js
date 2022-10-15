function main() {
  let dom = document;
  let input = dom.querySelector('#input');
  let list = getList()

  render(items)

  function render(items) {
    list = getList()
    if (!list) {
      let section = dom.createElement('section')
      section.className = 'itemsList'
      list = dom.createElement('ul');
      list.id = 'list'
      section.appendChild(list)
      dom.body.querySelector('.container').appendChild(section)
      list = dom.querySelector('#list')
    }
    items.map((item, index) => {
      let li = dom.createElement('li');
      li.id = item.id;
      let textspan = dom.createElement('span')
      textspan.className = 'textspan'
      let text = dom.createTextNode(item.content);
      textspan.appendChild(text)

      let spanButton = dom.createElement('span')
      spanButton.className = 'buttonLabel'

      spanButton.addEventListener('click', (e) => {
        let obj = factory(li)
        items.splice(indexOf(items, obj), 1)
        removeListRendering()
        render(items)
      })

      li.appendChild(textspan);
      li.appendChild(spanButton)

      return li
    })
      .forEach(element => {
        list.appendChild(element)
      });
  }

  function indexOf(items, obj) {
    let i;
    items.forEach((x, index) => {
      if (x.id == obj.id) {
        i = index
      }
    })
    return i
  }

  function factory(obj) {
    return {
      id: obj.id,
      content: obj.children[0].textContent
    }
  }

  function listnerButton(listbutton) {
    listbutton.forEach(item => {
      item.addEventListener('click', (event) => {
        items.splice(parseInt(item.id), 1)
        removeListRendering()
        render(items)
      })
    })
  }


  input.addEventListener('keyup', (event) => {
    if (event.keyCode == 13 && input.value != '' && (input.value.length > 1 && input.value !== ' ')) {
      items.push({
        id: `00${items.length + 1}`,
        title: input.value,
        content: input.value
      })
      input.value = ''
      list = getList()
      removeListRendering()
      render(items)
    }
  })

  function getList() {
    return dom.querySelector('#list')
  }

  function removeListRendering() {
    let x = [...dom.getElementsByClassName('itemsList')]
    dom.body.getElementsByClassName('container')[0].removeChild(x[0])
  }

}

main();
