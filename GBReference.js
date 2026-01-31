/**
 * GBReference
 * github.com/z0gSh1u/GBReference
 */

; (function 把记录挂到window下() {
  Object.assign(window, {
    _GBReference: {
      目前分配到的唯一编号: 0, // 0 无效，1 开始
      目前分配到的序号: 0, // 0 无效，1 开始
      当前新增的类型: void 0,
      记录们: [],
    },
  });
})();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const _____ = void 0;
const 标识代码 = Symbol();
const 串起来 = (字符串) => 字符串.replace(/\r\n/g, '').replace(/\n/g, '').trim();
const 真 = true;
const 假 = false;
let 我 = window._GBReference;
let 正在拖拽的行 = null;

// prettier-ignore
const 分类们 = {
  图书: () => ({
    [标识代码]: 'M',
    作者: _____, 标题: _____, 译者: _____, 出版社: _____,
    出版社地: _____, 年份: _____,
  }),
  会议: () => ({
    [标识代码]: 'C',
    作者: _____, 标题: _____, 会议: _____, 地点: _____,
    年份: _____,
  }),
  期刊: () => ({
    [标识代码]: 'J',
    作者: _____, 标题: _____, 期刊: _____, 年份: _____,
  }),
  学位论文: () => ({
    [标识代码]: 'D',
    作者: _____, 标题: _____, 地点: _____, 机构: _____,
    年份: _____,
  }),
  专利: () => ({
    [标识代码]: 'P',
    作者: _____, 标题: _____, 专利号: _____, 年份: _____,
  }),
  报告: () => ({
    [标识代码]: 'R',
    作者: _____, 标题: _____, 年份: _____, 来源: _____,
  }),
  数据库: () => ({
    [标识代码]: 'DB',
    作者: _____, 标题: _____, 年份: _____, 来源: _____,
  }),
  电子公告: () => ({
    [标识代码]: 'EB',
    作者: _____, 标题: _____, 年份: _____, 来源: _____,
  }),
  计算机程序: () => ({
    [标识代码]: 'CP',
    作者: _____, 标题: _____, 年份: _____, 来源: _____,
  }),
};

