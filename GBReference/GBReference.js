/**
 * GBReference
 * github.com/z0gSh1u/GBReference
 */

const $ = document.querySelector.bind(document)
const _____ = void 0
const 标识代码 = Symbol()
const 串起来 = (字符串) => 字符串.replace(/\r\n/g, '').replace(/\n/g, '').trim()

;(function 把记录挂到window下() {
  Object.assign(window, {
    我: {
      目前分配到的临时编号: 0,
      当前新增的类型: void 0,
      记录们: [],
    },
  })
})()

// prettier-ignore
const 分类们 = {
  图书: () => ({
    [标识代码]: 'M',
    作者: _____,    标题: _____,    译者: _____,    出版社: _____,
    出版社地: _____,    年份: _____,
  }),
  会议: () => ({
    [标识代码]: 'C',
    作者: _____,    标题: _____,    会议: _____,    地点: _____,
    年份: _____,
  }),
  期刊: () => ({
    [标识代码]: 'J',
    作者: _____,    标题: _____,    期刊: _____,    年份: _____,
  }),
  学位论文: () => ({
    [标识代码]: 'D',
    作者: _____,    标题: _____,    地点: _____,    机构: _____,
    年份: _____,
  }),
  专利: () => ({
    [标识代码]: 'P',
    作者: _____,    标题: _____,    专利号: _____,    年份: _____,
  }),
  报告: () => ({
    [标识代码]: 'R',
    作者: _____,    标题: _____,    年份: _____,    来源: _____,
  }),
  数据库: () => ({
    [标识代码]: 'DB',
    作者: _____,    标题: _____,    年份: _____,    来源: _____,
  }),
  电子公告: () => ({
    [标识代码]: 'EB',
    作者: _____,    标题: _____,    年份: _____,    来源: _____,
  }),
  计算机程序: () => ({
    [标识代码]: 'CP',
    作者: _____,    标题: _____,    年份: _____,    来源: _____,
  }),
}

// prettier-ignore
const 拼字符串的们 = {
  图书: ({ 作者, 标题, 译者, 出版社地, 出版社, 年份 }) => 
    串起来(`
${作者}.
 ${标题}[${分类们.图书()[标识代码]}].
 ${译者 ? 译者 + '译.' : ''}
 ${出版社地}:${出版社}.
 ${年份}.`
    ),
  会议: ({ 作者, 标题, 会议, 地点, 年份 }) => 
    串起来(`
${作者}.
 ${标题}:${会议}[${分类们.会议()[标识代码]
    }].${地点}.${年份}.`)
  ,
  期刊: ({ 作者, 标题, 期刊, 年份 }) => {
    return `${作者}.${标题}[${分类们.Journal()[标识代码]}].${期刊}.${年份}.`
  },
  学位论文: ({ 作者, 标题, 地点, 机构, 年份 }) => {
    return `${作者}.${标题}[${分类们.Degree()[标识代码]}].${地点}:${机构}.${年份}.`
  },
  专利: ({ 作者, 标题, 专利号, 年份 }) => {
    return `${作者}.${标题}:${专利号}[${分类们.专利()[标识代码]}].${年份}.`
  },
  报告: ({ 作者, 标题, 年份, 来源 }) => {
    return `${作者}.${标题}[${
      分类们.报告()[标识代码]
    }].${年份}.${来源}.`
  },
  数据库: ({ 作者, 标题, 年份, 来源 }) => {
    return `${作者}.${标题}[${
      分类们.数据库()[标识代码]
    }].${年份}.${来源}.`
  },
  电子公告: ({ 作者, 标题, 年份, 来源 }) => {
    return `${作者}.${标题}[${
      分类们.电子公告()[标识代码]
    }].${年份}.${来源}.`
  },
  计算机程序: ({ 作者, 标题, 年份, 来源 }) => {
    return `${作者}.${标题}[${
      分类们.计算机程序()[标识代码]
    }].${年份}.${来源}.`
  },
}

;(function 准备分类按钮() {
  let 内部HTML = ''
  for (const 分类名 in 分类们) {
    const 分类信息 = 分类们[分类名]()
    const 这个标识代码 = 分类信息[标识代码]
    const 按钮HTML = `<button class="btn btn-default" id="${这个标识代码}的按钮">[${这个标识代码}]${分类名}</button>`
    内部HTML += 按钮HTML + '\n'
  }
  $('#分类按钮们').innerHTML = 内部HTML
})()
;(function 构建信息模板() {
  for (const 分类名 in 分类们) {
    const 分类信息 = 分类们[分类名]()
    const 模板根元素 = document.createElement('div')
    const 这个标识代码 = 分类信息[标识代码]
    模板根元素.id = 这个标识代码 + '的模板'
    模板根元素.style.display = 'none'
    let 内部HTML = `
<span class="hint">正在添加[${这个标识代码}]</span>
<form class="form-inline">
    `
    for (const 参数 in 分类信息) {
      内部HTML += `
<div class="form-group">
  <label>&nbsp;${参数}&nbsp;</label>
  <input class="form-control" id="${这个标识代码}的模板的${参数}" />
</div>
`
    }
    内部HTML += `
<button type="button" class="btn btn-success" id="${这个标识代码}的啊对对对">啊对对对</button>
</form>
    `
    模板根元素.innerHTML = 内部HTML
    $('#templates').appendChild(模板根元素)
  }
})()

function 删(号) {
  我.记录们.splice(号 - 1, 1)
  $('#mytable').children[号].remove()
}

function 加一行(行) {
  const 表格行 = document.createElement('tr')
  const 表格列们 = Array.from(Array(3), () => document.createElement('td'))
  const 编号 = 我.目前分配到的临时编号 + 1
  我.记录们.push({ 目前分配到的临时编号: 编号, 行 })
  表格列们[0].innerHTML = `<button onclick="删(${编号})">&nbsp;删&nbsp;</button>`
  表格列们[1].innerText = ++我.目前分配到的临时编号
  表格列们[2].innerText = 行
  表格列们.map((列) => 表格行.appendChild(列))
  $('#table-body').appendChild(表格行)
}

;(function 监听分类按钮点击() {
  for (const 分类名 in 分类们) {
    const 分类信息 = 分类们[分类名]()
    const 这个标识代码 = 分类信息[标识代码]
    $(`#${这个标识代码}的按钮`).addEventListener('click', () => {
      if (我.当前新增的类型) {
        $(`#${我.当前新增的类型}的模板`).style.display = 'none'
      }
      我.当前新增的类型 = 这个标识代码
      $(`#${我.当前新增的类型}的模板`).style.display = 'block'
    })
  }
})()
;(function 监听啊对对对按钮点击() {
  for (const 分类名 in 分类们) {
    const 分类信息 = 分类们[分类名]()
    const 这个标识代码 = 分类信息[标识代码]
    $(`#${这个标识代码}的啊对对对`).addEventListener('click', () => {
      let 啥都没得 = true
      for (const 参数 in 分类信息) {
        分类信息[参数] = $(`#${这个标识代码}的模板的${参数}`).value.trim()
        分类信息[参数] && (啥都没得 = false)
        $(`#${这个标识代码}的模板的${参数}`).value = ''
      }
      if (啥都没得) {
        alert('啥都没得，请检查信息填好了吗~')
        return
      }
      加一行(eval(`拼字符串的们.${分类名}(分类信息)`))
    })
  }
})()

$('#btn-generate').addEventListener('click', () => {
  let text = ''
  我.records.forEach((record) => {
    text += `[${record.id}] ${record.line}\n`
  })
  $('output').value = text
})
