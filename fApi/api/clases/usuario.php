<?php
class usuario
{
    public $id;
	public $email;
    public $clave;
    public $tipo;

    public static function esValido($email,$clave,$tipo) {
        
        
     $unaPersona = usuario::TraerUnUsuario($email,$clave,$tipo);   
            
     if($unaPersona!=null)
     {
        return true;

     }
     return false;
}

/*public static function GuardaToken($token,$email) 
{
           $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
           $consulta =$objetoAccesoDato->RetornarConsulta("
               update usuario 
               set token='$token'
               where  email    = '$email'");
           return $consulta->execute();   

}*/
    
public static function TraerUnUsuario($email,$clave,$tipo) 
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select id,email,clave,tipo from usuario where email = '$email' and Clave='$clave' and tipo='$tipo' ");
    $consulta->execute();
    $unapersona= $consulta->fetchObject('usuario');
    return $unapersona;				       
}

public static function CargarUnUsuario($tipo,$email,$clave)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

    
    $consulta =$objetoAccesoDato->RetornarConsulta("insert into usuario (email, clave, tipo) values ('$email','$clave','$tipo')");
    $consulta->execute();
    
}

public static function TraerUsuario($email)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario where email = '$email'");
    $consulta->execute();
    $existe = $consulta->fetchObject('usuario');
    if($existe != null && $existe != '')
        return true;
    else
        return false;			       
}
}