// prettier-ignore
const 模板们 = {
  图书: ({ 作者, 标题, 译者, 出版社地, 出版社, 年份, _在线 }) =>
    串起来(`
${作者}.
 ${标题}[${分类们.图书()[标识代码]}${_在线 ? '/OL' : ''}].
 ${译者 ? 译者 + '译.' : ''}
 ${出版社地}:${出版社}.
 ${年份}.`),

  会议: ({ 作者, 标题, 会议, 地点, 年份, _在线 }) =>
    串起来(`
${作者}.
 ${标题}:${会议}[${分类们.会议()[标识代码]}${_在线 ? '/OL' : ''}].
 ${地点}.${年份}.`),

  期刊: ({ 作者, 标题, 期刊, 年份, _在线 }) =>
    串起来(`
${作者}.
 ${标题}[${分类们.期刊()[标识代码]}${_在线 ? '/OL' : ''}].
 ${期刊}.${年份}.`),

  学位论文: ({ 作者, 标题, 地点, 机构, 年份, _在线 }) =>
    串起来(`
${作者}.
 ${标题}[${分类们.学位论文()[标识代码]}${_在线 ? '/OL' : ''}].
 ${地点}:${机构}.${年份}.`),

  专利: ({ 作者, 标题, 专利号, 年份, _在线 }) =>
    串起来(`
${作者}.
 ${标题}:${专利号}[${分类们.专利()[标识代码]}${_在线 ? '/OL' : ''}].${年份}.`),

  报告: ({ 作者, 标题, 年份, 来源, _在线 }) =>
    串起来(`
${作者}.
 ${标题}[${分类们.报告()[标识代码]}${_在线 ? '/OL' : ''}].${年份}.${来源}.`),

  数据库: ({ 作者, 标题, 年份, 来源, _在线 }) =>
    串起来(`
${作者}.
 ${标题}[${分类们.数据库()[标识代码]}${_在线 ? '/OL' : ''}].${年份}.${来源}.`),

  电子公告: ({ 作者, 标题, 年份, 来源, _在线 }) =>
    串起来(`
${作者}.
 ${标题}[${分类们.电子公告()[标识代码]}${_在线 ? '/OL' : ''}].${年份}.${来源}.`),

  计算机程序: ({ 作者, 标题, 年份, 来源, _在线 }) =>
    串起来(`
${作者}.
 ${标题}[${分类们.计算机程序()[标识代码]}${_在线 ? '/OL' : ''}].${年份}.${来源}.`)
}

  ; (function 准备分类按钮() {
    let 内部HTML = '';
    for (const 分类名 in 分类们) {
      const 分类信息 = 分类们[分类名]();
      const 这个标识代码 = 分类信息[标识代码];
      // 使用 btn-primary Outline 风格（自定义CSS）或 default
      const 按钮HTML = `<button class="btn btn-default" id="${这个标识代码}的按钮" title="添加${分类名}引用">[${这个标识代码}]${分类名}</button>`;
      内部HTML += 按钮HTML + '\n';
    }
    $('#分类按钮们').innerHTML = 内部HTML;
  })()
  ; (function 构建信息模板() {
    for (const 分类名 in 分类们) {
      const 分类信息 = 分类们[分类名]();
      const 模板根元素 = document.createElement('div');
      const 这个标识代码 = 分类信息[标识代码];
      模板根元素.id = 这个标识代码 + '的模板';
      模板根元素.classList = 'myTemplateRoot';
      模板根元素.style.display = 'none';
      let 内部HTML = `
      <div class="alert alert-info hint" role="alert">
        <span class="glyphicon glyphicon-edit"></span> 正在添加: <strong>[${这个标识代码}] ${分类名}</strong>
      </div>
      <form class="form-horizontal">`;
      for (const 参数 in 分类信息) {
        内部HTML += `
<div class="input-group myInputGroup">
  <span class="input-group-addon">${参数}</span>
  <input class="form-control" id="${这个标识代码}的模板的${参数}" placeholder="请输入${参数}..." />
</div>`;
      }
      内部HTML += `
<div class="btn-group btn-group-justified" role="group" style="margin-top: 15px;">
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-success myOKBtn w-100" id="${这个标识代码}的一般资源">
      <span class="glyphicon glyphicon-book"></span> 一般资源
    </button>
  </div>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-info myOKBtn w-100" id="${这个标识代码}的在线资源">
      <span class="glyphicon glyphicon-globe"></span> 在线资源
    </button>
  </div>
</div>
</form>`;
      模板根元素.innerHTML = 内部HTML;
      $('#模板根元素').appendChild(模板根元素);
    }
  })();

