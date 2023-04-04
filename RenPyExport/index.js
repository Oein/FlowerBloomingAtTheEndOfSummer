let charDefines = {
  ...{
    "#유미": "유미",

    smnvl_me: "나",
    narrator: "",

    trnvl_so: "소녀",
    shnvl_me: "나",
    shnvl_hy: "현지",
    shnvl_yu: "유미",
    shnvl: "",
    trnvl: "",
    smnvl: "",
    유미: "유미",
    나: "나",
    소녀: "소녀",
    현지: "현지",
    가연: "가연",
    whoyumi: "***",
    whoso: "***",
    whohy: "***",
    whoo: "***",
    whol: "***",
    who: "***",

    maintest: "유미",
    나o: "나",
    가연o: "가연",
    소녀o: "소녀",
    남학생o: "남학생",

    naro: "",
    나l: "나",
    소녀l: "소녀",
    유미l: "유미",
    narl: "",
  },
  ...{
    whome: "나?",
    whogirl: "여자아이",
    간호사: "간호사",
  },
};

console.log(charDefines);
const { readFileSync, writeFileSync, readdirSync } = require("fs");
function main(fn) {
  let renpyFile = readFileSync(fn)
    .toString()
    .replace(/\t/gi, "")
    .replace(/    /gi, "")
    .replace(/\n\n/gi, "\n")
    .replace(/\r\n/gi, "\n")
    .replace(/\n\t\n/gi, "\n")
    .split("\n");

  let out = [];

  renpyFile.forEach((line, index) => {
    if (line.startsWith("$")) return;
    if (line.startsWith("scene")) return;
    if (line.startsWith("#")) return;
    if (line.startsWith("show")) return;
    if (line.startsWith("with")) return;
    if (line.startsWith("stop")) return;
    if (line.startsWith("hide")) return;
    if (line.startsWith("play")) return;
    if (line.startsWith("zoom")) return;
    if (line.startsWith("easein")) return;
    if (line.startsWith("alpha")) return;
    if (line.startsWith("scale")) return;
    if (line.startsWith("linear")) return;
    if (line.startsWith("repeat")) return;
    if (line.startsWith("voice")) return;
    if (line.length <= 0) return;
    if (line.trim() == "\n") return;
    if (line.trim() == "") return;
    if (line.trim() == "return") return;
    if (line.startsWith("label")) {
      if (out.length) {
        writeFileSync(
          "outs/" + out[0] + ".txt",
          out.splice(1, out.length).join(" ")
        );
      }
      out = ["LABEL " + line];
      return;
    }
    Object.keys(charDefines).forEach((key) => {
      line = line.replace(key, charDefines[key]);
    });
    Object.values(charDefines).forEach((val) => {
      if (line.startsWith(val)) {
        line = line.replace(val, "");
      }
    });
    line = line.trim();
    if (line == `“.......”"`) line = `“.......”`;
    line = line.replace(/"“/gi, "“");
    line = line.replace(/”"/gi, "”");
    line = line.replace('”"', "”");
    line = line.replace('”"', "”");
    line = line.replace(/'/gi, "");
    line = line.replace(/"/gi, "");
    line = line.replace(/“/gi, "");

    line = line.replace(/”/gi, "");
    while (line.indexOf("{") != -1) {
      let start = line.indexOf("{");
      let end = line.indexOf("}");
      line = line.substring(0, start) + line.substring(end + 1);
    }
    line = line.trim();
    if (line.startsWith("call")) line = "\n" + line + "\n";
    if (line.startsWith("menu")) line = "\n" + line + "\n";
    if (line.startsWith("jump")) line = "\n" + line + "\n";
    let le = line.split("#");
    console.log(le);
    if (le.length == 1) out.push(line);
    else out.push(le.slice(0, le.length - 1).join("#"));
  });
  if (out.length) {
    writeFileSync(
      "outs/" + out[0] + ".txt",
      out.splice(1, out.length).join(" ")
    );
  }
}

readdirSync("files").forEach((file) => {
  main("files/" + file);
});
