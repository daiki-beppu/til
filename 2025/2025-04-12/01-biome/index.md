---
date: 2025-04-12 21:03
title: biome
number: 01
labels: [biome]
topics: [js/]
---

# Biome で className を並び替える方法


## Biome で className を並び替え変える方法

こちらを参考にしました

[biomejs/biome PR feat(linter): implement class sorting rule (first pass) #1362](https://github.com/biomejs/biome/pull/1362#issuecomment-2463860207)

```json
{
	"$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
	"vcs": {
		"enabled": true,
		"clientKind": "git",
		"useIgnoreFile": true
	},
	"files": {
		"ignoreUnknown": true,
		"ignore": ["node_modules", ".next/**/*", "public"]
	},
	"organizeImports": {
		"enabled": true
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"nursery": {
				"useSortedClasses": {
					"level": "error",
					"fix": "safe",
					"options": {
						"attributes": ["className"],
						"functions": ["cn"]
					}
				}
			}
		},
		"ignore": ["node_modules", ".next/**/*", "public"],
		"include": ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
	}
}
```

## 📚 参考リンク

公式ドキュメント: https://biomejs.dev/

GitHub: https://github.com/biomejs/biome


