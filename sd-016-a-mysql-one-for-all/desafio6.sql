SELECT 
  FORMAT(MIN(P.VALOR_PLANO), 2) AS faturamento_minimo,
  FORMAT(MAX(P.VALOR_PLANO), 2) AS faturamento_maximo,
  FORMAT(AVG(P.VALOR_PLANO), 2) AS faturamento_medio,
  FORMAT(SUM(P.VALOR_PLANO), 2) AS faturamento_total
FROM PLANO AS P
INNER JOIN USUARIO AS U
  ON U.ID_PLANO = P.IDPLANO;
