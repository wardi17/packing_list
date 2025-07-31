<?php

class Supplier extends Models
{
    private $table = "[bambi-bmi].[dbo].supplier";



    public function Tampildata()
    {

        $file = "CustomerID,CustName";
        $table = $this->table;
        $table .= "  WHERE customerclass <> 'FW' and custstatus = 1 and 
        (coderegion = 'CHINA' or coderegion = 'KOREA' or coderegion = 'MALAYSIA' or coderegion = 'MY' or coderegion = 'SINGAPORE' or coderegion = 'HK' or coderegion = 'HONGKONG')";
        $table .= $this->orderby("CustomerID");
        $query = $this->select($file, $table);
        $result = $this->db->baca_sql2($query);

        // $expload = explode(",",$file);
        // $this->consol_war($expload);
        $datas = [];
        $datas = [];
        while (odbc_fetch_row($result)) {

            $datas[] = [
                "CustomerID" => rtrim(odbc_result($result, 'CustomerID')),
                "CustName" => rtrim(odbc_result($result, 'CustomerID')) . " | " . rtrim(odbc_result($result, 'CustName')),
            ];
        }

        return $datas;
    }
}
