import * as fs from "fs";
import {fileURLToPath} from "url"
import {dirname} from "path"

const keys = (obj) => {
    const getObjectKeys = (obj, prefix = null) => {
        const result = []
        Object.keys(obj).forEach(key => {
            const value = obj[key]
            const prefixedKey = prefix !== null ? `${prefix}.${key}` : key
            if (typeof value === "string") result.push(prefixedKey)
            else result.push(...getObjectKeys(value, prefixedKey))
        })
        return result.sort()
    }
    return getObjectKeys(obj)
}

const get = (obj, path) => {
    const properties = path.split('.')
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

const set = (obj, path, value) => {
    const [first, ...rest] = path.split('.')
    if (!rest.length) {
        obj[first] = value
        return
    }

    if (!obj[first] || ['string', 'number'].includes(typeof obj[first])) obj[first] = {}
    set(obj[first], rest.join('.'), value)
}

const sortReplacer = (key, value) => {
    return value instanceof Object && !(value instanceof Array) ?
        Object.keys(value)
            .sort()
            .reduce((sorted, key) => {
                sorted[key] = value[key];
                return sorted
            }, {}) :
        value;
}

const scriptName = fileURLToPath(import.meta.url)
const scriptDirectory = dirname(scriptName)
const translationsDirectory = `${dirname(scriptDirectory)}/src/translation`

const patternFileName = "en.json"
const patternFilePath = `${translationsDirectory}/${patternFileName}`
const patternFileContent = JSON.parse(fs.readFileSync(patternFilePath).toString())
const patternFileKeys = keys(patternFileContent)

fs.readdirSync(translationsDirectory).forEach(file => {
    if (file === patternFileName) return;
    const result = {}

    const language = file.split('.')[0].toUpperCase()

    const filePath = `${translationsDirectory}/${file}`
    let fileContent = JSON.parse(fs.readFileSync(filePath).toString())
    if (fileContent === undefined) fileContent = {}

    patternFileKeys.forEach(key => {
        const value = get(fileContent, key)
        if (!value) {
            set(result, key, `${language}_${get(patternFileContent, key)}`)
        } else {
            set(result, key, value)
        }
    })

    fs.writeFileSync(filePath, JSON.stringify(result, sortReplacer, 2))
})

fs.writeFileSync(patternFilePath, JSON.stringify(patternFileContent, sortReplacer, 2))