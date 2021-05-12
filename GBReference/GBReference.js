/**
 * https://github.com/z0gSh1u/GBReference
 */

const $ = document.getElementById.bind(document)
const __ = void 0

window = Object.assign(window, {
  _GBReference: {
    id: 0,
    current: void 0,
    records: [],
  },
})

const _CODE = Symbol('_CODE')

const GBs = {
  Book: () => ({
    [_CODE]: 'M',
    作者: __,
    标题: __,
    译者: __ /* string | undefined */,
    出版社地: __,
    出版社: __,
    年份: __,
  }),
  Conference /* Collection indeed */: () => ({
    [_CODE]: 'C',
    作者: __,
    标题: __,
    会议: __,
    地点: __,
    年份: __,
  }),
  Journal: () => ({
    [_CODE]: 'J',
    作者: __,
    标题: __,
    期刊: __,
    年份: __,
  }),
  Degree: () => ({
    [_CODE]: 'D',
    作者: __,
    标题: __,
    地点: __,
    机构: __,
    年份: __,
  }),
  Patent: () => ({
    [_CODE]: 'P',
    作者: __,
    标题: __,
    专利号: __,
    年份: __,
  }),
  ElectricResource: () => ({
    [_CODE]: 'R',
    作者: __,
    标题: __,
    年份: __,
    来源: __,
  }),
}

function buildTemplates() {
  for (const gb in GBs) {
    const tplObj = GBs[gb].call(null)
    const tplRoot = document.createElement('div')
    const code = tplObj[_CODE]
    tplRoot.id = code + '-tpl'
    tplRoot.style.display = 'none'
    let inner = `
<span class="hint">正在添加[${code}]</span>
<form class="form-inline">
`
    for (const param in tplObj) {
      inner += `
<div class="form-group">
  <label>&nbsp;${param}&nbsp;</label>
  <input class="form-control" id="${code}-tpl-${param}" />
</div>
`
    }
    inner += `
<button type="button" class="btn btn-success" id="${code}-tpl-done">Done</button>
</form>
    `
    tplRoot.innerHTML = inner
    $('templates').appendChild(tplRoot)
  }
}

buildTemplates()

const Builder = {
  Book: ({ 作者, 标题, 译者, 出版社地, 出版社, 年份 }) => {
    return `${作者}.${标题}[${GBs.Book()[_CODE]}].${
      译者 ? 译者 + '译.' : ''
    }${出版社地}:${出版社}.${年份}.`
  },
  Conference: ({ 作者, 标题, 会议, 地点, 年份 }) => {
    return `${作者}.${标题}:${会议}[${
      GBs.Conference()[_CODE]
    }].${地点}.${年份}.`
  },
  Journal: ({ 作者, 标题, 期刊, 年份 }) => {
    return `${作者}.${标题}[${GBs.Journal()[_CODE]}].${期刊}.${年份}.`
  },
  Degree: ({ 作者, 标题, 地点, 机构, 年份 }) => {
    return `${作者}.${标题}[${GBs.Degree()[_CODE]}].${地点}:${机构}.${年份}.`
  },
  Patent: ({ 作者, 标题, 专利号, 年份 }) => {
    return `${作者}.${标题}:${专利号}[${GBs.Patent()[_CODE]}].${年份}.`
  },
  ElectricResource: ({ 作者, 标题, 年份, 来源 }) => {
    return `${作者}.${标题}[${GBs.ElectricResource()[_CODE]}].${年份}.${来源}.`
  },
}

function appendLine(line) {
  _GBReference.records.push({ id: _GBReference.id + 1, line })
  const tr = document.createElement('tr')
  const td1 = document.createElement('td')
  td1.innerText = ++_GBReference.id
  const td2 = document.createElement('td')
  td2.innerText = line
  tr.appendChild(td1)
  tr.appendChild(td2)
  $('table-body').appendChild(tr)
}

function addTriggerListeners() {
  for (let gb in GBs) {
    const tplObj = GBs[gb].call(null)
    const code = tplObj[_CODE]
    $(code + '-trigger').addEventListener('click', () => {
      if (_GBReference.current) {
        $(_GBReference.current + '-tpl').style.display = 'none'
      }
      _GBReference.current = code
      $(_GBReference.current + '-tpl').style.display = 'block'
    })
  }
}

addTriggerListeners()

function addDoneListeners() {
  for (let gb in GBs) {
    const tplObj = GBs[gb].call(null)
    const code = tplObj[_CODE]
    $(code + '-tpl-done').addEventListener('click', () => {
      const info = eval(`GBs.${gb}()`)
      for (const key in info) {
        info[key] = $(code + '-tpl-' + key).value
        $(code + '-tpl-' + key).value = ''
      }
      appendLine(eval(`Builder.${gb}(info)`))
    })
  }
}

addDoneListeners()

$('btn-generate').addEventListener('click', () => {
  let text = ''
  _GBReference.records.forEach((record) => {
    text += `[${record.id}] ${record.line}\n`
  })
  $('output').value = text
})
