-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Jun 2022 um 22:15
-- Server-Version: 8.0.29
-- PHP-Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `scamino`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bets`
--

CREATE TABLE `bets` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `win` decimal(12,2) NOT NULL DEFAULT '0.00',
  `roll` tinyint NOT NULL,
  `tips` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `games`
--

CREATE TABLE `games` (
  `id` int NOT NULL,
  `providerId` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `providerId`, `name`, `image`) VALUES
(1, 2, 'La Dolce Vita', 'la-dolce-vita.webp'),
(2, 3, 'Fat Frankies', 'fat-frankies.jpg'),
(3, 4, 'Joe Exotic', 'joe-exotic.webp'),
(4, 6, 'Drago: Jewels of Fortune', 'drago-jewels-of-fortune.webp'),
(5, 1, 'Deutsches Roulette', 'deutsches-roulette.webp'),
(6, 6, 'The Dog House', 'dog-house.webp'),
(7, 5, 'Chaos Crew', 'chaos-crew.webp'),
(8, 3, 'Hugo\'s Adventure', 'hugos-adventure.webp'),
(9, 2, 'Night Wolves', 'night-wolves.webp'),
(10, 3, 'Wild North', 'wild-north.webp'),
(11, 3, 'Wildhound Derby', 'wildhound-derby.webp'),
(12, 3, 'Pimped', 'pimped.webp'),
(13, 3, 'Book of Dead', 'book-of-dead.webp'),
(14, 2, 'Glamorous Times', 'glamorous-times.webp'),
(15, 2, 'The Mighty King', 'the-mighty-king.webp'),
(16, 5, 'Stack \'Em', 'stack-em.webp'),
(17, 6, 'Gates of Olympus', 'gates-of-olympus.webp'),
(18, 6, 'The Hand of Midas', 'the-hand-of-midas.webp'),
(19, 6, 'Madame Destiny Megaways', 'madame-destiny-megaways.webp'),
(20, 5, 'Wanted: Dead or a Wild', 'wanted-dead-or-a-wild.webp'),
(21, 6, 'Voodoo Magic', 'voodoo-magic.webp'),
(22, 8, 'TOP DAWG$', 'top-dawg.webp'),
(23, 8, 'Tiger Kingdom', 'tiger-kingdom.jpg'),
(24, 5, 'The Bowery Boys', 'the-bowery-boys.jpg'),
(25, 8, 'Money Train 2', 'money-train-2.webp'),
(26, 8, 'La Fiesta', 'la-fiesta.webp'),
(27, 2, 'King of the Jungle Golden Nights', 'king-of-the-jungle-gn.webp'),
(28, 4, 'Jingle Bells', 'jingle-bells.webp'),
(29, 6, 'Hot Fiesta', 'hot-fiesta.webp'),
(30, 7, 'Gorilla Kingdom', 'gorilla-kingdom.webp'),
(31, 4, 'Genie Nights', 'genie-nights.jpg'),
(32, 7, 'Dead or Alive 2', 'dead-or-alive-2.webp'),
(33, 8, 'Caravan of Riches', 'caravan-of-riches.jpg'),
(34, 6, 'Buffalo King', 'buffalo-king.webp'),
(35, 7, 'Aloha Cluster Pays', 'aloha-cluster-pays.webp'),
(36, 4, '1942: Sky Warrior', '1942-sky-warrior.webp'),
(37, 9, 'Monopoly Live', 'monopoly-live.webp'),
(38, 9, 'Crazy Time', 'crazy-time.webp'),
(39, 9, 'Lightning Roulette', 'lightning-roulette.webp');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `provider`
--

CREATE TABLE `provider` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `url` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `provider`
--

INSERT INTO `provider` (`id`, `name`, `url`) VALUES
(1, 'Scamino', '/'),
(2, 'Gamomat', 'https://gamomat.com/'),
(3, 'Play\'n GO', 'https://www.playngo.com/'),
(4, 'Red Tiger', 'https://www.redtiger.com/'),
(5, 'HACKSAW GAMING', 'https://www.hacksawgaming.com/'),
(6, 'Pragmatic Play', 'https://www.pragmaticplay.com/'),
(7, 'Netent', 'https://www.netent.com/'),
(8, 'Relax Gaming', 'https://relax-gaming.com/'),
(9, 'Evolution', 'https://www.evolution.com/');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `method` enum('Paysafe','Neteller','Skrill','Visa | Mastercard','EPS-Überweisung') NOT NULL,
  `type` enum('deposit','withdrawal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firebaseId` varchar(28) DEFAULT NULL,
  `balance` decimal(12,2) NOT NULL DEFAULT '0.00',
  `phone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `country` enum('Österreich','Deutschland','Schweiz') DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `zip` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `bets`
--
ALTER TABLE `bets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `REL_bets_users` (`userId`);

--
-- Indizes für die Tabelle `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `REL_games_provider` (`providerId`);

--
-- Indizes für die Tabelle `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `REL_transactions_users` (`userId`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `firebaseId_UNIQUE` (`firebaseId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bets`
--
ALTER TABLE `bets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT für Tabelle `provider`
--
ALTER TABLE `provider`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `bets`
--
ALTER TABLE `bets`
  ADD CONSTRAINT `REL_bets_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints der Tabelle `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `REL_games_provider` FOREIGN KEY (`providerId`) REFERENCES `provider` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints der Tabelle `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `REL_transactions_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
