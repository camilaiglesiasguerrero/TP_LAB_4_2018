<?php
class asignar
{
    public $idViaje;
    public $chofer;
    public $patente;
    public $fecha;
    public $hora;
    public $estado;
    
public static function TraerUno($id) 
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select * from viaje where id='$id'");
    $consulta->execute();
    $uno= $consulta->fetchObject('viaje');
    return $uno;				       
}

public static function CargarUno($idViaje, $chofer, $patente, $fecha, $hora, $estado)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("insert into autoviajechofer
        values ('$idViaje','$chofer','$patente','$fecha','$hora','$estado')");
    $consulta->execute();

    return "éxito";				       
}

public static function ModificarUno($nombre,$apellido,$estado)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("update remisero set estado = '$estado' where nombre='$nombre' and apellido = '$apellido'");
    $consulta->execute();

    return "éxito";				       
}

public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from autoviajechofer");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "asignar");		
	}

}