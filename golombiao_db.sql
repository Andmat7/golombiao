-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2013 a las 20:13:26
-- Versión del servidor: 5.5.32
-- Versión de PHP: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `golombiao_db`
--
CREATE DATABASE IF NOT EXISTS `golombiao_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `golombiao_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE IF NOT EXISTS `ciudades` (
  `idCiudad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) DEFAULT NULL,
  `idDepartamento` int(11) NOT NULL,
  PRIMARY KEY (`idCiudad`),
  KEY `idDepartamento` (`idDepartamento`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`idCiudad`, `nombre`, `idDepartamento`) VALUES
(1, 'Bello', 1),
(2, 'Caldas', 1),
(3, 'Copacabana', 1),
(4, 'Envigado', 1),
(5, 'Guarne', 1),
(6, 'Itagui', 1),
(7, 'La Ceja', 1),
(8, 'La Estrella', 1),
(9, 'La Tablaza', 1),
(10, 'Marinilla', 1),
(11, 'Medellín', 1),
(12, 'Rionegro', 1),
(13, 'Sabaneta', 1),
(14, 'San Antonio de Prado', 1),
(15, 'San Cristóbal', 1),
(16, 'Caucasia', 1),
(17, 'Barranquilla', 2),
(18, 'Malambo', 2),
(19, 'Puerto Colombia', 2),
(20, 'Soledad', 2),
(21, 'Arjona', 3),
(22, 'Bayunca', 3),
(23, 'Carmen de Bolívar', 3),
(24, 'Cartagena', 3),
(25, 'Turbaco', 3),
(26, 'Arcabuco', 4),
(27, 'Belencito', 4),
(28, 'Chiquinquirá', 4),
(29, 'Combita', 4),
(30, 'Cucaita', 4),
(31, 'Duitama', 4),
(32, 'Mongui', 4),
(33, 'Nobsa', 4),
(34, 'Paipa', 4),
(35, 'Puerto Boyacá', 4),
(36, 'Ráquira', 4),
(37, 'Samaca', 4),
(38, 'Santa Rosa de Viterbo', 4),
(39, 'Sogamoso', 4),
(40, 'Sutamerchán', 4),
(41, 'Tibasosa', 4),
(42, 'Tinjaca', 4),
(43, 'Tunja', 4),
(44, 'Ventaquemada', 4),
(45, 'Villa de Leiva', 4),
(46, 'La Dorada', 5),
(47, 'Manizales', 5),
(48, 'Villamaria', 5),
(49, 'Caloto', 6),
(50, 'Ortigal', 6),
(51, 'Piendamo', 6),
(52, 'Popayán', 6),
(53, 'Puerto Tejada', 6),
(54, 'Santander Quilichao', 6),
(55, 'Tunia', 6),
(56, 'Villarica', 6),
(57, 'Valledupar', 7),
(58, 'Cerete', 8),
(59, 'Montería', 8),
(60, 'Planeta Rica', 8),
(61, 'Alban', 9),
(62, 'Bogotá', 9),
(63, 'Bojaca', 9),
(64, 'Bosa', 9),
(65, 'Briceño', 9),
(66, 'Cajicá', 9),
(67, 'Chía', 9),
(68, 'Chinauta', 9),
(69, 'Choconta', 9),
(70, 'Cota', 9),
(71, 'El Muña', 9),
(72, 'El Rosal', 9),
(73, 'Engativá', 9),
(74, 'Facatativa', 9),
(75, 'Fontibón', 9),
(76, 'Funza', 9),
(77, 'Fusagasuga', 9),
(78, 'Gachancipá', 9),
(79, 'Girardot', 9),
(80, 'Guaduas', 9),
(81, 'Guayavetal', 9),
(82, 'La Calera', 9),
(83, 'La Caro', 9),
(84, 'Madrid', 9),
(85, 'Mosquera', 9),
(86, 'Nemocón', 9),
(87, 'Puente Piedra', 9),
(88, 'Puente Quetame', 9),
(89, 'Puerto Bogotá', 9),
(90, 'Puerto Salgar', 9),
(91, 'Quetame', 9),
(92, 'Sasaima', 9),
(93, 'Sesquile', 9),
(94, 'Sibaté', 9),
(95, 'Silvania', 9),
(96, 'Simijaca', 9),
(97, 'Soacha', 9),
(98, 'Sopo', 9),
(99, 'Suba', 9),
(100, 'Subachoque', 9),
(101, 'Susa', 9),
(102, 'Tabio', 9),
(103, 'Tenjo', 9),
(104, 'Tocancipa', 9),
(105, 'Ubaté', 9),
(106, 'Usaquén', 9),
(107, 'Usme', 9),
(108, 'Villapinzón', 9),
(109, 'Villeta', 9),
(110, 'Zipaquirá', 9),
(111, 'Maicao', 10),
(112, 'Riohacha', 10),
(113, 'Aipe', 11),
(114, 'Neiva', 11),
(115, 'Cienaga', 12),
(116, 'Gaira', 12),
(117, 'Rodadero', 12),
(118, 'Santa Marta', 12),
(119, 'Taganga', 12),
(120, 'Villavicencio', 13),
(121, 'Ipiales', 14),
(122, 'Pasto', 14),
(123, 'Cúcuta', 15),
(124, 'El Zulia', 15),
(125, 'La Parada', 15),
(126, 'Los Patios', 15),
(127, 'Villa del Rosario', 15),
(128, 'Armenia', 16),
(129, 'Calarcá', 16),
(130, 'Circasia', 16),
(131, 'La Tebaida', 16),
(132, 'Montenegro', 16),
(133, 'Quimbaya', 16),
(134, 'Dosquebradas', 17),
(135, 'Pereira', 17),
(136, 'Aratoca', 18),
(137, 'Barbosa', 18),
(138, 'Bucaramanga', 18),
(139, 'Floridablanca', 18),
(140, 'Girón', 18),
(141, 'Lebrija', 18),
(142, 'Oiba', 18),
(143, 'Piedecuesta', 18),
(144, 'Pinchote', 18),
(145, 'San Gil', 18),
(146, 'Socorro', 18),
(147, 'Sincelejo', 19),
(148, 'Armero', 20),
(149, 'Buenos Aires', 20),
(150, 'Castilla', 20),
(151, 'Espinal', 20),
(152, 'Flandes', 20),
(153, 'Guamo', 20),
(154, 'Honda', 20),
(155, 'Ibagué', 20),
(156, 'Mariquita', 20),
(157, 'Melgar', 20),
(158, 'Natagaima', 20),
(159, 'Payande', 20),
(160, 'Purificación', 20),
(161, 'Saldaña', 20),
(162, 'Tolemaida', 20),
(163, 'Amaime', 21),
(164, 'Andalucía', 21),
(165, 'Buenaventura', 21),
(166, 'Buga', 21),
(167, 'Buga La Grande', 21),
(168, 'Caicedonia', 21),
(169, 'Cali', 21),
(170, 'Candelaria', 21),
(171, 'Cartago', 21),
(172, 'Cavasa', 21),
(173, 'Costa Rica', 21),
(174, 'Dagua', 21),
(175, 'El Carmelo', 21),
(176, 'El Cerrito', 21),
(177, 'El Placer', 21),
(178, 'Florida', 21),
(179, 'Ginebra', 21),
(180, 'Guacarí', 21),
(181, 'Jamundi', 21),
(182, 'La Paila', 21),
(183, 'La Unión', 21),
(184, 'La Victoria', 21),
(185, 'Loboguerrero', 21),
(186, 'Palmira', 21),
(187, 'Pradera', 21),
(188, 'Roldanillo', 21),
(189, 'Rozo', 21),
(190, 'San Pedro', 21),
(191, 'Sevilla', 21),
(192, 'Sonso', 21),
(193, 'Tulúa', 21),
(194, 'Vijes', 21),
(195, 'Villa Gorgona', 21),
(196, 'Yotoco', 21),
(197, 'Yumbo', 21),
(198, 'Zarzal', 21),
(199, 'Bogota D.C.', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `convocatoria`
--

CREATE TABLE IF NOT EXISTS `convocatoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipo_1` int(11) NOT NULL,
  `equipo_2` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  `principio` int(11) NOT NULL,
  `acepta_convocatoria` tinyint(1) NOT NULL,
  `tipo_juego` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Volcado de datos para la tabla `convocatoria`
--

INSERT INTO `convocatoria` (`id`, `equipo_1`, `equipo_2`, `fecha`, `hora`, `latitud`, `longitud`, `principio`, `acepta_convocatoria`, `tipo_juego`) VALUES
(23, 30, 25, '2013-11-06', '10:42:00', 4.71240480962023, -74.1099071502686, 4, 0, 1),
(25, 32, 28, '2014-11-14', '23:48:00', 4.71333506246179, -74.1055458784103, 1, 1, 1),
(26, 28, 26, '2013-11-13', '00:02:00', 0, 0, 1, 0, 2),
(27, 27, 31, '2014-11-10', '21:10:00', 5.21677612669732, -74.70703125, 1, 1, 1),
(28, 28, 31, '2013-12-13', '10:25:00', 4.60215575303042, -74.0748989582062, 4, 1, 1),
(29, 24, 26, '2013-11-22', '02:00:00', 4.745590741004131, -74.0581727027893, 5, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE IF NOT EXISTS `departamento` (
  `idDepartamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`idDepartamento`, `nombre`) VALUES
