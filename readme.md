# Resolucion de Challenge WoowUp

> npm i -> para instalar las dependencias de testing

> npm test.

## SENTENCIA SQL en Mysql (Testeado en TABLEPLUS):

SELECT
Clientes.ID,
Clientes.Nombre,
Clientes.Apellido,
(SELECT SUM(Ventas.Importe)
FROM Ventas
WHERE Ventas.Id_cliente = Clientes.ID
AND Ventas.Fecha >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) AS TotalComprado
FROM
Clientes
WHERE
(SELECT SUM(Ventas.Importe)
FROM Ventas
WHERE Ventas.Id_cliente = Clientes.ID
AND Ventas.Fecha >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) > 100000;
