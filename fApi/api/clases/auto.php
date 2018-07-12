<?php
class auto
{
    public $id;
    public $patente;
    public $marca;
    public $modelo;
    public $categoria;
    public $estado;
    
public static function TraerUno($id) 
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select * from viaje where id='$id'");
    $consulta->execute();
    $uno= $consulta->fetchObject('viaje');
    return $uno;				       
}

public static function CargarUno($marca,$modelo,$categoria,$patente,$estado)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("insert into auto (patente, marca, modelo, categoria, estado) values
    ('$patente','$marca','$modelo','$categoria','$estado')");
    $consulta->execute();

    return "éxito";				       
}

public static function ModificarUno($id,$patente,$marca,$modelo,$categoria,$estado)
{
    if($marca != null && $marca != ''){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update auto set patente='$patente', marca='$marca', 
            modelo='$modelo',categoria='$categoria'
        where id='$id'");
        $consulta->execute();
    }else{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update auto set estado = '$estado'
        where id='$id'");
        $consulta->execute();
    }

    return "éxito";				       
}

public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from auto");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "auto");		
	}

}