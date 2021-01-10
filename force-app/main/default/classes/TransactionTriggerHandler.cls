public class TransactionTriggerHandler {
    
    public static void updateRemainingBalance(List<Transaction__c> transList){
        List<Credit_Card__c> cards = new List<Credit_Card__c>();
        List<Contact> conList = new List<Contact>();
        for(Transaction__c trans: transList){
            Credit_Card__c cc = [SELECT Remaining_Balance__c FROM Credit_Card__c
                                 WHERE Id = :trans.Payment_Mode__c];
            cc.Remaining_Balance__c = cc.Remaining_Balance__c - trans.Amount__c;
            cards.add(cc);
            
            Contact con = [SELECT CREDT_Points__c FROM Contact
                           WHERE Id = :trans.Customer_Name__c];
            System.debug(con);
            con.CREDT_Points__c = con.CREDT_Points__c + 40;
            conList.add(con);
        }
        try{
            update cards;
            update conList;
        } catch (Exception e) {
            System.debug(e);
        }
    }
}