function 规范化(内容) {
  return 内容
    .replace(/\.+/g, '.')
    .replace(/:\./g, '')
    .replace('[" "]+', ' ')
    .replace(/:\[/g, '[');
}

function 检查空提示() {
  const 行数 = $('#暂存表表身').children.length;
  const 提示 = $('#empty-hint');
  if (提示) {
    提示.style.display = 行数 === 0 ? 'block' : 'none';
  }
}

function 刷新序号们() {
  const 行们 = $('#暂存表表身').children;
  for (let 下标 = 0; 下标 < 行们.length; 下标++) {
    行们[下标].children[1].innerText = `[${下标 + 1}]`;
    行们[下标].dataset.序号 = 下标;
  }
  我.目前分配到的序号 = 行们.length;
  检查空提示();
}

function 删(序号) {
  我.记录们.splice(序号, 1);
  $('#暂存表表身').children[序号].remove();
  刷新序号们();
}

function 上移(序号) {
  if (序号 <= 0) return;
  const 记录 = 我.记录们.splice(序号, 1)[0];
  我.记录们.splice(序号 - 1, 0, 记录);
  const 行 = $('#暂存表表身').children[序号];
  const 上一行 = $('#暂存表表身').children[序号 - 1];
  $('#暂存表表身').insertBefore(行, 上一行);
  刷新序号们();
}

function 下移(序号) {
  if (序号 >= 我.记录们.length - 1) return;
  const 记录 = 我.记录们.splice(序号, 1)[0];
  我.记录们.splice(序号 + 1, 0, 记录);
  const 行 = $('#暂存表表身').children[序号];
  const 下下一行 = $('#暂存表表身').children[序号 + 2] || null;
  $('#暂存表表身').insertBefore(行, 下下一行);
  刷新序号们();
}

function 加(行) {
  const 表格行 = document.createElement('tr');
  表格行.draggable = true;
  // 现在只有3列：操作、序号、内容 (编号列已移除)
  const 表格列们 = Array.from(Array(3), () => document.createElement('td'));
  const 编号 = ++我.目前分配到的唯一编号;
  const 当前序号 = 我.记录们.length;
  我.记录们.push({ 目前分配到的唯一编号: 编号, 行 });
  表格行.dataset.序号 = 当前序号;

  // 操作列：删除、上移、下移按钮
  表格列们[0].innerHTML = `
    <div class="btn-group">
      <button class="btn btn-danger btn-xs 删除按钮" title="删除"><span class="glyphicon glyphicon-remove"></span></button>
      <button class="btn btn-default btn-xs 上移按钮" title="上移"><span class="glyphicon glyphicon-arrow-up"></span></button>
      <button class="btn btn-default btn-xs 下移按钮" title="下移"><span class="glyphicon glyphicon-arrow-down"></span></button>
    </div>
    <span class="drag-handle" title="拖拽排序"><span class="glyphicon glyphicon-menu-hamburger"></span></span>
  `;
  // 序号
  表格列们[1].innerText = `[${++我.目前分配到的序号}]`;
  // 内容
  表格列们[2].innerText = 行;
  表格列们.map((列) => 表格行.appendChild(列));

  // 绑定按钮事件
  表格列们[0].querySelector('.删除按钮').addEventListener('click', () => {
    const 当前序号 = parseInt(表格行.dataset.序号);
    删(当前序号);
  });
  表格列们[0].querySelector('.上移按钮').addEventListener('click', () => {
    const 当前序号 = parseInt(表格行.dataset.序号);
    上移(当前序号);
  });
  表格列们[0].querySelector('.下移按钮').addEventListener('click', () => {
    const 当前序号 = parseInt(表格行.dataset.序号);
    下移(当前序号);
  });

  // 拖拽排序事件
  表格行.addEventListener('dragstart', (事件) => {
    正在拖拽的行 = 表格行;
    表格行.classList.add('dragging');
    事件.dataTransfer.effectAllowed = 'move';
  });
  表格行.addEventListener('dragend', () => {
    表格行.classList.remove('dragging');
    正在拖拽的行 = null;
    $$('#暂存表表身 tr').forEach(行 => 行.classList.remove('drag-over'));
  });
  表格行.addEventListener('dragover', (事件) => {
    事件.preventDefault(); // 允许放置
    事件.dataTransfer.dropEffect = 'move';
    if (正在拖拽的行 && 正在拖拽的行 !== 表格行) {
      表格行.classList.add('drag-over');
    }
  });
  表格行.addEventListener('dragleave', () => {
    表格行.classList.remove('drag-over');
  });
  表格行.addEventListener('drop', (事件) => {
    事件.preventDefault();
    表格行.classList.remove('drag-over');
    if (正在拖拽的行 && 正在拖拽的行 !== 表格行) {
      const 源序号 = parseInt(正在拖拽的行.dataset.序号);
      const 目标序号 = parseInt(表格行.dataset.序号);
      // 移动记录
      const 记录 = 我.记录们.splice(源序号, 1)[0];
      我.记录们.splice(目标序号, 0, 记录);
      // 移动 DOM
      if (源序号 < 目标序号) {
        表格行.parentNode.insertBefore(正在拖拽的行, 表格行.nextSibling);
      } else {
        表格行.parentNode.insertBefore(正在拖拽的行, 表格行);
      }
      刷新序号们();
    }
  });

  $('#暂存表表身').appendChild(表格行);
  检查空提示();
}

; (function 监听分类按钮点击() {
  for (const 分类名 in 分类们) {
    const 分类信息 = 分类们[分类名]();
    const 这个标识代码 = 分类信息[标识代码];
    $(`#${这个标识代码}的按钮`).addEventListener('click', (e) => {
      // 处理 UI 状态
      $$('.btns .btn').forEach(btn => btn.classList.remove('btn-primary', 'active'));
      $$('.btns .btn').forEach(btn => btn.classList.add('btn-default'));
      e.target.classList.remove('btn-default');
      e.target.classList.add('btn-primary', 'active');

      // 隐藏占位符
      $('#模板占位符').style.display = 'none';

      if (我.当前新增的类型) {
        $(`#${我.当前新增的类型}的模板`).style.display = 'none';
      }
      我.当前新增的类型 = 这个标识代码;
      $(`#${我.当前新增的类型}的模板`).style.display = 'block';
    });
  }
})()
  ; (function 监听确认按钮点击() {
    function 加监听(的啥, 在线) {
      for (const 分类名 in 分类们) {
        const 分类信息 = 分类们[分类名]();
        const 这个标识代码 = 分类信息[标识代码];
        $(`#${这个标识代码}的${的啥}`).addEventListener('click', () => {
          let 没填 = true;
          for (const 参数 in 分类信息) {
            分类信息[参数] = $(`#${这个标识代码}的模板的${参数}`).value.trim();
            分类信息[参数] && (没填 = false);
            $(`#${这个标识代码}的模板的${参数}`).value = '';
          }
          if (没填) {
            alert('输入为空，请检查！');
            return;
          }
          // 直接调用模板函数，不使用 eval
          const 生成结果 = 模板们[分类名]({ ...分类信息, _在线: 在线 });
          加(规范化(生成结果));
        });
      }
    }
    加监听('一般资源', 假);
    加监听('在线资源', 真);
  })();

$('#生成按钮').addEventListener('click', () => {
  let 结果 = '';
  我.记录们.forEach((记录, 下标) => (结果 += `[${下标 + 1}] ${记录.行}\n`));
  $('#输出框').value = 结果;
});

$('#复制按钮').addEventListener('click', () => {
  const 输出内容 = $('#输出框').value;
  if (!输出内容.trim()) {
    alert('没有内容可复制，请先点击"生成"按钮！');
    return;
  }
  // 使用现代 Clipboard API，带降级方案
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(输出内容).then(() => {
      alert('复制成功！');
    }).catch(() => {
      降级复制(输出内容);
    });
  } else {
    降级复制(输出内容);
  }
});

