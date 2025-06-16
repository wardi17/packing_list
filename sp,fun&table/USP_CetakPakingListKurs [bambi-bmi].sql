USE [bambi-bmi]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[USP_CetakPakingListKurs]
    @transnoHider VARCHAR(20),
    @DOTransacID  VARCHAR(100)
AS
BEGIN
    -- Hapus temp table jika ada
    IF OBJECT_ID('tempdb..#temptess') IS NOT NULL
    BEGIN
        DROP TABLE #temptess
    END

    -- Buat temp table
    CREATE TABLE #temptess (
        ItemNo         FLOAT,
        Partid         CHAR(10),
        PartName       CHAR(60),
        Qty            FLOAT,
        satuan         CHAR(10),
        Price          FLOAT,
        Amount_USD     FLOAT,
        Amount_Rp      FLOAT,
        Kurs           FLOAT,
        Kurs_Akhir     FLOAT,
        Amount_Akhir   FLOAT,
        No_Pli         CHAR(20),
        NoPo           CHAR(30),
        EntryDate      DATETIME,
        Note           VARCHAR(2000),
        supid          CHAR(30),
        Pib            FLOAT,
        Forwarder      FLOAT,
        Total          FLOAT,
        CustAddress    VARCHAR(1000), -- VARCHAR(5000) tidak tersedia di SQL 2000
        CustTelpNo     CHAR(30),
        CustFaxNo      CHAR(30),
        CustEMail      VARCHAR(40),
        SupperiID      CHAR(10),
        SupperiName    VARCHAR(100),
        id_bl_awb      CHAR(50),
		total_Prosentase FLOAT
    )

    -- Isi temp table
    INSERT INTO #temptess
    SELECT
        a.ItemNo,
        a.Partid,
        a.PartName,
        a.Qty,
        a.satuan,
        a.Price,
        a.Amount_USD,
        a.Amount_Rp,
        a.Kurs,
        a.Kurs_Akhir,
        a.Amount_Akhir,
        c.No_Pli,
        c.NoPo,
        c.EntryDate,
        c.Note,
        c.supid,
        c.Pib,
        c.Forwarder,
        c.Total,
        d.CustAddress,
        d.CustTelpNo,
        d.CustFaxNo,
        d.CustEMail,
        d.CustomerID,
        d.CustName,
        c.id_bl_awb,
		ISNULL(c.total_Prosentase,0) as total_Prosentase
    FROM dbo.POPAKINGLIST_KURSDETAIL a
    LEFT JOIN dbo.POPAKINGLIST_KURS c ON c.No_Pls = a.No_Pls
    LEFT JOIN dbo.supplier d ON d.CustomerID = c.supid
    WHERE a.No_Pls = @transnoHider
    ORDER BY a.ItemNo ASC

    -- Variabel total
    DECLARE
        @total_qty       FLOAT,
        @total_Price     FLOAT,
        @total_USD       FLOAT,
        @total_Kurs      FLOAT,
        @total_Rp        FLOAT,
        @total_KursAkhir FLOAT,
        @total_RpAkhir   FLOAT

    -- Hitung total
    SELECT @total_qty        = ISNULL(SUM(Qty), 0)         FROM #temptess
    SELECT @total_Price      = ISNULL(SUM(Price), 0)       FROM #temptess
    SELECT @total_USD        = ISNULL(SUM(Amount_USD), 0)  FROM #temptess
    SELECT @total_Kurs       = ISNULL(SUM(Kurs), 0)        FROM #temptess
    SELECT @total_Rp         = ISNULL(SUM(Amount_Rp), 0)   FROM #temptess
    SELECT @total_KursAkhir  = ISNULL(SUM(Kurs_Akhir), 0)  FROM #temptess
    SELECT @total_RpAkhir    = ISNULL(SUM(Amount_Akhir), 0)FROM #temptess

    -- Tampilkan hasil
    SELECT 
        *,
        @total_qty        AS total_qty,
        @total_Price      AS total_Price,
        @total_USD        AS total_USD,
        @total_Kurs       AS total_Kurs,
        @total_Rp         AS total_Rp,
        @total_KursAkhir  AS total_KursAkhir,
        @total_RpAkhir    AS total_RpAkhir
    FROM #temptess
    ORDER BY ItemNo ASC
END
GO

-- Eksekusi contoh
EXEC USP_CetakPakingListKurs 'BMI_PL250616103126','PO210302072753'
