drop database if exists dvba;
create database if not exists dvba;
use dvba;

set global general_log = on;

create table users
(
    id             integer PRIMARY KEY auto_increment,
    username       varchar(100) UNIQUE           NOT NULL,
    password       varchar(1024)                 NOT NULL,
    phone          varchar(20) UNIQUE            NOT NULL,
    account_number integer UNIQUE,
    balance        BIGINT unsigned default 100000 NOT NULL,
    is_admin       boolean         default false,
    email          varchar(255)                  NOT NULL,
    membership     varchar(255)                  NOT NULL    
) engine = innodb;

create table transactions
(
    id           integer PRIMARY KEY auto_increment,
    from_account int(11)     NOT NULL,
    to_account   VARCHAR(50) NOT NULL,
    amount       int         NOT NULL,
    sendtime     DATETIME
) engine = innodb;

create table beneficiaries
(
    id                         integer PRIMARY KEY auto_increment,
    account_number             int(11)               NOT NULL,
    beneficiary_account_number int(11)               NOT NULL,
    approved                   boolean default false NOT NULL
) engine = innodb;

create table smsauths
(
    id                         integer PRIMARY KEY auto_increment,
    username                   varchar(100) UNIQUE   NOT NULL,
    authnum                    integer
) engine = innodb;

INSERT INTO `users`
values (default, "admin", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "01011111111" , 999999, default, true,
        'admin@admin', "ADMIN");

INSERT INTO `users`
values (default, "user", "04F8996DA763B7A969B1028EE3007569EAF3A635486DDAB211D512C85B9DF8FB", "01022222222" , 123456, default, true,
        'user@user', "FRIEND");

INSERT INTO `users`
values (default, "vipuser", "6EBFB8F968B95D2F7B9FD99F399B95364AB747290DA58F8EE0E3E28A2C81880E", "01033333333" , 654321, default, true,
        'vipuser@vipuser', "PREMIUM");

UPDATE users SET balance=100000000 WHERE username = 'vipuser';

drop database if exists board;
create database if not exists board;
use board;

create table notice
(
    id        int not null auto_increment,
    userId    varchar(30),
    title     VARCHAR(255),
    content   VARCHAR(1023),
    filepath  VARCHAR(255),
    createdAt DATETIME,
    updatedAt DATETIME,
    PRIMARY KEY (id)
) engine = innodb;

create table qna
(
    id        int not null auto_increment,
    userId    varchar(30),
    title     VARCHAR(255),
    content   VARCHAR(1023),
    createdAt DATETIME,
    updatedAt DATETIME,
    comment   VARCHAR(1000),
    PRIMARY KEY (id)
) engine = innodb;

drop user if exists api@'%';
drop user if exists web@'%';

create user api@'%' identified by 'eggmoneyapi';
create user web@'%' identified by 'eggwebmoney';

grant all privileges on dvba.* to api@'%';
grant all privileges on board.* to web@'%';

flush privileges;
