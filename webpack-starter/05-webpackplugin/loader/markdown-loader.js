const marked = require("marked");

//获取传递的参数
const { getOptions } = require("loader-utils");

//loader本质上导出的就是一个函数 使用普通函数，不要使用箭头函数，要使用this
module.exports = function (source)  {
  //获取loader的配置项
  const options = getOptions(this);
  console.log(options)

  const html = marked.parse(source);

  //返回的结果必须是js代码
  // return 'console.log("my loader")';
  // return `module.exports = ${JSON.stringify(html)}`;

  //返回HTML 交给下一个loader进行处理
  return html;
};
