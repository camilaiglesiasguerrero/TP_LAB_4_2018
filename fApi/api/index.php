<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../composer/vendor/autoload.php';
require_once '/clases/AccesoDatos.php';
require_once '/clases/AutentificadorJWT.php';
require_once '/clases/MWparaCORS.php';
require_once '/clases/MWparaAutentificar.php';
require_once '/clases/persona.php';
require_once '/clases/usuario.php';
require_once '/clases/personaApi.php';
require_once '/clases/viaje.php';
require_once '/clases/remisero.php';
require_once '/clases/encargado.php';
require_once '/clases/auto.php';
require_once '/clases/asignar.php';
require_once '/clases/encuesta.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['determineRouteBeforeAppMiddleware'] = true;
/*

¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);



/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/
$app->post('/ingreso/', function (Request $request, Response $response) {    

	$token="";
  $ArrayDeParametros = $request->getParsedBody();
 
  $email=$ArrayDeParametros['email']; 
  $clave=$ArrayDeParametros['clave'];
  $tipo=$ArrayDeParametros['tipo'];

 //var_dump($usuario);
   if( $email &&  $clave )
   {
      if( usuario::esValido($email,$clave,$tipo))
      {
        $datos=array('email'=>$email,'tipo'=>$tipo);
        $token= AutentificadorJWT::CrearToken($email,$tipo);
        //$retorno=array('datos'=> $datos, 'token'=>$token );
        $retorno=array('token'=>$token );
        $newResponse = $response->withJson( $retorno ,200); 
          //usuario::GuardaToken($token,$email);
      }
      else
      {
        $retorno=array('error'=> "no es usuario valido" );
        $newResponse = $response->withJson( $retorno ,409); 
      }
      }else
      {
            $retorno=array('error'=> "Faltan los datos del usuario y su clave" );
            $newResponse = $response->withJson( $retorno  ,411); 

      }
 
	
  $newResponse
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods',  'POST');

  return $newResponse;

});

$app->get('/ingreso/', function (Request $request, Response $response,$arg) {    
    
  $token="";

  $datos=$request->getParam();
  if(isset( $arg['email']) && isset( $arg['clave']) )
  {
      $email=$ArrayDeParametros['email'];
      $clave= $ArrayDeParametros['clave'];
      $tipo = $ArrayDeParametros['tipo'];
      if(usuario::esValido($email,$clave,$tipo))
      {
        //$datos=array('email'=>$email,'clave'=>$clave);
        //$token= AutentificadorJWT::CrearToken($datos);
        $token= AutentificadorJWT::CrearToken($email,$tipo);
        $retorno=array('datos'=> $datos, 'token'=>$token );
        $newResponse = $response->withJson( $retorno ,200); 
      }
      else
      {
        $retorno=array('error'=> "no es usuario valido" );
        $newResponse = $response->withJson( $retorno ,409); 
      }
  }else
  {
        $retorno=array('error'=> "Faltan los datos del usuario y su clave" );
        $newResponse = $response->withJson( $datos  ,411); 
  }
 
  return $newResponse;
   });

   $app->post('/Usuario/', function (Request $request, Response $response) {    
  
    $ArrayDeParametros = $request->getParsedBody();
    
    $tipo=$ArrayDeParametros['tipo']; 
    $email=$ArrayDeParametros['email'];
    $clave=$ArrayDeParametros['clave'];
    
    
    $msj = usuario::CargarUnUsuario($tipo,$email,$clave);
    
    $retorno=array('mensaje'=>$msj );
    $newResponse = $response->withJson( $retorno ,200); 
    $newResponse
              ->withHeader('Access-Control-Allow-Origin', '*')
              ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
              ->withHeader('Access-Control-Allow-Methods',  'POST');
    
    return $newResponse;
    
    });

    $app->post('/Asignar/', function (Request $request, Response $response) {    
  
      $ArrayDeParametros = $request->getParsedBody();
      $idViaje = $ArrayDeParametros['id'];
      $fecha = $ArrayDeParametros['fecha'];
      $hora = $ArrayDeParametros['hora'];
      $chofer = $ArrayDeParametros['chofer'];
      $patente = $ArrayDeParametros['patente'];
      $estado = $ArrayDeParametros['estado'];
      
      $msj = asignar::CargarUno($idViaje,$chofer,$patente,$fecha,$hora,$estado);
      $retorno=array('mensaje'=>$msj );
      $newResponse = $response->withJson( $retorno ,200); 
      $newResponse
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods',  'POST');
      
      return $newResponse;
      
      });
    
      $app->post('/Remisero/', function (Request $request, Response $response) {    
  
        $ArrayDeParametros = $request->getParsedBody();
        $nombre = $ArrayDeParametros['nombre'];
        $apellido = $ArrayDeParametros['apellido'];
        $email = $ArrayDeParametros['email'];
        $telefono = $ArrayDeParametros['telefono'];
        $estado = $ArrayDeParametros['estado'];
        $foto = $ArrayDeParametros['foto'];
        $na = $ArrayDeParametros['na'];
        
        $id = usuario::CargarUnUsuario('remisero',$email,123456);
        $msj = remisero::CargarUno($nombre,$apellido,$email,$telefono,$estado,$foto,$na);
        
        
        $retorno=array('mensaje'=>$msj );
        $newResponse = $response->withJson( $retorno ,200); 
        $newResponse
                  ->withHeader('Access-Control-Allow-Origin', '*')
                  ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                  ->withHeader('Access-Control-Allow-Methods',  'POST');
        
        return $newResponse;
        
        });

        $app->post('/Encargado/', function (Request $request, Response $response) {    
  
          $ArrayDeParametros = $request->getParsedBody();
          $nombre = $ArrayDeParametros['nombre'];
          $apellido = $ArrayDeParametros['apellido'];
          $email = $ArrayDeParametros['email'];
          $telefono = $ArrayDeParametros['telefono'];
          $estado = $ArrayDeParametros['estado'];
          
          $id = usuario::CargarUnUsuario('encargado',$email,123456);
          $msj = encargado::CargarUno($nombre,$apellido,$email,$telefono,$estado);
          
          $retorno=array('mensaje'=>$msj );
          $newResponse = $response->withJson( $retorno ,200); 
          $newResponse
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods',  'POST');
          
          return $newResponse;
          
          });
  
        $app->post('/Auto/', function (Request $request, Response $response) {    
  
          $ArrayDeParametros = $request->getParsedBody();
          $patente = $ArrayDeParametros['patente'];
          $marca = $ArrayDeParametros['marca'];
          $modelo = $ArrayDeParametros['modelo'];
          $categoria = $ArrayDeParametros['categoria'];
          $estado = $ArrayDeParametros['estado'];
          
          $msj = auto::CargarUno($marca,$modelo,$categoria,$patente,$estado);
          $retorno=array('mensaje'=>$msj );
          $newResponse = $response->withJson( $retorno ,200); 
          $newResponse
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods',  'POST');
          
          return $newResponse;
          
          });
  
    $app->post('/Viaje/', function (Request $request, Response $response) {    
  
      $ArrayDeParametros = $request->getParsedBody();
      
      $fecha = $ArrayDeParametros['fecha'];
      $hora = $ArrayDeParametros['hora'];
      $solicitante = $ArrayDeParametros['solicitante'];
      $origen = $ArrayDeParametros['origen'];
      $destino = $ArrayDeParametros['destino'];
      $latO = $ArrayDeParametros['latO'];
      $latD = $ArrayDeParametros['latD'];
      $lngO = $ArrayDeParametros['lngO'];
      $lngD = $ArrayDeParametros['lngD'];
      $medioPago = $ArrayDeParametros['medioPago'];
      $tipoServ = $ArrayDeParametros['tipoServicio'];
      $obs = $ArrayDeParametros['Obs'];
      $duracion = $ArrayDeParametros['duracion'];
      $distancia = $ArrayDeParametros['distancia'];
      $valor = $ArrayDeParametros['valor'];
      $estado = $ArrayDeParametros['estado'];
      

      $msj = viaje::CargarUno($origen, $destino,$latO,$latD,$lngO,$lngD,$duracion,$distancia,
        $fecha,$hora,$tipoServ,$medioPago,$solicitante,$estado,$obs,$valor);
      $retorno=array('mensaje'=>$msj );
      $newResponse = $response->withJson( $retorno ,200); 
      $newResponse
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods',  'POST');
      
      return $newResponse;
      
      });

      $app->post('/Encuesta/', function (Request $request, Response $response) {    
  
        $ArrayDeParametros = $request->getParsedBody();
        
        $id = $ArrayDeParametros['idViaje'];
        $idCho = $ArrayDeParametros['chofer'];
        $calificacion = $ArrayDeParametros['calificacion'];
        $condiciones = $ArrayDeParametros['condiciones'];
        $precio = $ArrayDeParametros['precio'];
        $confort = $ArrayDeParametros['confort'];
        $limpio = $ArrayDeParametros['limpio'];
        $moderno = $ArrayDeParametros['moderno'];
        $tiempo = $ArrayDeParametros['tiempo'];
        $tardoA = $ArrayDeParametros['tardoA'];
        $tardoC = $ArrayDeParametros['tardoC'];
        $elegirnos = $ArrayDeParametros['elegirnos'];
        $pagina = $ArrayDeParametros['pagina'];
        $sugerencias = $ArrayDeParametros['sugerencias'];
        
        $msj = remisero::ModificarUno($idCho, null, null, null, null,$calificacion,null);

        $msj = encuesta::CargarUna($id,$condiciones,$precio,$confort,$limpio,$moderno,$tiempo,$tardoA,$tardoC,
        $elegirnos,$pagina,$sugerencias);
        $retorno=array('mensaje'=>$msj );
        $newResponse = $response->withJson( $retorno ,200); 
        $newResponse
                  ->withHeader('Access-Control-Allow-Origin', '*')
                  ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                  ->withHeader('Access-Control-Allow-Methods',  'POST');
        
        return $newResponse;
        
        });
    
      $app->post('/Viaje/Modificar/', function (Request $request, Response $response) {    
  
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros['id'];
        $fecha = $ArrayDeParametros['fecha'];
        $hora = $ArrayDeParametros['hora'];
        $solicitante = $ArrayDeParametros['solicitante'];
        $origen = $ArrayDeParametros['origen'];
        $destino = $ArrayDeParametros['destino'];
        $latO = $ArrayDeParametros['latO'];
        $latD = $ArrayDeParametros['latD'];
        $lngO = $ArrayDeParametros['lngO'];
        $lngD = $ArrayDeParametros['lngD'];
        $medioPago = $ArrayDeParametros['medioPago'];
        $tipoServ = $ArrayDeParametros['tipoServicio'];
        $obs = $ArrayDeParametros['Obs'];
        $duracion = $ArrayDeParametros['duracion'];
        $distancia = $ArrayDeParametros['distancia'];
        $valor = $ArrayDeParametros['valor'];
        $chofer = $ArrayDeParametros['chofer'];
        $auto = $ArrayDeParametros['auto'];
        $estado = $ArrayDeParametros['estado'];
        
  
        $msj = viaje::ModificarUno($id,$origen, $destino,$latO,$latD,$lngO,$lngD,$duracion,$distancia,
          $fecha,$hora,$tipoServ,$medioPago,$solicitante,$estado,$obs,$chofer,$auto,$valor);
        $retorno=array('mensaje'=>$msj );
        $newResponse = $response->withJson( $retorno ,200); 
        $newResponse
                  ->withHeader('Access-Control-Allow-Origin', '*')
                  ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                  ->withHeader('Access-Control-Allow-Methods',  'POST');
        
        return $newResponse;
        
        });
      
        $app->post('/Auto/Modificar/', function (Request $request, Response $response) {    
  
          $ArrayDeParametros = $request->getParsedBody();
          $id = $ArrayDeParametros['id'];
          $patente = $ArrayDeParametros['patente'];
          $marca = $ArrayDeParametros['marca'];
          $modelo = $ArrayDeParametros['modelo'];
          $categoria = $ArrayDeParametros['categoria'];
          $estado = $ArrayDeParametros['estado'];
          
          $msj = auto::ModificarUno($id,$patente,$marca,$modelo,$categoria,$estado);
          $retorno=array('mensaje'=>$msj );
          $newResponse = $response->withJson( $retorno ,200); 
          $newResponse
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods',  'POST');
          
          return $newResponse;
          
          });
        
        $app->post('/Chofer/Modificar/', function (Request $request, Response $response) {    
  
          $ArrayDeParametros = $request->getParsedBody();
          $id = $ArrayDeParametros['id'];
          $nombre = $ArrayDeParametros['nombre'];
          $apellido = $ArrayDeParametros['apellido'];
          $telefono  = $ArrayDeParametros['telefono'];
          $email  = $ArrayDeParametros['email'];
          $calificacion  = $ArrayDeParametros['calificacion'];
          $estado = $ArrayDeParametros['estado'];
          $na = $ArrayDeParametros['na'];

          $msj = remisero::ModificarUno($id,$nombre,$apellido,$telefono,$email,$calificacion,$estado,$na);
          $retorno=array('mensaje'=>$msj );
          $newResponse = $response->withJson( $retorno ,200); 
          $newResponse
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods',  'POST');
          
          return $newResponse;
          
          });

    $app->post('/Encargado/Modificar/', function (Request $request, Response $response) {    

      $ArrayDeParametros = $request->getParsedBody();
      $id = $ArrayDeParametros['id'];
      $nombre = $ArrayDeParametros['nombre'];
      $apellido = $ArrayDeParametros['apellido'];
      $telefono  = $ArrayDeParametros['telefono'];
      $email  = $ArrayDeParametros['email'];
      $estado = $ArrayDeParametros['estado'];
    
      $msj = encargado::ModificarUno($id,$nombre,$apellido,$telefono,$email,$estado);
      $retorno=array('mensaje'=>$msj );
      $newResponse = $response->withJson( $retorno ,200); 
      $newResponse
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods',  'POST');
      
      return $newResponse;
      
      });
  
      $app->get('/ARV/', function (Request $request, Response $response) {    
  
        $todos= asignar::TraerTodos();
        $newresponse = $response->withJson($todos, 200);  
        return $newresponse;
      
      });
    
      $app->get('/Viajes/', function (Request $request, Response $response) {    
  
        $todos= viaje::TraerTodos();
        $newresponse = $response->withJson($todos, 200);  
        return $newresponse;
      
      });
    
      $app->get('/Viaje/{id}', function (Request $request, Response $response, $args) {    
        
        $id=$args['id'];
        $uno= viaje::TraerUno($id);
        $newresponse = $response->withJson($uno, 200);  
        return $newresponse;
      
      });
      
      $app->get('/Remiseros/', function (Request $request, Response $response) {    
  
        $todos= remisero::TraerTodos();
        $newresponse = $response->withJson($todos, 200);  
        return $newresponse;
      
      });

      $app->get('/Encargados/', function (Request $request, Response $response) {    
  
        $todos= encargado::TraerTodos();
        $newresponse = $response->withJson($todos, 200);  
        return $newresponse;
      
      });

      $app->get('/Remisero/{usuario}', function (Request $request, Response $response, $args) {    
        
        $usuario=$args['usuario'];
        $uno= remisero::TraerUno($usuario);
        $newresponse = $response->withJson($uno, 200);  
        return $newresponse;
      
      });

      $app->get('/Usuario/{usuario}', function (Request $request, Response $response, $args) {    
        
        $usuario=$args['usuario'];
        if(usuario::TraerUsuario($usuario)){
          $retorno=array('mensaje'=>'existe');  
          $newresponse = $response->withJson($retorno, 201);    
        }
        else{
          $retorno=array('mensaje'=>'no existe');  
          $newresponse = $response->withJson($retorno, 200);  
        }
        
        
      
        return $newresponse;
      });


      $app->get('/Autos/', function (Request $request, Response $response) {    
  
        $todos= auto::TraerTodos();
        $newresponse = $response->withJson($todos, 200);  
        return $newresponse;
      
      });
      

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
$app->run();