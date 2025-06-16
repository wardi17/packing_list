<?php

class Supplier extends Models{
    private $table ="[bambi-bmi].[dbo].supplier";



    public function Tampildata(){

        $file ="CustomerID,CustName";
        $table = $this->table;
        $table .= $this->orderby("CustomerID");
        $query = $this->select($file,$table);
        $result = $this->db->baca_sql2($query);

        // $expload = explode(",",$file);
        // $this->consol_war($expload);
        $datas =[];
        $datas = [];
        while(odbc_fetch_row($result)){
        
            $datas[] =[
                "CustomerID"=>rtrim(odbc_result($result,'CustomerID')),
                "CustName"=>rtrim(odbc_result($result,'CustomerID')). " | ".rtrim(odbc_result($result,'CustName')),
            ];
            }

          return $datas;
       
        }
}