(1, 'Antioquia'),
(2, 'Atlántico'),
(3, 'Bolívar'),
(4, 'Boyacá'),
(5, 'Caldas'),
(6, 'Cauca'),
(7, 'Cesar'),
(8, 'Córdoba'),
(9, 'Cundinamarca'),
(10, 'Guajira'),
(11, 'Huila'),
(12, 'Magdalena'),
(13, 'Meta'),
(14, 'Nariño'),
(15, 'Norte de Santander'),
(16, 'Quindío'),
(17, 'Risaralda'),
(18, 'Santander'),
(19, 'Sucre'),
(20, 'Tolima'),
(21, 'Valle del Cauca'),
(0, 'Bogota D.C.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE IF NOT EXISTS `resultados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_conv` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `principio` int(11) NOT NULL,
  `barra` int(11) NOT NULL,
  `cump_acuerdos` int(11) NOT NULL,
  `faltas` int(11) NOT NULL,
  `meritos` int(11) NOT NULL,
  `no_players` int(2) NOT NULL,
  `no_players_presents` int(2) NOT NULL,
  `autoevaluacion` int(2) NOT NULL,
  `otherTeam` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`id`, `id_user`, `id_conv`, `id_equipo`, `principio`, `barra`, `cump_acuerdos`, `faltas`, `meritos`, `no_players`, `no_players_presents`, `autoevaluacion`, `otherTeam`) VALUES
