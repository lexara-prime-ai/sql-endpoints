USE Ecommerce
GO
--##############################################
--CREAT STORED PROCEDURE FOR DELETING A USER
--##############################################
CREATE OR ALTER PROCEDURE deleteUser (
    @userId VARCHAR(100)
)
AS
BEGIN   
    UPDATE Users SET isDeleted=1
    WHERE userId=@userId
    AND isDeleted=0
END

