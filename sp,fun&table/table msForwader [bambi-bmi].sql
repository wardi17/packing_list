USE [bambi-bmi]
GO

CREATE TABLE msForwader(
    msID VARCHAR(20),
    keterangan VARCHAR(1500) NOT NULL,
    rumus CHAR(1) DEFAULT 'N',
    hitungan CHAR(1) DEFAULT 'N',
    status_aktif CHAR(1) DEFAULT 'Y',
    user_input VARCHAR(100) NOT NULL,
    date_input DATETIME  DEFAULT GETDATE(),
    user_edit VARCHAR(100)  NULL,
    date_edit DATETIME 
)

ALTER TABLE msForwader 
ADD status_aktif CHAR(1) DEFAULT 'Y';

