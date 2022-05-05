-- MySQL dump 10.13  Distrib 8.0.23, for osx10.16 (x86_64)
--
-- Host: localhost    Database: bills
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pay_type` int NOT NULL COMMENT '帐单类型，1 为支出，2 为收入',
  `amount` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '帐单价格',
  `date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '帐单日期',
  `type_id` int NOT NULL COMMENT '帐单标签 id',
  `type_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '帐单标签，例如餐饮、交通等',
  `user_id` int NOT NULL COMMENT '用户 id',
  `remark` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '帐单备注',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `delete_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='帐单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
-- INSERT INTO `bill` VALUES (1,1,'30','1634961255000',2,'服饰',2,'加拿大鹅','2021-10-23 03:54:15','2021-10-23 07:47:37',NULL),(2,1,'200.00','1636537706000',2,'服饰',2,'热风时尚板鞋','2021-11-10 09:48:26',NULL,NULL),(3,1,'20.00','1635990506000',3,'交通',2,'Hello 单车月卡','2021-11-10 09:49:29',NULL,NULL),(4,1,'3.00','1637028660000',6,'学习',2,'错误的1','2021-11-16 02:09:10','2021-11-16 06:22:05',NULL),(5,2,'1.00','1637028576000',14,'转账',2,'错误的','2021-11-16 02:09:36',NULL,'2021-11-16 03:06:05'),(6,1,'10.00','1637028600000',4,'日用',2,'错误的','2021-11-16 02:10:34','2021-11-16 05:54:21',NULL),(7,1,'8.00','1637031000000',5,'购物',2,'cuowu','2021-11-16 02:53:04',NULL,NULL),(8,2,'1.00','1637028540000',14,'转账',2,'错误的','2021-11-16 03:36:14',NULL,NULL);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称，例如餐饮，交通等',
  `type` int NOT NULL COMMENT '1 为支出，2 为收入',
  `user_id` int NOT NULL COMMENT '默认为 0，表示都可见，不为 0，只对相关用户可见',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `delete_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='帐单标签';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'餐饮',1,0,'2021-10-23 03:07:11',NULL,NULL),(2,'服饰',1,0,'2021-10-23 03:07:11',NULL,NULL),(3,'交通',1,0,'2021-10-23 03:07:11',NULL,NULL),(4,'日用',1,0,'2021-10-23 03:07:11',NULL,NULL),(5,'购物',1,0,'2021-10-23 03:07:11',NULL,NULL),(6,'学习',1,0,'2021-10-23 03:07:11',NULL,NULL),(7,'医疗',1,0,'2021-10-23 03:07:11',NULL,NULL),(8,'旅行',1,0,'2021-10-23 03:07:11',NULL,NULL),(9,'人情',1,0,'2021-10-23 03:07:11',NULL,NULL),(10,'转账',1,0,'2021-10-23 03:07:11',NULL,NULL),(11,'其他',1,0,'2021-10-23 03:07:11',NULL,NULL),(12,'工资',2,0,'2021-10-23 03:07:11',NULL,NULL),(13,'奖金',2,0,'2021-10-23 03:07:11',NULL,NULL),(14,'转账',2,0,'2021-10-23 03:07:11',NULL,NULL),(15,'理财',2,0,'2021-10-23 03:07:11',NULL,NULL),(16,'退款',2,0,'2021-10-23 03:07:11',NULL,NULL),(17,'其他',2,0,'2021-10-23 03:07:11',NULL,NULL);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录唯一标识',
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `signature` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `delete_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
-- INSERT INTO `user` VALUES (2,'Jerry','123456','I\'m Jerry',NULL,'2021-10-21 08:59:10','2021-10-22 10:24:41',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bills'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-16 17:26:26
