-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-07-2018 a las 07:08:18
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `remiseriahumberto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auto`
--

CREATE TABLE `auto` (
  `id` int(11) NOT NULL,
  `patente` varchar(7) COLLATE utf8_spanish2_ci NOT NULL,
  `marca` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `modelo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `categoria` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `auto`
--

INSERT INTO `auto` (`id`, `patente`, `marca`, `modelo`, `categoria`, `estado`) VALUES
(1, 'AA123AB', 'Renault', 'Clio', 'sedan', 'Activo'),
(2, 'AA321AA', 'Honda', 'Civic', 'ej', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autoviajechofer`
--

CREATE TABLE `autoviajechofer` (
  `idViaje` int(11) NOT NULL,
  `chofer` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `patente` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` varchar(15) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `autoviajechofer`
--

INSERT INTO `autoviajechofer` (`idViaje`, `chofer`, `patente`, `fecha`, `hora`, `estado`) VALUES
(1, ' Juan Carlos Gómez', 'AA123AB', '2018-07-01', '22:29:00', 'Asignado'),
(2, ' Juan Carlos Gómez', 'AA123AB', '2018-07-01', '22:29:00', 'Asignado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `remisero`
--

CREATE TABLE `remisero` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `calificacion` float DEFAULT NULL,
  `estado` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `pathFoto` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `remisero`
--

INSERT INTO `remisero` (`id`, `nombre`, `apellido`, `calificacion`, `estado`, `email`, `telefono`, `pathFoto`) VALUES
(4, 'Juan Carlos', 'Gómez', 5, 'Activo', 'juancarlos@remisero.com', 1512345678, ''),
(5, 'Jorge', 'Dipper', 3, 'Activo', '', 1567623806, NULL),
(6, 'Dipper', 'Jorge', 3, 'Inactivo', 'dipper@remisero.com', 1568974565, NULL),
(7, 'Camila', 'Iglesias', 3, 'Activo', 'camila.ig08@gmail.com', 1167623806, NULL),
(8, 'Juan', 'Perez', 3, 'Activo', 'juanperez@remisero', 1167623806, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `clave`, `tipo`) VALUES
(1, 'admin@admin.com', 'admin', 'admin'),
(2, 'cliente@cliente.com', 'cliente', 'cliente'),
(3, 'encargado@encargado.com', 'encargado', 'encargado'),
(4, 'juancarlos@remisero.com', 'remisero', 'remisero'),
(5, 'jorge@dipper.com', '123456', 'remisero'),
(6, 'dipper@remisero.com', '123456', 'remisero'),
(7, 'camila.ig08@gmail.com', '123456', 'remisero'),
(8, 'juanperez@remisero', '123456', 'remisero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viaje`
--

CREATE TABLE `viaje` (
  `id` int(11) NOT NULL,
  `origen` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `destino` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `latO` float NOT NULL,
  `latD` float NOT NULL,
  `lngO` float NOT NULL,
  `lngD` float NOT NULL,
  `duracion` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `distancia` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `obs` varchar(1000) COLLATE utf8_spanish2_ci NOT NULL,
  `tipoServicio` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `medioPago` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `valor` float NOT NULL,
  `solicitante` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `chofer` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `auto` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `estado` varchar(25) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `viaje`
--

INSERT INTO `viaje` (`id`, `origen`, `destino`, `latO`, `latD`, `lngO`, `lngD`, `duracion`, `distancia`, `fecha`, `hora`, `obs`, `tipoServicio`, `medioPago`, `valor`, `solicitante`, `chofer`, `auto`, `estado`) VALUES
(1, 'Azcuénaga 384, C1029AAH CABA, Argentina', 'Av. Bartolomé Mitre 750, B1870AAU Avellaneda, Buenos Aires, Argentina', -34.6051, -34.6623, -58.4009, -58.3647, '20 min', '9,0 km', '2018-07-01', '22:29:00', '', 'sedan', 'eft', 180.5, 'cliente@cliente.com', 'Juan Carlos Gómez', 'AA123AB', 'Finalizado'),
(2, 'Azcuénaga 384, C1029AAH CABA, Argentina', 'Av. Bartolomé Mitre 750, B1870AAU Avellaneda, Buenos Aires, Argentina', -34.6051, -34.6623, -58.4009, -58.3647, '20 min', '9,0 km', '2018-07-01', '22:29:00', '', 'sedan', 'eft', 0, 'cliente@cliente.com', '', '', 'Nuevo'),
(3, 'Azcuénaga 384, C1029AAH CABA, Argentina', 'Av. Bartolomé Mitre 750, B1870AAU Avellaneda, Buenos Aires, Argentina', -34.6051, -34.6623, -58.4009, -58.3647, '20 min', '9,0 km', '2018-07-27', '22:29:00', '', 'flete', 'eft', 0, 'cliente@cliente.com', '', '', 'Nuevo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `viaje`
--
ALTER TABLE `viaje`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auto`
--
ALTER TABLE `auto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `viaje`
--
ALTER TABLE `viaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
