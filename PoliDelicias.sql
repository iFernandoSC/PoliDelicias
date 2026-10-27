-- MySQL dump 10.13  Distrib 26.7.0, for macos27.0 (arm64)
--
-- Host: localhost    Database: PoliDelicias
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bebidas`
--

DROP TABLE IF EXISTS `bebidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bebidas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_bebida` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `id_lugar` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bebidas_restaurante` (`id_lugar`),
  CONSTRAINT `fk_bebidas_restaurante` FOREIGN KEY (`id_lugar`) REFERENCES `restaurante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebidas`
--

LOCK TABLES `bebidas` WRITE;
/*!40000 ALTER TABLE `bebidas` DISABLE KEYS */;
INSERT INTO `bebidas` VALUES (1,'Agua de sandía','Agua fresca natural de sandía del día (permite combinaciones)',25.00,1),(2,'Agua de piña','Agua fresca natural de piña del día (permite combinaciones)',25.00,1),(3,'Agua de melón','Agua fresca natural de melón del día (permite combinaciones)',25.00,1),(4,'Agua de papaya','Agua fresca natural de papaya del día (permite combinaciones)',25.00,1),(5,'Agua de guayaba','Agua fresca natural de guayaba del día (permite combinaciones)',25.00,1),(6,'Agua de manzana','Agua fresca natural de manzana del día (permite combinaciones)',25.00,1),(7,'Agua de avena','Avena preparada del día (permite combinaciones)',25.00,1),(8,'Agua de pepino','Agua fresca natural de pepino del día (permite combinaciones)',25.00,1),(9,'Agua de limón','Agua fresca natural de limón del día (permite combinaciones)',25.00,1),(10,'Agua de lima','Agua fresca natural de lima del día (permite combinaciones)',25.00,1),(11,'Agua de fresa','Agua fresca natural de fresa del día (permite combinaciones)',25.00,1),(12,'Agua de naranja','Agua fresca natural de naranja del día (permite combinaciones)',25.00,1),(13,'Agua de temporada','Agua fresca de fruta de temporada (permite combinaciones)',25.00,1),(14,'Agua de Kahlúa','Bebida de Kahlúa preparada del día',25.00,1),(15,'Rusas','Refresco o naranjada preparados con sal, limón y chile en polvo',35.00,1),(16,'Chocomilk de Chocolate','Tradicional chocomilk preparado con chocolate, canela y leche entera',45.00,1),(17,'Chocomilk de Vainilla','Chocomilk sabor vainilla con canela y leche entera',45.00,1),(18,'Chocomilk de Fresa','Chocomilk sabor fresa con canela y leche entera',45.00,1),(19,'Chocomilk de Café','Chocomilk con toque de café, canela y leche entera',45.00,1),(20,'Licuado Energético','Licuado completo con fresa, plátano, manzana, avena, granola y leche entera',45.00,1),(21,'Café Capuchino','Café estilo capuchino',25.00,1),(22,'Café Moka','Café estilo moka con chocolate',25.00,1),(23,'Café Vainilla','Café aromatizado con vainilla',25.00,1),(24,'Café Americano','Café americano tradicional',25.00,1),(25,'Chocolate Abuelita','Tradicional chocolate caliente estilo Abuelita',25.00,1),(26,'Frappé Chico','Bebida frappé tamaño chico',40.00,1),(27,'Frappé Grande','Bebida frappé tamaño grande',60.00,1),(28,'Té Helado de Limón','Té helado refrescante sabor limón',25.00,1),(29,'Té Helado de Durazno','Té helado refrescante sabor durazno',25.00,1),(30,'Té de Manzanilla','Infusión caliente de manzanilla natural',25.00,1),(31,'Té Verde','Infusión caliente de té verde',25.00,1),(32,'Té de Limón','Infusión caliente sabor limón',25.00,1),(33,'Té de Hierbas Relajantes','Infusión caliente de hierbas relajantes',25.00,1),(34,'Té de Manzana Canela','Infusión caliente de manzana con canela',25.00,1);
/*!40000 ALTER TABLE `bebidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comida`
--

DROP TABLE IF EXISTS `comida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_platillo` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `id_lugar` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comida_restaurante` (`id_lugar`),
  CONSTRAINT `fk_comida_restaurante` FOREIGN KEY (`id_lugar`) REFERENCES `restaurante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=558 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comida`
--

LOCK TABLES `comida` WRITE;
/*!40000 ALTER TABLE `comida` DISABLE KEYS */;
INSERT INTO `comida` VALUES (1,'SUSHI EMPANIZADO DE SURIMI','EMPANIZADO CON SURIMI, AGUACATE Y PHILADELFIA ',65.00,5),(2,'SUSHI EMPANIZADO DE CAMARON ','EMPANIZADO CON PANKO RELLENO DE ARROZ CON CAMARONES, AGUACATES Y PHILADELFIA',70.00,5),(3,'SUCHI PHILADELFIA DE SURIMI','UN SUSHI DE PHILADELFIA CON ARRZO, CAMARON, AGUACATE Y PEPINO ',70.00,5),(4,'SUSHI PHILADELPHIA','Queso Philadelphia, surimi, aguacate, pepino y zanahoria',65.00,5),(5,'SUSHI CALIFORNIA','Camarón, pepino, aguacate, zanahoria y arroz por fuera',70.00,5),(6,'SUSHI CALIFORNIA','Surimi, pepino, aguacate, zanahoria y arroz por fuera',65.00,5),(7,'BANDERILLA CLÁSICA','Salchicha empanizada con crujiente pan molido',40.00,5),(8,'BANDERILLA FLAMING','Salchicha empanizada con empanizado crujiente de Flaming Hot',40.00,5),(9,'BANDERILLA PAPA','Salchicha cubierta de masa empanizada con papas fritas',45.00,5),(10,'BANDERILLA ESPECIAL','Salchicha cubierta de masa empanizada con salchicha',45.00,5),(11,'PASTA O ARROZ (Tallarines)','Porción con tallarines agridulces',65.00,5),(12,'PASTA O ARROZ (Pollo Agrodulce)','Porción con pollo agridulce y frito',65.00,5),(13,'PASTA O ARROZ (Boneless Búfalo)','Porción con boneless bañados en salsa búfalo',65.00,5),(14,'PASTA O ARROZ (Boneless Mango Habanero)','Porción con boneless en salsa de mango con habanero',65.00,5),(15,'PASTA O ARROZ (Yakimeshi)','Porción de yakimeshi preparado con pollo',65.00,5),(16,'PASTA O ARROZ (Poke)','Porción estilo poke bowl con pollo',65.00,5),(17,'PASTA O ARROZ (Pollo KFC)','Porción con pollo crujiente estilo KFC',65.00,5),(18,'PAPA AL HORNO','Papa al horno preparada (sabor variable según disponibilidad)',50.00,5),(19,'ROLLOS PRIMAVERA','Rollos crujientes rellenos de carne molida, col, zanahoria y cebolla',20.00,4),(20,'HAMBURGUESA NORMAL','Jugosa carne de res con lechuga, jitomate y cebolla fresca',50.00,4),(25,'SUSHI DE CAMARÓN','Rollo de sushi con relleno de camarón',80.00,2),(26,'BANDERILLA DE SUSHI','Rellena de res, tocino, queso Philadelphia y camarón',50.00,2),(27,'TORTA AHOGADA','Tradicional torta de carne de cerdo y frijoles en salsa',50.00,2),(28,'LONCHE DE HAMBURGUESA','Carne de hamburguesa, lechuga, jitomate y cebolla',50.00,1),(29,'LONCHE DIETÉTICO','Pollo, queso panela, pepino fresco y aderezo para ensalada',50.00,1),(30,'LONCHE CAMPECHANO','Combinación de bistec, carne adobada y queso fundido',60.00,1),(31,'LONCHE DE PASTOR','Carne al pastor, piña jugosa y pico de gallo',60.00,1),(32,'LONCHE DE CHILAQUILES','Totopos crujientes con salsa, cebolla y complementos',50.00,1),(33,'CHILAQUILES ROJOS','Totopos en salsa roja con opción de cebolla',50.00,1),(34,'CHILAQUILES VERDES','Totopos en salsa verde con opción de cebolla',50.00,1),(35,'HAMBURGUESA SENCILLA','Combinación de res con pollo (sin papas)',50.00,1),(36,'HAMBURGUESA CON PAPAS','Combinación de res con pollo, acompañada de papas',60.00,1),(37,'HOT-DOG','Hot-dog sencillo con opción de queso fundido',25.00,1),(38,'TACOS DE BISTEC Y ADOBADA','Tacos preparadas con bistec, carne adobada y queso',15.00,1),(39,'TACOS DE ADOBADA','Tacos de jugosa carne adobada',15.00,1),(40,'TACOS DE PAPAS CON CHORIZO','Tacos guisados de papa con chorizo',15.00,1),(41,'TACOS DE CHICHARRÓN','Tacos guisados de chicharrón',15.00,1),(42,'TACOS DE BARBACOA','Tacos tradicionales de barbacoa',15.00,1),(43,'BURRITO SENCILLO','Pierna, lechuga, jitomate y aderezo envuelto en tortilla de harina',30.00,1),(44,'QUESADILLA SENCILLA','Tortilla de harina con queso fundido',20.00,1),(45,'QUESADILLA CON GUISO','Tortilla de harina con queso fundido y guiso a elegir',25.00,1),(46,'SINCRONIZADA SENCILLA','Carne de pierna, lechuga, jitomate, cebolla y complementos',25.00,1),(47,'SINCRONIZADA DOBLE','Doble porción de carne de pierna, lechuga, jitomate, cebolla y complementos',30.00,1),(48,'MOLLETES PIZZA','Molletes preparados estilo pizza',25.00,1),(49,'MOLLETES TRADICIONALES','Molletes con frijoles refritos y queso gratinado',25.00,1),(50,'ENSALADA DE POLLO','Pollo, pasta, lechuga fresca, cebolla, crutones y aderezo',60.00,1),(51,'ENSALADA DE PANELA','Queso panela, pasta, lechuga fresca, cebolla, crutones y aderezo',60.00,1),(52,'ENSALADA DE ATÚN','Atún, pasta, lechuga fresca, cebolla, crutones y aderezo',60.00,1),(53,'ENSALADA DE CARNES FRÍAS','Jamón, pasta, lechuga fresca, cebolla, crutones y aderezo',60.00,1),(54,'SÁNDWICH DE PANELA','Queso panela, lechuga, cebolla, jitomate en pan integral',50.00,1),(55,'SÁNDWICH DE POLLO','Pollo, lechuga, cebolla, jitomate en pan integral',50.00,1),(56,'SÁNDWICH ESPECIAL','Pollo, queso panela, pepino fresco y aderezo especial',60.00,1),(57,'SÁNDWICH DE ATÚN','Atún, lechuga, cebolla, jitomate en pan integral',50.00,1);
/*!40000 ALTER TABLE `comida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complementos`
--

DROP TABLE IF EXISTS `complementos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complementos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT NULL,
  `dentro_de_poli` tinyint(1) DEFAULT NULL,
  `id_lugar` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_complementos_restaurante` (`id_lugar`),
  CONSTRAINT `fk_complementos_restaurante` FOREIGN KEY (`id_lugar`) REFERENCES `restaurante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complementos`
--

LOCK TABLES `complementos` WRITE;
/*!40000 ALTER TABLE `complementos` DISABLE KEYS */;
INSERT INTO `complementos` VALUES (1,'GORDITAS','Rellenas de dulce de fresa',20.00,0,3),(2,'GORDITAS','Rellenas de dulce de nata',20.00,0,3),(3,'GORDITAS','Rellenas de crema de avellana Nutella',20.00,0,3),(4,'GORDITAS','Rellenas de suave crema pastelera',20.00,0,3),(5,'TOSTILOCOS','Preparados con pepino, jícama, cacahuates y salsas especiales',65.00,1,1),(6,'FRUTA PICADA (Chico)','Porción chica con mezcla de fruta fresca de temporada',30.00,1,1),(7,'FRUTA PICADA (Grande)','Porción grande con mezcla de fruta fresca de temporada',50.00,1,1),(8,'BIONICOS','Base de papaya, platano, cereales variados y crema especial',50.00,1,1),(9,'PAPAS A LA FRANCESA (Chico)','Orden chica de papas a la francesa crujientes con salsas',45.00,1,1),(10,'PAPAS A LA FRANCESA (Grande)','Orden grande de papas a la francesa con complementos',60.00,1,1),(11,'SALCHIPULPOS (Chico)','Porción chica de salchichas en forma de pulpo con complementos',45.00,1,1),(12,'SALCHIPULPOS (Grande)','Porción grande de salchichas en forma de pulpo con complementos',60.00,1,1),(13,'MOLLETE','Mollete dulce untado con mermelada',25.00,1,1),(14,'MOLLETE','Mollete dulce untado con cajeta',25.00,1,1),(15,'MOLLETE','Mollete untado con mantequilla',25.00,1,1),(16,'MOLLETE','Mollete espolvoreado con azucar y mantequilla',25.00,1,1),(17,'MOLLETE','Mollete dulce untado con crema Nutella',25.00,1,1),(18,'MOLLETE','Mollete dulce bañado con leche condensada',25.00,1,1);
/*!40000 ALTER TABLE `complementos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dueños`
--

DROP TABLE IF EXISTS `dueños`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dueños` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `nombre_rest` varchar(100) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dueños`
--

LOCK TABLES `dueños` WRITE;
/*!40000 ALTER TABLE `dueños` DISABLE KEYS */;
INSERT INTO `dueños` VALUES (1,'Rollos prima','LA EMOCHA',NULL,NULL),(2,'Banderillas','BANDERILLAS SUSHI','3313960742',NULL),(3,'Gorditas','GORDITAS PATRIA','3351053683',NULL),(4,'Cope A','EL FRENCH','3327996866',NULL),(5,'Cope cancha','COPERATIVA CANCHAS',NULL,NULL),(6,'Comida china','PRONTO FOODS','3316007756',NULL);
/*!40000 ALTER TABLE `dueños` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurante`
--

DROP TABLE IF EXISTS `restaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurante` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `dentro_de_poli` tinyint(1) DEFAULT NULL,
  `domicilio` varchar(150) NOT NULL,
  `tipo_comida` varchar(30) DEFAULT NULL,
  `contacto` varchar(50) DEFAULT NULL,
  `horario` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurante`
--

LOCK TABLES `restaurante` WRITE;
/*!40000 ALTER TABLE `restaurante` DISABLE KEYS */;
INSERT INTO `restaurante` VALUES (1,'EL FRENCH',1,'Av. Revolucion 1500 Col.Olimpica 44430','MEXICANA Y RAPIDA','3327996866','L/V 7:00am - 7:00pm y S 8:00am - 2:00pm'),(2,'BANDERILLAS SUSHI',0,'Av. Revolucion, ent. Solo estudiantes','CHINA Y MEXICANA','3313960742','L/V 4:00pm - 5:00pm'),(3,'GORDITAS PATRIA',0,'Av. Revolucion , esq. Pedro Catani','POSTRES','3351053683','L/V 10:00am - 6:00pm'),(4,'LA EMOCHA',0,'Av. Revolucion, cerca del escudo CUCEI','CHINA Y RAPIDA',NULL,'L/J 11:00am - 5:30pm y V 11am - 3:30pm'),(5,'PRONTO FOODS',0,'Av. Revolucion, esq. Pedro Catani','CHINA Y JAPONESA','3316007756','L/V 8:00am - 5:30pm'),(6,'COPE CANCHAS',1,'Av. Revolucion 1500 Col.Olimpica 44430','MEXICANA Y RAPIDA',NULL,NULL);
/*!40000 ALTER TABLE `restaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'PoliDelicias'
--
--
-- WARNING: can't read the INFORMATION_SCHEMA.libraries table. It's most probably an old server 8.0.46.
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-27 14:39:12
