<?php
//Activamos el almacenamiento en el buffer
ob_start();
session_start();

if (!isset($_SESSION["nombres"])||!isset($_SESSION["apellidos"])||!isset($_SESSION["cargo"]))
{
  header("Location: login.html");
}
else
{
require 'header.php';
if ($_SESSION['horario']==1)
{
?>
<!--Contenido-->
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Main content -->

        <!-- Main content -->
        <section class="content">
            <div class="row">
              <div class="col-md-12">
                  <div class="box">
                    <div class="box-header with-border" id="nuevo">
                          <h1 class="box-title"> Hora</h1>
                        <div class="box-tools pull-right">
                        </div>
                    </div>

                    <div class="box-header with-border" id="mlista">
                          <h1 class="box-title">Nueva Hora <button id="btnagregar" class="btn btn-success" onclick="mostrarform(true)" title="Nueva especialidad"><i class="fa fa-plus-circle" ></i> </button></h1>
                        <div class="box-tools pull-right">
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <!-- centro -->
                    <div class="panel-body table-responsive" style="height: 400px;" id="listadoregistros">
                      <table id="tbllistado" class="table table-bordered table-striped table-hover">
                        <thead >
                        <th>Accion</th>
                          <th>Nombre</th>
                          <th>agregado</th>
                          <th>estado</th>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>

                    </div>
                    <div class="panel-body " style="height: 400px;" id="formularioregistros">

                      <form name="formulario" id="formulario" method="POST">
                        <input type="hidden" name="idhora" id="idhora">
                        <div class="inputWithIcon form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                       <input type="text" class="form-control" name="nombre" id="nombre" maxlength="50" placeholder="Nombre" required>
                      <i class="far fa-clock"></i>
                        </div>


                          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button class="btn btn-primary" type="submit" id="btnGuardar"><i class="fa fa-save"></i> Guardar</button>

                            <button class="btn btn-danger" onclick="cancelarform()" type="button" title="Cancelar"><i class="fa fa-arrow-circle-left"></i></button>
                          </div>


                        </form>
                    </div>
                    <!--Fin centro -->
                  </div><!-- /.box -->
              </div><!-- /.col -->
          </div><!-- /.row -->
      </section><!-- /.content -->


    </div><!-- /.content-wrapper -->
  <!--Fin-Contenido-->
  <?php
  }
  else
  {
    require 'noacceso.php';
  }
  require 'footer.php';
  ?>

<script type="text/javascript" src="scripts/hora.js"></script>
<?php
}
ob_end_flush();
?>
