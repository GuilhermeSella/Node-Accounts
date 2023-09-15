Use accountNode;

SELECT * FROM Contas;


CREATE TABLE Contas(
	idConta INT PRIMARY KEY AUTO_INCREMENT,
	nomeConta VARCHAR(50),
    senhaConta VARCHAR(50),
    saldoConta DOUBLE(10,2)
);





 -- PROCEDURE DEPOSITO
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



-- PROCEDURE SAQUE

DELIMITER $$

CREATE procedure Saque(
	in p_Id INT ,
    in p_valorSaque  DOUBLE(10,2)
)
BEGIN
	SET @valorAtual = (SELECT saldoConta FROM Contas WHERE idConta = p_Id);
    SET @novoValor = @valorAtual - p_valorSaque ;
    UPDATE Contas SET saldoConta = @novoValor WHERE idConta =p_Id;
END $$

DELIMITER $$


-- PROCEDURE PAGAMENTO

DELIMITER $$
CREATE PROCEDURE Pagamento(
	in p_IdConta INT,
	in p_DestinatarioId int,
    in P_Valor DOUBLE(10,2)
)
BEGIN 
	SET @valorAtualConta = (SELECT saldoConta FROM Contas WHERE idConta = p_IdConta);
	SET @valorAtualDestinatario = (SELECT saldoConta FROM Contas WHERE idConta = p_DestinatarioId);
    
    SET @novoValorConta = @valorAtualConta - P_Valor ;
    SET @novoValorDestinatario = @valorAtualDestinatario + P_Valor ;
    
    UPDATE Contas SET saldoConta = @novoValorDestinatario WHERE idConta = p_DestinatarioId;
	UPDATE Contas SET saldoConta = @novoValorConta WHERE idConta = p_idConta;

END $$

DELIMITER $$


	


