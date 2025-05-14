import shutil
import os
import json

projeto_origem = r"C:\Users\cliente\Desktop\FOODBOT1\FOODBOT_CLEAN"
projeto_final = r"C:\Users\cliente\Desktop\FOODBOT1\FOODBOT_CLEAN_FOR_RAILWAY"

if os.path.exists(projeto_final):
    shutil.rmtree(projeto_final)

def ignore_files(path, names):
    return {"node_modules", ".env", "dist"}.intersection(names)

shutil.copytree(projeto_origem, projeto_final, ignore=ignore_files)

with open(os.path.join(projeto_final, ".gitignore"), "w", encoding="utf-8") as f:
    f.write("""node_modules/
.env
dist/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
""")

package_json_path = os.path.join(projeto_final, "package.json")
with open(package_json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

data["main"] = "index.js"
data["scripts"] = {"start": "node index.js"}
if "mercadopago" in data["dependencies"]:
    data["dependencies"]["mercadopago"] = "^2.0.12"

with open(package_json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

index_path = os.path.join(projeto_final, "index.js")
if os.path.exists(index_path):
    with open(index_path, "r", encoding="utf-8") as f:
        conteudo = f.read()
    conteudo = conteudo.replace("app.listen(3000", "app.listen(process.env.PORT || 3000")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(conteudo)

shutil.make_archive(projeto_final, 'zip', projeto_final)
print("\n✅ Projeto FOODBOT_CLEAN_FOR_RAILWAY.zip gerado com sucesso!")
