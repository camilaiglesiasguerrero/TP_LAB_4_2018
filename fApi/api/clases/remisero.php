<?php
class remisero
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
    $consulta =$objetoAccesoDato->RetornarConsulta("select * from remisero where email='$usuario'");
    $consulta->execute();
    $uno= $consulta->fetchObject('remisero');
    return $uno;				       
}

public static function CargarUno($nombre,$apellido,$email,$telefono,$estado,$foto,$na)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta = $objetoAccesoDato->RetornarConsulta("select id from usuario where email = '$email'");
    $consulta->execute();
    $id = $consulta->fetch(PDO::FETCH_OBJ);

    $consulta =$objetoAccesoDato->RetornarConsulta("insert into remisero (id, nombre, apellido, estado, email, telefono, pathFoto, na) 
    values ('$id->id','$nombre','$apellido','$estado', '$email','$telefono','$foto','$na')");
    $consulta->execute();

   
    return "éxito";				       
}

public static function ModificarUno($id,$nombre,$apellido,$telefono,$email,$calificacion,$estado,$na)
{
    if($nombre != null && $nombre != '' && $apellido != null && $apellido != '' && $telefono != null && $telefono != ''){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("update remisero set nombre='$nombre', apellido='$apellido'
        ,telefono='$telefono', na='$na'
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