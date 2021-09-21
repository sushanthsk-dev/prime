namespace cap.prime;


using {
    Currency,
    managed,
    cuid
} from '@sap/cds/common';

   @assert.unique : {
       accountId : [accountId]
   }
entity Accounts : managed {
    key ID          : UUID;
        accountId   : String(20);
        description : String;
        status      : Association to AccountStatuses;
        plan        : Association to AccountPlans;
        device      : Association to AccountDevices;
        startDate   : Date;
        endDate     : Date;
      @assert.range: [ 1,1000]
        cost        : Integer;
        currency    : Currency default 'EUR';      
        userMapping : Composition of many AccountUserMapings
                      on userMapping.account = $self;
}
   @assert.unique : {
       user : [user]
   }
entity AccountUserMapings : managed {
  key ID      : UUID;
      account : Association to Accounts;
      user    : Association to Users;
}

entity Users : managed {
  key ID        : UUID;
      userId    : String(20);
      firstName : String;
      lastName  : String;
}

entity AccountStatuses {
  key code : Integer enum {
        Active  = 1;
        Expired=0;
      };
      name : localized String;
};

entity AccountPlans {
  key code : Integer enum {
        Silver   = 0;
        Gold     = 1;
        Diamond  = 2;
        Platinum = 3;
      };
      name : localized String;
};

entity AccountDevices{
  key code : Integer enum {
        Mobile = 0;
        Pc = 1;
        Tab = 2;
  };
  name : localized String;
};

