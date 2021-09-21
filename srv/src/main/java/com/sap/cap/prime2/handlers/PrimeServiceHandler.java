package com.sap.cap.prime2.handlers;

import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.ErrorStatuses;
import com.sap.cds.services.ServiceException;
import com.sap.cds.services.cds.CdsService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import cds.gen.primeservice.AccountUserMapings_;
import cds.gen.primeservice.Accounts_;
import cds.gen.primeservice.PrimeService_;
import cds.gen.cap.prime.Accounts;
import cds.gen.primeservice.AccountUserMapings;

@Component
@ServiceName(PrimeService_.CDS_NAME)
public class PrimeServiceHandler implements EventHandler {

    @Autowired
    PersistenceService db;

    @Before(event = { CdsService.EVENT_CREATE, CdsService.EVENT_UPDATE }, entity = AccountUserMapings_.CDS_NAME)
    public void validateUserAccountMapping(AccountUserMapings account) {
        
        String userId = account.getUserId();
        CqnSelect sel = Select.from(AccountUserMapings_.class).columns(a -> a.account_ID())
                .where(a -> a.user_ID().eq(userId));
        if (db.run(sel).rowCount() > 0) {
            throw new ServiceException(ErrorStatuses.CONFLICT, "User already exist with another account");
        }
    }
}
