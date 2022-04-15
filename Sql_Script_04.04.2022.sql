CREATE TABLE `products_bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(256) NOT NULL,
  `lastName` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `address` text NOT NULL,
  `zipCode` varchar(256) NOT NULL,
  `isActive` bit(1) DEFAULT b'1',
  `product_id` int not null,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

alter table products add column isBooked2 bit default 0