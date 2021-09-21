using { cap.prime as prime } from '../db/schema';

service PrimeService {
    entity Accounts as projection on prime.Accounts;

    entity AccountUserMapings as projection on prime.AccountUserMapings;

    entity Users as projection on prime.Users;

    entity AccountsStatuses as projection on prime.AccountStatuses;
    entity AccountPlans as projection on prime.AccountPlans;
    entity AccountDevices as projection on prime.AccountDevices;
}