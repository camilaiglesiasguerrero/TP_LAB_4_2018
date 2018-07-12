<?php
class encuesta
{
    public $id;
    public $condiciones;
    public $precio;
    public $confort;
    public $limpio;
    public $moderno;
    public $tiempo;
    public $tardoA;
    public $tardoC;
    public $elegirnos;
    public $pagina;
    public $sugerencias;


public static function CargarUna($id,$condiciones,$precio,$confort,$limpio,$moderno,$tiempo,$tardoA,$tardoC,
    $elegirnos,$pagina,$sugerencias)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("insert into encuesta (id,condiciones,precio,confort,limpio,moderno,
    tiempo,tardoA,tardoC,elegirnos,pagina,sugerencias) 
    values ('$id','$condiciones','$precio','$confort','$limpio','$moderno','$tiempo','$tardoA','$tardoC',
    '$elegirnos','$pagina','$sugerencias')");
    $consulta->execute();

   
    return "éxito";				       
}

public static function ModificarUno($id,$nombre,$apellido,$telefono,$email,$calificacion,$estado)
{
    if($nombre != null && $nombre != '' && $apellido != null && $apellido != '' && $telefono != null && $telefono != ''){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update remisero set nombre='$nombre', apellido='$apellido'
        ,telefono='$telefono'
        where id='$id'");
        $consulta->execute();
    }else if($calificacion != null && $calificacion != ''){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update remisero set calificacion = '$calificacion'
        where id='$id'");
        $consulta->execute();
    }else if($nombre == null && $apellido == null && $telefono == null && $email == null && $estado != null){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update remisero set estado = '$estado'
        where id='$id'");
        $consulta->execute();			       
    }
}

public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from remisero");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "remisero");		
	}

}