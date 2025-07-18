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


INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES ('Biaya Freight Charge (Ongkos Kirim)', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES ('Biaya Trucking / Inland Transportation', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES ('Biaya Handling Charges', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES('Biaya Terminal Handling Charges (THC)', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES('Biaya BL / AWB Fee', 'N', 'N', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES('Biaya Custom Clearance', 'N', 'N', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES('Biaya PEB / PIB', 'N', 'N', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES ('Biaya Storage Fee', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES ('Biaya Demurrage & Detention', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES ('Biaya Asuransi Barang', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES('Biaya Karantina / Inspeksi', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES('Biaya Service Fee Forwarder', 'N', 'Y', 'Y', 'admin');
INSERT INTO msForwader (keterangan,rumus,hitungan,status_aktif,user_input)
VALUES('Biaya Door to Door Service', 'N', 'Y', 'Y', 'admin');


