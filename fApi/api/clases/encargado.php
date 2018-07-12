<?php
class encargado
{
    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $calificacion;
    public $estado;
    public $telefono;
    
public static function TraerUno($usuario) 
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select * from encargado where email='$usuario'");
    $consulta->execute();
    $uno= $consulta->fetchObject('remisero');
    return $uno;				       
}

public static function CargarUno($nombre,$apellido,$email,$telefono,$estado)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta = $objetoAccesoDato->RetornarConsulta("select id from usuario where email = '$email'");
    $consulta->execute();
    $id = $consulta->fetch(PDO::FETCH_OBJ);

    $consulta =$objetoAccesoDato->RetornarConsulta("insert into encargado (id, nombre, apellido, estado, email, telefono) 
    values ('$id->id','$nombre','$apellido','$estado', '$email','$telefono')");
    $consulta->execute();

    return "éxito";				       
}

public static function ModificarUno($id,$nombre,$apellido,$telefono,$email,$estado)
{
    if($nombre != null && $nombre != '' && $apellido != null && $apellido != '' && $telefono != null && $telefono != ''){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update encargado set nombre='$nombre', apellido='$apellido'
        ,telefono='$telefono'
        where id='$id'");
        $consulta->execute();
    }else if($nombre == null && $apellido == null && $telefono == null && $email == null){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update encargado set estado = '$estado'
        where id='$id'");
        $consulta->execute();			       
    }
}

public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from encargado");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "remisero");		
	}

}