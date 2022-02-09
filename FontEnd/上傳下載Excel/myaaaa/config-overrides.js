const { override, addWebpackExternals } = require("customize-cra");

module.exports = override(
    addWebpackExternals({
        "./cptable": "var cptable",
        'dotAll./xlsx.js': 'var_XLSX'
    })
)