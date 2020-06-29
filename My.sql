-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 29. Feb 2020 um 13:36
-- Server-Version: 8.0.13-4
-- PHP-Version: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `5zyKsv8Wlj`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `botData`
--

CREATE TABLE `botData` (
  `likes` int(11) DEFAULT NULL,
  `dislikes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `botData`
--

INSERT INTO `botData` (`likes`, `dislikes`) VALUES
(0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `serverSettings`
--

CREATE TABLE `serverSettings` (
  `id` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `prefix` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lang` int(1) DEFAULT NULL,
  `money` int(1) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `max` int(11) DEFAULT NULL,
  `infos` int(1) DEFAULT NULL,
  `wlm` int(1) DEFAULT NULL,
  `wm` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `lm` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `wlchannel` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userData`
--

CREATE TABLE `userData` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `bites` int(11) DEFAULT NULL,
  `bytes` int(11) DEFAULT NULL,
  `warns` int(11) DEFAULT NULL,
  `worked` int(1) DEFAULT NULL,
  `robbed` int(1) DEFAULT NULL,
  `liked` int(1) NOT NULL,
  `disliked` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
