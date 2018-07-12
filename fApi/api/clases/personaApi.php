<?php
require_once 'persona.php';
require_once 'IApiUsable.php';

class personaApi extends persona implements IApiUsable
{
 	public function TraerUno($request, $response, $args) {
     	$id=$args['id'];
        $laPersona=persona::TraerUnaPersona($id);
        if(!$laPersonaelCd)
        {
            $objDelaRespuesta= new stdclass();
            $objDelaRespuesta->error="No esta la Persona";
            $NuevaRespuesta = $response->withJson($objDelaRespuesta, 500); 
        }else
        {
            $NuevaRespuesta = $response->withJson($elCd, 200); 
        }     
        return $NuevaRespuesta;
    }
     
    public function TraerTodos($request, $response, $args) {
      	$todosLasPersonas=persona::TraerTodasLasPersonas();
     	$newresponse = $response->withJson($todosLasPersonas, 200);  
    	return $newresponse;
    }


    
      public function CargarUno($request, $response, $args) {
         
        

        $objDelaRespuesta= new stdclass();
        
    }

    Public function BorrarUno($request,$response,$args)
    {   
        //Objeto Standar
        $obj= new stdclass();
        //tomo parametro del body que recibo
        $ArrayDeParametros= $request->getParsedBody();
        //genero variable id
        $_id=$ArrayDeParametros['id'];
        //instancia user
        $persona= new persona();
        $persona->id=$_id;
        //metodo que borra usuario y me devuelve >0 si borro
        $Borrados=$persona->BorrarUser();
        $obj->cantidad=$Borrados;
        if($Borrados>0)
        {
        $obj->resultado="Eliminado";
        }
        else
        ($obj->resultado="No Elimino Nada");
        //devuelvo respuesta y 200
        $Rta= $response->withJson($obj,200);
        return $Rta;
    
    }
     
    public function ModificarUno($request,$response,$args)
    {
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros);    	
        $miusuario = new persona();
        $miusuario->Id=$ArrayDeParametros['id'];
        $miusuario->Nombre=$ArrayDeParametros['nombre'];
        $miusuario->Apellido=$ArrayDeParametros['apellido'];
        $miusuario->Coordenada=$ArrayDeParametros['coordenada'];
        $miusuario->Sexo=$ArrayDeParametros['sexo'];
        $miusuario->Direccion=$ArrayDeParametros['direccion'];
    
           $resultado =$miusuario->ModificarPersona();
           $objDelaRespuesta= new stdclass();
        //var_dump($resultado);
        $objDelaRespuesta->resultado=$resultado;
        
        if($resultado==true)
        {
            $objDelaRespuesta->mensaje="Modificado Exitosamente";
            return $response->withJson($objDelaRespuesta, 200);
        }
        else{
            $objDelaRespuesta->mensaje="No se modifico";
        return $response->withJson($objDelaRespuesta, 400);
        }
    }


}