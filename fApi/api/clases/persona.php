<?php
class persona
{
    public $Id;
	public $Legajo;
	public $Nombre;
	public $Tipo;
	public $Edad;
	public $Foto;


	public static function esValido($usuario, $clave) {
		
			return true;
		//  if($usuario=="admin@admin.com" && $clave=="1234")
		//  {
		//    return true;
		//  }
		//  else
		//  {
		// 	return false;
  
		//  }
}
 
public function BorrarUser()
{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	   $consulta =$objetoAccesoDato->RetornarConsulta("
		   delete 
		   from empleado				
		   WHERE id=:id");	
		   $consulta->bindValue(':id',$this->id, PDO::PARAM_INT);		
		   $consulta->execute();
		   return $consulta->rowCount();
}
  	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id,Legajo,Nombre,Tipo,Edad,Foto from empleado ");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "persona");		
	}

	public static function TraerUnaPersona($id) 
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id,Legajo,Nombre,Tipo,Edad,Foto from empleado where legajo = $legajo");
		$consulta->execute();
		$unapersona= $consulta->fetchObject('persona');
		return $unapersona;				

			
	}

	public function mostrarDatos()
	{
	  	return "Metodo mostar:".$this->titulo."  ".$this->cantante."  ".$this->año;
	}

	public function ModificarPersona()
	{

		   $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		   $consulta =$objetoAccesoDato->RetornarConsulta("
			   update persona
			   set Nombre='$this->Nombre',
				Apellido='$this->Apellido',
			   Direccion='$this->Direccion',
			   Coordenada='$this->Coordenada',
			   Sexo='$this->Sexo'
			   WHERE id='$this->Id'");
		   return $consulta->execute();

	}

}