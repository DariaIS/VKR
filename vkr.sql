-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 24 2022 г., 14:11
-- Версия сервера: 10.4.6-MariaDB
-- Версия PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `vkr`
--

-- --------------------------------------------------------

--
-- Структура таблицы `arriving_date`
--

CREATE TABLE `arriving_date` (
  `id_date` int(11) NOT NULL,
  `id_car` int(11) NOT NULL,
  `arrival_time` time DEFAULT NULL,
  `departure_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `arriving_date`
--

INSERT INTO `arriving_date` (`id_date`, `id_car`, `arrival_time`, `departure_time`) VALUES
(1, 4, '20:19:07', '20:20:45'),
(1, 8, '21:22:19', '21:22:25'),
(2, 5, '12:00:00', '18:00:00'),
(2, 8, '19:54:24', '19:54:52'),
(3, 8, '13:04:58', '15:04:58'),
(4, 8, '14:16:32', '14:16:32'),
(5, 5, '12:00:00', '20:00:00'),
(5, 8, '18:12:58', '21:12:58'),
(6, 8, '19:53:48', '19:53:50'),
(7, 8, '20:38:37', NULL),
(8, 8, '20:48:55', NULL),
(9, 9, '07:24:56', NULL),
(9, 13, '15:02:35', '16:29:06'),
(9, 17, '21:42:29', '22:29:06'),
(10, 13, '12:29:06', '15:29:06'),
(11, 9, '23:20:03', '23:20:50'),
(11, 13, '09:51:25', NULL),
(11, 17, '23:47:00', NULL),
(13, 8, '19:12:19', NULL),
(13, 16, '15:21:57', NULL),
(13, 49, '15:22:01', NULL),
(14, 8, '20:51:40', '20:51:41'),
(15, 8, '13:24:48', '13:58:19'),
(15, 9, '13:21:10', '13:58:45'),
(15, 48, '13:21:38', NULL),
(15, 49, '13:21:42', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `car`
--

CREATE TABLE `car` (
  `id_car` int(11) NOT NULL,
  `id_person` int(11) DEFAULT NULL,
  `license_plate` varchar(45) DEFAULT NULL,
  `region` int(11) NOT NULL,
  `car_brand` varchar(45) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `car`
--

INSERT INTO `car` (`id_car`, `id_person`, `license_plate`, `region`, `car_brand`, `start_date`, `expiration_date`) VALUES
(4, 49, 'K000KK', 58, 'Toyota', '2021-12-18', '2023-05-01'),
(5, 49, 'K001KK', 58, 'Ford', '2021-12-18', '2022-02-02'),
(8, 56, 'A111AA', 58, 'BMW', '2021-12-08', '2023-05-07'),
(9, 57, 'B222BB', 58, 'Mersedes', '2021-12-19', '2023-04-20'),
(10, 63, 'y444yy', 58, 'Лада', '2021-12-19', '2023-04-21'),
(11, 64, 'A555HM', 198, 'Audi', '2021-12-09', '2023-05-03'),
(12, 65, 'M555MM', 177, 'Лада', '2021-12-13', '2023-01-09'),
(13, 66, 'y123yy', 60, 'Ford', '2022-02-15', '2022-05-18'),
(16, 69, 'M345PH', 58, 'Лада', '2022-02-15', '2023-05-18'),
(17, 70, 'y345HP', 58, 'Nissan', '2022-02-15', '2023-05-17'),
(48, 65, 'yyyy', 44, 'Красивая машина', '2022-05-17', '2023-09-13'),
(49, 70, 'B657BB', 23, 'Fiat', '2022-05-18', '2023-05-22'),
(50, NULL, 'H325HH', 34, 'Mazda', '2022-05-18', '2022-05-09'),
(52, 64, 'B657BM', 57, 'Audi', '2022-05-22', '2023-05-22');

-- --------------------------------------------------------

--
-- Структура таблицы `chair`
--

CREATE TABLE `chair` (
  `id_chair` int(11) NOT NULL,
  `chair` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `chair`
--

INSERT INTO `chair` (`id_chair`, `chair`) VALUES
(1, 'ВТ'),
(2, 'ИВС'),
(3, 'САПР'),
(4, 'АСБ'),
(5, 'МО'),
(6, 'ИСТ');

-- --------------------------------------------------------

--
-- Структура таблицы `date`
--

CREATE TABLE `date` (
  `id_date` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `date`
--

INSERT INTO `date` (`id_date`, `date`) VALUES
(1, '2021-12-19'),
(2, '2021-12-20'),
(3, '2021-12-21'),
(4, '2022-04-27'),
(5, '2022-04-30'),
(6, '2022-05-03'),
(7, '2022-05-07'),
(8, '2022-05-08'),
(9, '2022-05-11'),
(10, '2022-05-17'),
(11, '2022-05-19'),
(13, '2022-05-21'),
(14, '2022-05-23'),
(15, '2022-05-24');

-- --------------------------------------------------------

--
-- Структура таблицы `gates`
--

CREATE TABLE `gates` (
  `id_gates` int(11) NOT NULL,
  `gates_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `gates`
--

INSERT INTO `gates` (`id_gates`, `gates_name`) VALUES
(1, '7 корпус'),
(2, '3 корпус'),
(3, '1 корпус');

-- --------------------------------------------------------

--
-- Структура таблицы `gates_allowed`
--

CREATE TABLE `gates_allowed` (
  `id_car` int(11) NOT NULL,
  `id_gates` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `gates_allowed`
--

INSERT INTO `gates_allowed` (`id_car`, `id_gates`) VALUES
(4, 2),
(4, 3),
(5, 2),
(8, 1),
(9, 1),
(10, 3),
(11, 3),
(12, 2),
(13, 1),
(16, 1),
(17, 1),
(48, 1),
(49, 1),
(49, 2),
(49, 3),
(50, 2),
(50, 3),
(52, 1),
(52, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `person`
--

CREATE TABLE `person` (
  `id_person` int(11) NOT NULL,
  `id_chair` int(11) DEFAULT NULL,
  `last_name` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `middle_name` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `person`
--

INSERT INTO `person` (`id_person`, `id_chair`, `last_name`, `name`, `middle_name`, `position`) VALUES
(49, 1, 'Петров', 'Петр', 'Петрович', 'academic'),
(56, 3, 'Стародубова', 'Дарья', 'Игоревна', 'student'),
(57, 3, 'Сорокин', 'Дмитрий', 'Сергеевич', 'student'),
(63, 2, 'Иванов', 'Иван', 'Иванович', 'academic'),
(64, 4, 'Александров', 'Александр', 'Александрович', 'academic'),
(65, 6, 'Антонов', 'Антон', 'Антонович', 'academic'),
(66, 5, 'Семенов', 'Семен', 'Семенович', 'academic'),
(69, 3, 'Афанасьева', 'Александра', 'Андреевна', 'academic'),
(70, 4, 'Анатольев', 'Игорь', 'Павлович', 'academic'),
(90, 3, 'Петров', 'Петр', 'Петрович', 'academic');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id_user`, `user_name`, `password`, `role`) VALUES
(16, 'Analyst', '$2b$10$c2XiFRdXsKmMPGoAG/ojv.FA3zgmAbv5ltcp3.YTSb7MTI9.GcPFm', 'analyst'),
(17, 'Security', '$2b$10$MH10oeNqsxhccsCDkX1vlOXOwpxcdQobcOXLIrnh4l.0hW7mE1bxi', 'security'),
(29, 'newSecurity', '$2b$10$mvHmIT5CNO9/saBViEZ1HOmuc/X3pFwlJhy/UXYjs.s3GhSQ0Sj2S', 'security'),
(31, 'Admin', '$2b$10$VKs.1F7vKBnVI13uSmJVKu.hyd0q4cKAMbDwIVxqog2KicIj.uRWW', 'admin');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `arriving_date`
--
ALTER TABLE `arriving_date`
  ADD PRIMARY KEY (`id_date`,`id_car`),
  ADD KEY `fk_arriving_day_car1_idx` (`id_car`);

--
-- Индексы таблицы `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id_car`),
  ADD KEY `fk_car_person1_idx` (`id_person`);

--
-- Индексы таблицы `chair`
--
ALTER TABLE `chair`
  ADD PRIMARY KEY (`id_chair`);

--
-- Индексы таблицы `date`
--
ALTER TABLE `date`
  ADD PRIMARY KEY (`id_date`);

--
-- Индексы таблицы `gates`
--
ALTER TABLE `gates`
  ADD PRIMARY KEY (`id_gates`);

--
-- Индексы таблицы `gates_allowed`
--
ALTER TABLE `gates_allowed`
  ADD PRIMARY KEY (`id_car`,`id_gates`),
  ADD KEY `fk_gates_allowed_gates1_idx` (`id_gates`);

--
-- Индексы таблицы `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id_person`),
  ADD KEY `id_chair` (`id_chair`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `car`
--
ALTER TABLE `car`
  MODIFY `id_car` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблицы `chair`
--
ALTER TABLE `chair`
  MODIFY `id_chair` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `date`
--
ALTER TABLE `date`
  MODIFY `id_date` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `gates`
--
ALTER TABLE `gates`
  MODIFY `id_gates` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `person`
--
ALTER TABLE `person`
  MODIFY `id_person` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `arriving_date`
--
ALTER TABLE `arriving_date`
  ADD CONSTRAINT `fk_arriving_day_car1` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_arriving_day_day1` FOREIGN KEY (`id_date`) REFERENCES `date` (`id_date`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `fk_car_person1` FOREIGN KEY (`id_person`) REFERENCES `person` (`id_person`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `gates_allowed`
--
ALTER TABLE `gates_allowed`
  ADD CONSTRAINT `fk_gates_allowed_car` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_gates_allowed_gates1` FOREIGN KEY (`id_gates`) REFERENCES `gates` (`id_gates`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `fk_person_chair1` FOREIGN KEY (`id_chair`) REFERENCES `chair` (`id_chair`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
