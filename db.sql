create database bank;

create schema if not exists ods;

create table ods.churn (
  customerid serial primary key,
  creditscore int8,
  age int8,
  tenure int8,
  balance numeric(24, 2),
  numofproducts int8,
  hascrcard int2,
  isactivemember int2,
  estimatedsalary numeric(24, 2),
  geography_germany int2,
  geography_spain int2,
  gender_male int2
);

create table ods.churn_predictions (
	customerid int8 primary key,
	exited int2
);

select * from ods.churn;
select * from ods.churn_predictions;
