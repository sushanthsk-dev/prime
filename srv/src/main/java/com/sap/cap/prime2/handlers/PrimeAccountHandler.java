package com.sap.cap.prime2.handlers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.sap.cds.ql.Select;
import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpdate;
import com.sap.cds.services.ErrorStatuses;
import com.sap.cds.services.ServiceException;
import com.sap.cds.services.cds.CdsService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cds.gen.primeservice.Accounts_;
import cds.gen.primeservice.PrimeService_;
import cds.gen.cap.prime.Accounts;

@Component
@ServiceName(PrimeService_.CDS_NAME)
public class PrimeAccountHandler implements EventHandler {
    private static final DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    @Autowired
    PersistenceService db;

    @Before(event = { CdsService.EVENT_CREATE }, entity = Accounts_.CDS_NAME)
    public void onPrimeAccountCreate(Accounts account) {
        if (account.getCost() <= 0) {
            throw new ServiceException(ErrorStatuses.BAD_REQUEST, "Cost should be a positive value");
        }
    }

    @On(event = { CdsService.EVENT_CREATE }, entity = Accounts_.CDS_NAME)
    public void onPrimeAccountCreateSetDate(Accounts account) {
        Date startDate = new Date();
        Date endDate = DateUtils.addDays(startDate, 30);
        account.setStartDate(LocalDate.parse(DATE_FORMAT.format(startDate)));
        account.setEndDate(LocalDate.parse(DATE_FORMAT.format(endDate)));
    }

    // @After(event = { CdsService.EVENT_READ }, entity = Accounts_.CDS_NAME)
    // public void changeSubscriptionStatus(List<Accounts> accounts) {
    // System.out.println(accounts);
    // for (Accounts account : accounts) {
    // if (account.getStatusCode() != null) {
    // if ((account.getStatusCode() == 3 &&
    // account.getEndDate().isBefore(LocalDate.now()))) {
    // account.setStatusCode(0);
    // CqnUpdate update = Update.entity(Accounts_.class).data(account)
    // .where(a -> a.ID().eq(account.getAccountId()));
    // db.run(update);
    // }
    // }
    // }
    // }
}
