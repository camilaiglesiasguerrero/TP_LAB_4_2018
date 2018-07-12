<?php
class viaje
{
    public $id;
    public $origen;
    public $destino;
    public $latO;
    public $latD;
    public $lngO;
    public $lngD;
    public $duracion;
    public $distancia;
    public $fecha;
    public $hora;
    public $tipoServ;
    public $medioPago;
    public $valor;
    public $solicitante;
    public $chofer;
    public $auto;
    public $estado;
    public $obs;    
    
public static function TraerUno($id) 
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select * from viaje where id='$id'");
    $consulta->execute();
    $uno= $consulta->fetchObject('viaje');
    return $uno;				       
}

public static function CargarUno($origen, $destino,$latO,$latD,$lngO,$lngD,$duracion,$distancia,
    $fecha,$hora,$tipoServ,$medioPago,$solicitante,$estado,$obs,$valor)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("insert into viaje (origen, destino,latO,latD,lngO,lngD,
        duracion,distancia,fecha,hora,obs,tipoServicio,medioPago,valor,solicitante,estado)
        values ('$origen', '$destino','$latO','$latD','$lngO','$lngD','$duracion','$distancia','$fecha',
        '$hora','$obs','$tipoServ','$medioPago','$valor','$solicitante','$estado')");
    $consulta->execute();

    return "éxito";				       
}

public static function ModificarUno($id,$origen, $destino,$latO,$latD,$lngO,$lngD,$duracion,$distancia,
$fecha,$hora,$tipoServ,$medioPago,$solicitante,$estado,$obs,$chofer,$auto,$valor)
{
    //MODIFICACION DE CLIENTE
    if($estado == 'Modificado'){   
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update viaje set origen='$origen', destino='$destino',
        latO='$latO',latD='$latD',lngO='$lngO',lngD='$lngD',duracion='$duracion',distancia='$distancia',
        fecha='$fecha',hora='$hora',obs='$obs',tipoServicio='$tipoServ',medioPago='$medioPago',solicitante='$solicitante'
        ,estado='$estado'
        where id='$id'");
        $consulta->execute();

    //ASIGNACION DE CHOFER Y VEHICULO
    }else if($chofer != '' || $chofer != null) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update viaje set estado='$estado',chofer='$chofer',auto='$auto'
        where id='$id'");
        $consulta->execute();
    
    //CANCELACION DE VIAJE
    }else if($estado == 'Cancelado'){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update viaje set estado='$estado' where id='$id'");
        $consulta->execute();
    }else if($estado == 'Finalizado'){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update viaje set estado='$estado',valor='$valor',medioPago='$medioPago' where id='$id'");
        $consulta->execute();
    }

    return "éxito";				       
}

public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from viaje order by fecha desc, hora desc");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "viaje");		
	}

}