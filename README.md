# runnerty-executor-js

## conf.json
```
{
  "id": "js_default",
  "type": "runnerty-executor-js"
}
```

## plan.json
```
"exec": {
  "id": "js_default",
  "value": "Runnerty",
  "js_file": "scripts/my.js"
}
```

## scripts/my.js
```
try {
  var text = this.value;
  text += " is a good boy 🐶";
  this.callback(null, text);
} catch(e) {
  this.callback(e);
}
```
