module.exports = {
  "pages": {
    "index": {
      "entry": "src/main.ts",
      "template": "public/index.html",
      "filename": "index.html",
      "title": 'Sistemas de Eventos IS',
      "chunks": [
        "chunk-vendors",
        "chunk-common",
        "index"
      ]
    }
  },
  "devServer": {
    "proxy": "http://localhost:3000"
  },
  "productionSourceMap": false,
  "transpileDependencies": [
    "vuetify"
  ]
}