
<?php 
$log_fin = (isset($_SESSION["log_fin"]))? $_SESSION["log_fin"] : '';
$log_fam = (isset($_SESSION["log_fam"]))? $_SESSION["log_fam"] : '';

$level_us = (isset($_SESSION["level_user"]))? $_SESSION["level_user"] : '';
$level3 = (isset($_SESSION["login_user"]))? $_SESSION["login_user"] : '';
$page = (isset($data['page']))? $data['page'] : '';
$pages = (isset($data['pages']))? $data['pages'] : '';

?>

<div id="app">
        <div id="sidebar" class="active">
            <div class="sidebar-wrapper active">
            <div class="sidebar-header position-relative">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="logo">
                        <h5><a href="<?=base_url?>/home"><?=$_SESSION['login_user']?></a><h5>
                    </div>
                    <div class="theme-toggle d-flex gap-2  align-items-center mt-2">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--system-uicons" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2" opacity=".3"></path><g transform="translate(-210 -1)"><path d="M220.5 2.5v2m6.5.5l-1.5 1.5"></path><circle cx="220.5" cy="11.5" r="4"></circle><path d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2"></path></g></g></svg> -->
                        <div class="form-check form-switch fs-6">
                            <input class="  me-0" type="hidden" id="toggle-dark" >
                        </div>
                    </div>
                    <div class="sidebar-toggler  x">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
    <div class="sidebar-menu">
  
       
        <ul  class="menu">
            <li class="sidebar-title">Menu</li>
            <li
                class="sidebar-item <?php  if ($pages == 'home') {echo 'active'; }else { echo ''; } ?> ">
                <a  href="<?= base_url; ?>/home" class='sidebar-link'>
                    <i class="bi bi-grid-fill"></i>
                    <span>Packing List</span>
                </a>
            </li>
          
              <li
                class="sidebar-item <?php  if ($pages == 'msfor') {echo 'active'; }else { echo ''; } ?> ">
                <a  href="<?= base_url; ?>/msforwader" class='sidebar-link'>
                    <i class="bi bi-grid-fill"></i>
                    <span>Master Forwader</span>
                </a>
            </li>
            <li 
                class="sidebar-item   <?php if ($pages == 'inputkrus') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/transaksikurs"  class='sidebar-link'>
                <i class="fa-solid fa-right-to-bracket"></i>
                    <span>Input pib</span>
                </a>    

            </li>
        
             <!-- <li 
                class="sidebar-item   <?php if ($pages == 'input') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/transaksi"  class='sidebar-link'>
                <i class="fa-solid fa-right-to-bracket"></i>
                    <span>Input</span>
                </a>    

            </li> -->
            <li 
                class="sidebar-item   <?php if ($pages == 'post') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/transaksikurs/postlist"  class='sidebar-link'>
                <i class="fa-solid fa-business-time"></i>
                    <span>Posted</span>
                </a>    
            </li>
             </li>
                  <li 
                class="sidebar-item   <?php if ($pages == 'lap') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/laporankurs/packing"  class='sidebar-link'>
                <i class="fa-solid fa-hotel"></i>
                    <span>Laporan</span>
                </a>  
             </li>
              <!--  <li 
                class="sidebar-item   <?php if ($pages == 'pib') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/laporan/pib"  class='sidebar-link'>
                <i class="fa-solid fa-hotel"></i>
                    <span>Laporan PIB</span>
                </a>    
            </li>

            <?php if($level3 =="wardi" OR  $level3 =="herman"):?>
            <li 
                class="sidebar-item   <?php if ($pages == 'hasilpib') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/laporan/hasilpib"  class='sidebar-link'>
                <i class="fa-solid fa-hotel"></i>
                    <span>Laporan HasilPIB</span>
                </a>    
            </li>
            <?php endif?>
             -->

          
            <!-- <li 
                class="sidebar-item   <?php if ($pages == 'semester') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/laporan/semester"  class='sidebar-link'>
                <i class="fa-solid fa-folder"></i>
                    <span>Laporan Per Semester</span>
                </a>    
            </li> -->
            <!-- <li 
                class="sidebar-item   <?php if ($pages == 'dinamiq') {echo 'active';} else {echo'';} ?>  " aria-current="page" >
                <a href="<?= base_url; ?>/laporan/semesterdinamiq"  class='sidebar-link'>
                <i class="fa-solid fa-folder"></i>
                    <span>Laporan Per 6 Bulan</span>
                </a>    
            </li> -->
           
        </ul>
        
        <ul class ="menu">
        <li
                class="sidebar-item" aria-current="page">
                <a  href="<?= base_url; ?>/logout" class='sidebar-link'>
                <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Sign Out</span>
                </a>
            </li> 
        </ul>
    
    </div>
</div>