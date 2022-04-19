module.exports.data = {
  subtitle: "11ty.js JavaScript",
  argData: {
    pass: "With Data",
  }
};

module.exports.render = async function(data) {

  return `
<h2>Edge Template Syntax Tests</h2>

<div id="tests">
  <div>Markdown: ${await this.edge("✅ `No Data`", "md")}</div>
  <div>Markdown (no data render): ${await this.edge("✅ `{{pass}}`", "md", data.argData)}</div>
  <div>Liquid: ${await this.edge("✅ <code>No Data</code>", "liquid")}</div>
  <div>Liquid: ${await this.edge("✅ <code>{{pass}}</code>", "liquid", data.argData)}</div>
  <div>Liquid, Markdown: ${await this.edge("✅ `No Data`", "liquid,md")}</div>
  <div>Liquid, Markdown: ${await this.edge("✅ `{{pass}}`", "liquid,md", data.argData)}</div>
  <div>Nunjucks: ${await this.edge("✅ <code>No Data</code>", "njk")}</div>
  <div>Nunjucks: ${await this.edge("✅ <code>{{pass}}</code>", "njk", data.argData)}</div>
  <div>Nunjucks, Markdown: ${await this.edge("✅ `No Data`", "njk,md")}</div>
  <div>Nunjucks, Markdown: ${await this.edge("✅ `{{pass}}`", "njk,md", data.argData)}</div>
</div>
`;
};


