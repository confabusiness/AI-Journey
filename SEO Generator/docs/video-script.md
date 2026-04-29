# Video Script

## 1. PowerShell: Start Flowise

Open PowerShell 1:

```powershell
.\start-flowise.ps1
```

Keep this window open.

Open Flowise in the browser:

```text
http://127.0.0.1:3000
```

Show the chatflow:

```text
Ollama - SEO Product Description Generator
```

## 2. PowerShell: Check Ollama

Open PowerShell 2:

```powershell
ollama ps
```

If the model alias needs to be recreated:

```powershell
ollama create apertus-tools-seo -f .\ollama\apertus-tools-seo.Modelfile
```

Check the model settings:

```powershell
ollama show apertus-tools-seo
```

## 3. PowerShell: Start NestJS API

Open PowerShell 3:

```powershell
cd .\api
npm install
npm run build
npm start
```

Keep this window open.

Expected output:

```text
SEO generator API listening on http://127.0.0.1:3100
```

## 4. Browser Demo Only

Open in the browser:

```text
.\demo.html
```

Use this example:

Product name:

```text
Чёрный мужской портфель из натуральной кожи с отделением для ноутбука
```

Category:

```text
Мужские портфели и деловые сумки
```

Keywords:

```text
чёрный мужской портфель, кожаный портфель, портфель для ноутбука, деловая сумка
```

Click:

```text
Сгенерировать
```

## 5. Short Explanation For The Video

```text
Я сделал генератор SEO-описаний товара.

Flowise отвечает за LLM workflow: prompt template, Ollama model, LLM Chain и structured output parser.

NestJS API принимает product_name, category и keywords, вызывает Flowise Prediction API и возвращает результат streaming-ответом.

В браузерной demo.html я ввожу данные товара и получаю готовый SEO JSON: title, meta_description, h1, description и bullets.

Для локальной модели я использую Ollama alias apertus-tools-seo с num_ctx 8192, потому что вход короткий и большой контекст 64K только замедляет генерацию.

Edge cases обработаны в API: нет обязательных полей, Flowise недоступен, таймаут, пустой ответ и невалидный JSON.
```

## 6. Stop

In Flowise and API PowerShell windows:

```text
Ctrl + C
```

If port `3100` stays busy:

```powershell
netstat -ano | Select-String ':3100'
Stop-Process -Id PID -Force
```