(1, 55, 3, 21, 1, 1, 1, 1, 1, 0, 0, 0, 0),
(2, 55, 11, 10, 0, 2, 2, -2, 2, 0, 0, 0, 0),
(3, 55, 13, 23, 0, 2, 0, -2, 2, 0, 0, 0, 0),
(4, 55, 18, 24, 0, 2, 2, -2, 2, 0, 0, 0, 0),
(5, 61, 20, 29, 0, 2, 2, -2, -1, 0, 0, 0, 0),
(6, 55, 20, 29, 0, 2, 1, 2, 2, 0, 0, 0, 0),
(7, 123, 123, 123, 123, 123, 123, 123, 123, 0, 0, 0, 0),
(8, 55, 17, 24, 0, 0, 3, 2, 1, 0, 0, 0, 0),
(17, 55, 26, 28, 0, 0, 1, 0, 2, 3, 3, 2, 2),
(18, 55, 26, 26, 2, 3, 4, 1, 2, 4, 6, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams`
--

CREATE TABLE IF NOT EXISTS `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `leader_id` int(14) NOT NULL,
  `departamento` int(4) NOT NULL,
  `ciudad` int(14) NOT NULL,
  `zone_team` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

--
-- Volcado de datos para la tabla `teams`
--

INSERT INTO `teams` (`id`, `name`, `leader_id`, `departamento`, `ciudad`, `zone_team`, `description`) VALUES
(24, 'GolombiaoApp', 55, 9, 62, 'asdas', '1233dasd'),
(25, 'asdas', 43, 9, 62, '123123', '123123'),
(26, 'ñkñlk', 87, 78, 62, 'kljhlkjh', 'ñkjñkj'),
(27, 'Equipo1AC', 55, 9, 62, 'kdkdkdkrk', 'Idkdidjd'),
(28, 'Equipo2AC', 55, 4, 42, 'uiouio', 'uiouio'),
(29, 'Equipo tunjeño ', 61, 4, 43, 'Bogotá', 'And'),
(30, 'el equioito', 61, 4, 43, 'un barrio de tunja', 'Unequiptio de tunja'),
(31, 'Equipó Prueba', 69, 9, 62, 'Bosa', 'Equipo de prueba'),
(32, 'Tema to', 69, 9, 97, 'Olivos 2', 'Qawsedrftgyhujikolpñ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `encrypted_password` varchar(255) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` tinyint(2) NOT NULL,
  `gender` int(2) NOT NULL,
  `email` varchar(255) NOT NULL,
  `timesession` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `departamento` int(3) NOT NULL,
  `city` varchar(255) NOT NULL,
  `study` varchar(255) NOT NULL,
  `school_level` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=73 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `encrypted_password`, `session_id`, `first_name`, `last_name`, `age`, `gender`, `email`, `timesession`, `departamento`, `city`, `study`, `school_level`) VALUES
(55, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '5e6KxjBudbHhRFQM1sDAPpiIGtrvy8', 'Andres', 'Castellanos', 89, 1, 'ccast2@gmail.com', '2013-11-21 20:14:25', 1, '0', '1', '3'),
(56, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '', 'Andres', 'Castellanos', 23, 1, 'ccast2@gmail.com.co', '2013-10-21 00:31:13', 1, '0', '1', '3'),
(57, '240697cd1dd9b36528b10c9d249f0405e8983c99bec1b0f35efda93788b764ff', '', 'asdasd', 'asdasd', 23, 1, 'codfe.com@gmail.com', '2013-10-21 00:37:56', 12, '0', '1', '3'),
(58, '4708eb860ec2abf2e68966ccfa1a4cf802e93c5dc0ab12bf68e1f762763492cb', 'qfga7Pnmj6o1EzZSpFWkvLCROelTXV', 'Andres2', 'Castellanos2', 23, 1, 'profex@hotmail.com', '2013-10-21 07:53:39', 17, '0', '1', '3'),
(59, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '53X4ImKtqLiENyYGVWFBUjaRs2rbng', 'usuario', 'apellido1', 23, 1, 'ccast4@gmail.com', '2013-10-21 21:12:45', 9, '0', '1', '3'),
(60, '6c592d4d8c36b05907237121ad966ba5952e17695a4bba56edebbfff29ceb81f', 'XdQgz71WCRDh9LGpqfnKVOkvwZTJxl', 'adriana', 'rincon', 36, 2, 'juanseadri@gmail.com', '2013-10-21 21:13:41', 9, '0', '2', '3'),
(61, 'f6f12d007349ae2711b1f58ac7f21cb3ba7d14894bc0d0ea62eef31d6f7942d5', 'QUjaJ5olyv4Ck9MNIihzEeb0xOHsTS', 'Andres', 'Corredor', 26, 1, 'andrescorredor20@hotmail.com', '2013-11-16 14:03:38', 9, '0', '2', '3'),
(62, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 'qwerty', 'asdfg', 127, 1, 'qwerty@mail.com', '2013-10-30 21:19:46', 6, '0', '1', '3'),
(63, '38083c7ee9121e17401883566a148aa5c2e2d55dc53bc4a94a026517dbff3c6b', '', 'Qqqqqqqqqqqq', 'Wwwwwwwwww', 127, 1, 'asdfg@mail.com', '2013-10-30 22:16:50', 1, '0', '1', '3'),
(64, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 'Don', 'Nadie', 23, 1, 'dnadie@correo.com', '2013-10-31 18:35:04', 1, '0', '1', '3'),
(65, 'bdb179339ec1c1ee89b8dc1fc5dc493fd8cddb74fbcaf3b2aee19f13a2ccc42e', '', 'John', 'Doe', 23, 1, 'jdoe@correo.com', '2013-10-31 18:38:51', 5, '0', '1', '3'),
(66, '6b615adb1300c1161bcb58c11141164e9b762987607e7cccdcd0178f3bb13d0b', '', 'Juan', 'Galvis', 27, 0, 'jfelipebarrera@gmail.com', '2013-10-31 22:12:51', 9, '0', '1', '3'),
(67, '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', '', 'Jane', 'Doe', 27, 2, 'jdoe@maila.com', '2013-11-01 20:40:07', 14, '0', '2', '3'),
(68, '4cc8f4d609b717356701c57a03e737e5ac8fe885da8c7163d3de47e01849c635', '', 'Wilmer', 'Amézquita', 23, 1, 'wamezquita@ospinternational.com', '2013-11-05 21:17:24', 9, '0', '1', '3'),
(69, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'UQg0bPutm7opIOcMfzYeLlRdG5SnXD', ' Manuel', 'Amézquita', 22, 1, 'manuel@mail.com', '2013-11-13 23:46:03', 1, '0', '1', '3'),
(70, 'f7a8e7caccf5797ecd323e8158d51d9025b765ab4d9a76ffef905c479c02bde6', '', 'Andres', 'Castellanos', 23, 1, 'ccast2@gm3ail.com', '2013-11-14 02:34:31', 15, '0', '1', '3'),
(71, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '', 'Andres', 'Castellanos', 23, 1, 'c@c.com', '2013-11-14 03:20:12', 1, '0', '1', '3'),
(72, '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', '', 'charlie', 'wafless', 23, 1, 'acas82337@gmail.com', '2013-11-15 17:09:05', 9, '0', '1', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_teams`
--

CREATE TABLE IF NOT EXISTS `users_teams` (
  `id` int(14) NOT NULL AUTO_INCREMENT,
  `id_user` int(14) NOT NULL,
  `id_team` int(14) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=39 ;

--
-- Volcado de datos para la tabla `users_teams`
--

INSERT INTO `users_teams` (`id`, `id_user`, `id_team`) VALUES
(16, 58, 26),
(17, 55, 28),
(24, 59, 28),
(25, 60, 28),
(26, 55, 28),
(27, 55, 28),
(28, 55, 28),
(30, 55, 26),
(31, 61, 29),
(32, 61, 27),
(33, 61, 30),
(34, 69, 31),
(35, 69, 27),
(36, 69, 26),
(37, 69, 25),
(38, 69, 32);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
