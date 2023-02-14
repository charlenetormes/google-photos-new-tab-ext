const fs = require('fs')

const rimraf = require('rimraf')
const zipper = require('zip-local')
const copy_dir = require('copy-dir')

rimraf('build', () => {
    // create a build folder if it does not exist

    if (!fs.existsSync('build')) {
        fs.mkdirSync('build')
    }

    var manifest = JSON.parse(fs.readFileSync('src/manifest.json', 'utf8'))
    var project_name = manifest.name ? manifest.name.replace(/\s+/g, '-').toLowerCase() : 'extension'

    copy_dir.sync('dist', `build/files`)

    zipper.sync
        .zip(`./build/files`)
        .compress()
        .save('./build/v' + manifest.version + '_' + project_name + '.zip')
})
