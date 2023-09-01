Use accountNode;

SELECT * FROM Contas;



CREATE TABLE Contas(
	idConta INT PRIMARY KEY AUTO_INCREMENT,
	nomeConta VARCHAR(50),
    senhaConta VARCHAR(50),
    saldoConta DOUBLE(10,2)
);

DELIMITER $$

CREATE procedure Deposito(
	in p_Id INT ,
    in p_valorDep  DOUBLE(10,2)
)
BEGIN
	SET @valorAtual = (SELECT saldoConta FROM Contas WHERE idConta = p_Id);
    SET @novoValor = @valorAtual + p_valorDep ;
    UPDATE Contas SET saldoConta = @novoValor WHERE idConta =p_Id;
END $$

DELIMITER $$

call Deposito(2, 123);



	