function 降级复制(文本) {
  // 选中文本框内容并执行复制
  $('#输出框').select();
  try {
    document.execCommand('copy');
    alert('复制成功！');
  } catch (错误) {
    alert('复制失败，请手动复制');
  }
}

$('#清空按钮').addEventListener('click', () => {
  if (confirm('确认清空？')) {
    尝试操作localStorage(() => {
      localStorage.removeItem('_GBReference');
    });
    // 重置状态而不刷新页面
    我.目前分配到的唯一编号 = 0;
    我.目前分配到的序号 = 0;
    我.记录们 = [];
    $('#暂存表表身').innerHTML = '';
    $('#输出框').value = '';
    检查空提示();
  }
});

function 尝试操作localStorage(操作) {
  try {
    操作();
    return 真;
  } catch (错误) {
    console.warn('localStorage 操作失败:', 错误);
    return 假;
  }
}

$('#读取按钮').addEventListener('click', () => {
  let serial = null;
  尝试操作localStorage(() => {
    serial = localStorage.getItem('_GBReference');
  });
  if (!serial) {
    alert('没有找到暂存！');
    return;
  }
  try {
    const 那个我 = JSON.parse(serial);
    // 先清空当前状态
    我.目前分配到的序号 = 0;
    我.目前分配到的唯一编号 = 0;
    我.记录们 = [];
    $('#暂存表表身').innerHTML = '';
    // 重新添加记录
    那个我.记录们.forEach((记录) => 加(记录.行));
    // 恢复唯一编号（保持原有编号的连续性）
    我.目前分配到的唯一编号 = 那个我.目前分配到的唯一编号;
    alert('读取成功！');
    检查空提示();
  } catch (错误) {
    console.error('解析暂存数据失败:', 错误);
    alert('暂存数据已损坏，无法读取！');
  }
});

$('#暂存按钮').addEventListener('click', () => {
  const 成功 = 尝试操作localStorage(() => {
    localStorage.setItem('_GBReference', JSON.stringify(我));
  });
  if (成功) {
    alert('暂存成功！');
  } else {
    alert('暂存失败！可能是浏览器禁用了 localStorage（如无痕模式）');
  }
});

检查空提示();
