//声明自定义插件
/**
 * 自定义去除注释的插件
 */
class MyPlugin {
  constructor(options) {
    this.options = options || { target: ".css" };
    console.log("插件配置选项", options);
  }

  //必须声明apply方法,参数compiler
  apply(compiler) {
    //在钩子上挂载功能
    //1. 删除注释
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      //compilation是此次打包的上下文
      for (const name in compilation.assets) {
        console.log(name);
        //针对css文件执行相关操作
        if (name.endsWith(this.options.target)) {
          //获取处理之前的内容
          const contents = compilation.assets[name].source(); //获取文件的内容
          //处理文件的内容，通过正则表达式删除注释
          const noComments = contents.replace(/\/\*[\s\S]*?\*\//g, "");
          //将处理过的内容，替换掉
          compilation.assets[name] = {
            //必须指定两个属性source和size
            source: () => noComments,
            size: () => noComments.length,
          };
        }
      }
    });
  }
}

module.exports = MyPlugin;
