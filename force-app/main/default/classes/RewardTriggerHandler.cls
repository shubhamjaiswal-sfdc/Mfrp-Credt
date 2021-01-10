public class RewardTriggerHandler {
    public static void updateCredPoints(List<Reward__c> rewList){
        List<Contact> conList = new List<Contact>();
        for(Reward__c rew: rewList){
            
            Contact con = [SELECT CREDT_Points__c FROM Contact
                           WHERE Id = :rew.Owner_Name__c];
            System.debug(con);
            con.CREDT_Points__c = con.CREDT_Points__c - rew.Price__c;
            conList.add(con);
        }
        try{
            update conList;
        } catch (Exception e) {
            System.debug(e);
        }
    }
}