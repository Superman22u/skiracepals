CREATE DATABASE IF NOT EXISTS skiracepals
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'skirace'@'localhost' IDENTIFIED BY 'skirace';
GRANT ALL PRIVILEGES ON skiracepals.* TO 'skirace'@'localhost';
FLUSH PRIVILEGES;
