const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const generate = (data, assets, pathToHtml, pathToSave, options) => {
    const pathToHtmlFile = path.join(__dirname, pathToHtml);
    let html = fs.readFileSync(pathToHtmlFile, "utf8");

    Object.keys(assets).forEach((key) => {
        html = html.replace(`{{${key}}}`, assets[key]);
    });

    Object.keys(data).forEach((key) => {
        html = html.replace(`{{${key}}}`, data[key]);
    });

    try {
        pdf.create(html, options).toFile(pathToSave, function (err) {
            if (err) {
                console.error(err);
            }
        });
        return 0;
    } catch (err) {
        console.error(err);
        return 1;
    }
}

module.exports = generate;