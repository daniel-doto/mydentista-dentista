var tabla;


//Función que se ejecuta al inicio
function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);
	})

	$("#imagenmuestra").hide();
	//Mostramos los permisos
	$.post("../ajax/usuario.php?op=permisos&id=",function(r){
	        $("#permisos").html(r);
	});
}

//Función limpiar
function limpiar()
{
	$("#permisos :checkbox").attr('checked',false);//  limpiar el checkbox
	$("#nombres").val("");
	$("#apellidos").val("");
	$("#num_documento").val("");
	$("#direccion").val("");
	$("#telefono").val("");
	$("#email").val("");
	$("#cargo").val("");
	$("#login").val("");
	$("#clave").val("");
	$("#imagenmuestra").attr("src","");
	$("#imagenactual").val("");
	$("#idusuario").val("");
}

//Función mostrar formulario
function mostrarform(flag)
{
	limpiar();
	if (flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

//Función cancelarform
function cancelarform()
{
	limpiar();
	mostrarform(false);
}

//Función Listar
function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
		"aProcessing": true,//Activamos el procesamiento del datatables
	    "aServerSide": true,//Paginación y filtrado realizados por el servidor
	    dom: 'Bfrtip',//Definimos los elementos del control de tabla
	    buttons: [
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdf'
		        ],
		"ajax":
				{
					url: '../ajax/usuario.php?op=listar',
					type : "get",
					dataType : "json",
					error: function(e){
						console.log(e.responseText);
					}
				},
		"bDestroy": true,
		"iDisplayLength": 5,//Paginación
	    "order": [[ 0, "desc" ]]//Ordenar (columna,orden)
	}).DataTable();
}
//Función para guardar o editar

function guardaryeditar(e)
{
	e.preventDefault(); //No se activará la acción predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({
		url: "../ajax/usuario.php?op=guardaryeditar",
	    type: "POST",
	    data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {
	       	swal("!!! Usuario !!!", datos ,"success");
	          mostrarform(false);
	          tabla.ajax.reload();
	    }

	});
	limpiar();
}

function mostrar(idusuario)
{
	$.post("../ajax/usuario.php?op=mostrar",{idusuario : idusuario}, function(data, status)
	{
		data = JSON.parse(data);
		mostrarform(true);

		$("#nombres").val(data.nombres);
		$("#apellidos").val(data.apellidos);
		$("#tipo_documento").val(data.tipo_documento);
		$("#tipo_documento").selectpicker('refresh');
		$("#num_documento").val(data.num_documento);
		$("#direccion").val(data.direccion);
		$("#telefono").val(data.telefono);
		$("#email").val(data.email);
		$("#cargo").val(data.cargo);
		$("#login").val(data.login);
		$("#clave").val(data.clave);
		$("#imagenmuestra").show();
		$("#imagenmuestra").attr("src","../files/usuarios/"+data.imagen);
		$("#imagenactual").val(data.imagen);
		$("#idusuario").val(data.idusuario);

 	});
 	$.post("../ajax/usuario.php?op=permisos&id="+idusuario,function(r){
	        $("#permisos").html(r);
	});
}

//Función para desactivar registros
function desactivar(idusuario)
{
	swal({
				title: "¿desactivar?",
				text: "¿Está Seguro de desactivar el usuario ?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: '#008df9',
				confirmButtonText: "Si",
				cancelButtonText: "No",
				cancelButtonColor: '#FF0000',
				closeOnConfirm: false,
				closeOnCancel: false,
				showLoaderOnConfirm: true
				},function(isConfirm){
				if (isConfirm){
					$.post("../ajax/usuario.php?op=desactivar", {idusuario : idusuario}, function(e){
						swal("!!! desactivar !!!", e ,"success");
							tabla.ajax.reload();
					});
				}else {
				swal("! Cancelado ¡", "Se Cancelo la desactivacion del usuario", "error");
			 }
			});
}

//Función para activar registros
function activar(idusuario)
{
	swal({
				title: "¿activar?",
				text: "¿Está Seguro de activar el Usuario?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: '#008df9',
				confirmButtonText: "Si",
				cancelButtonText: "No",
				cancelButtonColor: '#FF0000',
				closeOnConfirm: false,
				closeOnCancel: false,
				showLoaderOnConfirm: true
				},function(isConfirm){
				if (isConfirm){
					$.post("../ajax/usuario.php?op=activar", {idusuario : idusuario}, function(e){
						swal("!!! activar !!!", e ,"success");
							tabla.ajax.reload();
					});
				}else {
				swal("! Cancelado ¡", "Se Cancelo la activacion del usuario", "error");
			 }
			});
}

init();
