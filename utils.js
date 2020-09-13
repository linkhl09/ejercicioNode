/**
 * Modulos
 */
const fs = require("fs");

module.exports = function (info, fileRoute, type) {
  let medium = "";
  info.forEach(function (element) {
    let id = type == 1 ? element.idproveedor : element.idCliente;
    let nombreCompania =
      type == 1 ? element.nombrecompania : element.NombreCompania;
    let nombreContacto =
      type == 1 ? element.nombrecontacto : element.NombreContacto;
    let temp =
      "<tr><td>" +
      id +
      "</td><td>" +
      nombreCompania +
      "</td><td>" +
      nombreContacto +
      "</td></tr>";
    medium += temp;
  });
  fs.readFile(fileRoute, function (err, data) {
    if (err) return console.error(err);
    data = data.toString();
    let pos = data.indexOf("</tbody>");
    let firstPart = data.substring(0, pos);
    let endPart = data.substring(pos, data.length);
    let newHtml = firstPart+ "\n" + medium + "\n" + endPart;
    fs.writeFile(fileRoute, newHtml, function (err) {
      err || console.log("Data replaced");
    });
  });
};
