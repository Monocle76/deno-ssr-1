import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";

const app = new Application()

const tmpl = await Deno.readTextFile("views\\template.html");

async function ParseFile(filePath: string, data: Record<string, string> = {}) {
  let fileData = await Deno.readTextFile(filePath);
  for (const i of Object.keys(data)) {
    fileData = fileData.replace(`{ ${i} }`, data[i])
  }
  return tmpl.replace("{ body }", fileData);
}

app
  .get("/", () => {
    return ParseFile("views\\index.html")
  })
  .get("/greet/:name", (c) => {
    return ParseFile("views\\greet.html", c.params)
  })
  .static("/static", "assets")
  .start({ port: 4000 })
